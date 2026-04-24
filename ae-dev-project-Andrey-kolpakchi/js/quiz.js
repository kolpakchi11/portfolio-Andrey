/* =====================================================
   quiz.js — Quiz, Facts, Result, Game Launcher
   Dependencies: app.js
===================================================== */

function startQuiz(){
  aq=QD[cat]; qi=0;sc=0;xp=0;combo=0;
  updateHUD(); show("quiz"); loadQ();
}
function loadQ(){
  const q=aq[qi];
  document.getElementById("question").textContent=q.q[lang];
  const ae=document.getElementById("answers"); ae.innerHTML="";
  document.getElementById("ansInfo").style.display="none";
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("qFill").style.width=(qi/aq.length*100)+"%";
  document.getElementById("progVal").textContent=(qi+1)+"/"+aq.length;
  q.a.forEach((a,i)=>{
    const b=document.createElement("button"); b.className="ans-btn";
    b.textContent=a[lang]; b.onclick=()=>checkA(i); ae.appendChild(b);
  });
}
function checkA(i){
  const q=aq[qi];
  document.querySelectorAll(".ans-btn").forEach(b=>b.disabled=true);
  const ok=i===q.c;
  document.querySelectorAll(".ans-btn")[i].classList.add(ok?"correct":"wrong");
  document.querySelectorAll(".ans-btn")[q.c].classList.add("correct");
  if(ok){sc++;combo++;xp+=10*combo;showCombo(combo);if(cat==="ae")spawnAEP();else devGlitch();}
  else combo=0;
  updateHUD();

  // Rich explanation card
  const ie=document.getElementById("ansInfo");
  ie.className="ans-info";
  ie.style.display="block";
  const correctLbl=q.a[q.c][lang];
  const wrongLbl=i!==q.c?q.a[i][lang]:null;
  ie.innerHTML=`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
      <span style="font-size:16px">${ok?"✅":"❌"}</span>
      <span style="font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;color:${ok?"#00ff88":"#ff6060"}">
        ${ok?(lang==="ru"?"ПРАВИЛЬНО!":"CORRECT!"):(lang==="ru"?"НЕВЕРНО":"WRONG")}
      </span>
    </div>
    ${!ok?`<div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:rgba(255,255,255,.45);margin-bottom:6px">${lang==="ru"?"Ты выбрал:":"You chose:"} <span style="color:#ff6060;text-decoration:line-through">${wrongLbl}</span> &nbsp;→&nbsp; <span style="color:#00ff88">${correctLbl}</span></div>`:""}
    <div style="font-size:12px;line-height:1.7;color:rgba(255,255,255,.75)">${q.i[lang]}</div>
  `;
  document.getElementById("nextBtn").classList.remove("hidden");
}
document.getElementById("nextBtn").onclick=()=>{qi++;if(qi<aq.length)loadQ();else finishQuiz();}
document.getElementById("retryBtn").onclick=startQuiz;
function updateHUD(){
  document.getElementById("xpVal").textContent=xp;
  document.getElementById("comboVal").textContent=combo;
}
function showCombo(c){
  if(c<2) return;
  const el=document.createElement("div"); el.className="combo-pop";
  el.style.color=cat==="dev"?"#00ff88":"#7dd8ff";
  el.textContent=c>=5?"🔥 COMBO x"+c:"⚡ x"+c;
  document.body.appendChild(el); setTimeout(()=>el.remove(),800);
}
function finishQuiz(){
  const p=sc/aq.length;
  const ri=p<.3?0:p<.5?1:p<.7?2:p<1?3:4;
  document.getElementById("resScore").textContent=sc+"/"+aq.length;
  document.getElementById("resRank").textContent=T[lang]["rank_"+ri];
  document.getElementById("resMsg").textContent=T[lang]["rmsg_"+ri];
  document.getElementById("resXP").textContent=T[lang]["rxp"]+" "+xp+" XP";
  show("result");
}

/* ===================================================
   FACTS
=================================================== */
function showFacts(){
  const ft=document.getElementById("factsTitle");
  ft.textContent=T[lang]["facts_"+cat+"_title"];
  ft.style.background=cat==="ae"?"linear-gradient(135deg,#7dd8ff,#fff)":"linear-gradient(135deg,#00ff88,#00e5ff)";
  ft.style.webkitBackgroundClip="text"; ft.style.webkitTextFillColor="transparent"; ft.style.backgroundClip="text";
  const wrap=document.getElementById("factsWrap"); wrap.innerHTML="";
  FACTS[cat][lang].forEach((f,i)=>{
    const d=document.createElement("div"); d.className="fact-card";
    d.style.animation=`fadeUp .5s ease ${i*.07}s both`;
    d.innerHTML=`<div class="fact-n">ФАКТ ${String(i+1).padStart(2,"0")}</div><div class="fact-t">${f.t}</div><div class="fact-b">${f.b}</div>`;
    wrap.appendChild(d);
  });
  show("factsScreen");
}

/* ===================================================
   AE FX
=================================================== */
function spawnAEP(){
  const cols=["#3c8fff","#00cfff","#7dd8ff","#c8e8ff"];
  for(let i=0;i<6;i++){
    const p=document.createElement("div"); p.className="aep";
    p.style.cssText=`left:${15+Math.random()*70}%;top:${20+Math.random()*50}%;width:${5+Math.random()*8}px;height:${5+Math.random()*8}px;background:${cols[Math.floor(Math.random()*cols.length)]};animation-delay:${Math.random()*.4}s`;
    document.body.appendChild(p); setTimeout(()=>p.remove(),3800);
  }
}
function devGlitch(){
  const o=document.getElementById("glitchOverlay");
  o.style.background="rgba(0,255,100,.05)"; o.style.opacity="1";
  setTimeout(()=>o.style.opacity="0",300);
  document.body.classList.add("shaking");
  setTimeout(()=>document.body.classList.remove("shaking"),280);
}

/* ===================================================
   MATRIX — твой оригинальный код, исправленный
=================================================== */
const MC=document.getElementById("matrixBg");
const MX=MC.getContext("2d");
const codeLines=[
  "function build(){}","while(true){learn()}","commit(code)","debug(error)",
  "ship(app)","async await","class Mind{}","export default skill",
  "npm install future","const dev = new You()","if(hard){keep_going()}",
  "git push origin main","return success;","let potential=Infinity",
  "fetch('/api/future')","useState(learning)","console.log('🔥')",
  ".map(x => x*2)","const arr = []","import React",
];
const crashWords=["DISCIPLINE","BUILD_MORE","DEBUG_REALITY","CREATE_CODE","NO_SHORTCUTS","STAY_FOCUSED","SHIP_IT","READ_DOCS","GIT_COMMIT"];
let crashMode=false;

function resizeMC(){
  MC.width=window.innerWidth;
  MC.height=window.innerHeight;
}
resizeMC();
window.addEventListener("resize",resizeMC);

const FS=18;
let drops=[];
function resetDrops(){drops=Array(Math.floor(window.innerWidth/FS)).fill(1);}
resetDrops();
window.addEventListener("resize",resetDrops);

function clearMatrix(){MX.clearRect(0,0,MC.width,MC.height);}

// Main matrix draw loop — interval 100ms like original
setInterval(()=>{
  if(!document.body.classList.contains("theme-dev")){
    MX.clearRect(0,0,MC.width,MC.height); return;
  }
  MX.fillStyle="rgba(0,0,0,.18)";
  MX.fillRect(0,0,MC.width,MC.height);

  for(let i=0;i<drops.length;i++){
    if(crashMode){
      const ch=crashWords[Math.floor(Math.random()*crashWords.length)][Math.floor(Math.random()*10)]||"X";
      MX.fillStyle="#ff2a2a";
      MX.font="28px 'Share Tech Mono',monospace";
      MX.shadowColor="#ff0000"; MX.shadowBlur=24;
      MX.fillText(ch,i*FS,drops[i]*FS);
    } else {
      const text=codeLines[Math.floor(Math.random()*codeLines.length)];
      // Multiple green shades for depth
      const shade=i%4===0?"#33ff88":i%4===1?"#00cc55":i%4===2?"#00ff88":"#009944";
      MX.fillStyle=shade;
      MX.font="14px 'Share Tech Mono',monospace";
      MX.shadowBlur=0;
      MX.fillText(text,i*FS,drops[i]*FS);
    }
    if(drops[i]*FS>MC.height&&Math.random()>.975) drops[i]=0;
    drops[i]++;
  }
  MX.shadowBlur=0;
},100);

// Crash words — original timing


/* ===================================================
   HOME BACKGROUND — animated dual-world particles
=================================================== */
(function(){
  const hbc=document.getElementById("homeBg");
  if(!hbc)return;
  const hbx=hbc.getContext("2d");
  let hw=0,hh=0;
  function rsz(){hw=hbc.width=hbc.offsetWidth||window.innerWidth;hh=hbc.height=hbc.offsetHeight||window.innerHeight;}
  rsz();window.addEventListener("resize",rsz);

  // Split: left=AE blue, right=DEV green
  const pts=Array.from({length:55},(_,i)=>({
    x:Math.random(),y:Math.random(),
    vx:(Math.random()-.5)*.0004,vy:(Math.random()-.5)*.0004,
    r:1.5+Math.random()*3,
    phase:Math.random()*Math.PI*2,
    speed:.5+Math.random(),
    side:i<28?0:1, // 0=AE, 1=DEV
    col:i<28?"60,140,255":"0,255,100",
  }));
  // connection lines
  let t=0;
  function drawHome(){
    if(document.body.classList.contains("theme-ae")||document.body.classList.contains("theme-dev")){
      hbx.clearRect(0,0,hw,hh);requestAnimationFrame(drawHome);return;
    }
    hbx.clearRect(0,0,hw,hh);
    t+=.01;
    // background gradient
    const bg=hbx.createLinearGradient(0,0,hw,hh);
    bg.addColorStop(0,"#07070e");bg.addColorStop(.5,"#0a0a18");bg.addColorStop(1,"#07070e");
    hbx.fillStyle=bg;hbx.fillRect(0,0,hw,hh);
    // divider glow
    hbx.fillStyle="rgba(255,255,255,.04)";
    hbx.fillRect(hw/2-1,0,2,hh);

    // AE left glow
    const aeg=hbx.createRadialGradient(hw*.25,hh*.5,0,hw*.25,hh*.5,hw*.3);
    aeg.addColorStop(0,"rgba(30,100,255,.07)");aeg.addColorStop(1,"transparent");
    hbx.fillStyle=aeg;hbx.fillRect(0,0,hw,hh);
    // DEV right glow
    const dg=hbx.createRadialGradient(hw*.75,hh*.5,0,hw*.75,hh*.5,hw*.3);
    dg.addColorStop(0,"rgba(0,200,80,.05)");dg.addColorStop(1,"transparent");
    hbx.fillStyle=dg;hbx.fillRect(0,0,hw,hh);

    pts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>1) p.vx*=-1;if(p.y<0||p.y>1) p.vy*=-1;
      const px=p.x*hw,py=p.y*hh;
      const alpha=.2+.15*Math.sin(t*p.speed+p.phase);
      hbx.beginPath();hbx.arc(px,py,p.r,0,Math.PI*2);
      hbx.fillStyle=`rgba(${p.col},${alpha})`;hbx.fill();
    });
    // connections within same side
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        if(pts[i].side!==pts[j].side) continue;
        const dx=(pts[i].x-pts[j].x)*hw,dy=(pts[i].y-pts[j].y)*hh;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<100){
          hbx.strokeStyle=`rgba(${pts[i].col},${.06*(1-dist/100)})`;
          hbx.lineWidth=.5;
          hbx.beginPath();hbx.moveTo(pts[i].x*hw,pts[i].y*hh);
          hbx.lineTo(pts[j].x*hw,pts[j].y*hh);hbx.stroke();
        }
      }
    }
    requestAnimationFrame(drawHome);
  }
  drawHome();
})();

/* ===================================================
   AE BACKGROUND — cinematic aurora night sky
=================================================== */
(function(){
  const ac=document.getElementById("aeBg");
  if(!ac)return;
  const ax=ac.getContext("2d");
  let aw=0,ah=0;
  function rsz(){aw=ac.width=window.innerWidth;ah=ac.height=window.innerHeight;}
  rsz();window.addEventListener("resize",rsz);

  const stars=Array.from({length:180},()=>({
    x:Math.random(),y:Math.random()*.7,
    r:.3+Math.random()*1.4,
    twinkle:Math.random()*Math.PI*2,
    speed:.006+Math.random()*.02,
  }));
  const bands=[
    {y:.15,amp:.055,freq:1.4,speed:.0007,col:[30,120,255],alpha:.22,w:220},
    {y:.26,amp:.04, freq:1.9,speed:.0009,col:[0,180,255], alpha:.16,w:170},
    {y:.36,amp:.065,freq:1.2,speed:.0005,col:[80,50,255], alpha:.14,w:190},
    {y:.21,amp:.045,freq:2.2,speed:.0011,col:[0,220,200], alpha:.10,w:150},
    {y:.31,amp:.055,freq:1.7,speed:.0008,col:[50,100,255],alpha:.12,w:160},
  ];
  const shoots=Array.from({length:5},(_,i)=>({x:0,y:0,vx:.004,vy:.002,alpha:0,active:false,timer:i*90+Math.random()*200}));
  let t=0;

  function drawAE(){
    if(!document.body.classList.contains("theme-ae")){ax.clearRect(0,0,aw,ah);requestAnimationFrame(drawAE);return;}
    ax.clearRect(0,0,aw,ah);
    t+=.012;

    // Deep space gradient
    const sky=ax.createLinearGradient(0,0,0,ah);
    sky.addColorStop(0,"#010818");
    sky.addColorStop(.32,"#020f2c");
    sky.addColorStop(.65,"#040c1e");
    sky.addColorStop(1,"#060a18");
    ax.fillStyle=sky;ax.fillRect(0,0,aw,ah);

    // Aurora bands
    bands.forEach(b=>{
      const baseY=b.y*ah;
      for(let x=0;x<aw;x+=4){
        const waveY=baseY+Math.sin(x/aw*Math.PI*b.freq*3+t*b.speed*1000)*b.amp*ah;
        const alpha=b.alpha*(.45+.55*Math.sin(x/aw*Math.PI*2.5+t*b.speed*600));
        const g=ax.createLinearGradient(x,waveY-b.w,x,waveY+b.w);
        g.addColorStop(0,"transparent");
        g.addColorStop(.5,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${alpha})`);
        g.addColorStop(1,"transparent");
        ax.fillStyle=g;ax.fillRect(x,waveY-b.w,4,b.w*2);
      }
    });

    // Stars
    stars.forEach(s=>{
      const tw=.35+.65*Math.sin(t*s.speed*80+s.twinkle);
      ax.beginPath();ax.arc(s.x*aw,s.y*ah,s.r*(0.6+0.4*tw),0,Math.PI*2);
      ax.fillStyle=`rgba(210,225,255,${.55*tw})`;ax.fill();
    });

    // Shooting stars
    shoots.forEach(s=>{
      s.timer--;
      if(s.timer<=0&&!s.active){s.active=true;s.x=Math.random()*.55;s.y=Math.random()*.28;s.vx=.004+Math.random()*.006;s.vy=.001+Math.random()*.003;s.alpha=1;s.timer=250+Math.random()*500;}
      if(s.active){
        s.x+=s.vx;s.y+=s.vy;s.alpha-=.011;
        if(s.alpha<=0){s.active=false;return;}
        const len=aw*.1;
        const ex=s.x*aw-s.vx/s.vx*len,ey=s.y*ah-s.vy/s.vx*len;
        const g=ax.createLinearGradient(s.x*aw,s.y*ah,ex,ey);
        g.addColorStop(0,`rgba(220,240,255,${s.alpha})`);g.addColorStop(1,"transparent");
        ax.strokeStyle=g;ax.lineWidth=1.5;ax.beginPath();ax.moveTo(s.x*aw,s.y*ah);ax.lineTo(ex,ey);ax.stroke();
      }
    });

    // Horizon glow
    const hg=ax.createLinearGradient(0,ah*.5,0,ah);
    hg.addColorStop(0,"transparent");hg.addColorStop(1,"rgba(15,50,160,.12)");
    ax.fillStyle=hg;ax.fillRect(0,0,aw,ah);

    // Large nebula
    const ng=ax.createRadialGradient(aw*.5,ah*.85,0,aw*.5,ah*.85,aw*.55);
    ng.addColorStop(0,"rgba(20,70,200,.1)");ng.addColorStop(1,"transparent");
    ax.fillStyle=ng;ax.fillRect(0,0,aw,ah);

    requestAnimationFrame(drawAE);
  }
  drawAE();
})();

