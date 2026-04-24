/* =====================================================
   game.js — All 10 Mini-Games (AE G1-G5, DEV G1-G5)
   Dependencies: app.js, quiz.js
===================================================== */

/* Touch→click bridge: makes canvas games work on mobile */
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var gc = document.getElementById('gameCanvas');
    if (!gc || gc._tb) return;
    gc._tb = true;
    gc.addEventListener('touchstart', function(e){ e.preventDefault(); }, {passive:false});
    gc.addEventListener('touchend', function(e){
      e.preventDefault();
      var t = e.changedTouches[0];
      gc.dispatchEvent(new MouseEvent('click', {clientX:t.clientX, clientY:t.clientY, bubbles:true}));
    }, {passive:false});
  });
})();

function startAEG1(){
  const good=[{s:"◆",l:"Position",c:"#3c8fff"},{s:"◇",l:"Scale",c:"#7dd8ff"},{s:"✦",l:"Rotation",c:"#00cfff"},{s:"★",l:"Opacity",c:"#c8e8ff"}];
  const bad=[{s:"✖",l:"Error",c:"#ff3c3c"},{s:"⚠",l:"Glitch",c:"#ff8800"}];
  let items=[],frame=0,score=0,lives=3,lvl=1,speed=1.6,px={x:210,w:72};
  sScore(0);sLives(3);setLvlPill(1);pX=GW/2;
  let msg="",mt=0,errCount=0;

  function loop(){
    if(!gRun)return; gAnim=requestAnimationFrame(loop); frame++;
    GX.clearRect(0,0,GW,GH);
    const bg=GX.createLinearGradient(0,0,0,GH);bg.addColorStop(0,"#060d18");bg.addColorStop(1,"#0a1628");GX.fillStyle=bg;GX.fillRect(0,0,GW,GH);
    GX.strokeStyle="rgba(40,110,255,.04)";GX.lineWidth=1;
    for(let x=0;x<GW;x+=40){GX.beginPath();GX.moveTo(x,0);GX.lineTo(x,GH);GX.stroke();}
    for(let y=0;y<GH;y+=40){GX.beginPath();GX.moveTo(0,y);GX.lineTo(GW,y);GX.stroke();}

    if(frame%Math.max(34,65-score*.3)===0){
      const pool=[...good,...good,...bad];
      const pk=pool[Math.floor(Math.random()*pool.length)];
      items.push({x:28+Math.random()*(GW-80),y:-22,s:pk.s,l:pk.l,c:pk.c,g:good.includes(pk),sp:speed+Math.random()*1.3,rot:0,rs:(Math.random()-.5)*.06});
    }
    items=items.filter(it=>{
      it.y+=it.sp;it.rot+=it.rs;
      GX.save();GX.translate(it.x+13,it.y);GX.rotate(it.rot);
      GX.fillStyle=it.c;GX.shadowColor=it.c;GX.shadowBlur=14;
      GX.font="24px serif";GX.textAlign="center";GX.fillText(it.s,0,0);GX.shadowBlur=0;
      GX.fillStyle=it.c+"aa";GX.font="bold 8px 'Orbitron',monospace";GX.fillText(it.l,0,15);
      GX.restore();
      const py2=GH-30;
      if(it.y>py2-10&&it.y<py2+14&&it.x+8>px.x&&it.x-8<px.x+px.w){
        if(it.g){score+=10;sScore(score);msg="✅ "+it.l+" — поймал!";mt=85;spawnAEP();}
        else{lives--;sLives(lives);msg="❌ "+it.l+" — промах";mt=65;errCount++;}
        return false;
      }
      if(it.y>GH+20){if(it.g){lives--;sLives(lives);}return false;}
      return true;
    });
    px.x+=(pX-px.w/2-px.x)*.18;px.x=Math.max(0,Math.min(GW-px.w,px.x));
    const py2=GH-30;
    const pg=GX.createLinearGradient(px.x,0,px.x+px.w,0);pg.addColorStop(0,"#3c8fff");pg.addColorStop(1,"#00cfff");
    GX.fillStyle=pg;GX.shadowColor="#3c8fff";GX.shadowBlur=16;
    rr(px.x,py2,px.w,8,4,pg,null);GX.shadowBlur=0;
    GX.fillStyle="#fff";GX.fillRect(px.x+px.w/2-1,py2-4,2,4);
    if(mt>0){mt--;GX.fillStyle=msg.startsWith("✅")?"rgba(125,216,255,.85)":"rgba(255,110,110,.85)";GX.font="11px 'Share Tech Mono',monospace";GX.textAlign="center";GX.fillText(msg,GW/2,GH-5);}
    GX.fillStyle="rgba(100,170,255,.35)";GX.font="9px 'Share Tech Mono',monospace";GX.textAlign="left";
    GX.fillText("CATCH: ◆Position ◇Scale ✦Rotation ★Opacity  |  DODGE: ✖⚠",5,13);
    if(errCount>=3){GX.fillStyle="rgba(255,220,0,.7)";GX.font="9px 'Share Tech Mono',monospace";GX.textAlign="center";GX.fillText("💡 Совет: двигай мышь под кейфрейм, избегай красных!",GW/2,GH-20);}
    if(score>0&&score%80===0&&lvl<6){lvl++;speed+=.3;setLvlPill(lvl);}
    if(lives<=0){stopGame();gOver(score,"Catch the keyframes!");}
  }
  gRun=true;loop();
}

