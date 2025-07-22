(()=>{function e(t){window.Runner&&Runner.instance_?t():setTimeout(()=>e(t),100)}e(()=>{if(window.dinoCheatUI){window.dinoCheatUI.style.display="none"===window.dinoCheatUI.style.display?"flex":"none";return}let e=Runner.instance_,t={godMode:!1,autoJump:!1,infiniteSpeed:!1,lowGravity:!1,noClouds:!1,hideDino:!1,noObstacles:!1,slowMo:!1,doubleScore:!1,noSound:!1,pauseGame:!1,jumpAlways:!1,instantJump:!1};function n(){if(!e.playing&&!t.pauseGame){requestAnimationFrame(n);return}if(t.pauseGame?e.stop():e.playing||e.play(),t.infiniteSpeed?e.currentSpeed=1e3:t.slowMo?e.currentSpeed=2:t.slowSpeed?e.currentSpeed=1:e.currentSpeed=e.baseSpeed||6,e.tRex.config.JUMP_VELOCITY=t.lowGravity?20:10,t.noClouds&&(e.horizon.clouds=[]),t.noObstacles&&(e.horizon.obstacles=[]),e.canvas.style.display=t.hideDino?"none":"block",t.doubleScore&&(e.distanceRan=e.distanceRan||0,e.distanceRan*=2),e.audioManager&&e.audioManager.setMuted(!!t.noSound),!t.jumpAlways||e.tRex.jumping||e.tRex.ducking||e.tRex.startJump(e.currentSpeed),t.instantJump&&!e.tRex.jumping&&e.tRex.startJump(e.currentSpeed),t.autoJump&&e.horizon.obstacles.length>0){let o=e.horizon.obstacles[0];!(o.xPos<150)||e.tRex.jumping||e.tRex.ducking||e.tRex.startJump(e.currentSpeed)}requestAnimationFrame(n)}window.__origGameOver||(window.__origGameOver=Runner.prototype.gameOver,Runner.prototype.gameOver=function(){if(t.godMode){this.playing=!0,this.tRex.jumping=!1,this.tRex.ducking=!1,this.tRex.jumpCount=0;return}window.__origGameOver.call(this)}),n();let o=document.createElement("div");o.id="dinoCheatContainer",o.style.cssText=`
      position: fixed;
      top: 80px;
      left: 80px;
      width: 350px;
      height: 440px;
      background: #121212dd;
      color: #eee;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      box-shadow: 0 0 12px #0008;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      z-index: 999999;
      user-select: none;
      resize: both;
      overflow: hidden;
    `;let l=!1,a,i,r=document.createElement("div");r.textContent="Dinoscriptz Cheats",r.style.cssText=`
      background: linear-gradient(90deg, #1a73e8, #4285f4);
      padding: 12px 16px;
      cursor: move;
      font-weight: 700;
      font-size: 1.25rem;
      user-select: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;let s=document.createElement("button");s.textContent="_",s.title="Minimize/Restore (Alt+P)",s.style.cssText=`
      background: transparent;
      border: none;
      color: white;
      font-weight: 700;
      font-size: 1.2rem;
      cursor: pointer;
      width: 28px;
      height: 28px;
      line-height: 0;
      user-select: none;
      margin-left: 8px;
      border-radius: 4px;
      transition: background-color 0.2s;
    `,s.onmouseenter=()=>s.style.backgroundColor="#3367d6",s.onmouseleave=()=>s.style.backgroundColor="transparent";let d=document.createElement("button");d.textContent="\xd7",d.title="Close / Uninject (Alt+X)",d.style.cssText=`
      background: transparent;
      border: none;
      color: white;
      font-weight: 700;
      font-size: 1.5rem;
      cursor: pointer;
      width: 28px;
      height: 28px;
      line-height: 0;
      user-select: none;
      margin-left: 4px;
      border-radius: 4px;
      transition: background-color 0.2s;
    `,d.onmouseenter=()=>d.style.backgroundColor="#d93025",d.onmouseleave=()=>d.style.backgroundColor="transparent";let p=document.createElement("div");p.style.display="flex",p.appendChild(s),p.appendChild(d),r.appendChild(p),o.appendChild(r);let c=document.createElement("div");c.style.cssText=`
      display: flex;
      background: #222;
      user-select: none;
    `;let u=["General","Speed","Gameplay","Visuals","Settings"],h="General",m={};u.forEach(e=>{let t=document.createElement("button");t.textContent=e,t.style.cssText=`
        flex: 1;
        padding: 10px 8px;
        background: transparent;
        border: none;
        color: #ddd;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
      `,e===h&&(t.style.backgroundColor="#1a73e8"),t.onmouseenter=()=>{h!==e&&(t.style.backgroundColor="#333")},t.onmouseleave=()=>{h!==e&&(t.style.backgroundColor="transparent")},t.onclick=()=>{h!==e&&(m[h].style.backgroundColor="transparent",t.style.backgroundColor="#1a73e8",h=e,G())},c.appendChild(t),m[e]=t}),o.appendChild(c);let y=document.createElement("div");function g(e,t,n=!1){let o=document.createElement("div");o.style.cssText="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;";let l=document.createElement("label");l.textContent=e,l.style.cssText="user-select:none;";let a=document.createElement("label");a.className="switch";let i=document.createElement("input");i.type="checkbox",i.checked=n;let r=document.createElement("span");return r.className="slider",a.appendChild(i),a.appendChild(r),o.appendChild(l),o.appendChild(a),i.addEventListener("change",e=>t(e.target.checked)),{wrapper:o,input:i}}y.style.cssText=`
      flex: 1;
      overflow-y: auto;
      padding: 12px 16px;
      background: #181818;
    `,o.appendChild(y);let f={toggleMenu:"Alt+L",minimizeMenu:"Alt+P",uninjectCheats:"Alt+X"},x={...f};try{let C=localStorage.getItem("dinoCheatsKeybinds");C&&(x=JSON.parse(C))}catch{}function b(){try{localStorage.setItem("dinoCheatsKeybinds",JSON.stringify(x))}catch{}}function $(e,t){let n=document.createElement("label");n.textContent=e,n.style.cssText="display:block; margin-bottom:6px;";let o=document.createElement("input");return o.type="text",o.value=x[t],o.title="Use format like Alt+L or Ctrl+Shift+X",o.style.cssText="width: 100%; padding: 4px 6px; border-radius: 6px; border: none;",o.addEventListener("focus",e=>e.target.select()),o.addEventListener("change",e=>{let n=e.target.value.trim();/^([A-Za-z]+(\+[A-Za-z]+)*)$/.test(n)?(x[t]=n,b(),S()):(alert("Invalid keybind format! Use format like Alt+L or Ctrl+Shift+X"),e.target.value=x[t])}),n.appendChild(o),n}function _(e){let t=e.toLowerCase().split("+").map(e=>e.trim());return e=>{let n={altKey:e.altKey,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,key:e.key.toLowerCase()};for(let o of t)if("alt"===o&&!n.altKey||"ctrl"===o&&!n.ctrlKey||"shift"===o&&!n.shiftKey||!["alt","ctrl","shift"].includes(o)&&o!==n.key)return!1;return!0}}let w=_(x.toggleMenu),k=_(x.minimizeMenu),v=_(x.uninjectCheats);function S(){w=_(x.toggleMenu),k=_(x.minimizeMenu),v=_(x.uninjectCheats)}function M(e){w(e)?(e.preventDefault(),o.style.display="none"===o.style.display?"flex":"none"):k(e)?(e.preventDefault(),s.click()):v(e)&&(e.preventDefault(),d.click())}window.addEventListener("keydown",M);let E=!1;function G(){if(y.innerHTML="","General"===h){let n=g("God Mode (No Crash)",e=>{t.godMode=e},t.godMode);y.appendChild(n.wrapper);let l=g("Auto Jump",e=>{t.autoJump=e},t.autoJump);y.appendChild(l.wrapper);let a=g("Jump Always",e=>{t.jumpAlways=e},t.jumpAlways);y.appendChild(a.wrapper);let i=g("Pause Game",n=>{t.pauseGame=n,n?e.stop():e.play()},t.pauseGame);y.appendChild(i.wrapper);let r=g("Instant Jump",e=>{t.instantJump=e},t.instantJump);y.appendChild(r.wrapper)}else if("Speed"===h){let s=g("Infinite Speed",n=>{t.infiniteSpeed=n,n||(e.currentSpeed=e.baseSpeed||6)},t.infiniteSpeed);y.appendChild(s.wrapper);let d=g("Slow Motion",n=>{t.slowMo=n,n||(e.currentSpeed=e.baseSpeed||6)},t.slowMo);y.appendChild(d.wrapper)}else if("Gameplay"===h){let p=g("Low Gravity",n=>{t.lowGravity=n,e.tRex.config.JUMP_VELOCITY=n?20:10},t.lowGravity);y.appendChild(p.wrapper);let c=g("No Obstacles",n=>{t.noObstacles=n,n&&(e.horizon.obstacles.length=0)},t.noObstacles);y.appendChild(c.wrapper);let u=g("No Clouds",n=>{t.noClouds=n,n&&(e.horizon.clouds.length=0)},t.noClouds);y.appendChild(u.wrapper);let m=g("Hide Dino",n=>{t.hideDino=n,e.canvas.style.display=n?"none":"block"},t.hideDino);y.appendChild(m.wrapper);let f=g("Double Score",e=>{t.doubleScore=e},t.doubleScore);y.appendChild(f.wrapper);let x=g("Mute Sound",n=>{t.noSound=n,e.audioManager&&e.audioManager.setMuted(n)},t.noSound);y.appendChild(x.wrapper)}else if("Visuals"===h){let C=document.createElement("p");C.textContent="No visuals cheats yet.",C.style.cssText="color: #ccc; font-style: italic;",y.appendChild(C)}else if("Settings"===h){let b=g("Dark Mode",e=>{e?o.style.background="#121212dd":o.style.background="#eeeeeedd",o.style.color=e?"#eee":"#222"},"#121212dd"===o.style.background);y.appendChild(b.wrapper),y.appendChild(document.createElement("hr")),y.appendChild($("Toggle Menu (default Alt+L):","toggleMenu")),y.appendChild($("Minimize Menu (default Alt+P):","minimizeMenu")),y.appendChild($("Uninject Cheats (default Alt+X):","uninjectCheats"))}}s.onclick=()=>{E?(y.style.display="block",c.style.display="flex",o.style.height="440px",E=!1):(y.style.display="none",c.style.display="none",o.style.height="40px",E=!0)},d.onclick=()=>{o.remove(),window.removeEventListener("keydown",M),window.__origGameOver&&(Runner.prototype.gameOver=window.__origGameOver,delete window.__origGameOver),delete window.dinoCheatUI,delete window.dinoCheats};let z=document.createElement("style");z.textContent=`
      .switch {
        position: relative;
        display: inline-block;
        width: 46px;
        height: 24px;
      }
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 24px;
      }
      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }
      input:checked + .slider {
        background-color: #1a73e8;
      }
      input:checked + .slider:before {
        transform: translateX(22px);
      }
    `,document.head.appendChild(z),r.addEventListener("mousedown",e=>{e.target!==s&&e.target!==d&&(l=!0,a=e.clientX-o.offsetLeft,i=e.clientY-o.offsetTop,e.preventDefault())}),document.addEventListener("mouseup",()=>l=!1),document.addEventListener("mousemove",e=>{l&&(o.style.left=`${e.clientX-a}px`,o.style.top=`${e.clientY-i}px`)}),window.dinoCheatUI=o,window.dinoCheats=t,document.body.appendChild(o),G()})})();