/* ===================================================
   DEV HEX GRID — decorative animated hex grid
=================================================== */
(function(){
  const hc=document.getElementById("devGrid");
  if(!hc)return;
  const hx=hc.getContext("2d");
  let hw=0,hh=0;
  function rsz(){hw=hc.width=window.innerWidth;hh=hc.height=window.innerHeight;}
  rsz();window.addEventListener("resize",rsz);
  let t=0;
  function drawHex(){
    if(!document.body.classList.contains("theme-dev")){hx.clearRect(0,0,hw,hh);requestAnimationFrame(drawHex);return;}
    hx.clearRect(0,0,hw,hh);
    t+=0.008;
    const S=44; // hex size
    const W=S*2,H=Math.sqrt(3)*S;
    const cols2=Math.ceil(hw/W)+2,rows2=Math.ceil(hh/H)+2;
    for(let row=0;row<rows2;row++){
      for(let col=0;col<cols2;col++){
        const offset=col%2?H/2:0;
        const cx2=col*W*0.75-S,cy2=row*H+offset-H/2;
        const dist=Math.sqrt(Math.pow((cx2-hw/2)/hw,2)+Math.pow((cy2-hh/2)/hh,2));
        const pulse=Math.sin(t+dist*8+col*.3+row*.5);
        const alpha=(.02+pulse*.015)*Math.max(0,1-dist*1.5);
        if(alpha<=0)continue;
        hx.beginPath();
        for(let k=0;k<6;k++){
          const ang=Math.PI/180*(60*k-30);
          const px3=cx2+S*.88*Math.cos(ang),py3=cy2+S*.88*Math.sin(ang);
          k===0?hx.moveTo(px3,py3):hx.lineTo(px3,py3);
        }
        hx.closePath();
        hx.strokeStyle=`rgba(0,255,100,${alpha})`;
        hx.lineWidth=.8;hx.stroke();
      }
    }
    requestAnimationFrame(drawHex);
  }
  drawHex();
})();

