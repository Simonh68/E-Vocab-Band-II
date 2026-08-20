import fs from 'node:fs';
import path from 'node:path';
const here=path.dirname(new URL(import.meta.url).pathname);
const src=fs.readFileSync(path.join(here,'additional-stories.js'),'utf8');
const rows=[...src.matchAll(/^\+?\['([^']+)','([^']+)','([^']+)'/gm)].map(m=>({slug:m[1],title:m[2],he:m[3]}));
const out=path.join(here,'story-covers-v2');fs.mkdirSync(out,{recursive:true});
const palettes=[['#081827','#123b55','#59d5e8','#ffe26b'],['#10162a','#332f62','#9c8cff','#ffd166'],['#0d2021','#205b55','#63d6b0','#ffd76a'],['#251627','#653a64','#e78ed7','#ffd36a']];
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function symbols(slug,c3,c4){
 if(/helmet|bicycle|scooter|ride/.test(slug))return `<circle cx="330" cy="660" r="115" fill="none" stroke="${c3}" stroke-width="34"/><circle cx="750" cy="660" r="115" fill="none" stroke="${c3}" stroke-width="34"/><path d="M330 660l145-230 125 230m-125-230h190l85 230M510 350q105-125 210 0v62H510z" fill="none" stroke="${c4}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>`;
 if(/screen|video|feed|algorithm|attention|controls|edited-photograph|headline|message|computer/.test(slug))return `<rect x="300" y="285" width="486" height="570" rx="70" fill="none" stroke="${c3}" stroke-width="34"/><circle cx="543" cy="760" r="22" fill="${c4}"/><path d="M425 440h235M425 540h175M425 640h205" stroke="${c4}" stroke-width="34" stroke-linecap="round"/>`;
 if(/hospital|emergency|safety|workplace|whistleblower/.test(slug))return `<path d="M543 760C300 600 310 385 455 385c58 0 88 35 88 35s30-35 88-35c145 0 155 215-88 340z" fill="${c4}"/><path d="M300 820h486" stroke="${c3}" stroke-width="34" stroke-linecap="round"/><circle cx="543" cy="300" r="55" fill="${c3}"/>`;
 if(/water|waste|convenience|bottle/.test(slug))return `<path d="M543 260C430 425 355 520 355 660a188 188 0 00376 0c0-140-75-235-188-400z" fill="${c3}"/><path d="M425 680q118 95 236 0" fill="none" stroke="${c4}" stroke-width="32" stroke-linecap="round"/>`;
 if(/team|group|sports|community|public|volunteer|visit/.test(slug))return `<circle cx="390" cy="400" r="82" fill="${c3}"/><circle cx="696" cy="400" r="82" fill="${c4}"/><circle cx="543" cy="650" r="82" fill="${c3}"/><path d="M455 455l55 110m120-110l-55 110M470 650h146" stroke="${c4}" stroke-width="30" stroke-linecap="round"/>`;
 if(/notebook|homework|project|answer|report|survey|letter|application|evidence|consent|credit|idea/.test(slug))return `<path d="M315 305h455v570H315z" fill="none" stroke="${c3}" stroke-width="34"/><path d="M410 450h265M410 555h265M410 660h170" stroke="${c4}" stroke-width="32" stroke-linecap="round"/><circle cx="700" cy="745" r="70" fill="${c4}"/>`;
 if(/job|shift|budget|solution|conflict|selection/.test(slug))return `<rect x="305" y="390" width="476" height="390" rx="45" fill="none" stroke="${c3}" stroke-width="34"/><path d="M430 390v-90h226v90M305 535h476" fill="none" stroke="${c4}" stroke-width="34"/><circle cx="543" cy="535" r="28" fill="${c4}"/>`;
 if(/pet/.test(slug))return `<circle cx="543" cy="600" r="180" fill="${c3}"/><circle cx="420" cy="390" r="70" fill="${c4}"/><circle cx="665" cy="390" r="70" fill="${c4}"/><circle cx="485" cy="585" r="22" fill="#081827"/><circle cx="600" cy="585" r="22" fill="#081827"/><path d="M505 670q38 35 76 0" fill="none" stroke="#081827" stroke-width="24"/>`;
 return `<circle cx="543" cy="555" r="245" fill="none" stroke="${c3}" stroke-width="38"/><path d="M405 555l92 92 190-215" fill="none" stroke="${c4}" stroke-width="42" stroke-linecap="round" stroke-linejoin="round"/>`;
}
rows.forEach((r,i)=>{const p=palettes[i%palettes.length];const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440" role="img" aria-label="${esc(r.title)}"><rect width="1080" height="1440" rx="72" fill="${p[0]}"/><circle cx="160" cy="180" r="360" fill="${p[1]}" opacity=".72"/><circle cx="940" cy="1130" r="430" fill="${p[1]}" opacity=".45"/><g transform="translate(0 155)">${symbols(r.slug,p[2],p[3])}</g></svg>`;fs.writeFileSync(path.join(out,`simple-${r.slug}.svg`),svg);});
console.log(`generated ${rows.length} simple covers`);
