(function(){
  var hd=document.querySelector('header.site');
  function onScroll(){hd.classList.toggle('solid',window.scrollY>40)}
  onScroll();addEventListener('scroll',onScroll,{passive:true});

  var burger=document.querySelector('.burger'),nav=document.getElementById('nav');
  burger.addEventListener('click',function(){
    var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});

  var hero=document.querySelector('.hero:not(.static)');
  if(!hero)return;
  var slides=[].slice.call(hero.querySelectorAll('.slide')),
      dots=[].slice.call(hero.querySelectorAll('.dot')),
      pause=hero.querySelector('.pause'),i=0,paused=false,DUR=7000,t;
  hero.style.setProperty('--dur',DUR/1000+'s');
  function go(n){
    i=(n+slides.length)%slides.length;
    slides.forEach(function(s,k){s.classList.toggle('on',k===i);s.setAttribute('aria-hidden',k!==i)});
    dots.forEach(function(d,k){d.classList.remove('on');if(k===i){void d.offsetWidth;d.classList.add('on')}});
    clearTimeout(t);if(!paused)t=setTimeout(function(){go(i+1)},DUR);
  }
  dots.forEach(function(d,k){d.addEventListener('click',function(){go(k)})});
  pause.addEventListener('click',function(){
    paused=!paused;hero.classList.toggle('paused',paused);
    pause.setAttribute('aria-label',paused?'Reanudar':'Pausar');
    if(paused)clearTimeout(t);else go(i);
  });
  addEventListener('keydown',function(e){
    if(e.key==='ArrowRight')go(i+1);if(e.key==='ArrowLeft')go(i-1)});
  go(0);
})();

/* eventos: estado según la fecha de hoy + banner en la home */
(function(){
  function day(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
  var today=day(new Date());
  [].forEach.call(document.querySelectorAll('.evt'),function(el){
    var s=el.dataset.start,e=el.dataset.end,st=today<s?'next':(today>e?'past':'live');
    el.dataset.status=st;el.querySelector('.evb').textContent={live:'En curso',next:'Próximamente',past:'Terminado'}[st]});
  var list=window.TMC_EVENTS,bn=document.getElementById('evbanner');
  if(!list||!bn)return;
  var live=list.filter(function(x){return today>=x.start&&today<=x.end})[0];
  var next=list.filter(function(x){return today<x.start}).sort(function(a,b){return a.start<b.start?-1:1})[0];
  var ev=live||next;if(!ev)return;
  bn.querySelector('.evb').textContent=live?'Evento en curso':'Próximo evento';
  document.getElementById('evb-name').textContent=ev.name+' · '+ev.app;
  document.getElementById('evb-dates').textContent=ev.dates;
  document.getElementById('evb-link').href=ev.url;bn.hidden=false;
})();

/* v2: revelar al hacer scroll */
(function(){
  var els=[].slice.call(document.querySelectorAll('.v2 .rv'));if(!els.length)return;
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(e){io.observe(e)});
})();
