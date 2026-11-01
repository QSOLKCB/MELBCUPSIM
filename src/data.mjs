// Source-backed final placings; names are identifiers, NOT licensed footage or telemetry.
// 2025 includes a documented dead heat at 16th; 2023 includes a DNF.
// Partial podium exhibits never imply a three-runner historical field.
export const ARCHIVE = Object.freeze({
  1861: {"date":"1861-11-07","title":"ARCHER WINS THE CUP","winner":"Archer","coverage":"podium","fieldSize":17,"source":"https://www.agriculture.gov.au/sites/default/files/documents/flemington.pdf","sourceLabel":"Australian Heritage Database","secondarySource":"https://www.nma.gov.au/defining-moments/resources/melbourne-cup","names":["Archer","Mormon","Prince"],"places":[1,2,3],"status":[]},
  1930: {"date":"1930-11-04","title":"PHAR LAP WINS THE CUP","winner":"Phar Lap","coverage":"podium","fieldSize":15,"source":"https://www.racingandsports.com.au/news/racing/melbourne-cup/0001-01-01/previous-melbourne-cup-winners/670826","sourceLabel":"Racing and Sports","secondarySource":"https://www.vrc.com.au/racing/melbourne-cup-winners-honour-roll/1921-1940/","names":["Phar Lap","Second Wind","Shadow King"],"places":[1,2,3],"status":[]},
  1983: {"date":"1983-11-01","title":"KIWI WINS THE CUP","winner":"Kiwi","coverage":"podium","fieldSize":24,"source":"https://www.vrc.com.au/racing/group-1-honour-board/","sourceLabel":"Victoria Racing Club","secondarySource":"https://www.vrc.com.au/latest-news/magical-milestones-kiwi/","names":["Kiwi","Noble Comment","Mr. Jazz"],"places":[1,2,3],"status":[]},
  1987: {"date":"1987-11-03","title":"KENSEI WINS THE CUP","winner":"Kensei","coverage":"podium","fieldSize":21,"source":"https://www.races.com.au/melbourne-cup/melbourne-cup-history/past-winners/1981-to-1990-melbourne-cup/","sourceLabel":"Races.com.au","secondarySource":"https://www.vrc.com.au/racing/melbourne-cup-winners-honour-roll/1981-2000/","names":["Kensei","Empire Rose","Rosedale"],"places":[1,2,3],"status":[]},
  1988: {"date":"1988-11-01","title":"EMPIRE ROSE WINS THE CUP","winner":"Empire Rose","coverage":"full","fieldSize":22,"source":"https://en.wikipedia.org/wiki/1988_Melbourne_Cup","sourceLabel":"1988 Melbourne Cup · published full field","secondarySource":"https://www.vrc.com.au/racing/melbourne-cup-winners-honour-roll/1981-2000/","names":["Empire Rose","Natski","Na Botto","Apollo Run","Round The World","Banderol","Ideal Centeman","Mr. Bunnythorpe","Full At Last","Kensei","Our Classic Boy","Tawrrific","Shantaroun","Copatonic","Secret Seal","Congressman","It's Candide","Algonquin Club","Authaal","Lord Hybrow","Balciano","Might"],"places":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],"status":[]},
  1989: {"date":"1989-11-07","title":"TAWRRIFIC WINS THE CUP","winner":"Tawrrific","coverage":"podium","fieldSize":23,"source":"https://www.races.com.au/melbourne-cup/melbourne-cup-history/past-winners/1981-to-1990-melbourne-cup/","sourceLabel":"Races.com.au","secondarySource":"https://www.vrc.com.au/racing/melbourne-cup-winners-honour-roll/1981-2000/","names":["Tawrrific","Super Impose","Kudz"],"places":[1,2,3],"status":[]},
  1990: {"date":"1990-11-06","title":"KINGSTON RULE WINS THE CUP","winner":"Kingston Rule","coverage":"podium","fieldSize":24,"source":"https://www.racingandsports.com.au/news/racing/melbourne-cup/0001-01-01/previous-melbourne-cup-winners/670826","sourceLabel":"Racing and Sports","secondarySource":"https://www.vrc.com.au/racing/melbourne-cup-winners-honour-roll/1981-2000/","names":["Kingston Rule","The Phantom","Mr Brooker"],"places":[1,2,3],"status":[]},
  2005: {"date":"2005-11-01","title":"MAKYBE DIVA WINS THE CUP","winner":"Makybe Diva","coverage":"full","fieldSize":24,"source":"https://www.furlongfiles.com/melbourne-cup/results/?cup=2005","sourceLabel":"Furlong Files · 2005 full result","secondarySource":"https://www.vrc.com.au/racing/melbourne-cup-winners-honour-roll/2001-2020/","names":["Makybe Diva","On A Jeune","Xcellent","Leica Falcon","Lachlan River","Portland Singa","Envoy","Vinnie Roe","Kindjhal","Rizon","Dizelle","Eye Popper","Demerger","Railings","Vouvray","Kamsky","Greys Inn","Strasbourg","Distinction","Umbula","Hugs Dancer","Bazelle","Mr Celebrity","Franklins Gardens"],"places":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"status":[]},

  2025: {
    date:'2025-11-04', title:'HALF YOURS TAKES THE CUP', winner:'Half Yours',
    source:'https://www.abc.net.au/news/2025-11-01/melbourne-cup-2025-field-horses-form-guide-and-betting/105895400',
    sourceLabel:'ABC News · 2025 field and finishing order',
    names:["Half Yours","Goodie Two Shoes","Middle Earth","River Of Stars","Torranzino","Vauban","Al Riffa","Absurde","Changingoftheguard","Meydaan","Furthur","Arapaho","Flatten The Curve","Smokin' Romans","Royal Supremacy","Onesmoothoperator","Valiant King","More Felons","Presage Nocturne","Parchment Party","Athabascan","Land Legend","Chevalier Rose","Buckaroo"],
    places:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,16,18,19,20,21,22,23,24],
    status:[]
  },
  2024: {
    date:'2024-11-05', title:"KNIGHT'S CHOICE AT THE POST", winner:"Knight's Choice",
    source:'https://www.abc.net.au/news/2024-11-05/melbourne-cup-2024-finishing-order-from-first-to-last/104557894',
    sourceLabel:'ABC News · 2024 finishing order',
    names:["Knight's Choice","Warp Speed","Okita Soushi","Zardozi","Absurde","Circle Of Fire","Fancy Man","Land Legend","Buckaroo","Kovalica","Vauban","Onesmoothoperator","Valiant King","Sea King","Interpretation","Sharp 'N' Smart","Trust In You","Mostly Cloudy","Manzoice","Positivity","The Map","Saint George","Just Fine"],
    places:Array.from({length:23},(_,i)=>i+1), status:[]
  },
  2023: {
    date:'2023-11-07', title:'WITHOUT A FIGHT WINS', winner:'Without A Fight',
    source:'https://www.abc.net.au/news/2023-11-07/melbourne-cup-2023-finishing-order-from-first-to-last/103073154',
    sourceLabel:'ABC News · 2023 finishing order and DNF',
    names:["Without A Fight","Soulcombe","Sheraz","Ashrun","Daqiansweet Junior","Interpretation","Absurde","True Marvel","Vow And Declare","Military Mission","Okita Soushi","More Felons","Lastotchka","Vauban","Future History","Breakup","Gold Trip","Virtuous Circle","Serpentine","Kalapour","Alenquer","Magical Lagoon","Right You Are"],
    places:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,null],
    status:[]
  }
});
export function getArchive(year){
  const race=ARCHIVE[Number(year)];
  if(!race) throw new RangeError('Unsupported historical year');
  return race;
}