/* ====================================================
   ██████╗ AE GAME 2 — AE СЛОВА
   Буквы AE-терминов падают сверху — нажимай их!
   Учишься: названия параметров и инструментов AE
===================================================== */
function startAEG2(){
  const terms=[
    {word:"KEYFRAME",hint:"Ключевой кадр — основа любой анимации"},
    {word:"POSITION",hint:"P — параметр положения слоя"},
    {word:"OPACITY",hint:"T — прозрачность слоя (0-100%)"},
    {word:"ROTATION",hint:"R — угол поворота слоя"},
    {word:"SCALE",hint:"S — масштаб/размер слоя"},
    {word:"WIGGLE",hint:"wiggle(f,a) — Expression для случайного движения"},
    {word:"PRECOMP",hint:"Pre-compose — группировка слоёв в Comp"},
    {word:"EASING",hint:"Плавный вход/выход анимации"},
    {word:"MASK",hint:"Маска — ограничивает видимую область"},
    {word:"MOTION",hint:"Motion — движение. Motion Design — дизайн в движении"},
  ];
  let items=[],frame=0,score=0,lives=3,lvl=1,speed=0.7,currentTerm=null,charIdx=0;
  sScore(0);sLives(3);setLvlPill(1);
  let msg="",mt=0;

  function pickTerm(){
    currentTerm=terms[Math.floor(Math.random()*terms.length)];charIdx=0;
  }
  pickTerm();

  // spawn one char at a time from current term
  let spawnTimer=0,spawnInterval=90;

  _kb=e=>{
    if(!gRun||!currentTerm) return;
    const ch=e.key.toUpperCase();
    let hit=false;
    items=items.filter(it=>{
      if(!hit&&it.ch===ch&&it.y>40){
        hit=true;score+=5;sScore(score);
        msg="✅ "+it.ch+" → "+currentTerm.hint;mt=90;spawnAEP();
        return false;
      }
      return true;
    });
    if(!hit&&e.key.length===1&&e.key.match(/[a-zA-Z]/)){lives--;sLives(lives);msg="❌ нет такой буквы";mt=50;}
  };
  document.addEventListener("keydown",_kb);

  function loop(){
    if(!gRun){document.removeEventListener("keydown",_kb);return;}
    gAnim=requestAnimationFrame(loop);frame++;spawnTimer++;
    GX.clearRect(0,0,GW,GH);
    const bg=GX.createLinearGradient(0,0,0,GH);bg.addColorStop(0,"#060d18");bg.addColorStop(1,"#0a1628");GX.fillStyle=bg;GX.fillRect(0,0,GW,GH);

    if(spawnTimer>=spawnInterval&&currentTerm){
      spawnTimer=0;
      if(charIdx<currentTerm.word.length){
        const ch=currentTerm.word[charIdx];charIdx++;
        const colors=["#3c8fff","#00cfff","#7dd8ff","#c8b4ff","#80d4ff"];
        items.push({ch,x:28+Math.random()*(GW-80),y:-30,color:colors[Math.floor(Math.random()*colors.length)],sp:speed+Math.random()*1});
      } else {pickTerm();spawnInterval=Math.max(25,spawnInterval-2);}
    }
    items=items.filter(it=>{
      it.y+=it.sp;
      GX.fillStyle=it.color;GX.font="bold 32px 'Share Tech Mono',monospace";
      GX.shadowColor=it.color;GX.shadowBlur=18;GX.textAlign="left";
      GX.fillText(it.ch,it.x,it.y);GX.shadowBlur=0;
      if(it.y>GH-68){lives--;sLives(lives);return false;}
      return true;
    });

    // Show current word progress
    if(currentTerm){
      GX.fillStyle="rgba(100,170,255,.3)";GX.font="bold 13px 'Orbitron',monospace";GX.textAlign="center";
      GX.fillText("TERM: "+currentTerm.word,GW/2,28);
      GX.fillStyle="rgba(100,170,255,.18)";GX.font="10px 'Share Tech Mono',monospace";
      GX.fillText(currentTerm.hint,GW/2,44);
      // spelled chars
      const w=currentTerm.word;
      const tot=w.length*(22+4)-4;const sx=(GW-tot)/2;
      for(let i=0;i<w.length;i++){
        const done=i<charIdx;
        GX.fillStyle=done?"rgba(100,170,255,.6)":"rgba(255,255,255,.12)";
        rr(sx+i*26,52,22,26,4,done?"rgba(40,110,255,.3)":"rgba(255,255,255,.05)",done?"rgba(40,110,255,.5)":"rgba(255,255,255,.12)");
        GX.fillStyle=done?"#7dd8ff":"rgba(255,255,255,.3)";
        GX.font="bold 13px 'Orbitron',monospace";GX.textAlign="center";
        GX.fillText(w[i],sx+i*26+11,52+17);
      }
    }

    // On-screen keyboard
    const kbY=GH-54;const row="QWERTYUIOPASDFGHJKLZXCVBNM".split("");
    const kw=28,kh=24;const rows=[row.slice(0,10),row.slice(10,19),row.slice(19)];
    rows.forEach((r,ri)=>{
      const rw2=r.length*(kw+2)-2;const kx0=(GW-rw2)/2;
      r.forEach((k,ci)=>{
        const kx=kx0+ci*(kw+2),ky=kbY-ri*(kh+3);
        const act=items.some(it=>it.ch===k);
        GX.shadowColor=act?"#3c8fff":"transparent";GX.shadowBlur=act?10:0;
        rr(kx,ky,kw,kh,3,act?"rgba(40,110,255,.25)":"rgba(255,255,255,.05)",act?"rgba(40,110,255,.6)":"rgba(255,255,255,.12)");
        GX.fillStyle=act?"#7dd8ff":"rgba(255,255,255,.4)";GX.font="bold 11px 'Share Tech Mono',monospace";GX.textAlign="center";
        GX.fillText(k,kx+kw/2,ky+kh/2+4);GX.shadowBlur=0;
      });
    });

    if(mt>0){mt--;GX.fillStyle=msg.startsWith("✅")?"rgba(125,216,255,.85)":"rgba(255,110,110,.85)";GX.font="11px 'Share Tech Mono',monospace";GX.textAlign="center";GX.fillText(msg,GW/2,kbY-70);}

    // tap
    if(!GC._t1){GC._t1=true;GC.addEventListener("click",e=>{
      const r=GC.getBoundingClientRect();const cx=(e.clientX-r.left)*(GW/r.width),cy=(e.clientY-r.top)*(GH/r.height);
      const kbY2=GH-54;const row2="QWERTYUIOPASDFGHJKLZXCVBNM".split("");
      const kw2=28,kh2=24;const rows2=[row2.slice(0,10),row2.slice(10,19),row2.slice(19)];
      rows2.forEach((rw,ri)=>{
        const rw2w=rw.length*(kw2+2)-2;const kx0=(GW-rw2w)/2;
        rw.forEach((k,ci)=>{
          const kx=kx0+ci*(kw2+2),ky=kbY2-ri*(kh2+3);
          if(cx>kx&&cx<kx+kw2&&cy>ky&&cy<ky+kh2)document.dispatchEvent(new KeyboardEvent("keydown",{key:k,bubbles:true}));
        });
      });
    });}

    if(score>0&&score%60===0&&lvl<6){lvl++;speed+=(lvl<4?.15:.3);spawnInterval=Math.max(22,spawnInterval-8);setLvlPill(lvl);}
    if(lives<=0){stopGame();document.removeEventListener("keydown",_kb);gOver(score,"Remember AE terms!");}
  }
  gRun=true;loop();
}

/* ====================================================
   ██████╗ AE GAME 3 — LAYER SORTER
   Кликай слои в правильном порядке AE pipeline
   Учишься: правильный порядок процессов в AE
===================================================== */
function startAEG3(){
  const levels=[
    {title:{ru:"Порядок создания анимации",en:"Animation Creation Order"},
     hint:{ru:"Сначала Comp → медиа → слои → кейфреймы → плавность → рендер",en:"Start with Comp → media → layers → keyframes → ease → render"},
     items:["1. Composition","2. Import Media","3. Add Layers","4. Set Keyframes","5. Easy Ease","6. Render"],
     tip:{ru:"✅ Так создаётся любая AE анимация!",en:"✅ This is how every AE animation is made!"}},
    {title:{ru:"Параметры — от простого к сложному",en:"Parameters — Easiest to Hardest"},
     hint:{ru:"Opacity → проще всего, Expression → самый сложный",en:"Opacity → easiest, Expression → most advanced"},
     items:["Opacity","Scale","Position","Rotation","Anchor Point","Expression"],
     tip:{ru:"✅ Opacity — простой, Expression — продвинутый",en:"✅ Opacity = simple, Expression = advanced"}},
    {title:{ru:"Типы слоёв AE",en:"AE Layer Types"},
     hint:{ru:"Solid — базовый, Camera — продвинутый слой",en:"Solid = basic layer, Camera = advanced layer"},
     items:["Solid","Shape Layer","Text Layer","Null Object","Adjustment Layer","Camera"],
     tip:{ru:"✅ Каждый тип слоя имеет своё назначение!",en:"✅ Each layer type has its own purpose!"}},
    {title:{ru:"Ключевые инструменты AE",en:"Key AE Tools"},
     hint:{ru:"Timeline — основа работы, Render Queue — финальный шаг",en:"Timeline is the core, Render Queue is the final step"},
     items:["Timeline","Composition","Graph Editor","Effects & Presets","Render Queue"],
     tip:{ru:"✅ Эти панели — ядро After Effects",en:"✅ These panels are the core of After Effects"}},
  ];
  let lvlIdx=0,score=0,lives=3,g3ErrCount=0;
  sScore(0);sLives(3);setLvlPill(1);

  function startLevel(){
    const lv=levels[lvlIdx%levels.length];
    const items=[...lv.items].sort(()=>Math.random()-.5);
    let selected=[],done=false,msg="",mt=0,showCorrect=false,showTimer=0;

    const lvTitle=lv.title[lang]||lv.title.ru;
    const lvHint=lv.hint[lang]||lv.hint.ru;
    const lvTip=lv.tip[lang]||lv.tip.ru;
    const lvInst=lang==="ru"?"Кликай в правильном порядке →":"Click in the correct order →";
    const showHint=g3ErrCount>=2;

    function draw(){
      if(!gRun)return; gAnim=requestAnimationFrame(draw);
      if(mt>0)mt--;
      if(showCorrect){showTimer++;if(showTimer>90){showCorrect=false;showTimer=0;startLevel();return;}}
      GX.clearRect(0,0,GW,GH);
      const bg=GX.createLinearGradient(0,0,0,GH);bg.addColorStop(0,"#060d18");bg.addColorStop(1,"#0a1628");GX.fillStyle=bg;GX.fillRect(0,0,GW,GH);

      GX.fillStyle="#7dd8ff";GX.font="bold 11px 'Orbitron',monospace";GX.textAlign="center";
      GX.shadowColor="#3c8fff";GX.shadowBlur=8;GX.fillText(lvTitle.toUpperCase(),GW/2,22);GX.shadowBlur=0;
      GX.fillStyle="rgba(100,170,255,.3)";GX.font="9px 'Share Tech Mono',monospace";
      GX.fillText(lvInst,GW/2,36);

      // hint panel after 2 errors
      const topY=showHint?72:46;
      if(showHint){
        rr(10,42,GW-20,24,5,"rgba(255,200,0,.07)","rgba(255,200,0,.28)");
        GX.fillStyle="rgba(255,215,0,.75)";GX.font="9px 'Share Tech Mono',monospace";GX.textAlign="center";
        GX.fillText("💡 "+lvHint,GW/2,58);
      }

      const iH=40,iGap=6,totalH=items.length*(iH+iGap)-iGap;
      const startY=topY+(GH-topY-60-totalH)/2;

      items.forEach((item,i)=>{
        const y=startY+i*(iH+iGap);
        const isSelected=selected.includes(item);
        const selIdx=selected.indexOf(item);
        const isCorrect=showCorrect&&lv.items[selIdx]===item;
        const isWrong=showCorrect&&isSelected&&!isCorrect;
        let fill,stroke;
        if(isCorrect){fill="rgba(0,255,100,.2)";stroke="#00ff88";}
        else if(isWrong){fill="rgba(255,50,50,.2)";stroke="#ff4444";}
        else if(isSelected){fill="rgba(40,110,255,.25)";stroke="rgba(60,140,255,.7)";}
        else{fill="rgba(255,255,255,.04)";stroke="rgba(100,170,255,.2)";}
        rr(20,y,GW-40,iH,9,fill,stroke,isSelected?2:1);
        if(isSelected&&!showCorrect){
          GX.fillStyle="rgba(60,140,255,.5)";GX.font="bold 10px 'Orbitron',monospace";GX.textAlign="left";
          GX.fillText((selIdx+1)+".",26,y+iH/2+4);
        }
        const prefix=isCorrect?"✅ ":isWrong?"❌ ":"";
        GX.fillStyle=isCorrect?"#00ff88":isWrong?"#ff6060":isSelected?"#fff":"rgba(200,220,255,.8)";
        GX.font="10px 'Share Tech Mono',monospace";GX.textAlign="left";
        GX.fillText(prefix+item,isSelected?42:28,y+iH/2+4);
        if(!isSelected){GX.fillStyle="rgba(100,170,255,.2)";GX.textAlign="right";GX.font="10px serif";GX.fillText("▶",GW-24,y+iH/2+4);}
      });

      if(selected.length>0&&!showCorrect){
        GX.fillStyle="rgba(100,170,255,.3)";GX.font="9px 'Orbitron',monospace";GX.textAlign="left";
        GX.fillText((lang==="ru"?"Порядок: ":"Order: ")+selected.map((_,ii)=>ii+1).join("→"),16,GH-10);
      }
      if(mt>0&&!showCorrect){GX.fillStyle=msg.startsWith("✅")?"rgba(125,216,255,.9)":"rgba(255,110,110,.9)";GX.font="bold 11px 'Share Tech Mono',monospace";GX.textAlign="center";GX.fillText(msg,GW/2,GH-24);}
      if(showCorrect){
        GX.fillStyle="rgba(0,0,0,.55)";GX.fillRect(0,GH-44,GW,44);
        GX.fillStyle="#7dd8ff";GX.font="bold 11px 'Share Tech Mono',monospace";GX.textAlign="center";
        GX.shadowColor="#3c8fff";GX.shadowBlur=6;GX.fillText(lvTip,GW/2,GH-24);GX.shadowBlur=0;
        GX.fillStyle="rgba(0,255,100,.6)";GX.font="9px 'Orbitron',monospace";
        GX.fillText(lang==="ru"?"✅ ВЕРНО! +20":"✅ CORRECT! +20",GW/2,GH-8);
      }
    }

    GC.onclick=e=>{
      if(showCorrect||done) return;
      const r=GC.getBoundingClientRect();const cy=(e.clientY-r.top)*(GH/r.height);
      const iH2=40,iGap2=6,totalH2=items.length*(iH2+iGap2)-iGap2;
      const topY2=showHint?72:46;
      const startY2=topY2+(GH-topY2-60-totalH2)/2;
      items.forEach((item,i)=>{
        const y=startY2+i*(iH2+iGap2);
        if(cy>y&&cy<y+iH2&&!selected.includes(item)) selected.push(item);
      });
      if(selected.length===items.length){
        let ok=true;
        selected.forEach((item,i)=>{if(item!==lv.items[i])ok=false;});
        if(ok){score+=20;sScore(score);showCorrect=true;g3ErrCount=0;lvlIdx++;setLvlPill(Math.min(lvlIdx+1,6));spawnAEP();}
        else{lives--;sLives(lives);g3ErrCount++;msg=lang==="ru"?"❌ Не тот порядок":"❌ Wrong order";mt=65;selected=[];if(lives<=0){stopGame();gOver(score,"Learn AE order!");}}
      }
    };
    gRun=true;draw();
  }
  startLevel();
}

