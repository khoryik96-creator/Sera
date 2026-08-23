import './styles.css';
import rawDB from './data.json';
import type { Database } from './types';

const DB = rawDB as unknown as Database;

const characterImageMap: Record<string, string> = {
  "sera": "/assets/sera.jpg",
  "rhen": "/assets/rhen.jpg",
  "arin": "/assets/arin.jpg",
  "liang": "/assets/liang.jpg",
  "kael": "/assets/kael.jpg",
  "jin": "/assets/jin.jpg",
  "lei": "/assets/lei.jpg",
  "rui": "/assets/rui.jpg",
  "qin": "/assets/qin.jpg",
  "han": "/assets/han.jpg",
  "ilyra": "/assets/ilyra.jpg",
  "mo": "/assets/mo.jpg",
  "yun": "/assets/yun.jpg",
  "wen": "/assets/wen.jpg"
};
const characterExtraImages: Record<string, string[]> = {
  "sera": [
    "/assets/sera-extra-1.jpg",
    "/assets/sera-extra-2.jpg",
    "/assets/sera-extra-3.jpg"
  ]
};

const colorKeyMap={
  rhen:"rhen",sera:"sera",kael:"kael",liang:"liang",jin:"jin",lei:"lei",rui:"rui",qin:"qin",han:"han",arin:"arin",wen:"luo",luo:"luo",
  mo:"mo",yun:"yun",mu:"mu",seo:"seo",tae:"tae",gu:"gu",huo:"huo",
  wei:"wei",ji:"ji",cao:"cao",ye:"ye",zhao:"zhao",lin:"lin",yan:"yan",meizhen:"meizhen",yunke:"yunke",gaoren:"gaoren",shufen:"shufen",baotien:"baotien",
  meilin:"meilin",song:"song",shiyue:"shiyue",nam:"nam",chun:"chun",haejin:"haejin",gwon:"gwon",daemun:"daemun",baek:"baek",gong:"gong",
  jiang:"jiang",duan:"duan",mi:"mi",qiu:"qiu",zhao_renkai:"zhao_renkai",
  ren:"ren",qiao:"qiao",miri:"miri",
  flowerseller:"neutral",girl:"neutral",novice:"neutral",covenant:"neutral",duchess:"neutral",soldier:"neutral",opponent:"neutral",captain:"neutral",lieutenant:"neutral",attacker:"neutral",messenger:"neutral",
  sorin:"sorin", valeria:"valeria", draven:"draven", ilyra:"ilyra", aurel:"aurel", vaelor:"vaelor",
  orun:"orun", iscaryn:"iscaryn", rhavenn:"rhavenn", tor:"tor", caedros:"caedros", varesh:"varesh", amon:"amon", aethon:"aethon"
};
const nameMap=[
  ["Kael Veyran","kael"],["Liang Yue","liang"],["Jin Seoryu","jin"],["Lei Zhen","lei"],["Shen Rui","rui"],["Qin Luo","qin"],
  ["Han Myeong","han"],["Arin Vale","arin"],["Luo Wen","luo"],
  ["Jian Ruo","former"],["Xu Weng","former"],["Mo Qian","former"],["Yeon Hwa","former"],
  ["Wei Zhen","wei"],["Ji Wuye","ji"],["Cao Tian","cao"],["Ye Mo","ye"],
  ["Zhao Keshan","zhao"],["Lin Yao","lin"],["Yan Shou","yan"],["Mei Zhen","meizhen"],["Yun Ke","yunke"],["Gao Ren","gaoren"],["Shu Fen","shufen"],["Bao Tien","baotien"],["Jian Meilin","meilin"],["Song Qiren","song"],["Yun Shiyue","shiyue"],["Huo Wujin","huo"],
  ["Nam Gyeol","nam"],["Chun Baek","chun"],["Seo Haejin","haejin"],["Gwon Myeong","gwon"],["Dae Mun","daemun"],["Mun Daeho","daemun"],["Baek Cheon","baek"],["Gong Seok","gong"],
  ["Jiang Taixuan","jiang"],["Duan He","duan"],["Mi Suyun","mi"],["Qiu Shen","qiu"],["Zhao Renkai","zhao_renkai"],
  ["Mo Qingzhao","mo"],["Yun Shizhen","yun"],["Mu Gyeong","mu"],["Seo Mujin","seo"],["Tae Muyeon","tae"],["Gu Xian","gu"],["Ren Qiao","ren"],["Qiao Ren","qiao"],["Jae Miri","miri"],
  ["Sorin Vael","sorin"],["Valeria Nox","valeria"],["Draven Sol","draven"],["Ilyra Serath","ilyra"],["Aurel Veyr","aurel"],["Vaelor Veyr","vaelor"],["Mo","mo"],["Yun","yun"],["Rhen","rhen"],["Sera","sera"],["Kael","kael"],["Liang","liang"],["Jin","jin"],["Lei","lei"],["Rui","rui"],["Qin","qin"],["Han","han"],["Arin","arin"],["Luo","luo"],["Wei","wei"],["Orun Vhal","orun"],["Iscaryn Voss","iscaryn"],["Rhavenn Korr","rhavenn"],["Tor Veydan","tor"],["Caedros Marr","caedros"],["Varesh Nhal","varesh"],["Amon Serath","amon"],["Aethon Vael","aethon"],["Ilyra","ilyra"],["Orun","orun"],["Iscaryn","iscaryn"],["Rhavenn","rhavenn"],["Tor","tor"],["Caedros","caedros"],["Varesh","varesh"],["Amon","amon"],["Aethon","aethon"]].sort((a,b)=>b[0].length-a[0].length);

