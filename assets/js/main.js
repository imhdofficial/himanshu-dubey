(() => {
  const root = document.documentElement;
  const body = document.body;
  const modeButtons = [...document.querySelectorAll('[data-mode-btn]')];
  const boot = document.querySelector('.code-boot');
  const savedMode = localStorage.getItem('hd-mode');

  function syncModeButtons(mode){
    modeButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.modeBtn === mode)));
  }
  function setMode(mode, animate = false){
    if (animate && boot) {
      boot.classList.add('is-active');
      window.setTimeout(() => { root.dataset.mode = mode; syncModeButtons(mode); }, 180);
      window.setTimeout(() => boot.classList.remove('is-active'), 650);
    } else { root.dataset.mode = mode; syncModeButtons(mode); }
    localStorage.setItem('hd-mode', mode);
  }
  if(savedMode === 'code' || savedMode === 'design') setMode(savedMode); else syncModeButtons(root.dataset.mode || 'design');
  modeButtons.forEach(btn => btn.addEventListener('click', () => {
    if(root.dataset.mode !== btn.dataset.modeBtn) setMode(btn.dataset.modeBtn, true);
  }));

  const revealEls = document.querySelectorAll('.reveal,.reveal-text');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){
      const delay = Number(entry.target.dataset.delay || 0);
      window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
      observer.unobserve(entry.target);
    }
  }), {threshold:.1, rootMargin:'0px 0px -6% 0px'});
  revealEls.forEach(el => observer.observe(el));

  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('.scroll-progress span');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    if(progress) progress.style.transform = `scaleX(${Math.min(1,y/max)})`;
    header?.classList.toggle('is-scrolled', y > 24);
    if(!body.classList.contains('menu-open')){
      if(y > 260 && y > lastY + 8) header?.classList.add('is-hidden');
      if(y < lastY - 8) header?.classList.remove('is-hidden');
    }
    lastY = y;
  };
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  const menuBtn = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-mobile-menu]');
  const menuClose = document.querySelector('[data-menu-close]');
  const setMenu = open => {
    if(!menu) return;
    menu.classList.toggle('is-open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
    body.classList.toggle('menu-open', open);
    body.style.overflow = open ? 'hidden' : '';
    header?.classList.remove('is-hidden');
  };
  menuBtn?.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  menuClose?.addEventListener('click', () => setMenu(false));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if(innerWidth > 760) setMenu(false); }, {passive:true});

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  if(matchMedia('(pointer:fine)').matches && dot && ring){
    addEventListener('mousemove', e => {mx=e.clientX;my=e.clientY;dot.style.opacity=1;ring.style.opacity=1;dot.style.transform=`translate(${mx}px,${my}px)`;});
    const loop=()=>{rx+=(mx-rx)*.14;ry+=(my-ry)*.14;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop)};loop();
    document.querySelectorAll('a,button,[data-capability],[data-project-card],[data-step]').forEach(el=>{
      el.addEventListener('mouseenter',()=>{ring.classList.add('is-hover'); const label=el.dataset.cursor; if(label) ring.querySelector('span').textContent=label;});
      el.addEventListener('mouseleave',()=>{ring.classList.remove('is-hover'); ring.querySelector('span').textContent='VIEW';});
    });
  }

  if(matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.magnetic').forEach(el=>{
      el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.10}px,${(e.clientY-r.top-r.height/2)*.10}px)`;});
      el.addEventListener('mouseleave',()=>el.style.transform='');
    });
    document.querySelectorAll('[data-tilt]').forEach(el=>{
      el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1200px) rotateX(${-y*3}deg) rotateY(${x*4}deg)`;});
      el.addEventListener('mouseleave',()=>el.style.transform='');
    });
    document.querySelectorAll('[data-spotlight]').forEach(el=>el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--spot-x',`${e.clientX-r.left}px`);el.style.setProperty('--spot-y',`${e.clientY-r.top}px`);}));
  }

  const demo=document.querySelector('[data-combo-demo]');
  if(demo){
    const items=[...demo.querySelectorAll('[data-combo-item]')],countEl=demo.querySelector('[data-combo-count]'),submit=demo.querySelector('[data-combo-submit]'),bars=[...demo.querySelectorAll('.combo-demo-progress i')];
    const refresh=()=>{const count=items.filter(x=>x.classList.contains('is-selected')).length;countEl.textContent=count;bars.forEach((b,i)=>b.classList.toggle('is-filled',i<count));submit.disabled=count!==3;submit.textContent=count===3?'COMBO READY →':`SELECT ${3-count} MORE`;};
    items.forEach(item=>item.addEventListener('click',()=>{const count=items.filter(x=>x.classList.contains('is-selected')).length;if(item.classList.contains('is-selected'))item.classList.remove('is-selected');else if(count<3)item.classList.add('is-selected');refresh();}));refresh();
  }

  document.querySelectorAll('[data-otp-demo]').forEach(demo => {
    const inputs=[...demo.querySelectorAll('input')];
    const distribute = value => {
      const digits=(value.match(/\d/g)||[]).slice(0,inputs.length);
      if(!digits.length) return;
      digits.forEach((d,i)=>inputs[i].value=d);
      inputs[Math.min(digits.length,inputs.length)-1]?.focus();
    };
    inputs.forEach((input,idx)=>{
      input.addEventListener('input',e=>{
        const value=e.target.value.replace(/\D/g,'');
        if(value.length>1){ distribute(value); return; }
        e.target.value=value.slice(-1);
        if(e.target.value && idx<inputs.length-1) inputs[idx+1].focus();
      });
      input.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!input.value&&idx>0)inputs[idx-1].focus();});
      input.addEventListener('paste',e=>{const t=e.clipboardData?.getData('text')||''; if(/\d/.test(t)){e.preventDefault();distribute(t);}});
    });
  });

  if(matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.capability-media-stage').forEach(stage=>{
      stage.addEventListener('pointermove',e=>{
        const r=stage.getBoundingClientRect();
        const x=((e.clientX-r.left)/r.width-.5)*10;
        const y=((e.clientY-r.top)/r.height-.5)*8;
        stage.style.setProperty('--media-x',`${-x}px`);
        stage.style.setProperty('--media-y',`${-y}px`);
      });
      stage.addEventListener('pointerleave',()=>{
        stage.style.setProperty('--media-x','0px');
        stage.style.setProperty('--media-y','0px');
      });
    });
  }

  if(matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('video[autoplay]').forEach(video=>video.pause());
  }

  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
})();
