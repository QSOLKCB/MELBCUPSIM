// Run with: node --test tests/*.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {buildRace,canonicalRace,normalise,orderAt,TRACK_CM,LAST_TICK} from '../src/engine.mjs';
import {getArchive} from '../src/data.mjs';
test('all three years contain the sourced outcome, including a 2025 dead heat and a 2023 DNF',()=>{
  for(const y of [2023,2024,2025]){
    const x=buildRace({year:y,mode:'replay',seed:'one'});
    assert.equal(x.placings.length,getArchive(y).names.length);
    assert.deepEqual(x.placings.map(p=>p.place),getArchive(y).places);
    assert.equal(x.frames.length,LAST_TICK+1);
    assert.equal(x.placings[0].place,1);
  }
  assert.equal(buildRace({year:2023}).placings.at(-1).status,'DNF');
  const x=buildRace({year:2025}).placings;
  assert.equal(x[15].place,16);assert.equal(x[16].place,16);
});
test('same seed/config yields byte-identical timelines across runs',()=>{
  const cfg={year:2024,mode:'whatif',seed:'Trent/hello',going:'heavy',strategy:-1,runner:"Knight's Choice"};
  assert.equal(canonicalRace(buildRace(cfg)),canonicalRace(buildRace(cfg)));
});
test('seed changes change the what-if timeline, but never sourced replay places',()=>{
  const a=buildRace({year:2025,mode:'whatif',seed:'A'});
  const b=buildRace({year:2025,mode:'whatif',seed:'B'});
  assert.notEqual(canonicalRace(a),canonicalRace(b));
  for(const year of [2023,2024,2025]){
    const c=buildRace({year,mode:'replay',seed:'A'});
    const d=buildRace({year,mode:'replay',seed:'B'});
    assert.deepEqual(c.placings,d.placings);
  }
});
test('all centimetre positions are integer, bounded and monotonic',()=>{
  for(const mode of ['replay','whatif'])for(const year of [2023,2024,2025]){
    const x=buildRace({year,mode,going:'heavy',seed:'evidence'});
    for(let t=1;t<x.frames.length;t++){
      x.frames[t].forEach((cm,i)=>{
        assert.ok(Number.isInteger(cm)&&cm>=0&&cm<=TRACK_CM);
        assert.ok(cm>=x.frames[t-1][i]);
      });
    }
    assert.equal(orderAt(x,0).length,x.archive.names.length);
  }
});
test('invalid settings are bounded and no arbitrary years are accepted',()=>{
  assert.equal(normalise({mode:'bad',strategy:500,seed:'x'.repeat(300)}).strategy,0);
  assert.equal(normalise({seed:'x'.repeat(300)}).seed.length,64);
  assert.throws(()=>normalise({year:2026}),RangeError);
});
test('what-if finishers place uniquely and all runners eventually finish',()=>{
  for(const year of [2023,2024,2025]){
    const x=buildRace({year,mode:'whatif',going:'heavy',seed:'edge'});
    const sorted=x.placings.map(p=>p.place).sort((a,b)=>a-b);
    assert.deepEqual(sorted,Array.from({length:sorted.length},(_,i)=>i+1));
    assert.ok(x.frames.at(-1).every(cm=>cm===TRACK_CM));
  }
});

test('spectator selection alone cannot change motion or finish; tactics affect only selected horse',()=>{
  const a=buildRace({year:2025,mode:'whatif',seed:'isolation',runner:'Half Yours',strategy:0});
  const b=buildRace({year:2025,mode:'whatif',seed:'isolation',runner:'Goodie Two Shoes',strategy:0});
  assert.deepEqual(a.frames,b.frames);
  assert.deepEqual(a.placings,b.placings);
  const aggressive=buildRace({year:2025,mode:'whatif',seed:'isolation',runner:'Half Yours',strategy:1});
  for(let j=1;j<a.archive.names.length;j++){
    assert.deepEqual(aggressive.frames.map(f=>f[j]),a.frames.map(f=>f[j]));
  }
});