/* ====================================================
   ██████╗ AE GAME 4 — REACTION — Press the param!
   Появляется название — нажимай горячую клавишу!
   Учишься: горячие клавиши Position/Scale/Rotation/Opacity/Time
===================================================== */
function startAEG4(){
  const params=[
    {name:"POSITION",key:"P",color:"#3c8fff",desc:"P — позиция слоя"},
    {name:"SCALE",key:"S",color:"#7dd8ff",desc:"S — масштаб слоя"},
    {name:"ROTATION",key:"R",color:"#c8b4ff",desc:"R — поворот слоя"},
    {name:"OPACITY",key:"T",color:"#80d4ff",desc:"T — прозрачность (не O!)"},
    {name:"ANCHOR",key:"A",color:"#00cfff",desc:"A — точка привязки"},
  ];
  let score=0,lives=3,lvl=1,current=null,timer=0,maxTimer=200,streak=0;
  sScore(0);sLives(3);setLvlPill(1);
  let msg="",mt=0;

  function nextParam(){current=params[Math.floor(Math.random()*params.length)];timer=maxTimer;}

  _kb=e=>{
    if(!gRun||!current)return;
    if(e.key.toUpperCase()===current.key){
      score+=10+streak*2;sScore(score);streak++;msg="✅ "+current.desc;mt=70;spawnAEP();nextParam();
    } else if(e.key.length===1&&e.key.match(/[a-zA-Z]/)){
      lives--;sLives(lives);streak=0;msg="❌ Нет! "+current.name+" = ["+current.key+"]";mt=70;nextParam();
    }
  };
  document.addEventListener("keydown",_kb);
  nextParam();

  // on-screen buttons
  function loop(){
    if(!gRun){document.removeEventListener("keydown",_kb);return;}
    gAnim=requestAnimationFrame(loop);
    if(mt>0)mt--;
    timer--;
    if(timer<=0){lives--;sLives(lives);streak=0;msg="⏰ Слишком медленно!";mt=65;nextParam();}

    GX.clearRect(0,0,GW,GH);
    const bg=GX.createLinearGradient(0,0,0,GH);bg.addColorStop(0,"#060d18");bg.addColorStop(1,"#0a1628");GX.fillStyle=bg;GX.fillRect(0,0,GW,GH);

    // Timer arc
    const cx2=GW/2,cy2=130,rad=55;
    GX.beginPath();GX.arc(cx2,cy2,rad,0,Math.PI*2);GX.strokeStyle="rgba(255,255,255,.07)";GX.lineWidth=8;GX.stroke();
    GX.beginPath();GX.arc(cx2,cy2,rad,-Math.PI/2,-Math.PI/2+Math.PI*2*(timer/maxTimer));
    GX.strokeStyle=current?current.color:"#3c8fff";GX.lineWidth=8;GX.lineCap="round";GX.stroke();

    if(current){
      GX.fillStyle=current.color;GX.font="bold 28px 'Orbitron',monospace";GX.textAlign="center";GX.shadowColor=current.color;GX.shadowBlur=20;
      GX.fillText(current.name,cx2,cy2+8);GX.shadowBlur=0;
      GX.fillStyle="rgba(255,255,255,.35)";GX.font="10px 'Share Tech Mono',monospace";
      GX.fillText("Нажми горячую клавишу!",cx2,cy2+30);
    }
    GX.fillStyle="rgba(255,200,0,.5)";GX.font="10px 'Orbitron',monospace";GX.textAlign="center";
    GX.fillText("🔥 Streak: "+streak,cx2,cy2-70);

    // 5 buttons
    const bW=68,bH=56,bGap=8;const totalBW=params.length*(bW+bGap)-bGap;const bx0=(GW-totalBW)/2;
    params.forEach((p,i)=>{
      const bx=bx0+i*(bW+bGap),by=230;
      const isActive=current&&p.name===current.name;
      GX.shadowColor=p.color;GX.shadowBlur=isActive?20:0;
      rr(bx,by,bW,bH,10,isActive?p.color+"33":"rgba(255,255,255,.05)",p.color+(isActive?"dd":"44"),isActive?2:1);
      GX.fillStyle=isActive?p.color:"rgba(255,255,255,.5)";
      GX.font="bold 18px 'Orbitron',monospace";GX.textAlign="center";
      GX.fillText("["+p.key+"]",bx+bW/2,by+bH/2-4);GX.font="8px 'Orbitron',monospace";
      GX.fillText(p.name.slice(0,4),bx+bW/2,by+bH/2+12);GX.shadowBlur=0;
    });

    // Tap buttons
    if(!GC._t4){GC._t4=true;GC.addEventListener("click",e=>{
      const r=GC.getBoundingClientRect();const cx3=(e.clientX-r.left)*(GW/r.width),cy3=(e.clientY-r.top)*(GH/r.height);
      const bW2=68,bH2=56,bGap2=8;const totalBW2=params.length*(bW2+bGap2)-bGap2;const bx02=(GW-totalBW2)/2;
      params.forEach((p,i)=>{
        const bx=bx02+i*(bW2+bGap2),by=230;
        if(cx3>bx&&cx3<bx+bW2&&cy3>by&&cy3<by+bH2)document.dispatchEvent(new KeyboardEvent("keydown",{key:p.key,bubbles:true}));
      });
    });}

    // Hint list
    GX.fillStyle="rgba(255,255,255,.22)";GX.font="10px 'Share Tech Mono',monospace";GX.textAlign="left";
    params.forEach((p,i)=>{GX.fillStyle=p.color+"88";GX.fillText("["+p.key+"] "+p.name+" — "+p.desc.split("—")[1] ? p.desc.split("—")[1].trim() : p.desc,20,325+i*18);});

    if(mt>0){GX.fillStyle=msg.startsWith("✅")?"rgba(125,216,255,.9)":"rgba(255,110,110,.9)";GX.font="bold 11px 'Share Tech Mono',monospace";GX.textAlign="center";GX.fillText(msg,GW/2,GH-12);}

    if(score>0&&score%50===0&&lvl<6){lvl++;maxTimer=Math.max(80,maxTimer-15);setLvlPill(lvl);}
    if(lives<=0){stopGame();document.removeEventListener("keydown",_kb);gOver(score,"Know your hotkeys!");}
  }
  gRun=true;loop();
}


