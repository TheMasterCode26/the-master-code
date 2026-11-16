(function(){
  if(!window.MCG||!MCG.lumy)return;
  [].forEach.call(document.querySelectorAll('[data-niko]'),function(n){if(window.renderNiko3D)n.innerHTML=renderNiko3D(+n.dataset.size||150,n.dataset.niko||'saludo',{comicFx:false,gear:{glasses:'default'}})});
  function lumyAt(n,expr){n.innerHTML='';n.appendChild(MCG.lumy(+n.dataset.size||120,expr||n.dataset.lumy||'normal',!n.dataset.still,n.dataset.hat||''))}
  [].forEach.call(document.querySelectorAll('[data-lumy]'),function(n){lumyAt(n)});
  [].forEach.call(document.querySelectorAll('[data-zarx]'),function(n){n.appendChild(MCG.zarx(+n.dataset.size||120,n.dataset.zarx,!!n.dataset.horns))});

  /* escena de emociones + voz Campanita (solo suena al tocar el botón) */
  var stage=document.getElementById('stage-lumy');if(!stage)return;
  var NAMES={normal:'Normal',feliz:'Feliz',ganaste:'¡Ganaste!',triste:'Triste',sorpresa:'Sorpresa',pensando:'Pensando',guino:'Guiño',amor:'Amor',dormido:'Dormido'};
  var LV={hola:[[72,.12],[81,.22]],feliz:[[72,.1],[81,.1],[84,.2]],ganaste:[[72,.08],[76,.08],[81,.08],[84,.08],[88,.32]],
    sorpresa:[[81,.06],[93,.2,1]],pensando:[[72,.14],[74,.14],[81,.24,1]],guino:[[81,.07],[72,.07],[81,.16]],
    triste:[[81,.22],[77,.22],[72,.42,-1]],dormido:[[76,.3],[72,.5,-1]]};
  var ctx=null,cur='normal';
  function audio(){try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume();return ctx}catch(e){return null}}
  function voice(emo){var seq=LV[emo]||LV.hola,a=audio();if(!a)return;var t=a.currentTime+.02;
    seq.forEach(function(n){var f=440*Math.pow(2,(n[0]-69)/12),d=n[1],c=a.createOscillator(),m=a.createOscillator(),mg=a.createGain(),g=a.createGain();
      c.type='sine';m.type='sine';c.frequency.setValueAtTime(f,t);m.frequency.setValueAtTime(f*3.5,t);
      if(n[2]){var k=n[2]>0?1.06:.94;c.frequency.exponentialRampToValueAtTime(f*k,t+d);m.frequency.exponentialRampToValueAtTime(f*3.5*k,t+d)}
      mg.gain.setValueAtTime(f*1.4,t);mg.gain.exponentialRampToValueAtTime(1,t+.12);
      g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d+.3);
      m.connect(mg);mg.connect(c.frequency);c.connect(g);g.connect(a.destination);c.start(t);m.start(t);c.stop(t+d+.34);m.stop(t+d+.34);t+=d})}
  var btns=[].slice.call(document.querySelectorAll('.emo')),lbl=document.getElementById('stage-lbl');
  btns.forEach(function(b){b.addEventListener('click',function(){
    cur=b.dataset.emo;btns.forEach(function(x){x.classList.toggle('on',x===b)});
    lumyAt(stage,cur);lbl.textContent=NAMES[cur]})});
  var bell=document.getElementById('bell');
  if(bell)bell.addEventListener('click',function(){voice(cur)});
})();

/* pie: Lumy reacciona al link que tocas */
(function(){
  var host=document.getElementById('foot-lumy'),say=document.getElementById('foot-say');
  if(!host||!window.MCG||!MCG.lumy)return;
  var base='¡Hola! ¿Por dónde empezamos?',timer;
  function set(emo,text){
    host.innerHTML='';host.appendChild(MCG.lumy(+host.dataset.size||250,emo,false,''));
    say.textContent=text}
  [].forEach.call(document.querySelectorAll('.pl[data-emo]'),function(a){
    function on(){clearTimeout(timer);set(a.dataset.emo,a.dataset.say)}
    function off(){timer=setTimeout(function(){set('feliz',base)},250)}
    a.addEventListener('mouseenter',on);a.addEventListener('focus',on);
    a.addEventListener('mouseleave',off);a.addEventListener('blur',off)});
})();

/* personajes: Zarx y Niko interactivos */
(function(){
  var zh=document.getElementById('stage-zarx');
  if(zh&&window.MCG&&MCG.zarx){
    var zl=document.getElementById('zarx-lbl');
    [].forEach.call(document.querySelectorAll('.zbtn'),function(b){b.addEventListener('click',function(){
      [].forEach.call(document.querySelectorAll('.zbtn'),function(x){x.classList.toggle('on',x===b)});
      zh.innerHTML='';zh.appendChild(MCG.zarx(+zh.dataset.size||260,b.dataset.face,b.dataset.horns==='1'));
      zl.textContent=b.dataset.say})})}
  var nh=document.getElementById('stage-niko');
  if(nh&&window.renderNiko3D){
    var nl=document.getElementById('niko-lbl');
    [].forEach.call(document.querySelectorAll('.nbtn'),function(b){b.addEventListener('click',function(){
      [].forEach.call(document.querySelectorAll('.nbtn'),function(x){x.classList.toggle('on',x===b)});
      nh.innerHTML=renderNiko3D(+nh.dataset.size||290,b.dataset.nemo,{comicFx:true,gear:{glasses:'default'}});
      nl.textContent=b.textContent})})}
})();