const rankLabelMap={
  "Kael Veyran":"#1","Kael":"#1",
  "Liang Yue":"#2","Liang":"#2",
  "Jin Seoryu":"#3","Jin":"#3",
  "Lei Zhen":"#4","Lei":"#4",
  "Shen Rui":"#5","Rui":"#5",
  "Sera":"Former #6",
  "Mo Qingzhao":"#7","Mo":"#7",
  "Arin Vale":"#8","Arin":"#8",
  "Luo Wen":"#9","Luo":"#9",
  "Yun Shizhen":"#10","Yun":"#10",
  "Qin Luo":"Former #6","Qin":"Former #6",
  "Han Myeong":"Former #8","Han":"Former #8",
  "Jian Ruo":"Former #1",
  "Xu Weng":"Former #3",
  "Mo Qian":"Former #5",
  "Yeon Hwa":"Former #6",
  "Wei Zhen":"Former #5","Wei":"Former #5",
  "Ilyra Serath":"#6","Ilyra":"#6",
  "Orun Vhal":"VII",
  "Orun":"VII",
  "Iscaryn Voss":"VI",
  "Iscaryn":"VI",
  "Rhavenn Korr":"V",
  "Rhavenn":"V",
  "Tor Veydan":"IV",
  "Tor":"IV",
  "Caedros Marr":"III",
  "Caedros":"III",
  "Varesh Nhal":"II",
  "Varesh":"II",
  "Amon Serath":"I",
  "Amon":"I",
  "Aethon Vael":"OL",
  "Aethon":"OL"
};