/* ====================================================
   AE GAME 5 — MOTION BUILDER 🎭
   Собери правильные инструменты для эффекта
   Понимаешь: какие параметры нужны для каждого эффекта
===================================================== */
function startAEG5(){
  const tasks=[
    {goal:{ru:"Сделай объект исчезающим",en:"Fade out an object"},
     correct:["OPACITY","KEYFRAME"],
     pool:["OPACITY","KEYFRAME","ROTATION","SCALE","POSITION","MASK"],
     explain:{ru:"Opacity 100%→0% + два кейфрейма = плавное исчезновение",en:"Opacity 100%→0% + two keyframes = smooth fade out"}},
    {goal:{ru:"Анимируй движение слева направо",en:"Move object left to right"},
     correct:["POSITION","KEYFRAME"],
     pool:["POSITION","KEYFRAME","OPACITY","MASK","ROTATION","EXPRESSION"],
     explain:{ru:"Position X: начало → конец + кейфреймы = движение",en:"Position X: start → end + keyframes = movement"}},
    {goal:{ru:"Создай случайное дрожание (без кейфреймов!)",en:"Create random shake (no keyframes!)"},
     correct:["EXPRESSION","WIGGLE"],
     pool:["EXPRESSION","WIGGLE","KEYFRAME","SCALE","MASK","ROTATION"],
     explain:{ru:"wiggle(5,20) в поле Position — дрожание без единого кейфрейма!",en:"wiggle(5,20) in Position field — shake with zero keyframes!"}},
    {goal:{ru:"Скрой часть слоя по форме",en:"Hide part of layer by shape"},
     correct:["MASK","SHAPE LAYER"],
     pool:["MASK","SHAPE LAYER","OPACITY","EXPRESSION","ROTATION","KEYFRAME"],
     explain:{ru:"Mask обрезает видимую область слоя по форме",en:"Mask clips the visible area of a layer by shape"}},
    {goal:{ru:"Плавная (не роботичная) анимация",en:"Smooth (non-robotic) animation"},
     correct:["EASY EASE","GRAPH EDITOR"],
     pool:["EASY EASE","GRAPH EDITOR","WIGGLE","MASK","PRE-COMP","KEYFRAME"],
     explain:{ru:"Easy Ease (F9) + Graph Editor = живое физическое движение",en:"Easy Ease (F9) + Graph Editor = alive, physical movement"}},
    {goal:{ru:"Один эффект применить ко ВСЕМУ проекту",en:"Apply ONE effect to the ENTIRE project"},
     correct:["ADJUSTMENT LAYER","EFFECT"],
     pool:["ADJUSTMENT LAYER","EFFECT","NULL OBJECT","MASK","KEYFRAME","SOLID"],
     explain:{ru:"Adjustment Layer: один эффект → применяется ко всем слоям ниже",en:"Adjustment Layer: one effect → applies to all layers below"}},
  ];
  let tIdx=0,score=0,lives=3;
  sScore(0);sLives(3);setLvlPill(1);

  function doTask(){
    const task=tasks[tIdx%tasks.length];
    const needed=task.correct.length;
    let chosen=[],showR=false,rTimer=0,msg="",mt=0;
    const TW=116,TH=34,TG=5,COLS=3;
    const gridW=COLS*(TW+TG)-TG;

    function draw(){
      if(!gRun)return;gAnim=requestAnimationFrame(draw);if(mt>0)mt--;
      if(showR){rTimer++;if(rTimer>110){showR=false;rTimer=0;tIdx++;setLvlPill(Math.min(tIdx+1,6));doTask();return;}}
      GX.clearRect(0,0,GW,GH);
      const gbg=GX.createLinearGradient(0,0,0,GH);gbg.addColorStop(0,"#060d18");gbg.addColorStop(1,"#081c38");GX.fillStyle=gbg;GX.fillRect(0,0,GW,GH);

      // Header
      const goalTxt=task.goal[lang]||task.goal.ru;
      GX.fillStyle="#7dd8ff";GX.font="bold 10px 'Orbitron',monospace";GX.textAlign="center";
      GX.shadowColor="#3c8fff";GX.shadowBlur=8;
      GX.fillText((lang==="ru"?"🎯 ЗАДАЧА: ":"🎯 GOAL: ")+goalTxt.toUpperCase(),GW/2,16);GX.shadowBlur=0;
      GX.fillStyle="rgba(100,170,255,.32)";GX.font="9px 'Share Tech Mono',monospace";
      GX.fillText(lang==="ru"?"Выбери "+needed+" нужных инструмента (кликни):":"Select "+needed+" correct tools (click):",GW/2,30);

      // Chosen bar
      rr(10,36,GW-20,30,6,"rgba(30,100,255,.06)","rgba(30,100,255,.15)");
      GX.fillStyle="rgba(100,170,255,.3)";GX.font="8px 'Orbitron',monospace";GX.textAlign="left";
      GX.fillText((lang==="ru"?"ВЫБРАНО ":"CHOSEN ")+chosen.length+"/"+needed+":",16,50);
      chosen.forEach((t,ii)=>{
        rr(16+ii*85,52,80,12,3,"rgba(60,140,255,.3)","#3c8fff");
        GX.fillStyle="#7dd8ff";GX.font="bold 7px 'Share Tech Mono',monospace";GX.textAlign="center";
        GX.fillText(t,16+ii*85+40,62);
      });

      // Token grid
      const gx0=(GW-gridW)/2,gy0=76;
      task.pool.forEach((tok,ii)=>{
        const col=ii%COLS,row=Math.floor(ii/COLS);
        const tx=gx0+col*(TW+TG),ty=gy0+row*(TH+TG);
        const isCh=chosen.includes(tok);
        const isCor=showR&&task.correct.includes(tok);
        const isWr=showR&&isCh&&!task.correct.includes(tok);
        const f2=isCor&&isCh?"rgba(0,255,100,.22)":isWr?"rgba(255,60,60,.18)":isCh?"rgba(60,140,255,.22)":"rgba(255,255,255,.04)";
        const s2=isCor&&isCh?"#00ff88":isWr?"#ff4444":isCh?"#3c8fff":"rgba(100,170,255,.2)";
        rr(tx,ty,TW,TH,7,f2,s2,isCh?2:1);
        GX.fillStyle=isCh?"#7dd8ff":isCor?"#00ff88":"rgba(200,220,255,.7)";
        GX.font="bold 9px 'Share Tech Mono',monospace";GX.textAlign="center";
        GX.fillText((showR&&task.correct.includes(tok)?"✅ ":"")+tok,tx+TW/2,ty+TH/2+4);
      });

      if(showR){
        GX.fillStyle="rgba(0,0,0,.6)";GX.fillRect(0,GH-60,GW,60);
        GX.fillStyle="#7dd8ff";GX.font="10px 'Share Tech Mono',monospace";GX.textAlign="center";
        GX.shadowColor="#3c8fff";GX.shadowBlur=5;
        GX.fillText(task.explain[lang]||task.explain.ru,GW/2,GH-36);GX.shadowBlur=0;
        GX.fillStyle="rgba(0,255,100,.7)";GX.font="10px 'Orbitron',monospace";
        GX.fillText(lang==="ru"?"✅ ВЕРНО! +20":"✅ CORRECT! +20",GW/2,GH-16);
      }
      if(mt>0&&!showR){GX.fillStyle="rgba(255,110,110,.9)";GX.font="10px 'Share Tech Mono',monospace";GX.textAlign="center";GX.fillText(msg,GW/2,GH-8);}
    }

    GC.onclick=e=>{
      if(showR)return;
      const r2=GC.getBoundingClientRect();
      const cx2=(e.clientX-r2.left)*(GW/r2.width),cy2=(e.clientY-r2.top)*(GH/r2.height);
      const gx02=(GW-gridW)/2,gy02=76;
      task.pool.forEach((tok,ii)=>{
        const col=ii%COLS,row=Math.floor(ii/COLS);
        const tx=gx02+col*(TW+TG),ty=gy02+row*(TH+TG);
        if(cx2>tx&&cx2<tx+TW&&cy2>ty&&cy2<ty+TH){
          if(chosen.includes(tok))chosen=chosen.filter(x=>x!==tok);
          else if(chosen.length<needed)chosen.push(tok);
        }
      });
      if(chosen.length===needed){
        if(task.correct.every(cc=>chosen.includes(cc))){score+=20;sScore(score);showR=true;spawnAEP();}
        else{lives--;sLives(lives);msg=lang==="ru"?"❌ Не те инструменты — попробуй снова":"❌ Wrong tools — try again";mt=75;chosen=[];}
        if(lives<=0){stopGame();gOver(score,lang==="ru"?"Учи параметры AE!":"Learn AE parameters!");}
      }
    };
    gRun=true;draw();
  }
  doTask();
}