/* ===================================================
   INFO MODAL
=================================================== */
const modal=document.getElementById("infoModal");
document.getElementById("btnAE").onclick=()=>openModal("ae");
document.getElementById("btnDEV").onclick=()=>openModal("dev");
document.getElementById("modalCloseBtn").onclick=()=>modal.classList.add("hidden");
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden");}
function openModal(type){
  const box=document.getElementById("modalBox");
  box.classList.remove("ae","dev"); box.classList.add(type);
  document.getElementById("modalTag").textContent=T[lang][type+"_tag"];
  document.getElementById("modalTitle").textContent=T[lang][type+"_title"];
  document.getElementById("modalText").textContent=T[lang][type+"_text"];
  const ul=document.getElementById("modalList"); ul.innerHTML="";
  T[lang][type+"_list"].forEach(item=>{const li=document.createElement("li");li.textContent=item;ul.appendChild(li);});
  document.getElementById("modalCloseBtn").textContent=T[lang]["close_btn"];
  const acb=document.getElementById("aboutCloseBtn");if(acb)acb.textContent=lang==="ru"?"ЗАКРЫТЬ ✕":"CLOSE ✕";
  // sweep
  box.querySelectorAll(".sweep").forEach(e=>e.remove());
  const sw=document.createElement("div"); sw.className="sweep"; box.appendChild(sw);
  modal.classList.remove("hidden");
}

