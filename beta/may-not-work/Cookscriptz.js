(() => {
  if (window.__ccUltimateModMenu) return alert('Ultimate Mod Menu already loaded.');

  const hv = JSON.parse(localStorage.getItem('ccmmConfig')||'{}');
  const conf = { cpsMult: hv.cpsMult||1, ascendAt: hv.ascendAt||0 };

  const createEl=(t,p={},s={})=>{const e=document.createElement(t);Object.assign(e,p);Object.assign(e.style,s);return e;};

  const style = createEl('style');
  style.textContent = `
    #umm {position:fixed; top:30px; right:30px; width:340px; max-width:90vw; background:#282c34cc; color:#eff0f1;
      font:14px sans-serif; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.5); z-index:9999999;
      display:flex;flex-direction:column; overflow:hidden; transition:transform .3s ease;}
    #umm-header{padding:14px 18px; font-size:18px; background:#61dafb; color:#282c34; cursor:move;
      display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0;}
    #umm-header button{background:transparent;border:none;font-size:18px;cursor:pointer;color:#282c34;}
    #umm-tabs{display:flex; border-bottom:1px solid #61dafb77;}
    .umm-tab{flex:1;padding:10px; text-align:center; cursor:pointer; background:#20232a;transition:.2s;}
    .umm-tab.active{background:#61dafb;color:#20232a;font-weight:700;}
    .umm-tab:not(.active):hover{background:#61ccf0;}
    #umm-content{padding:12px 18px; max-height:400px; overflow-y:auto; background:#20232a;}
    .umm-section{display:none;}
    .umm-section.active{display:block;}
    label{margin:8px 0 4px; display:block; font-weight:600;}
    input[type=number],input[type=text],select{width:100%; padding:6px 8px; margin-bottom:10px; border-radius:5px;
      border:1px solid #61dafb55; background:#282c34; color:#eff0f1;}
    button{width:100%; padding:8px; margin:6px 0; border:none; border-radius:5px;
      background:#61dafb;color:#20232a; font-weight:600; cursor:pointer; transition:.2s;}
    button:hover{background:#52c0e5;}
    .toggle {display:inline-flex; align-items:center; cursor:pointer; margin:4px 0;}
    .toggle input{margin-right:6px;}
    .small{font-size:12px;color:#aaa;}
    #umm-content::-webkit-scrollbar{width:6px;}
    #umm-content::-webkit-scrollbar-thumb{background:#61dafb88;border-radius:3px;}
  `;
  document.head.appendChild(style);

  const umm = createEl('div',{id:'umm'});
  const hdr = createEl('div',{id:'umm-header',innerText:'Ultimate Mod Menu'});
  const close = createEl('button',{innerText:'✕'});
  close.onclick=()=>umm.style.display='none';
  hdr.appendChild(close);
  umm.appendChild(hdr);

  const tabsCont = createEl('div',{id:'umm-tabs'});
  umm.appendChild(tabsCont);
  const content = createEl('div',{id:'umm-content'});
  umm.appendChild(content);

  const tabs=[
    {id:'cheats',label:'Cheats'},
    {id:'automation',label:'Auto'},
    {id:'advanced',label:'Advanced'},
    {id:'config',label:'Config'}
  ];
  const sects={};
  tabs.forEach((t,i)=>{
    const tb=createEl('div',{className:'umm-tab',innerText:t.label});
    if(i===0)tb.classList.add('active');
    tabsCont.appendChild(tb);
    const sec=createEl('div',{className:'umm-section',id:t.id});
    if(i===0)sec.classList.add('active');
    content.appendChild(sec);
    sects[t.id]=sec;
    tb.onclick=()=>{
      tabsCont.querySelectorAll('.umm-tab').forEach(x=>x.classList.remove('active'));
      tb.classList.add('active');
      Object.values(sects).forEach(x=>x.classList.remove('active'));
      sec.classList.add('active');
    };
  });

  // Section: Cheats basics
  const C = sects.cheats;
  const addC=createEl('input',{type:'number',placeholder:'Cookies to add'});
  const btnAdd=createEl('button',{innerText:'Add Cookies'});
  btnAdd.onclick=()=>{Game.Earn(Number(addC.value)||0); addC.value='';};
  C.appendChild(createEl('label',{innerText:'Add cookies:'}));
  C.appendChild(addC); C.appendChild(btnAdd);

  const setC=createEl('input',{type:'number',placeholder:'Set total cookies'});
  const btnSet=createEl('button',{innerText:'Set cookies'});
  btnSet.onclick=()=>{Game.cookies=Number(setC.value)||0;Game.RefreshStore(); setC.value='';};
  C.appendChild(createEl('label',{innerText:'Set cookies:'}));
  C.appendChild(setC); C.appendChild(btnSet);

  const btnUp=createEl('button',{innerText:'Unlock & Buy ALL Upgrades'});
  btnUp.onclick=()=>{Game.UpgradesById.forEach(u=>u.unlock(),u=>u.buy()); alert('Upgrades done');};
  C.appendChild(btnUp);

  const btnAch=createEl('button',{innerText:'Unlock ALL Achievements'});
  btnAch.onclick=()=>{Game.AchievementsById.forEach(a=>a.win()); alert('Achievements unlocked');};
  C.appendChild(btnAch);

  // Section: Automation
  const A = sects.automation;
  const toggles=[
    {k:'autoClick', txt:'Auto‑click Big Cookie', fn:()=>Game.ClickCookie()},
    {k:'autoGolden',txt:'Auto‑click Golden Cookie',fn:()=>Game.shimmers.forEach(s=>s.type==='golden'&&s.pop())},
    {k:'autoBuildings',txt:'Auto‑buy Buildings',fn:()=>Game.ObjectsById.filter(b=>Game.cookies>=b.getPrice()).forEach(b=>b.buy(1))},
    {k:'autoUpgrades',txt:'Auto‑buy Upgrades',fn:()=>Game.UpgradesInStore.filter(u=>u.canBuy()).forEach(u=>u.buy())},
    {k:'autoCrystals',txt:'Auto‑click Season/Crystal',fn:()=>Game.shimmers.forEach(s=>s.type==='reindeer'&&s.pop())}
  ];
  const intervals={};
  toggles.forEach(o=>{
    const wrapper=createEl('div',{className:'toggle'});
    const ch=createEl('input',{type:'checkbox',checked:hv[o.k]});
    const lbl=createEl('span',{innerText:o.txt});
    wrapper.appendChild(ch); wrapper.appendChild(lbl);
    A.appendChild(wrapper);
    ch.onchange=()=>{
      if(ch.checked) intervals[o.k]=setInterval(o.fn, o.k==='autoClick'?50:200);
      else clearInterval(intervals[o.k]);
      hv[o.k]=ch.checked; localStorage.setItem('ccmmConfig',JSON.stringify(hv));
    };
    if(ch.checked) ch.onchange();
  });

  // Section: Advanced settings
  const X=sects.advanced;
  X.appendChild(createEl('label',{innerText:'Cookie CPS Multiplier:'}));
  const inCS=createEl('input',{type:'number',value:conf.cpsMult,min:1,step:0.1});
  X.appendChild(inCS);
  const btnCS=createEl('button',{innerText:'Apply CPS Multiplier'});
  btnCS.onclick=()=>{
    conf.cpsMult=Number(inCS.value)||1;
    Game.Ticker = []; // clear ticker loop
    Game.oldTick=Game.Tick;
    Game.Tick = function(){
      for(let i=0;i<conf.cpsMult;i++) Game.oldTick();
    };
    alert('Applied CPS x'+conf.cpsMult);
  };
  X.appendChild(btnCS);
  X.appendChild(createEl('label',{innerText:'Auto‑prestige at cookies ≥:'}));
  const inAsc=createEl('input',{type:'number',placeholder:'Threshold for ascend',value:conf.ascendAt});
  X.appendChild(inAsc);
  const btnAsc=createEl('button',{innerText:'Save Auto‑Prestige'});
  btnAsc.onclick=()=>{
    conf.ascendAt=Number(inAsc.value)||0;
    hv.ascendAt=conf.ascendAt;
    localStorage.setItem('ccmmConfig',JSON.stringify(hv));
    alert('Auto‑prestige set to '+conf.ascendAt);
  };
  setInterval(()=>{
    if(conf.ascendAt>0 && Game.cookies>=conf.ascendAt) Game.Ascend(1);
  },1000);

  // Section: Config Management
  const S=sects.config;
  const btnSave=createEl('button',{innerText:'Download Config'});
  btnSave.onclick=()=>{
    const blob=new Blob([JSON.stringify(hv)],{type:'application/json'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob); a.download='ccmm-config.json';
    a.click();
  };
  const fileIn=createEl('input',{type:'file'});
  const btnLoad=createEl('button',{innerText:'Load Config'});
  btnLoad.onclick=()=>{
    fileIn.click();
    fileIn.onchange=e=>{
      const file=e.target.files[0];
      const reader=new FileReader();
      reader.onload=()=>{ localStorage.setItem('ccmmConfig',reader.result); alert('Config loaded. Reload page to apply.'); };
      reader.readAsText(file);
    };
  };
  S.appendChild(btnSave); S.appendChild(fileIn); S.appendChild(btnLoad);

  // Hotkeys
  window.addEventListener('keydown', e=>{
    if(e.ctrlKey&&e.altKey){
      if(e.key==='C') toggles[0]&&(document.querySelectorAll('.toggle input')[0].click());
      if(e.key==='G') toggles[1]&&(document.querySelectorAll('.toggle input')[1].click());
    }
  });

  // Drag
  let drag=false,ox=0,oy=0;
  hdr.addEventListener('mousedown', e=>{drag=true;ox=e.clientX-umm.offsetLeft;oy=e.clientY-umm.offsetTop;hdr.style.cursor='grabbing';});
  window.addEventListener('mouseup',()=>{drag=false;hdr.style.cursor='move';});
  window.addEventListener('mousemove', e=>{if(drag){umm.style.left=e.clientX-ox+'px';umm.style.top=e.clientY-oy+'px';umn.right='auto';umm.style.position='fixed';}});

  document.body.appendChild(umm);
  window.__ccUltimateModMenu=true;
})();