/* ====================================================
   ██████╗ DEV GAME 1 — BUG HUNT
   Ловишь правильный код, уворачиваешься от багов
   Учишься: различать синтаксически верный код от ошибок
===================================================== */
function startDEVG1(){
  const good=[
    {s:"function()",c:"#00ff88",d:"функция"},
    {s:"const x=1",c:"#7CFFB2",d:"константа"},
    {s:"return v",c:"#00e5ff",d:"возврат значения"},
    {s:"if(ok){}",c:"#60e8ff",d:"условие"},
    {s:".map(fn)",c:"#80ff60",d:"метод массива"},
    {s:"async fn",c:"#40ffcc",d:"асинхр. функция"},
    {s:"let i=0",c:"#7CFFB2",d:"переменная"},
    {s:"arr.push",c:"#00ff88",d:"добавить в массив"},
  ];
  const bad=[
    {s:"null ref",c:"#ff3c3c",d:"NullPointerError"},
    {s:"undefind",c:"#ff6600",d:"опечатка"},
    {s:"SyntaxErr",c:"#ff2222",d:"синтаксис!"},
    {s:"🐛bug",c:"#ff4444",d:"баг!"},
    {s:"var leak",c:"#ff8800",d:"var устарел"},
  ];
  let items=[],frame=0,score=0,lives=3,lvl=1,speed=1.8,px={x:GW/2-40,w:80};
  sScore(0);sLives(3);setLvlPill(1);pX=GW/2;
  let msg="",mt=0;

  function loop(){
    if(!gRun)return;gAnim=requestAnimationFrame(loop);frame++;
    GX.clearRect(0,0,GW,GH);GX.fillStyle="#020c06";GX.fillRect(0,0,GW,GH);
    for(let y=0;y<GH;y+=4){GX.fillStyle="rgba(0,0,0,.07)";GX.fillRect(0,y,GW,2);}
    GX.strokeStyle="rgba(0,255,100,.04)";GX.lineWidth=1;
    for(let x=0;x<GW;x+=32){GX.beginPath();GX.moveTo(x,0);GX.lineTo(x,GH);GX.stroke();}
    for(let y=0;y<GH;y+=32){GX.beginPath();GX.moveTo(0,y);GX.lineTo(GW,y);GX.stroke();}

    if(frame%Math.max(26,55-score*.2)===0){
      const pool=[...good,...good,...bad];
      const pk=pool[Math.floor(Math.random()*pool.length)];
      items.push({...pk,x:14+Math.random()*(GW-100),y:-28,g:good.includes(pk),sp:speed+Math.random()*1.4});
    }
    items=items.filter(it=>{
      it.y+=it.sp;
      const tw=it.s.length*7.2+14;
      GX.shadowColor=it.c;GX.shadowBlur=it.g?8:15;
      rr(it.x,it.y,tw,22,4,it.g?"rgba(0,255,100,.1)":"rgba(255,40,40,.12)",it.c+"77");
      GX.fillStyle=it.c;GX.font="bold 11px 'Share Tech Mono',monospace";GX.textAlign="left";
      GX.fillText(it.s,it.x+7,it.y+15);GX.shadowBlur=0;
      GX.fillStyle=it.c+"55";GX.font="8px 'Share Tech Mono',monospace";
      GX.fillText(it.d,it.x+4,it.y+25);
      const py2=GH-30;
      if(it.y>py2-6&&it.y<py2+px.h+8&&it.x+tw/2>px.x&&it.x+tw/2<px.x+px.w){
        if(it.g){score+=15;sScore(score);msg="✅ "+it.s+" — "+it.d;mt=75;spawnAEP();}
        else{lives--;sLives(lives);msg="❌ "+it.s+" — "+it.d;mt=60;devGlitch();}
        return false;
      }
      if(it.y>GH+20){if(it.g){lives--;sLives(lives);}return false;}
      return true;
    });
    px.h=px.h||8;
    px.x+=(pX-px.w/2-px.x)*.2;px.x=Math.max(0,Math.min(GW-px.w,px.x));
    const py2=GH-30;
    GX.fillStyle="#00ff88";GX.shadowColor="#00ff88";GX.shadowBlur=16;
    GX.fillRect(px.x,py2,px.w,8);
    GX.fillStyle="#fff";GX.shadowBlur=4;GX.fillRect(px.x+px.w/2-1,py2-4,2,4);GX.shadowBlur=0;
    GX.fillStyle="rgba(0,255,100,.38)";GX.font="9px 'Share Tech Mono',monospace";GX.textAlign="left";
    GX.fillText("✅ CATCH: function const let if .map() return async",5,12);
    GX.fillStyle="rgba(255,80,80,.45)";GX.fillText("❌ DODGE: null SyntaxErr undefined 🐛 var-leak",5,24);
    if(mt>0){mt--;GX.fillStyle=msg.startsWith("✅")?"rgba(0,255,136,.85)":"rgba(255,110,110,.85)";GX.font="11px 'Share Tech Mono',monospace";GX.textAlign="center";GX.fillText(msg,GW/2,GH-5);}
    if(score>0&&score%100===0&&lvl<6){lvl++;speed+=.25;setLvlPill(lvl);}
    if(lives<=0){stopGame();gOver(score,"Keep the code clean!");}
  }
  gRun=true;loop();
}

