import {getArchive} from './data.mjs';
import {ENGINE_VERSION,TRACK_CM,LAST_TICK,buildRace,orderAt,receiptPayload,canonicalRace} from './engine.mjs';
const $=id=>document.getElementById(id);
const canvas=$('track'),ctx=canvas.getContext('2d',{alpha:false});
const colors=['#ffe37e','#ff7e9b','#7fece1','#e5a0ff','#8cc8ff','#ffbc72','#d3fc7a','#fff','#ff9676','#9ee7d3','#b5a9ff','#f9d16c'];
let result,tick=0,playing=false,lastFrame=0,accum=0,digest='';let serial=0;
$('version').textContent=ENGINE_VERSION;
const params=new URLSearchParams(location.search);
for(const id of ['mode','year','going','seed','strategy']) if(params.has(id))$(id).value=params.get(id);
function config(){return {mode:$('mode').value,year:$('year').value,going:$('going').value,seed:$('seed').value,runner:$('runner').value,strategy:Number($('strategy').value)};}
function syncRunners(){const previous=$('runner').value;const archive=getArchive($('year').value);$('runner').replaceChildren();archive.names.forEach((name,i)=>{const o=document.createElement('option');o.value=name;o.textContent=String(i+1).padStart(2,'0')+' · '+name;$('runner').append(o);});const wanted=params.get('runner');$('runner').value=archive.names.includes(previous)?previous:archive.names.includes(wanted)?wanted:archive.names[0];}
function statement(text){$('feedback').textContent=text;}
function makeRace(){
  playing=false;tick=0;accum=0;lastFrame=0;syncMode();
  result=buildRace(config());digest='';$('seek').max=LAST_TICK;$('seek').value=0;
  $('raceTitle').textContent=result.settings.year+' MELBOURNE CUP';
  $('resultNote').textContent=result.settings.mode==='replay'?'PUBLISHED FINISH · SYNTHETIC MOTION':'ALTERNATE TIMELINE · SYNTHETIC PERFORMANCE';
  $('sourceLink').href=result.archive.source;$('sourceLink').textContent=result.archive.sourceLabel+' ↗';
  $('play').textContent='▶ START RACE';$('simStatus').textContent=result.settings.mode==='replay'?'ARCHIVE · FIXED OUTCOME':'WHAT-IF · SIMULATED';
  paint();updateHUD();statement('READY · '+result.archive.names.length+' STARTERS · '+ENGINE_VERSION);
  const ticket=++serial;
  if(globalThis.crypto?.subtle){
    const data=new TextEncoder().encode(canonicalRace(result));
    crypto.subtle.digest('SHA-256',data).then(buf=>{
      if(ticket!==serial)return;
      digest=[...new Uint8Array(buf)].map(n=>n.toString(16).padStart(2,'0')).join('');
      statement('SHA-256 '+digest.slice(0,24)+'… · READY');
    }).catch(()=>statement('Race ready · SHA-256 unavailable'));
  }else{statement('Race ready · cryptographic hashing requires HTTPS or localhost');}
}
function syncMode(){
  const fixed=$('mode').value==='replay';
  $('going').disabled=fixed;$('strategy').disabled=fixed;
  $('modeHint').textContent=fixed?'Published finishing order is fixed. Seed changes only the illustrative mid-race animation. Track and tactics do not alter published results.':'Counterfactual play. Ternary (-1/0/+1) profiles are fabricated for gameplay. Choose a runner, adjust conditions and tactics, then share the seed.';
}
function start(){if(tick>=LAST_TICK)tick=0;playing=!playing;lastFrame=0;accum=0;$('play').textContent=playing?'Ⅱ PAUSE':'▶ RESUME';updateHUD();}
$('play').addEventListener('click',start);
$('reset').addEventListener('click',()=>makeRace());
$('step').addEventListener('click',()=>{playing=false;tick=Math.min(LAST_TICK,tick+1);$('play').textContent='▶ RESUME';paint();updateHUD();});
$('seek').addEventListener('input',()=>{tick=Number($('seek').value);playing=false;$('play').textContent='▶ RESUME';paint();updateHUD();});
$('speed').addEventListener('input',()=>{$('speedText').textContent=$('speed').value+'×';});
for(const id of ['mode','year','going','seed','runner','strategy']){
  $(id).addEventListener('change',()=>{if(id==='year')syncRunners();makeRace();});
}
$('share').addEventListener('click',async()=>{
  const c=result.settings,p=new URLSearchParams({mode:c.mode,year:String(c.year),going:c.going,seed:c.seed,runner:c.runner,strategy:String(c.strategy)});
  const url=location.origin+location.pathname+'?'+p.toString();
  try{await navigator.clipboard.writeText(url);statement('REPRODUCIBLE CONFIG LINK COPIED');}
  catch{statement('COPY THIS LINK: '+url);}
});
$('export').addEventListener('click',()=>{
  const record={...receiptPayload(result),sha256OfCanonicalRace:digest||null};
  const blob=new Blob([JSON.stringify(record,null,2)+'\n'],{type:'application/json'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='melbcupsim-'+result.settings.year+'-'+result.settings.mode+'-receipt.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  statement('EXPORTED · '+(digest?'SHA-256 '+digest.slice(0,24)+'…':'HASH NOT AVAILABLE'));
});
const whole=n=>Math.floor(n),clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(whole(x),whole(y),whole(w),whole(h));}
function text(str,x,y,sz=13,color='#ffffff',align='left'){
  ctx.font='bold '+sz+'px monospace';ctx.textAlign=align;ctx.fillStyle='#08121e';ctx.fillText(str,x+2,y+2);ctx.fillStyle=color;ctx.fillText(str,x,y);
}
function ellipse(rx,ry,color,line=0){
  ctx.beginPath();ctx.ellipse(482,270,rx,ry,-0.055,0,Math.PI*2);
  if(line){ctx.strokeStyle=color;ctx.lineWidth=line;ctx.stroke();}else{ctx.fillStyle=color;ctx.fill();}
}
function drawCourse(){
  rect(0,0,960,560,'#193d38');
  // Checker-pattern grass, grandstands, fences, infield.
  for(let y=0;y<560;y+=32)for(let x=0;x<960;x+=32)if((x+y)/32%2===0)rect(x,y,32,32,'#204b41');
  rect(75,18,810,35,'#17252e');for(let x=82;x<873;x+=12)rect(x,25,6,20,(x/12)%3<1?'#d5aa70':'#7c91a0');
  rect(75,507,810,30,'#142b37');for(let x=82;x<873;x+=20)rect(x,514,9,14,'#698f8e');
  ellipse(445,224,'#0d312d');ellipse(430,210,'#e4e7c9');ellipse(419,199,result.settings.going==='heavy'?'#674d37':result.settings.going==='soft'?'#88764b':'#a6aa74');
  ellipse(341,126,'#dddec0');ellipse(330,115,'#326247');
  ellipse(306,99,'#326247',3);
  for(let k=0;k<32;k++){const a=k*Math.PI*2/32;const x=482+377*Math.cos(a),y=270+160*Math.sin(a);rect(x,y,3,3,'#d6d9b5');}
  rect(403,218,152,60,'#142a32');text('FLEMINGTON',479,243,15,'#d4fb62','center');text('CUP CIRCUIT',479,263,12,'#b2d2be','center');
  // Synthetic 3200m finish line near the eastern bend.
  const fx=482+378*Math.cos(-.055),fy=270+160*Math.sin(-.055);
  ctx.save();ctx.translate(fx,fy);ctx.rotate(Math.PI/2-.055);
  for(let row=-2;row<2;row++)for(let col=-5;col<5;col++)rect(col*9,row*9,9,9,((row+col)&1)?'#171b24':'#f4f3de');
  ctx.restore();
  text('FINISH',835,212,12,'#ffdf89','center');
  text('MARIBYRNONG RIVER',45,477,10,'#8ccac4');
  text('PIXEL CIRCUIT / NOT TO SCALE',30,79,10,'#d2ddbe');
  text(result.settings.mode==='replay'?'ARCHIVAL RECONSTRUCTION':'ALTERNATE UNIVERSE',30,96,10,'#c7f586');
}
function horse(x,y,index,angle,watched,step){
  ctx.save();ctx.translate(whole(x),whole(y));ctx.rotate(angle);
  if(watched){ctx.strokeStyle='#fbfa99';ctx.lineWidth=2;ctx.strokeRect(-12,-11,25,23);}
  // Facing forward is +X: pixel pony + jockey with coloured silk, alternating legs.
  const silk=colors[index%colors.length];
  rect(-11,-4,16,9,'#392b2a');rect(3,-3,10,5,'#775143');rect(10,-5,6,4,'#9a7261');
  rect(-5,-6,7,5,silk);rect(-3,-9,4,3,'#fde6be');rect(-8,step?-8:4,3,6,'#ad7a60');rect(2,step?4:-8,3,6,'#ad7a60');
  rect(12,-4,3,2,'#15191d');ctx.restore();
}
function paint(){
  if(!result)return;
  drawCourse();
  const ordered=orderAt(result,tick);
  const ranked=new Map(ordered.map((r,i)=>[r.index,i]));
  const d=result.frames[tick];
  // Back-to-front: higher-ranked leaders drawn last.
  const sorted=[...ordered].reverse();
  for(const r of sorted){
    const angle=-.055+2*Math.PI*(d[r.index]/TRACK_CM),lane=(r.index%7)-3;
    const rx=377+lane*10,ry=160+lane*7;
    const x=482+rx*Math.cos(angle),y=270+ry*Math.sin(angle);
    const tangent=angle+Math.PI/2;
    const watched=r.name===result.settings.runner;
    horse(x,y,r.index,tangent,watched,(tick+r.index)%4<2);
    if(watched){text(r.name.slice(0,16).toUpperCase(),clamp(x,85,810),y-21,11,'#f1f9b4','center');}
    if(ranked.get(r.index)<3&&tick>0)text(String(ranked.get(r.index)+1),x,y-12,10,'#fbf7ee','center');
  }
  // Retro HUD overlay.
  rect(20,18,234,32,'#0a1926');text(result.settings.year+' CUP  ·  '+result.settings.going.toUpperCase(),30,39,14,'#eaff90');
  rect(722,18,217,32,'#0a1926');text(String(tick).padStart(3,'0')+'/'+LAST_TICK+' TICKS',734,39,13,'#ccefe6');
  if(tick===LAST_TICK){rect(335,458,290,37,'#0b1b28');text('★ RACE COMPLETE ★',480,483,18,'#fbe68e','center');}
}
function updateHUD(){
  if(!result)return;
  const rows=orderAt(result,tick),front=rows[0],metres=Math.floor(front.cm/100),percent=Math.floor(front.cm/TRACK_CM*100);
  $('distance').textContent=metres+' M';$('leader').textContent=front.name.toUpperCase();$('progress').textContent=percent+'%';
  $('playState').textContent=tick===LAST_TICK?'FINAL':playing?'RACING':'PAUSED';
  $('tickText').textContent=String(tick).padStart(3,'0')+' / '+LAST_TICK;$('seek').value=tick;
  const complete=tick===LAST_TICK,ordered=complete?[...rows].sort((a,b)=>(a.place??99)-(b.place??99)||a.index-b.index):rows;
  $('leaders').replaceChildren(...ordered.map((r,i)=>{
    const row=document.createElement('div');row.className='leader-row'+(r.name===result.settings.runner?' watched':'');
    const p=document.createElement('span');p.className='place';p.textContent=complete?(r.place==null?'DNF':String(r.place).padStart(2,'0')):String(i+1).padStart(2,'0');
    const n=document.createElement('span');n.className='name';n.textContent=r.name;
    const v=document.createElement('span');v.className='percent';v.textContent=complete?(r.status==='DNF'?'DID NOT FINISH':'FINAL'):Math.floor(r.cm/TRACK_CM*100)+'%';
    row.append(p,n,v);return row;
  }));
  let message;
  if(tick===0)message='THE RUNNERS ARE LOADING INTO THE BARRIER. GOOD LUCK IN THE PIXEL PADDOCK!';
  else if(complete)message=result.settings.mode==='replay'?'HISTORY HOLDS! '+result.archive.winner.toUpperCase()+' WINS THE '+result.settings.year+' CUP.':'CHECK THE PHOTO FINISH! '+ordered[0].name.toUpperCase()+' WINS THIS ALTERNATE TIMELINE.';
  else if(percent<25)message='AND THEY\'RE OFF! '+front.name.toUpperCase()+' SHOWS EARLY SPEED.';
  else if(percent<60)message='SETTLING INTO THE BACK STRETCH. '+front.name.toUpperCase()+' HAS THE ADVANTAGE.';
  else if(percent<85)message='THE FIELD IS TURNING FOR HOME! '+front.name.toUpperCase()+' LEADS THE CHARGE.';
  else message='HERE THEY COME! '+front.name.toUpperCase()+' IS OUT IN FRONT — THE LINE APPROACHES!';
  $('commentary').textContent=message;
}
function animate(stamp){
  if(playing&&result){
    if(!lastFrame)lastFrame=stamp;
    const delta=Math.min(100,stamp-lastFrame);lastFrame=stamp;accum+=delta;
    const interval=65/Number($('speed').value);
    const steps=Math.min(32,Math.floor(accum/interval));
    if(steps){accum-=steps*interval;tick=Math.min(LAST_TICK,tick+steps);paint();updateHUD();}
    if(tick>=LAST_TICK){playing=false;lastFrame=0;$('play').textContent='▶ RACE AGAIN';updateHUD();}
  }
  requestAnimationFrame(animate);
}
syncRunners();makeRace();requestAnimationFrame(animate);