/* ===================================================
   MASCOT
=================================================== */
function getMascotFacts(){
  const ctx=cat||"home"; return MF[ctx][lang];
}
function showMascotFact(){
  const list=getMascotFacts();
  document.getElementById("bubText").textContent=list[mfIdx%list.length];
  document.getElementById("bubLbl").textContent=T[lang]["bub_lbl"];
  document.getElementById("bubNext").textContent=T[lang]["bub_next"];
  document.getElementById("bubClose").textContent=T[lang]["bub_close"];
  const b=document.getElementById("mascotBubble");
  b.classList.remove("hidden");
  b.style.animation="none"; void b.offsetWidth; b.style.animation="bubIn .4s cubic-bezier(.2,.8,.2,1)";
}
document.getElementById("mascotBtn").onclick=()=>{
  const b=document.getElementById("mascotBubble");
  if(!b.classList.contains("hidden")){b.classList.add("hidden");return;}
  mfList=getMascotFacts(); mfIdx=Math.floor(Math.random()*mfList.length);
  showMascotFact();
};
document.getElementById("bubNext").onclick=()=>{mfIdx++;showMascotFact();}
document.getElementById("bubClose").onclick=()=>document.getElementById("mascotBubble").classList.add("hidden");
setTimeout(()=>{mfList=getMascotFacts();mfIdx=0;showMascotFact();},4500);