/* ====================================================
   ██████╗ DEV GAME 2 — FILL THE CODE
   Падают символы JS/Python/CSS/HTML — жми нужный!
   Учишься: синтаксис реальных языков
===================================================== */
function startDEVG2(){
  const langs=[
    {name:"JavaScript",color:"#ffd060",items:[
      {ch:"function",hint:"объявление функции"},
      {ch:"const",hint:"константа (не меняется)"},
      {ch:"let",hint:"переменная (меняется)"},
      {ch:"return",hint:"возврат значения"},
      {ch:"if()",hint:"условие"},
      {ch:"=>",hint:"стрелочная функция"},
      {ch:".map()",hint:"метод массива"},
      {ch:"async",hint:"асинхронность"},
    ]},
    {name:"CSS",color:"#60e8ff",items:[
      {ch:"display",hint:"тип отображения элемента"},
      {ch:"flex",hint:"flexbox раскладка"},
      {ch:"margin",hint:"внешний отступ"},
      {ch:"padding",hint:"внутренний отступ"},
      {ch:"color",hint:"цвет текста"},
      {ch:"border",hint:"граница элемента"},
    ]},
    {name:"HTML",color:"#ff8060",items:[
      {ch:"<div>",hint:"блочный элемент"},
      {ch:"<p>",hint:"параграф текста"},
      {ch:"<h1>",hint:"заголовок 1 уровня"},
      {ch:"<img>",hint:"изображение"},
      {ch:"<a>",hint:"ссылка"},
      {ch:"<button>",hint:"кнопка"},
    ]},
    {name:"Python",color:"#80ff60",items:[
      {ch:"def",hint:"объявление функции"},
      {ch:"print()",hint:"вывод в консоль"},
      {ch:"if:",hint:"условие"},
      {ch:"for",hint:"цикл"},
      {ch:"list()",hint:"создать список"},
      {ch:"return",hint:"возврат значения"},
    ]},
  ];
  let langIdx=0,items=[],frame=0,score=0,lives=3,lvl=1,speed=0.65;
  sScore(0);sLives(3);setLvlPill(1);
  let curLang=langs[0],pool=[...curLang.items];
  let msg="",mt=0,lastHint="";

  _kb=e=>{
    if(!gRun)return;
    const key=e.key;
    let hit=false;
    items=items.filter(it=>{
      if(!hit&&it.y>40){
        const match=it.token.toLowerCase().startsWith(key.toLowerCase())||it.token===key;
        if(match){hit=true;score+=10;sScore(score);lastHint=it.hint;msg="✅ "+it.token+" — "+it.hint;mt=80;spawnAEP();return false;}
      }
      return true;
    });
    if(!hit&&key.length===1){lives--;sLives(lives);msg="❌ Не то — смотри на токен!";mt=50;devGlitch();}
  };
  document.addEventListener("keydown",_kb);

  function loop(){
    if(!gRun){document.removeEventListener("keydown",_kb);return;}
    gAnim=requestAnimationFrame(loop);frame++;
    GX.clearRect(0,0,GW,GH);GX.fillStyle="#020c06";GX.fillRect(0,0,GW,GH);
    for(let y=0;y<GH;y+=4){GX.fillStyle="rgba(0,0,0,.07)";GX.fillRect(0,y,GW,2);}

    if(frame%Math.max(28,88-score*.22)===0){
      // switch lang every 60 score
      langIdx=Math.floor(score/60)%langs.length;curLang=langs[langIdx];pool=[...curLang.items];
      const pk=pool[Math.floor(Math.random()*pool.length)];
      items.push({token:pk.ch,hint:pk.hint,x:20+Math.random()*(GW-120),y:-35,sp:speed+Math.random()*1.2,col:curLang.color});
    }
    items=items.filter(it=>{
      it.y+=it.sp;
      const tw=it.token.length*9+16;
      GX.shadowColor=it.col;GX.shadowBlur=12;
      rr(it.x,it.y,tw,26,5,it.col+"15",it.col+"88");
      GX.fillStyle=it.col;GX.font="bold 13px 'Share Tech Mono',monospace";GX.textAlign="left";
      GX.fillText(it.token,it.x+8,it.y+18);GX.shadowBlur=0;
      GX.fillStyle=it.col+"66";GX.font="8px 'Share Tech Mono',monospace";
      GX.fillText(it.hint,it.x+4,it.y+28);
      if(it.y>GH-72){lives--;sLives(lives);devGlitch();return false;}
      return true;
    });

    // Lang indicator
    GX.fillStyle=curLang.color;GX.font="bold 12px 'Orbitron',monospace";GX.textAlign="center";
    GX.shadowColor=curLang.color;GX.shadowBlur=12;
    GX.fillText("[ "+curLang.name+" ]",GW/2,22);GX.shadowBlur=0;
    // Progress to next lang
    GX.fillStyle="rgba(255,255,255,.2)";GX.font="9px 'Share Tech Mono',monospace";
    GX.fillText("смена языка через "+(60-(score%60))+" очков",GW/2,36);

    // on-screen keyboard (first char of each token)
    const kbY2=GH-56;
    const uniqueKeys=[...new Set(curLang.items.map(it=>it.ch[0].toLowerCase()))];
    const kw=46,kh=28;const rw2=uniqueKeys.length*(kw+4)-4;const kx0=(GW-rw2)/2;
    uniqueKeys.forEach((k,i)=>{
      const kx=kx0+i*(kw+4),ky=kbY2;
      const active=items.some(it=>it.token.toLowerCase().startsWith(k));
      GX.shadowColor=active?curLang.color:"transparent";GX.shadowBlur=active?12:0;
      rr(kx,ky,kw,kh,5,active?curLang.color+"20":"rgba(255,255,255,.05)",active?curLang.color+"88":"rgba(255,255,255,.15)");
      GX.fillStyle=active?curLang.color:"rgba(255,255,255,.4)";
      GX.font="bold 12px 'Share Tech Mono',monospace";GX.textAlign="center";
      GX.fillText(k,kx+kw/2,ky+kh/2+4);GX.shadowBlur=0;
    });

    if(!GC._t2){GC._t2=true;GC.addEventListener("click",e=>{
      const r=GC.getBoundingClientRect();const cx2=(e.clientX-r.left)*(GW/r.width),cy2=(e.clientY-r.top)*(GH/r.height);
      const kbY3=GH-56;const uq=[...new Set(curLang.items.map(it=>it.ch[0].toLowerCase()))];
      const kw2=46,kh2=28;const rw3=uq.length*(kw2+4)-4;const kx02=(GW-rw3)/2;
      uq.forEach((k,i)=>{const kx=kx02+i*(kw2+4),ky=kbY3;if(cx2>kx&&cx2<kx+kw2&&cy2>ky&&cy2<ky+kh2)document.dispatchEvent(new KeyboardEvent("keydown",{key:k,bubbles:true}));});
    });}

    if(mt>0){mt--;GX.fillStyle=msg.startsWith("✅")?"rgba(0,255,136,.85)":"rgba(255,110,110,.85)";GX.font="11px 'Share Tech Mono',monospace";GX.textAlign="center";GX.fillText(msg,GW/2,kbY2-12);}
    GX.fillStyle="rgba(0,255,100,.28)";GX.font="9px 'Share Tech Mono',monospace";GX.textAlign="center";
    GX.fillText("жми первую букву токена!",GW/2,GH-4);
    if(score>0&&score%60===0&&lvl<6){lvl++;speed+=(lvl<4?.18:.35);setLvlPill(lvl);}
    if(lives<=0){stopGame();document.removeEventListener("keydown",_kb);gOver(score,"Know your syntax!");}
  }
  gRun=true;loop();
}

/* ====================================================
   ██████╗ DEV GAME 3 — CODE SORTER
   Расставь строки кода в правильном порядке
   Учишься: структура функций, if/else, циклов
===================================================== */
function startDEVG3(){
  // correct order = lines array order (index 0,1,2... is the right order)
  const challenges=[
    {title:"Напиши функцию",hint:"Сначала объявление, потом тело, потом закрывающая скобка }",
     lines:["function greet(name) {","  return 'Hello, ' + name;","}"],
     tip:"✅ function greet → return → } | Функция: заголовок → тело → конец"},
    {title:"Условие if / else",hint:"if сначала, потом его тело, потом else с телом, потом закрыть",
     lines:["if (score > 10) {","  console.log('Winner!');","} else {","  console.log('Try again');","}"],
     tip:"✅ if → тело → else → тело → } | Сначала условие, потом ветки"},
    {title:"Цикл for",hint:"Сначала объявление цикла, потом тело, потом закрыть",
     lines:["for (let i = 0; i < 5; i++) {","  console.log(i);","}"],
     tip:"✅ for(init;cond;step) → тело → } | Цикл выполнит код 5 раз"},
    {title:"Массив + forEach",hint:"Сначала создай массив, потом вызови forEach с функцией внутри",
     lines:["const fruits = ['apple','banana'];","fruits.forEach(fruit => {","  console.log(fruit);","});"],
     tip:"✅ массив → .forEach() → тело → }); | forEach проходит по каждому элементу"},
    {title:"Async/Await функция",hint:"async объявление → fetch → .json() → return, всё по порядку",
     lines:["async function getData() {","  const res = await fetch(url);","  const data = await res.json();","  return data;","}"],
     tip:"✅ async fn → await fetch → await .json() → return | await ждёт результат"},
    {title:"Создай класс",hint:"class → constructor → метод",
     lines:["class Animal {","  constructor(name) {","    this.name = name;","  }","}"],
     tip:"✅ class → constructor → свойство → закрыть | Класс — шаблон объекта"},
  ];
  let lvlIdx=0,score=0,lives=3,errCount=0;
  sScore(0);sLives(3);setLvlPill(1);

  function startChallenge(){
    const ch=challenges[lvlIdx%challenges.length];
    // shuffle — correctOrder is simply origIdx === position in array
    const shuffled=[...ch.lines].map((l,i)=>({text:l,origIdx:i})).sort(()=>Math.random()-.5);
    let placed=[],msg="",mt=0,showOk=false,showTimer=0,showHint=false;

    function draw(){
      if(!gRun)return;gAnim=requestAnimationFrame(draw);
      if(mt>0)mt--;
      if(showOk){showTimer++;if(showTimer>110){showOk=false;showTimer=0;startChallenge();return;}}
      GX.clearRect(0,0,GW,GH);
      // bg
      const bg=GX.createLinearGradient(0,0,0,GH);bg.addColorStop(0,"#010b04");bg.addColorStop(1,"#020c06");GX.fillStyle=bg;GX.fillRect(0,0,GW,GH);
      for(let yy=0;yy<GH;yy+=3){GX.fillStyle="rgba(0,0,0,.05)";GX.fillRect(0,yy,GW,1);}

      // title
      GX.fillStyle="#00ff88";GX.font="bold 12px 'Orbitron',monospace";GX.textAlign="center";
      GX.shadowColor="#00ff88";GX.shadowBlur=10;
      GX.fillText(ch.title.toUpperCase(),GW/2,20);GX.shadowBlur=0;
      GX.fillStyle="rgba(0,255,100,.3)";GX.font="9px 'Share Tech Mono',monospace";
      GX.fillText("Кликай строки в правильном порядке ↓",GW/2,34);

      // hint box
      if(showHint||errCount>=2){
        rr(12,40,GW-24,28,6,"rgba(255,200,0,.08)","rgba(255,200,0,.3)");
        GX.fillStyle="rgba(255,220,0,.7)";GX.font="9px 'Share Tech Mono',monospace";GX.textAlign="center";
        GX.fillText("💡 "+ch.hint,GW/2,58);
      }

      const topY=(showHint||errCount>=2)?76:46;
      const iH=30,iGap=4;

      // placed area
      const pAreaH=placed.length>0?placed.length*(iH+iGap)+12:32;
      rr(10,topY,GW-20,pAreaH,8,"rgba(0,255,100,.05)","rgba(0,255,100,.18)");
      GX.fillStyle="rgba(0,255,100,.25)";GX.font="8px 'Orbitron',monospace";GX.textAlign="left";
      GX.fillText("YOUR CODE",18,topY+13);
      placed.forEach((item,i)=>{
        const isCorrect=showOk&&item.origIdx===i;
        const isWrong=showOk&&item.origIdx!==i;
        const fy=topY+18+i*(iH+iGap);
        rr(16,fy,GW-32,iH,5,
          isCorrect?"rgba(0,255,100,.22)":isWrong?"rgba(255,60,60,.18)":"rgba(0,255,100,.08)",
          isCorrect?"#00ff88":isWrong?"#ff4444":"rgba(0,255,100,.3)");
        GX.fillStyle=isCorrect?"#00ff88":isWrong?"#ff6060":"rgba(200,255,220,.75)";
        GX.font="10px 'Share Tech Mono',monospace";GX.textAlign="left";
        const prefix=isCorrect?"✅ ":isWrong?"❌ ":"   ";
        GX.fillText(prefix+item.text,24,fy+iH/2+4);
      });

      // available lines
      const avail=shuffled.filter(it=>!placed.includes(it));
      const startAvail=topY+pAreaH+10;
      avail.forEach((item,ii)=>{
        const yy=startAvail+ii*(iH+8);
        rr(14,yy,GW-28,iH,6,"rgba(255,255,255,.04)","rgba(0,255,100,.22)");
        // hover effect (approximate — highlight top item)
        GX.fillStyle="rgba(0,255,100,.75)";GX.font="10px 'Share Tech Mono',monospace";GX.textAlign="left";
        GX.fillText(item.text,22,yy+iH/2+4);
        // click hint arrow
        GX.fillStyle="rgba(0,255,100,.3)";GX.font="10px serif";GX.textAlign="right";
        GX.fillText("▶",GW-20,yy+iH/2+4);
      });

      // messages
      if(showOk){
        GX.fillStyle="rgba(0,0,0,.6)";GX.fillRect(0,GH-56,GW,56);
        GX.fillStyle="#00ff88";GX.font="bold 11px 'Share Tech Mono',monospace";GX.textAlign="center";
        GX.shadowColor="#00ff88";GX.shadowBlur=8;
        GX.fillText(ch.tip,GW/2,GH-28);GX.shadowBlur=0;
        GX.fillStyle="rgba(0,255,100,.5)";GX.font="9px 'Orbitron',monospace";
        GX.fillText("✅ ПРАВИЛЬНО! +20 очков",GW/2,GH-10);
      } else if(mt>0){
        GX.fillStyle=msg.startsWith("✅")?"rgba(0,255,136,.9)":"rgba(255,110,110,.9)";
        GX.font="bold 10px 'Share Tech Mono',monospace";GX.textAlign="center";
        GX.fillText(msg,GW/2,GH-6);
      }
    }

    GC.onclick=e=>{
      if(showOk)return;
      const r=GC.getBoundingClientRect();
      const cy2=(e.clientY-r.top)*(GH/r.height);
      const isHint=showHint||errCount>=2;
      const topY2=isHint?76:46;
      const iH2=30,iGap2=4;
      const pAreaH2=placed.length>0?placed.length*(iH2+iGap2)+12:32;
      const startAvail2=topY2+pAreaH2+10;
      const avail2=shuffled.filter(it=>!placed.includes(it));
      avail2.forEach((item,ii)=>{
        const yy=startAvail2+ii*(iH2+8);
        if(cy2>yy&&cy2<yy+iH2) placed.push(item);
      });
      if(placed.length===shuffled.length){
        // CORRECT check: placed[i].origIdx must equal i (original array order)
        let ok=true;
        placed.forEach((item,i)=>{if(item.origIdx!==i)ok=false;});
        if(ok){
          score+=20;sScore(score);showOk=true;errCount=0;
          lvlIdx++;setLvlPill(Math.min(lvlIdx+1,6));
          spawnAEP();
        } else {
          lives--;sLives(lives);errCount++;
          msg="❌ Не тот порядок — попробуй снова";mt=70;
          placed=[];devGlitch();
          if(errCount>=2) showHint=true;
        }
      }
    };
    gRun=true;draw();
  }
  startChallenge();
}

