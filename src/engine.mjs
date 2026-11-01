// Pure deterministic engine, with no DOM, network, Date, or Math.random.
// Integer-centimetre positions and a fixed 420-tick horizon.
// The historical mode guarantees sourced final places, but not historical sectionals.
import {getArchive} from './data.mjs';
export const ENGINE_VERSION='BTRM-001/0.1.0';
export const TRACK_CM=320000;
export const LAST_TICK=420;
export function hash32(text){
  let h=2166136261;
  for(let i=0;i<text.length;i++){h=Math.imul(h^text.charCodeAt(i),16777619);}
  return h>>>0;
}
export function generator(seed){
  let state=hash32(String(seed))||0x9e3779b9;
  return ()=>{state^=state<<13;state^=state>>>17;state^=state<<5;return (state>>>0)/4294967296;};
}
const trit=next=>Math.floor(next[i]()*3)-1;
export function normalise(input={}){
  const year=Number(input.year??2025);
  getArchive(year);
  const mode=input.mode==='whatif'?'whatif':'replay';
  const going=['good','soft','heavy'].includes(input.going)?input.going:'soft';
  const strategy=[-1,0,1].includes(Number(input.strategy))?Number(input.strategy):0;
  const seed=String(input.seed??'QSOL-MCUP-001').slice(0,64)||'QSOL-MCUP-001';
  const archive=getArchive(year);
  const runner=archive.names.includes(input.runner)?input.runner:archive.names[0];
  return {year,mode,going,strategy,seed,runner};
}
export function buildRace(raw={}){
  const settings=normalise(raw),race=getArchive(settings.year),n=race.names.length;
  const frames=[Array(n).fill(0)], finish=[];
  const next=race.names.map((_,index)=>generator(ENGINE_VERSION+'|RACE|'+settings.year+'|'+settings.seed+'|'+index));
  const profiles=race.names.map(name=>{
    const rng=generator(ENGINE_VERSION+'|PROFILE|'+name);
    return {wet:trit(rng),stay:trit(rng),form:trit(rng),weight:trit(rng),barrier:trit(rng)};
  });
  const distance=Array(n).fill(0),finished=Array(n).fill(false);
  for(let tick=1;tick<=LAST_TICK;tick++){
    for(let i=0;i<n;i++){
      if(finished[i])continue;
      let d;
      if(settings.mode==='replay'){
        const place=race.places[i];
        if(place==null){
          // This is a schematic DNF, not a representation of where the horse stopped.
          d=Math.floor(TRACK_CM*0.86*Math.min(1,tick/320));
        }else{
          const finishTick=286+place*2;
          const base=Math.floor(TRACK_CM*Math.min(1,tick/finishTick));
          const jitter=Math.floor((next[i]()-.5)*2400);
          d=tick>=finishTick?TRACK_CM:Math.min(TRACK_CM-1,Math.max(0,base+jitter));
        }
      }else{
        const p=profiles[i],g=settings.going==='heavy'?2:settings.going==='soft'?1:0;
        const phase=tick/LAST_TICK, chosen=settings.runner===race.names[i];
        const tactical=chosen ? settings.strategy*(phase<.45?45:-55):0;
        const kick=phase>.55?34*p.stay:0;
        const velocity=1050+28*p.form+23*p.weight+13*p.barrier+32*p.wet*g-48*g+kick+tactical+Math.floor((next[i]()-.5)*80);
        d=distance[i]+Math.max(300,velocity);
      }
      const previous=distance[i];
      distance[i]=Math.max(previous,Math.min(TRACK_CM,Math.floor(d)));
      if(distance[i]>=TRACK_CM&&settings.mode==='whatif'){
        finished[i]=true;
        // Fraction within fixed tick; no clock-time inference.
        const delta=Math.max(1,Math.floor(d)-previous);
        const micro=Math.round((tick-1+(TRACK_CM-previous)/Math.max(1,delta))*1000000);
        finish.push({index:i,micro});
      }
    }
    frames.push(distance.slice());
  }
  let placings;
  if(settings.mode==='replay'){
    placings=race.names.map((name,index)=>({name,place:race.places[index],status:race.places[index]==null?'DNF':'FINISHED'}));
  }else{
    finish.sort((a,b)=>a.micro-b.micro||a.index-b.index);
    const rank=new Map(finish.map((item,i)=>[item.index,i+1]));
    placings=race.names.map((name,index)=>({name,place:rank.get(index)??null,status:rank.has(index)?'FINISHED':'DNF'}));
  }
  return {settings,archive:race,profiles,frames,placings,version:ENGINE_VERSION};
}
export function orderAt(result,tick){
  const clamped=Math.max(0,Math.min(LAST_TICK,Math.floor(tick)));
  const positions=result.frames[clamped];
  const rows=result.archive.names.map((name,index)=>({name,index,cm:positions[index],place:result.placings[index].place,status:result.placings[index].status}));
  return rows.sort((a,b)=>b.cm-a.cm||(clamped===LAST_TICK?(a.place??99)-(b.place??99):a.index-b.index));
}
export function receiptPayload(result){
  const {settings,frames,placings,version,archive}=result;
  return {schema:'qsol-melbcupsim/1',engine:version,settings,
    historicalProvenance:{year:settings.year,date:archive.date,source:archive.source,observed:'published finish positions only',syntheticMotion:true},
    outcome:placings,checkpoints:[0,100,200,300,420].map(tick=>({tick,positionsCm:frames[tick]})),
    replayInstructions:'Open simulator with settings; rebuild timeline; compare sha256 of JSON.stringify({engine,settings,frames,outcome}).'};
}
export function canonicalRace(result){
  return JSON.stringify({engine:result.version,settings:result.settings,frames:result.frames,outcome:result.placings});
}