/* ===================================================
   GAME ENGINE
=================================================== */
const GC=document.getElementById("gameCanvas");
const GX=GC.getContext("2d");
const GW=420,GH=500;
let pX=GW/2; // player input X

GC.addEventListener("mousemove",e=>{const r=GC.getBoundingClientRect();pX=(e.clientX-r.left)*(GW/r.width);});
GC.addEventListener("touchmove",e=>{e.preventDefault();const r=GC.getBoundingClientRect();pX=(e.touches[0].clientX-r.left)*(GW/r.width);},{passive:false});

function sScore(s){document.getElementById("gScore").textContent=s}
function sLives(l){document.getElementById("gLives").textContent=l}
function sLvl(l){document.getElementById("gLevelPill").textContent="LVL "+l} // Fixed: was sLvlPill

// Fix: correct element id reference
function setLvlPill(l){document.getElementById("gLvlPill").textContent="LVL "+l}

function stopGame(){
  gRun=false;
  if(gAnim){cancelAnimationFrame(gAnim);gAnim=null;}
  GX.clearRect(0,0,GW,GH);
  document.removeEventListener("keydown",_kb);
  GC.onclick=null; GC._t1=false; GC._t2=false; GC._t3=false; GC._t4=false;
}
let _kb=null;

function rr(x,y,w,h,r,fill,stroke,lw){
  GX.beginPath();GX.moveTo(x+r,y);GX.lineTo(x+w-r,y);GX.arcTo(x+w,y,x+w,y+r,r);
  GX.lineTo(x+w,y+h-r);GX.arcTo(x+w,y+h,x+w-r,y+h,r);
  GX.lineTo(x+r,y+h);GX.arcTo(x,y+h,x,y+h-r,r);
  GX.lineTo(x,y+r);GX.arcTo(x,y,x+r,y,r);GX.closePath();
  if(fill){GX.fillStyle=fill;GX.fill();}
  if(stroke){GX.strokeStyle=stroke;GX.lineWidth=lw||1;GX.stroke();}
}
function gOver(score,tip){
  GX.fillStyle="rgba(0,0,0,.9)";GX.fillRect(0,0,GW,GH);
  GX.fillStyle=cat==="ae"?"#7dd8ff":"#00ff88";
  GX.font="bold 30px 'Orbitron',monospace";GX.textAlign="center";
  GX.fillText("GAME OVER",GW/2,GH/2-52);
  GX.fillStyle="#fff";GX.font="bold 20px 'Orbitron',monospace";
  GX.fillText("Score: "+score,GW/2,GH/2-4);
  if(tip){GX.fillStyle="rgba(255,255,255,.45)";GX.font="11px 'Share Tech Mono',monospace";GX.fillText(tip,GW/2,GH/2+38);}
  GX.fillStyle="rgba(255,255,255,.22)";GX.font="10px 'Orbitron',monospace";
  GX.fillText("← Back to exit",GW/2,GH/2+80);GX.textAlign="left";
}

function launchGame(n,k){
  gameId=n; stopGame(); show("game");
  document.getElementById("gameHint").textContent=T[lang][cat+"_g"+n+"_hint"];
  pX=GW/2;
  if(cat==="ae"){if(k==="g5"){startAEG5();}else{[,startAEG1,startAEG2,startAEG3,startAEG4][n]();}}
  else{if(k==="g5"){startDEVG5();}else{[,startDEVG1,startDEVG2,startDEVG3,startDEVG4][n]();}}
}

/* ====================================================
   ██████╗ AE GAME 1 — KEYFRAME CATCHER
   Ловишь кейфреймы (◆◇✦★) с названиями параметров
   Учишься: Position Scale Rotation Opacity
===================================================== */