/* ====================================================
   ██████╗ DEV GAME 4 — WHAT OUTPUTS?
   Видишь код — выбери что он выведет
   Учишься: читать и понимать код
===================================================== */
function startDEVG4(){
  const puzzles=[
    {code:"console.log(2 + 3)",opts:["5","23","undefined","Error"],c:0,tip:"2 + 3 = 5. Числа складываются."},
    {code:'console.log("2" + 3)',opts:["5","23","undefined","Error"],c:1,tip:'"2" + 3 = "23". Строка + число = конкатенация!'},
    {code:"let x = 5;\nx *= 2;\nconsole.log(x)",opts:["5","10","2","undefined"],c:1,tip:"x *= 2 значит x = x * 2 = 10"},
    {code:"console.log(typeof 42)",opts:["number","int","42","string"],c:0,tip:"typeof 42 возвращает строку 'number'"},
    {code:"console.log([1,2,3].length)",opts:["3","[1,2,3]","undefined","1"],c:0,tip:".length массива = количество элементов"},
    {code:"console.log(10 > 5 ? 'yes' : 'no')",opts:["yes","no","true","undefined"],c:0,tip:"10 > 5 = true, тернарный оператор вернёт 'yes'"},
    {code:"let a = [1,2,3];\na.push(4);\nconsole.log(a.length)",opts:["3","4","[1,2,3,4]","undefined"],c:1,tip:".push(4) добавляет элемент. Длина стала 4"},
    {code:'console.log(Boolean(""))',opts:["true","false","''","undefined"],c:1,tip:"Пустая строка — falsy значение. Boolean('') = false"},
    {code:"console.log(Math.max(1,5,3))",opts:["1","3","5","9"],c:2,tip:"Math.max() возвращает наибольшее число"},
    {code:"const f = x => x * x;\nconsole.log(f(4))",opts:["4","8","16","undefined"],c:2,tip:"f(4) = 4 * 4 = 16. Стрелочная функция возводит в квадрат"},
  ];
  let idx=0,score=0,lives=3,chosen=-1,showResult=false,resTimer=0;
  sScore(0);sLives(3);setLvlPill(1);

  function next(){idx=(idx+1)%puzzles.length;chosen=-1;showResult=false;resTimer=0;}

  function loop(){
    if(!gRun)return;gAnim=requestAnimationFrame(loop);
    if(showResult){resTimer++;if(resTimer>90){next();if(lives<=0){stopGame();gOver(score,"Read the code carefully!");}}}
    GX.clearRect(0,0,GW,GH);GX.fillStyle="#020c06";GX.fillRect(0,0,GW,GH);
    for(let y=0;y<GH;y+=4){GX.fillStyle="rgba(0,0,0,.07)";GX.fillRect(0,y,GW,2);}

    const pz=puzzles[idx];
    GX.fillStyle="rgba(0,255,100,.45)";GX.font="bold 11px 'Orbitron',monospace";GX.textAlign="center";
    GX.fillText("ЧТО ВЫВЕДЕТ КОД?",GW/2,28);

    // Code block
    rr(16,42,GW-32,90,10,"rgba(0,255,100,.06)","rgba(0,255,100,.2)");
    const lines2=pz.code.split("\n");
    lines2.forEach((line,i)=>{
      GX.fillStyle="#00ff88";GX.font="bold 13px 'Share Tech Mono',monospace";GX.textAlign="left";
      GX.fillText(line,24,65+i*22);
    });

    // Options
    const oW=(GW-48)/2,oH=52,oGap=10;
    pz.opts.forEach((opt,i)=>{
      const col=i%2,row=Math.floor(i/2);
      const ox=16+col*(oW+oGap),oy=148+row*(oH+oGap);
      let fill,stroke,textCol;
      if(showResult){
        if(i===pz.c){fill="rgba(0,255,100,.3)";stroke="#00ff88";textCol="#fff";}
        else if(i===chosen&&chosen!==pz.c){fill="rgba(255,50,50,.25)";stroke="#ff3c3c";textCol="#ff9090";}
        else{fill="rgba(255,255,255,.04)";stroke="rgba(255,255,255,.12)";textCol="rgba(255,255,255,.4)";}
      } else if(chosen===i){fill="rgba(0,210,255,.2)";stroke="rgba(0,210,255,.6)";textCol="#60e8ff";}
      else{fill="rgba(255,255,255,.05)";stroke="rgba(0,255,100,.22)";textCol="rgba(255,255,255,.7)";}
      rr(ox,oy,oW,oH,10,fill,stroke);
      GX.fillStyle=textCol;GX.font="bold 12px 'Share Tech Mono',monospace";GX.textAlign="center";
      GX.fillText(opt,ox+oW/2,oy+oH/2+4);
    });

    if(showResult){
      const ok=chosen===pz.c;
      GX.fillStyle=ok?"rgba(0,255,100,.85)":"rgba(255,100,100,.85)";
      GX.font="bold 11px 'Share Tech Mono',monospace";GX.textAlign="center";
      GX.fillText((ok?"✅ ":"❌ ")+pz.tip,GW/2,280);
    }

    GX.fillStyle="rgba(0,255,100,.3)";GX.font="9px 'Share Tech Mono',monospace";GX.textAlign="left";
    GX.fillText("Score: "+score,16,GH-8);
    GX.fillStyle="rgba(0,255,100,.2)";GX.textAlign="center";
    GX.fillText("Кликни на правильный ответ",GW/2,GH-22);

    // question counter
    GX.fillStyle="rgba(0,255,100,.35)";GX.font="10px 'Orbitron',monospace";GX.textAlign="right";
    GX.fillText((idx+1)+"/"+puzzles.length,GW-16,GH-8);
  }

  GC.onclick=e=>{
    if(showResult)return;
    const r=GC.getBoundingClientRect();const cx2=(e.clientX-r.left)*(GW/r.width),cy2=(e.clientY-r.top)*(GH/r.height);
    const pz2=puzzles[idx];const oW2=(GW-48)/2,oH2=52,oGap2=10;
    pz2.opts.forEach((_,i)=>{
      const col=i%2,row=Math.floor(i/2);
      const ox=16+col*(oW2+oGap2),oy=148+row*(oH2+oGap2);
      if(cx2>ox&&cx2<ox+oW2&&cy2>oy&&cy2<oy+oH2){
        chosen=i;showResult=true;
        if(i===pz2.c){score+=10;sScore(score);spawnAEP();}
        else{lives--;sLives(lives);devGlitch();}
      }
    });
  };
  gRun=true;loop();
}