function escRe(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function annotateDialogue(text){
  return String(text||"").split("\n").map(line=>{
    const m=line.match(/^\[\[speaker:([a-z0-9_]+)\]\](.*)$/);
    if(!m) return line;
    const key=colorKeyMap[m[1]]||m[1];
    return `<span class="novel-dialogue character-${key}">${m[2]}</span>`;
  }).join("\n");
}
function annotateSkills(text){
  let out=String(text||"");
  // Preserve authored gold spans.
  out=out.replace(/(^|\n)(✦\s*)?(SUPREME PASSIVE ART|SUPREME ART|TRANSCENDED SKILL|TRANSCENDED ART|ULTIMATE ART)\s*[—-]\s*([^\n<]+)/gi,(m,prefix,star,t,name)=>
    `${prefix}<span class="novel-skill-supreme"><strong>✦ ${t.toUpperCase()} — ${name.trim()}</strong></span>`);
  const known=["The Orchid Blooms Only Once"];
  known.forEach(n=>{
    const re=new RegExp("(^|\\n)(?:✦\\s*)?"+escRe(n)+"(?=\\n|$|\\.)","gi");
    out=out.replace(re,(m,p)=>`${p}<span class="novel-skill-supreme"><strong>✦ SUPREME ART — ${n}</strong></span>`);
  });
  out=out.replace(/(^|\n)✦ TECHNIQUE\s*[—-]\s*([^\n<]+)/gi,(m,p,name)=>`${p}<span class="novel-skill-callout"><strong>✦ TECHNIQUE — ${name.trim()}</strong></span>`);
  return out;
}
function rankForStory(name,season){
  if(!season) return rankLabelMap[name]||"";
  const aliases={Sera:"Sera","Ilyra Serath":"Ilyra","Ilyra":"Ilyra","Mo Qingzhao":"Mo","Mo":"Mo","Arin Vale":"Arin","Arin":"Arin","Luo Wen":"Luo","Luo":"Luo","Yun Shizhen":"Yun","Yun":"Yun"};
  const n=aliases[name]||name;
  const ancientRanks={"Orun Vhal":"VII","Orun":"VII","Iscaryn Voss":"VI","Iscaryn":"VI","Rhavenn Korr":"V","Rhavenn":"V","Tor Veydan":"IV","Tor":"IV","Caedros Marr":"III","Caedros":"III","Varesh Nhal":"II","Varesh":"II","Amon Serath":"I","Amon":"I","Aethon Vael":"OL","Aethon":"OL"};
  if(ancientRanks[name]) return ancientRanks[name];
  if(n==="Sera"){ if(season<=22)return "#7"; if(season<=43)return "#6"; return "Former #6"; }
  if(n==="Ilyra"){ return season<44 ? "" : "#6"; }
  if(n==="Mo"){ return season<=22 ? "" : "#7"; }
  if(n==="Arin"){ return season<=22 ? "#9" : "#8"; }
  if(n==="Luo"){ return season<=22 ? "" : "#9"; }
  if(n==="Yun"){ return season<=22 ? "" : "#10"; }
  return rankLabelMap[name]||"";
}
function annotateNamesForSeason(text,season){
  let out=String(text||"");
  const held=[];
  out=out.replace(/<span[\s\S]*?<\/span>/g,m=>{const t=`@@SPAN${held.length}@@`;held.push(m);return t;});
  const placeholders=[];
  nameMap.forEach(([name,key])=>{
    const re=new RegExp("\\b"+escRe(name)+"\\b","g");
    out=out.replace(re,(match,offset,source)=>{
      const before=source.slice(Math.max(0,offset-28),offset);
      const alreadyRanked=/(?:Former\s+)?#\d+\s*(?:—|-)?\s*$/.test(before);
      const rank=rankForStory(name,season);
      const display=(rank&&!alreadyRanked)?`${rank} - ${name}`:name;
      const t=`@@NAME${placeholders.length}@@`;
      placeholders.push(`<span class="novel-character-name character-${key}">${display}</span>`);
      return t;
    });
  });
  placeholders.forEach((v,i)=>out=out.replaceAll(`@@NAME${i}@@`,v));
  held.forEach((v,i)=>out=out.replaceAll(`@@SPAN${i}@@`,v));
  return out;
}
function renderNovel(text,season?){return annotateNamesForSeason(annotateSkills(annotateDialogue(text)),season);}



let currentCharacterKey="sera";
function displayRank(c){
  const m=String(c.name||"").match(/^(Former\s+)?#\d+/);
  if(m)return m[0].replace("Former ","F");
  if((c.name||"").toLowerCase().includes("rhen"))return "UNR";
  return "";
}
function characterInitial(c){
  const n=String(c.name||"").replace(/^(Former\s+)?#\d+\s*[-–—]\s*/,"").trim();
  return n.split(/\s+/).map(x=>x[0]).join("").slice(0,2).toUpperCase();
}
const charOrder=["rhen","kael","liang","jin","lei","rui","ilyra","sera","mo","arin","wen","yun","qin","han"];
function renderCharacterButtons(q=""){
  const lower=q.toLowerCase();
  const rows=charOrder.filter(k=>JSON.stringify(DB.characters[k]).toLowerCase().includes(lower));
  document.getElementById("characterButtons").innerHTML=rows.map(k=>{
    const c=DB.characters[k], color=colorKeyMap[k]||k;
    const active=k===currentCharacterKey?" active":"";
    const img=characterImageMap[k];
    return `<button class="char-nav-item${active}" data-char="${k}" onclick="renderCharacter('${k}')">
      <span class="char-avatar">${img?`<img src="${img}" alt="${c.name}">`:characterInitial(c)}</span>
      <span class="char-nav-copy"><span class="char-nav-name character-${color}">${c.name.replace(/^(Former\s+)?#\d+\s*[-–—]\s*/,"")}</span><span class="char-nav-sub">${c.subtitle}</span></span>
      <span class="char-nav-rank">${displayRank(c)}</span>
    </button>`;
  }).join("");
}



function showSeraPortrait(index,_btn){
  const pics=window.__seraPortraits||[];
  const main=document.getElementById("seraOnlyPortrait") as HTMLImageElement | null;
  if(!main || !pics[index]) return;
  main.src=pics[index];
  document.querySelectorAll(".sera-v101-thumb").forEach((x,i)=>x.classList.toggle("active",i===index));
  const count=document.getElementById("seraV101Count");
  if(count) count.textContent=`${index+1} / ${pics.length}`;
}
function renderCharacter(key){
  const c=DB.characters[key]; if(!c)return;
  currentCharacterKey=key;
  renderCharacterButtons((document.getElementById("search") as HTMLInputElement | null)?.value||"");
  const color=colorKeyMap[key]||key;
  const img=characterImageMap[key];
  const coreFields=["identity","reputation","relationship","motif"];
  const detailFields=["appearance","personality","background","legend"];
  const quote=key==="sera"
    ?"She was the Pale Orchid the world feared. Yet in Second Spring, she was simply Sera."
    :key==="rhen"
      ?"The world called him the Petals Monarch. He still preferred a quiet table and tea."
      :(c.legend||c.reputation||c.identity||"").split(".")[0]+".";
  const extras=characterExtraImages[key]||[];
  let visual="";
  if(img){
    if(key==="sera"){
      const gallery=[img,...extras];
      window.__seraPortraits=gallery;
      visual=`<div class="profile-visual sera-v101-gallery">
        <div class="sera-v101-stage">
          <img id="seraOnlyPortrait" src="${gallery[0]}" alt="${c.name} portrait">
        </div>
        <div class="sera-v101-controls">
          ${gallery.map((src,i)=>`<button type="button" class="sera-v101-thumb${i===0?" active":""}" onclick="showSeraPortrait(${i},this)" aria-label="Show Sera portrait ${i+1}">
            <img src="${src}" alt="Sera portrait ${i+1} thumbnail">
          </button>`).join("")}
          <span id="seraV101Count">1 / ${gallery.length}</span>
        </div>
      </div>`;
    } else {
      visual=`<div class="profile-visual"><img id="profileMainImage" src="${img}" alt="${c.name} portrait"></div>`;
    }
  } else {
    visual=`<div class="profile-visual"><div class="profile-placeholder"><div class="sigil character-${color}">${characterInitial(c)}</div></div></div>`;
  }
  const facts=[
    ["STATUS",c.subtitle],
    ["IDENTITY",c.identity],
    ["REPUTATION",c.reputation],
    ["RELATIONSHIP",c.relationship]
  ].filter(x=>x[1]);
  document.getElementById("charDetail").innerHTML=`
    <div class="profile-hero">
      <div class="profile-copy">
        <div class="profile-overline">CHARACTER PROFILE</div>
        <h2 class="profile-name character-${color}">${c.name.replace(/^(Former\s+)?#\d+\s*[-–—]\s*/,"")}</h2>
        <div class="profile-subtitle">${c.subtitle}</div>
        <div class="profile-tags">${(c.tags||[]).map(t=>`<span class="badge">${t}</span>`).join("")}</div>
        <div class="profile-quote">“${quote.replace(/^“|”$/g,"")}”</div>
        <div class="profile-facts">${facts.map(([k,v])=>`<div class="fact-row"><div class="fact-key">${k}</div><div class="fact-value">${v}</div></div>`).join("")}</div>
      </div>
      ${visual}
    </div>
    <div class="profile-summary-grid">
      ${coreFields.map(f=>c[f]?`<div class="summary-tile"><h4>${f}</h4><p>${c[f]}</p></div>`:"").join("")}
    </div>
    <div class="profile-details">
      <div class="detail-grid">${detailFields.map(f=>c[f]?`<div class="detail-block"><h4>${f[0].toUpperCase()+f.slice(1)}</h4><p>${c[f]}</p></div>`:"").join("")}</div>
    </div>`;
  const wrap=document.getElementById("topCharacterSkillsWrap");
  const rows=DB.topSkills[key];
  if(rows){
    wrap.classList.remove("hidden");
    document.getElementById("topSkillTitle").textContent=`${c.name} — Signature Martial Arts`;
    document.getElementById("topSkillTable").innerHTML=`<thead><tr><th>#</th><th>Technique</th><th>Category</th><th>Signature</th><th>Rating</th><th>Description</th></tr></thead><tbody>${rows.map((s,i)=>`<tr><td><span class="badge">${i===rows.length-1?"Ω":String(i+1).padStart(2,"0")}</span></td><td><strong>${s[0]}</strong></td><td>${s[1]}</td><td style="color:var(--gold)">${s[2]}</td><td class="rating">${s[3]}</td><td>${s[4]}</td></tr>`).join("")}</tbody>`;
  } else wrap.classList.add("hidden");
  const seraWrap=document.getElementById("seraSkillsWrap");
  if(key==="sera"){seraWrap.classList.remove("hidden");renderSeraSkills();} else seraWrap.classList.add("hidden");
  renderCharacterLegends(key);
}
function renderCharacterLegends(key){
  const labelMap={rhen:"Rhen",kael:"Kael",liang:"Liang",jin:"Jin",lei:"Lei",rui:"Rui",qin:"Qin",sera:"Sera",ilyra:"Ilyra",han:"Han",arin:"Arin",wen:"Luo"};
  const n=labelMap[key]||"";
  const items=n?DB.legends.filter(l=>l.rank.toLowerCase().includes(n.toLowerCase())):[];
  document.getElementById("characterLegendList").innerHTML=items.length?items.map(legendCard).join(""):`<div class="card muted">No dedicated legend entry yet.</div>`;
}
function renderArcFigures(q=""){
  const lower=q.toLowerCase();
  const mainFigureKeys=new Set(["mo_qingzhao","yun_shizhen","ilyra_serath"]);
  const arr=DB.arcFigures.filter(x=>!mainFigureKeys.has(x.key)&&JSON.stringify(x).toLowerCase().includes(lower));
  document.getElementById("arcFigureGrid").innerHTML=arr.map(x=>{
    const skills=x.skills||[];
    const first=x.firstSeason?`<span class="badge">FIRST: S${x.firstSeason}E${x.firstEpisode}</span><span class="badge">${x.firstArc}</span>`:"";
    return `<details class="card arc-figure character-${x.key}">
      <summary>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">${first}</div>
        <h3 style="margin:6px 0">${x.name}</h3>
        <p class="muted" style="margin:0">${x.subtitle}</p>
        <div class="muted" style="margin-top:8px">Click to expand profile, first appearance and skills ▾</div>
      </summary>
      <div class="skill-body">
        ${x.firstSeason?`<div class="detail-block"><h4>First Appearance</h4><p><strong>${x.firstArc}</strong> · Season ${x.firstSeason}, Episode ${x.firstEpisode} — ${x.firstEpisodeTitle}</p></div>`:""}
        <div class="detail-block"><h4>Profile / Threat Record</h4><p>${x.details}</p></div>
        ${skills.length?`<h4 style="color:var(--text);margin:14px 0 8px">Skills / Martial Systems</h4>
        <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;min-width:650px">
          <thead><tr><th>#</th><th>Technique / System</th><th>Category</th><th>Description</th></tr></thead>
          <tbody>${skills.map((sk,i)=>`<tr><td><span class="badge">${String(i+1).padStart(2,"0")}</span></td><td><strong class="character-${x.key}">${sk[0]}</strong></td><td>${sk[1]}</td><td>${sk[2]}</td></tr>`).join("")}</tbody>
        </table></div>`:"<p class='muted'>No named martial system has been recorded.</p>"}
      </div>
    </details>`;
  }).join("");
}

function skillCard(s){
  const tier=(s.tier||"").toLowerCase();
  const cls=tier.includes("ultimate")?"ultimate":tier.includes("supreme")?"supreme":tier.includes("transcended")?"transcended":"";
  const mark=tier.includes("ultimate")?"Ω":tier.includes("supreme")?"✦":tier.includes("transcended")?"◆":"";
  return `<details class="card skill ${cls}"><summary><h3>${mark?`<span class="skill-tier-mark">${mark}</span> `:""}${s.name}</h3><span class="badge">${s.category}</span><span class="badge">${s.tier}</span>${s.reveal?`<span class="badge">${s.reveal}</span>`:""}<span class="rating">${s.rating||"—"}</span></summary><div class="skill-body"><p><strong>Signature:</strong> <span style="color:var(--gold)">${s.signature||"—"}</span></p><p>${s.short||""}</p><div class="detail-grid"><div class="detail-block"><h4>Combat Category</h4><p>${s.category}</p></div><div class="detail-block"><h4>Power Tier</h4><p>${s.tier}</p></div>${s.reveal?`<div class="detail-block"><h4>Novel Reveal</h4><p>${s.reveal}</p></div>`:""}<div class="detail-block"><h4>Mechanics</h4><p>${s.mechanics||"—"}</p></div><div class="detail-block"><h4>Visual</h4><p>${s.visual||"—"}</p></div><div class="detail-block"><h4>Lore</h4><p>${s.lore||"—"}</p></div></div></div></details>`;
}
function renderSkills(q=""){
  const lower=q.toLowerCase(), arr=DB.rhenSkills.filter(s=>JSON.stringify(s).toLowerCase().includes(lower));
  const tierMark=s=>{
    const tier=(s.tier||"").toLowerCase();
    if(tier.includes("ultimate")) return "Ω";
    if(tier.includes("supreme")) return "✦";
    if(tier.includes("transcended")) return "◆";
    const i=DB.rhenSkills.indexOf(s);
    return String(i+1).padStart(2,"0");
  };
  document.getElementById("skillTable").innerHTML=`<thead><tr><th>Tier</th><th>Technique</th><th>Combat Category</th><th>Power Tier</th><th>Novel Reveal</th><th>Signature</th><th>Rating</th></tr></thead><tbody>${arr.map(s=>`<tr><td><span class="badge">${tierMark(s)}</span></td><td><strong>${s.name}</strong></td><td>${s.category}</td><td>${s.tier}</td><td>${s.reveal||"—"}</td><td style="color:var(--gold)">${s.signature||"—"}</td><td class="rating">${s.rating||"—"}</td></tr>`).join("")}</tbody>`;
  document.getElementById("skillList").innerHTML=arr.map(skillCard).join("");
}
function renderSeraSkills(q=""){
  const lower=q.toLowerCase(), arr=DB.seraSkills.filter(s=>JSON.stringify(s).toLowerCase().includes(lower));
  document.getElementById("seraSkillTable").innerHTML=`<thead><tr><th>#</th><th>Technique</th><th>Combat Category</th><th>Power Tier</th><th>Novel Reveal</th><th>Signature</th><th>Rating</th></tr></thead><tbody>${arr.map(s=>{const i=DB.seraSkills.indexOf(s);return `<tr><td><span class="badge">${i===9?"Ω":String(i+1).padStart(2,"0")}</span></td><td><strong>${s.name}</strong></td><td>${s.category}</td><td>${s.tier}</td><td>${s.reveal||"—"}</td><td style="color:var(--gold)">${s.signature}</td><td class="rating">${s.rating}</td></tr>`}).join("")}</tbody>`;
  document.getElementById("seraSkillList").innerHTML=arr.map(skillCard).join("");
}
function renderRanks(q=""){
  const lower=q.toLowerCase();
  document.getElementById("rankList").innerHTML=DB.ranks.filter(r=>r.join(" ").toLowerCase().includes(lower)).map(r=>{
    const n=r[1];
    let key="rhen";
    if(n.includes("Kael"))key="kael";else if(n.includes("Liang"))key="liang";else if(n.includes("Jin"))key="jin";else if(n.includes("Lei"))key="lei";else if(n.includes("Rui"))key="rui";else if(n.includes("Qin"))key="qin";else if(n.includes("Sera"))key="sera";else if(n.includes("Han"))key="han";else if(n.includes("Arin"))key="arin";else if(n.includes("Luo"))key="luo";
    return `<div class="rank-row"><div><span class="badge">${r[0]}</span></div><div class="character-${key}"><strong>${r[1]}</strong></div><div>${r[3]}</div></div>`;
  }).join("");
}
function legendCard(l){
  return `<details class="card legend-card"><summary><span class="badge">${l.rank}</span><span class="badge">${l.kind}</span><h3 style="margin:8px 0">${l.title}</h3><div class="muted">Click to read full legend ▾</div></summary><div class="skill-body"><div class="full-legend-text">${renderNovel(l.text)}</div><div class="callout"><strong>Why it matters:</strong> ${l.significance}</div><div class="full-legend-quote"><strong>Memorable line:</strong> ${l.quote}</div></div></details>`;
}
function renderLegends(q=""){
  const lower=q.toLowerCase();
  document.getElementById("legendList").innerHTML=DB.legends.filter(l=>JSON.stringify(l).toLowerCase().includes(lower)).map(legendCard).join("");
}
function renderFormer(q=""){
  const lower=q.toLowerCase();
  document.getElementById("formerList").innerHTML=DB.former.filter(x=>JSON.stringify(x).toLowerCase().includes(lower)).map(x=>{
    const ranked=x.rank && !/unranked/i.test(x.rank);
    const displayName=ranked?`${x.rank} - ${x.name}`:x.name;
    return `<div class="card"><span class="badge">${x.status}</span><h3>${displayName} — ${x.title}</h3><p class="muted">${x.era}</p><p>${x.summary}</p><div class="detail-block"><h4>Connections</h4><p>${x.connections}</p></div><div class="detail-block" style="margin-top:10px"><h4>Fate</h4><p>${x.death}</p></div></div>`;
  }).join("");
}
function renderSeraTimeline(q=""){
  const lower=q.toLowerCase();
  document.getElementById("seraTimelineList").innerHTML=DB.seraTimeline.filter(x=>JSON.stringify(x).toLowerCase().includes(lower)).map(x=>`<details class="card legend-card"><summary><span class="badge">${x.age}</span><span class="badge">${x.phase}</span><h3 style="margin:8px 0">${x.title}</h3><div class="muted">Click to expand full chronology ▾</div></summary><div class="skill-body"><div class="full-legend-text">${renderNovel(x.text)}</div></div></details>`).join("");
}
function episodeCards(data,season,q=""){
  const lower=q.toLowerCase();
  return data.filter(x=>JSON.stringify(x).toLowerCase().includes(lower)).map((x,i)=>`<details class="card legend-card" ${season===1&&i===0&&!q?"open":""}><summary><span class="badge">${x.ep}</span><span class="badge">SEASON ${season}</span>${season===1?'<span class="badge">LOCKED</span>':""}<h3 style="margin:8px 0">${x.title}</h3><div class="muted">Click to read full short-novel episode ▾</div></summary><div class="skill-body"><div class="full-legend-text">${renderNovel(x.text,season)}</div></div></details>`).join("");
}

function renderSeasonCast(){
  for(let season=4;season<=64;season++){
    const el=document.getElementById(`seasonCast${season}`);
    const items=(DB.seasonCast&&DB.seasonCast[String(season)])||[];
    if(!el) continue;
    el.innerHTML=`<h3>New / Important Characters This Season</h3><div class="season-cast-grid">${items.map(x=>`<div class="season-cast-item"><strong>${x[0]}</strong><div class="season-cast-role">${x[1]}</div><div class="season-cast-desc">${x[2]}</div></div>`).join("")}</div>`;
  }
}

function renderEpisodes(q=""){
  document.getElementById("episodeList").innerHTML=episodeCards(DB.season1,1,q);
  document.getElementById("episodeListSeason2").innerHTML=episodeCards(DB.season2,2,q);
  document.getElementById("episodeListSeason3").innerHTML=episodeCards(DB.season3,3,q);
  document.getElementById("episodeListSeason4").innerHTML=episodeCards(DB.season4,4,q);
  document.getElementById("episodeListSeason5").innerHTML=episodeCards(DB.season5,5,q);
  document.getElementById("episodeListSeason6").innerHTML=episodeCards(DB.season6,6,q);
  document.getElementById("episodeListSeason7").innerHTML=episodeCards(DB.season7,7,q);
  document.getElementById("episodeListSeason8").innerHTML=episodeCards(DB.season8,8,q);
  document.getElementById("episodeListSeason9").innerHTML=episodeCards(DB.season9,9,q);
  document.getElementById("episodeListSeason10").innerHTML=episodeCards(DB.season10,10,q);
  document.getElementById("episodeListSeason11").innerHTML=episodeCards(DB.season11,11,q);
  document.getElementById("episodeListSeason12").innerHTML=episodeCards(DB.season12,12,q);
  document.getElementById("episodeListSeason13").innerHTML=episodeCards(DB.season13,13,q);
  document.getElementById("episodeListSeason14").innerHTML=episodeCards(DB.season14,14,q);
  document.getElementById("episodeListSeason15").innerHTML=episodeCards(DB.season15,15,q);
  document.getElementById("episodeListSeason16").innerHTML=episodeCards(DB.season16,16,q);
  document.getElementById("episodeListSeason17").innerHTML=episodeCards(DB.season17,17,q);
  document.getElementById("episodeListSeason18").innerHTML=episodeCards(DB.season18,18,q);
  document.getElementById("episodeListSeason19").innerHTML=episodeCards(DB.season19,19,q);
  document.getElementById("episodeListSeason20").innerHTML=episodeCards(DB.season20,20,q);
  document.getElementById("episodeListSeason21").innerHTML=episodeCards(DB.season21,21,q);
  document.getElementById("episodeListSeason22").innerHTML=episodeCards(DB.season22,22,q);
  document.getElementById("episodeListSeason23").innerHTML=episodeCards(DB.season23,23,q);
  document.getElementById("episodeListSeason24").innerHTML=episodeCards(DB.season24,24,q);
  document.getElementById("episodeListSeason25").innerHTML=episodeCards(DB.season25,25,q);
  document.getElementById("episodeListSeason26").innerHTML=episodeCards(DB.season26,26,q);
  document.getElementById("episodeListSeason27").innerHTML=episodeCards(DB.season27,27,q);
  document.getElementById("episodeListSeason28").innerHTML=episodeCards(DB.season28,28,q);
  document.getElementById("episodeListSeason29").innerHTML=episodeCards(DB.season29,29,q);
  document.getElementById("episodeListSeason30").innerHTML=episodeCards(DB.season30,30,q);
  document.getElementById("episodeListSeason31").innerHTML=episodeCards(DB.season31,31,q);
  document.getElementById("episodeListSeason32").innerHTML=episodeCards(DB.season32,32,q);
  document.getElementById("episodeListSeason33").innerHTML=episodeCards(DB.season33,33,q);
  document.getElementById("episodeListSeason34").innerHTML=episodeCards(DB.season34,34,q);
  document.getElementById("episodeListSeason35").innerHTML=episodeCards(DB.season35,35,q);
  document.getElementById("episodeListSeason36").innerHTML=episodeCards(DB.season36,36,q);
  document.getElementById("episodeListSeason37").innerHTML=episodeCards(DB.season37,37,q);
  document.getElementById("episodeListSeason38").innerHTML=episodeCards(DB.season38,38,q);
  document.getElementById("episodeListSeason39").innerHTML=episodeCards(DB.season39,39,q);
  document.getElementById("episodeListSeason40").innerHTML=episodeCards(DB.season40,40,q);
  document.getElementById("episodeListSeason41").innerHTML=episodeCards(DB.season41,41,q);
  document.getElementById("episodeListSeason42").innerHTML=episodeCards(DB.season42,42,q);
  document.getElementById("episodeListSeason43").innerHTML=episodeCards(DB.season43,43,q);
  document.getElementById("episodeListSeason44").innerHTML=episodeCards(DB.season44,44,q);
  document.getElementById("episodeListSeason45").innerHTML=episodeCards(DB.season45,45,q);
  document.getElementById("episodeListSeason46").innerHTML=episodeCards(DB.season46,46,q);
  document.getElementById("episodeListSeason47").innerHTML=episodeCards(DB.season47,47,q);
  document.getElementById("episodeListSeason48").innerHTML=episodeCards(DB.season48,48,q);
  document.getElementById("episodeListSeason49").innerHTML=episodeCards(DB.season49,49,q);
  document.getElementById("episodeListSeason50").innerHTML=episodeCards(DB.season50,50,q);
  document.getElementById("episodeListSeason51").innerHTML=episodeCards(DB.season51,51,q);
  document.getElementById("episodeListSeason52").innerHTML=episodeCards(DB.season52,52,q);
  document.getElementById("episodeListSeason53").innerHTML=episodeCards(DB.season53,53,q);
  document.getElementById("episodeListSeason54").innerHTML=episodeCards(DB.season54,54,q);
  document.getElementById("episodeListSeason55").innerHTML=episodeCards(DB.season55,55,q);
  document.getElementById("episodeListSeason56").innerHTML=episodeCards(DB.season56,56,q);
  document.getElementById("episodeListSeason57").innerHTML=episodeCards(DB.season57,57,q);
  document.getElementById("episodeListSeason58").innerHTML=episodeCards(DB.season58,58,q);
  document.getElementById("episodeListSeason59").innerHTML=episodeCards(DB.season59,59,q);
  document.getElementById("episodeListSeason60").innerHTML=episodeCards(DB.season60,60,q);
  document.getElementById("episodeListSeason61").innerHTML=episodeCards(DB.season61,61,q);
  document.getElementById("episodeListSeason62").innerHTML=episodeCards(DB.season62,62,q);
  document.getElementById("episodeListSeason63").innerHTML=episodeCards(DB.season63,63,q);
  document.getElementById("episodeListSeason64").innerHTML=episodeCards(DB.season64,64,q);
}
function renderColorKey(){
  const items=[["rhen","Rhen"],["sera","#7 Sera"],["kael","#1 Kael"],["liang","#2 Liang"],["jin","#3 Jin"],["lei","#4 Lei"],["rui","#5 Rui"],["qin","#6 Qin"],["han","#8 Han"],["arin","#9 Arin"],["luo","#10 Luo Wen"],["wei","Wei Zhen"],["ji","Ji Wuye"],["cao","Cao Tian"],["ye","Ye Mo"],["zhao","Zhao Keshan"],["lin","Lin Yao"],["yan","Yan Shou"],["meizhen","Mei Zhen"],["yunke","Yun Ke"],["meilin","Jian Meilin"],["shiyue","Yun Shiyue"],["huo","Huo Wujin"],["nam","Nam Gyeol"],["haejin","Seo Haejin"],["daemun","Dae Mun"],["gong","Gong Seok"]];
  document.getElementById("colorKey").innerHTML=items.map(([k,n])=>`<span class="character-${k}"><strong>${n}</strong></span>`).join("");
}

function activateTab(tabName){
  document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",(b as HTMLElement).dataset.tab===tabName));
  document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("hidden",p.id!==tabName));
  (document.getElementById("search") as HTMLInputElement).value="";
  if(tabName==="skills")renderSkills();
  if(tabName==="rankings")renderRanks();
  if(tabName==="legends")renderLegends();
  if(tabName==="former")renderFormer();
  if(tabName==="sera-timeline")renderSeraTimeline();
  if(tabName==="episodes")renderEpisodes();
  if(tabName==="characters"){renderCharacterButtons();}
  if(tabName==="others"){renderArcFigures();}
}
document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>activateTab((btn as HTMLElement).dataset.tab)));
document.getElementById("search")!.addEventListener("input",e=>{
  const q=(e.target as HTMLInputElement).value, visible=[...document.querySelectorAll(".panel")].find(p=>!p.classList.contains("hidden"))?.id;
  if(visible==="characters")renderCharacterButtons(q);
  else if(visible==="others")renderArcFigures(q);
  else if(visible==="skills")renderSkills(q);
  else if(visible==="rankings")renderRanks(q);
  else if(visible==="legends")renderLegends(q);
  else if(visible==="former")renderFormer(q);
  else if(visible==="sera-timeline")renderSeraTimeline(q);
  else if(visible==="episodes")renderEpisodes(q);
});
document.getElementById("legendSearch")!.addEventListener("input",e=>renderLegends((e.target as HTMLInputElement).value));
document.getElementById("otherSearch")!.addEventListener("input",e=>renderArcFigures((e.target as HTMLInputElement).value));

renderCharacterButtons();
renderCharacter("sera");
renderArcFigures();
renderSkills();
renderSeraSkills();
renderRanks();
renderLegends();
renderFormer();
renderSeraTimeline();
renderEpisodes();
renderSeasonCast();
renderColorKey();



// Expose handlers referenced by inline onclick="" in dynamically generated markup.
declare global {
  interface Window {
    renderCharacter: (key: string) => void;
    showSeraPortrait: (index: number, btn: HTMLElement) => void;
    __seraPortraits?: string[];
  }
}
window.renderCharacter = renderCharacter;
window.showSeraPortrait = showSeraPortrait;
