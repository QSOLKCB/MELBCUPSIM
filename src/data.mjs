// Source-backed final placings; names are identifiers, NOT licensed footage or telemetry.
// 2025 includes a documented dead heat at 16th; 2023 includes a DNF.
export const ARCHIVE = Object.freeze({
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