/* ====================================================
   DEV GAME 5 — DEBUG QUEST 🔬
   Найди строку с багом — кликни на неё
   Понимаешь: реальные JS ошибки и как их исправить
===================================================== */
function startDEVG5(){
  const bugs=[
    {title:{ru:"Найди баг в функции",en:"Find the bug in the function"},
     lines:["function add(a, b) {","  return a - b;","}", 'console.log(add(2,3)); // expected 5'],
     bugLine:1,
     explain:{ru:"return a - b → должно быть a + b (минус вместо плюса!)",en:"return a - b → should be a + b (minus instead of plus!)"}},
    {title:{ru:"Что здесь не так?",en:"What's wrong here?"},
     lines:["const name = 'Alice';","name = 'Bob'; // reassign?","console.log(name);"],
     bugLine:1,
     explain:{ru:"const нельзя переназначать! Используй let для изменяемых переменных",en:"Can't reassign const! Use let for mutable variables"}},
    {title:{ru:"Ошибка в условии цикла",en:"Loop condition error"},
     lines:["for (let i = 0; i <= 3; i++) {","  console.log(i);","}","// Got: 0 1 2 3 — Expected: 0 1 2"],
     bugLine:0,
     explain:{ru:"i <= 3 добавляет лишнюю итерацию (3). Нужно: i < 3",en:"i <= 3 adds extra iteration (3). Should be: i < 3"}},
    {title:{ru:"Функция ничего не возвращает",en:"Function returns nothing"},
     lines:["function greet(name) {","  console.log('Hi ' + name);","}","const r = greet('Ana');","console.log(r); // undefined!"],
     bugLine:4,
     explain:{ru:"Нет return! console.log() ≠ return. Результат → undefined",en:"No return statement! console.log() ≠ return. Result → undefined"}},
    {title:{ru:"Async проблема",en:"Async issue"},
     lines:["async function load() {","  const res = fetch('/api/data');","  return res.json();","}"],
     bugLine:1,
     explain:{ru:"Пропущен await! Нужно: const res = await fetch('/api/data')",en:"Missing await! Should be: const res = await fetch('/api/data')"}},
    {title:{ru:"Опасное сравнение",en:"Dangerous comparison"},
     lines:["let score = 0;","if (score = 10) {","  console.log('Winner!');","}"],
     bugLine:1,
     explain:{ru:"= это присвоение, нужно ==. Лучше всегда ===  (строгое равенство)",en:"= is assignment, should be ==. Better yet: always use === (strict equality)"}},
    {title:{ru:"Индекс за пределами массива",en:"Array index out of bounds"},
     lines:["const arr = [1, 2, 3];","console.log(arr[3]); // undefined","// Expected: last element (3)"],
     bugLine:1,
     explain:{ru:"arr[3] = undefined! Массивы 0-based: 0,1,2. Последний = arr[arr.length-1]",en:"arr[3] = undefined! Arrays are 0-based: 0,1,2. Last = arr[arr.length-1]"}},
  ];
  let tIdx=0,score=0,lives=3;
  sScore(0);sLives(3);setLvlPill(1);

  function doTask(){
    const task=bugs[tIdx%bugs.length];
    const LH=38,LG=5,sy=58;
    let sel=-1,showR=false,rTimer=0,msg="",mt=0;

    function draw(){
      if(!gRun)return;gAnim=requestAnimationFrame(draw);if(mt>0)mt--;
      if(showR){rTimer++;if(rTimer>120){showR=false;rTimer=0;tIdx++;setLvlPill(Math.min(tIdx+1,6));doTask();return;}}
      GX.clearRect(0,0,GW,GH);
      const gbg=GX.createLinearGradient(0,0,0,GH);gbg.addColorStop(0,"#020c06");gbg.addColorStop(1,"#010a04");GX.fillStyle=gbg;GX.fillRect(0,0,GW,GH);
      for(let yy=0;yy<GH;yy+=3){GX.fillStyle="rgba(0,0,0,.04)";GX.fillRect(0,yy,GW,1);}

      const title=task.title[lang]||task.title.ru;
      GX.fillStyle="#00ff88";GX.font="bold 11px 'Orbitron',monospace";GX.textAlign="center";
      GX.shadowColor="#00ff88";GX.shadowBlur=8;GX.fillText("🐛 "+title.toUpperCase(),GW/2,18);GX.shadowBlur=0;
      GX.fillStyle="rgba(0,255,100,.3)";GX.font="9px 'Share Tech Mono',monospace";
      GX.fillText(lang==="ru"?"Кликни на строку с багом:":"Click the line containing the bug:",GW/2,33);
      GX.fillStyle="rgba(0,255,100,.12)";GX.fillRect(8,40,GW-16,1);

      task.lines.forEach((line,i)=>{
        const y=sy+i*(LH+LG);
        const isBug=i===task.bugLine;
        const isSel=sel===i;
        const isCor=showR&&isBug;
        const isWr=showR&&isSel&&!isBug;
        rr(12,y,GW-24,LH,6,
          isCor?"rgba(255,60,60,.18)":isWr?"rgba(255,60,60,.1)":isSel?"rgba(0,255,100,.07)":"rgba(0,255,100,.03)",
          isCor?"#ff4444":isWr?"#ff6060":isSel?"rgba(0,255,100,.4)":"rgba(0,255,100,.1)",
          isSel||showR?1.5:1);
        GX.fillStyle="rgba(0,255,100,.22)";GX.font="9px 'Share Tech Mono',monospace";GX.textAlign="left";
        GX.fillText(String(i+1).padStart(2," ")+"|",16,y+LH/2+4);
        GX.fillStyle=isCor?"#ff6060":isSel?"#c8ffe0":"rgba(180,255,200,.78)";
        GX.font="10px 'Share Tech Mono',monospace";
        GX.fillText(line,44,y+LH/2+4);
        if(showR&&isBug){
          GX.fillStyle="#ff4444";GX.font="bold 9px 'Share Tech Mono',monospace";GX.textAlign="right";
          GX.shadowColor="#ff0000";GX.shadowBlur=5;GX.fillText("← 🐛 BUG",GW-14,y+LH/2+4);GX.shadowBlur=0;
        }
      });

      if(showR){
        GX.fillStyle="rgba(0,0,0,.65)";GX.fillRect(0,GH-64,GW,64);
        const exTxt=task.explain[lang]||task.explain.ru;
        GX.fillStyle="#00ff88";GX.font="10px 'Share Tech Mono',monospace";GX.textAlign="center";
        GX.shadowColor="#00ff88";GX.shadowBlur=5;GX.fillText(exTxt,GW/2,GH-38);GX.shadowBlur=0;
        GX.fillStyle="rgba(0,255,100,.6)";GX.font="10px 'Orbitron',monospace";
        GX.fillText(lang==="ru"?"✅ БАГ НАЙДЕН! +20":"✅ BUG FOUND! +20",GW/2,GH-18);
      }
      if(mt>0&&!showR){GX.fillStyle="rgba(255,110,110,.9)";GX.font="10px 'Share Tech Mono',monospace";GX.textAlign="center";GX.fillText(msg,GW/2,GH-8);}
    }

    GC.onclick=e=>{
      if(showR)return;
      const r2=GC.getBoundingClientRect();const cy2=(e.clientY-r2.top)*(GH/r2.height);
      task.lines.forEach((_,ii)=>{
        const y=sy+ii*(LH+LG);
        if(cy2>y&&cy2<y+LH){
          sel=ii;
          if(ii===task.bugLine){score+=20;sScore(score);showR=true;}
          else{lives--;sLives(lives);msg=lang==="ru"?"❌ Не здесь — ищи внимательнее":"❌ Not here — look more carefully";mt=70;devGlitch();}
          if(lives<=0){stopGame();gOver(score,lang==="ru"?"Учи JS ошибки!":"Study JS errors!");}
        }
      });
    };
    gRun=true;draw();
  }
  doTask();
}

/* ===================================================
   ABOUT MODAL
=================================================== */