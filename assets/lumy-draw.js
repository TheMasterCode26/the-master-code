/* Lumy (mascota de The Master Code Games): dibujo, ojos por emoción, animación de apertura, gorritos.
   Extraído de Pocket Games Hub 1.0.10 (www/theme.js, módulo de Lumy). Úsalo como referencia en otros juegos (Jumpin' Lumy, Pocket Arcade Hub). */
/* ---------- Lumy, la mascota: la ficha menta que se abre como un ojo, enciende su pantallita y muestra sus ojos ----------
   MCG.lumy(tamaño, expresión) → elemento. Expresiones: normal, feliz, pensando, triste, dormido, ganaste.
   Aparece sola en: reglas / tutorial de cada juego, tarjetas de ganar / perder / empate, y el inicio. */
(function () {
  'use strict';
  if (window.MCG && MCG.lumy) return;
  var M = '#3EF0B5', MD = '#1FA97A', SCR = '#08111B';
  var EYES = {
    normal: '<rect x="-46" y="-25" width="30" height="42" rx="11"/><rect x="16" y="-25" width="30" height="42" rx="11"/>',
    feliz: '<path d="M-48 6 q17 -30 34 0 M14 6 q17 -30 34 0" fill="none" stroke-width="10" stroke-linecap="round"/>',
    pensando: '<rect x="-36" y="-32" width="24" height="30" rx="9"/><rect x="22" y="-32" width="24" height="30" rx="9"/><circle cx="52" cy="-40" r="4.5"/><circle cx="62" cy="-50" r="3"/>',
    triste: '<path d="M-46 -4 h30 v10 a15 15 0 0 1 -30 0 z M16 -4 h30 v10 a15 15 0 0 1 -30 0 z"/><path d="M-48 -10 l32 -9 M48 -10 l-32 -9" fill="none" stroke-width="6" stroke-linecap="round"/>',
    sorpresa: '<circle cx="-31" cy="-6" r="19"/><circle cx="31" cy="-6" r="19"/><circle cx="-25" cy="-12" r="6" fill="#08111B"/><circle cx="37" cy="-12" r="6" fill="#08111B"/>',
    guino: '<path d="M-48 2 q17 -26 34 0" fill="none" stroke-width="10" stroke-linecap="round"/><rect x="16" y="-25" width="30" height="42" rx="11"/>',
    amor: '<path transform="translate(-31,-4) scale(1.15)" d="M0 14 C-22 -2 -14 -20 0 -9 C14 -20 22 -2 0 14z"/><path transform="translate(31,-4) scale(1.15)" d="M0 14 C-22 -2 -14 -20 0 -9 C14 -20 22 -2 0 14z"/>',
    dormido: '<path d="M-48 2 q17 12 34 0 M14 2 q17 12 34 0" fill="none" stroke-width="8" stroke-linecap="round"/>',
    ganaste: '<path transform="translate(-31,-2)" d="M0 -20 l6 12 l13 1.5 l-10 9 l3 13 l-12 -7 l-12 7 l3 -13 l-10 -9 l13 -1.5 z"/><path transform="translate(31,-2)" d="M0 -20 l6 12 l13 1.5 l-10 9 l3 13 l-12 -7 l-12 7 l3 -13 l-10 -9 l13 -1.5 z"/>'
  };
  var css = '.lumy{display:inline-block;width:var(--ls,56px);height:calc(var(--ls,56px)*1.06);flex:0 0 auto;vertical-align:middle;line-height:0}' +
    '.lumy svg{width:100%;height:100%;overflow:visible}' +
    '.lumy .l-tok{transform-box:fill-box;transform-origin:50% 100%}' +
    '.lumy .l-scr,.lumy .l-eyes{transform-box:fill-box;transform-origin:center}' +
    '.lumy .l-eyes{fill:' + M + ';stroke:' + M + ';filter:drop-shadow(0 0 3px rgba(62,240,181,.85))}' +
    '.lumy.l-open .l-scr{animation:l-open .55s cubic-bezier(.3,1.6,.5,1) .25s both}' +
    '.lumy.l-open .l-flash{animation:l-flash .5s linear .75s both}' +
    '.lumy.l-open .l-eyes{animation:l-eyes .35s cubic-bezier(.3,1.6,.5,1) 1.1s both}' +
    '.lumy .l-blink{transform-box:fill-box;transform-origin:center;animation:l-blink 4.2s 2s infinite}' +
    '.lumy.l-feliz .l-tok,.lumy.l-ganaste .l-tok{animation:l-hop .7s ease-out 1.3s 2}' +
    '.lumy.l-triste .l-tok{transform:scale(1.06,.92)}' +
    '@keyframes l-open{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}' +
    '@keyframes l-flash{0%{opacity:.55}20%{opacity:0}35%{opacity:.35}50%{opacity:0}100%{opacity:0}}' +
    '@keyframes l-eyes{0%{transform:scaleY(0);opacity:0}100%{transform:scaleY(1);opacity:1}}' +
    '@keyframes l-blink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}' +
    '@keyframes l-hop{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-14%) scale(.97,1.03)}75%{transform:translateY(0) scale(1.05,.95)}}' +
    '@media (prefers-reduced-motion:reduce){.lumy *{animation:none!important}}' +
    '.lumy-head{display:flex;align-items:center;gap:12px}.lumy-head h2{margin:0}' +
    '.overlay .card .lumy{display:block;margin:0 auto 8px}' +
    /* reacciones (1.0.4): ganar, empatar, perder, tocar */
    '.lumy.r-win .l-tok{animation:l-win 1.1s cubic-bezier(.3,1.5,.5,1) 1.15s 2}' +
    '.lumy.r-tie .l-tok{animation:l-tie 1.2s ease-in-out 1.15s 2}' +
    '.lumy.r-lose .l-tok{animation:l-lose 1.4s ease-in-out 1.15s 1 both}' +
    '.lumy .l-tear{opacity:0}.lumy.r-lose .l-tear{animation:l-tear 1.6s ease-in 1.6s 2}' +
    '.lumy.l-poke .l-tok{animation:l-poke .9s cubic-bezier(.3,1.4,.5,1)}' +
    '.lumy.l-glow svg{filter:drop-shadow(0 0 6px rgba(62,240,181,.55))}.lumy.l-glow2 svg{filter:drop-shadow(0 0 10px rgba(62,240,181,.9))}' +
    '@keyframes l-win{0%,100%{transform:translateY(0) rotate(0)}30%{transform:translateY(-26%) rotate(-12deg) scale(1.05)}55%{transform:translateY(-30%) rotate(14deg)}80%{transform:translateY(0) scale(1.08,.92)}}' +
    '@keyframes l-tie{0%,100%{transform:rotate(0)}25%{transform:rotate(-14deg)}50%{transform:rotate(12deg)}75%{transform:rotate(-6deg)}}' +
    '@keyframes l-lose{0%{transform:none}30%{transform:translateX(-6%)}45%{transform:translateX(6%)}60%{transform:translateX(-3%)}100%{transform:translateY(4%) scale(1.08,.88)}}' +
    '@keyframes l-tear{0%{opacity:0;transform:translateY(0)}15%{opacity:1}100%{opacity:0;transform:translateY(60px)}}' +
    '@keyframes l-poke{0%{transform:scale(1)}20%{transform:scale(.8,1.15)}55%{transform:translateY(-30%) rotate(360deg) scale(1.1)}80%{transform:translateY(0) rotate(360deg) scale(1.1,.9)}100%{transform:rotate(360deg)}}' +
    '.lumy-fx{position:fixed;pointer-events:none;z-index:7000;font-size:18px;animation:l-fx 1s ease-out forwards}' +
    '@keyframes l-fx{0%{opacity:1;transform:translate(0,0) scale(.6)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(1.3)}}' +
    '.overlay .card .lumy-line,.lumy-line{font-family:inherit!important;font-weight:700!important;font-size:15px!important;line-height:1.3!important;color:var(--accent,#3EF0B5)!important;opacity:1;margin:4px 0 6px!important;animation:fx-drop .4s ease-out 1.2s both}' +
    '.overlay .card .lumy{display:block;margin:0 auto 6px}' +
    '.overlay.es{position:fixed;inset:0;z-index:2600;display:grid;place-items:end center;align-items:end;background:rgba(0,0,0,.3);border-radius:0;padding:0}' +
    '.overlay.es .card.es-card{position:relative;width:100%;max-width:560px;max-height:88vh;overflow:auto;box-sizing:border-box;margin:0;border:0!important;border-radius:28px 28px 0 0!important;padding:34px 20px calc(18px + env(safe-area-inset-bottom,0px))!important;text-align:left;display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:14px;align-items:center;box-shadow:0 -12px 40px rgba(0,0,0,.45)!important;animation:esUp .45s cubic-bezier(.2,1.2,.4,1) both!important}' +
    '@keyframes esUp{from{transform:translateY(100%)}}' +
    '.es-card>*{grid-column:1/-1}' +
    '.es-card::before{content:"";position:absolute;top:10px;left:50%;width:40px;height:5px;margin-left:-20px;border-radius:3px;background:color-mix(in srgb,var(--ink-soft) 40%,transparent)}' +
    '.overlay.es .es-card>.lumy{grid-column:1;grid-row:1/span 2;--ls:84px!important;margin:0!important}' +
    '.overlay.es .es-card>.big{grid-column:2;grid-row:1;align-self:end;text-align:left;margin:0;font-size:30px!important;line-height:1.05}' +
    '.overlay.es .es-card>.lumy-line{grid-column:2;grid-row:2;align-self:start;text-align:left;margin:4px 0 0!important}' +
    '.overlay.es .es-card>p:not(.lumy-line):not(.es-note){text-align:left;margin:10px 0 0;color:var(--ink-soft)}.overlay.es .es-card>p:empty{display:none}.overlay.es .es-view{background:none!important;box-shadow:none!important;padding:6px 4px!important;min-height:0!important}' +
    '.es-view{position:absolute;top:8px;right:12px;border:0;background:none;color:var(--ink-soft);font:inherit;font-size:13px;font-weight:800;padding:6px 4px;cursor:pointer;z-index:1}' +
    '.es-streak{display:flex;align-items:center;gap:10px;width:100%;margin-top:12px;padding:10px 14px;border-radius:16px;border:0;background:color-mix(in srgb,#FF8A2B 18%,var(--panel));color:var(--ink);font:inherit;font-size:14px;font-weight:700;text-align:left;cursor:pointer}' +
    '.es-streak svg{width:18px;height:24px;flex:0 0 auto}.es-streak span{flex:1}.es-streak b{color:color-mix(in srgb,#FF8A2B 75%,var(--ink));white-space:nowrap}' +
    '.es-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}.es-stats div{display:flex;flex-direction:column;align-items:center;gap:2px;padding:9px 4px;border-radius:14px;background:var(--panel-2)}' +
    '.es-stats small{font-size:11px;font-weight:700;color:var(--ink-soft)}.es-stats b{font-family:var(--f-display);font-weight:800;font-size:17px}' +
    '.es-note{margin:10px 0 0!important;font-size:13px;color:var(--ink-soft);text-align:center}' +
    '.overlay.es .es-card .row{display:grid!important;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}' +
    '.overlay.es .es-card .row>*:first-child{grid-column:1/-1;min-height:54px;font-size:17px}' +
    '.overlay.es .es-card .row>*{min-height:48px;display:flex;align-items:center;justify-content:center;margin:0;width:100%;box-sizing:border-box}' +
    '.overlay.es .es-card .row>*:nth-child(n+2):last-child:nth-child(even){grid-column:1/-1}' +
    '.es-home{border-radius:14px;padding:12px 20px;background:var(--panel-2);color:var(--ink);text-decoration:none;font-weight:700}' +
    '.overlay.es.es-min{background:transparent;pointer-events:none}' +
    /* 1.0.5: «Ver tablero» deja solo una tirita chica (sin botones ni Lumy) para que no estorbe; en tableta horizontal va en la columna izquierda */
    '.overlay.es.es-min .es-card>.row,.overlay.es.es-min .es-card>.lumy{display:none!important}.overlay.es.es-min .es-card{max-width:420px!important}' +
    '@media (orientation:landscape) and (min-width:880px){.overlay.es.es-min{justify-content:flex-start!important;align-items:flex-end!important}.overlay.es.es-min .es-card{margin-left:16px!important;max-width:min(380px,30vw)!important}}' +
    '.overlay.es.es-min .es-card{pointer-events:auto;grid-template-columns:auto 1fr auto;padding:10px 12px calc(10px + env(safe-area-inset-bottom,0px))!important;margin:0 10px 10px;border-radius:22px!important;max-width:540px;width:calc(100% - 20px)}' +
    '.overlay.es.es-min .es-card::before,.overlay.es.es-min .es-card>p,.overlay.es.es-min .es-extra:not(.es-view),.overlay.es.es-min .es-card>.lumy-line,.overlay.es.es-min .es-card>*:not(.lumy):not(.big):not(.row):not(.es-view){display:none}' +
    '.overlay.es.es-min .es-card>.lumy{grid-row:1;--ls:44px!important}.overlay.es.es-min .es-card>.big{grid-row:1;align-self:center;font-size:18px!important}' +
    '.overlay.es.es-min .es-card .row{grid-column:3;grid-row:1;margin:0;display:block!important}.overlay.es.es-min .es-card .row>*:not(:first-child){display:none}.overlay.es.es-min .es-card .row>*:first-child{min-height:42px;font-size:14px;padding:0 14px}' +
    '.overlay.es.es-min .es-view{position:static;grid-column:1/-1;grid-row:2;justify-self:center;font-size:12px;padding:6px 0 0}';
  function addCss() { if (document.getElementById('lumy-css')) return; var s = document.createElement('style'); s.id = 'lumy-css'; s.textContent = css; (document.head || document.documentElement).appendChild(s); }
  /* 1.0.8 · gorritos de Lumy (se dibujan encima de la ficha; el svg deja ver lo que sale del cuadro) */
  function hatSVG(id) {
    var K = '#0F1720';
    if (id === 'calabaza') return '<g class="l-hat" transform="rotate(-12)"><path d="M-6 -150 q4 -16 18 -20" stroke="#2f7d32" stroke-width="9" stroke-linecap="round" fill="none"/>' +
      '<ellipse cx="0" cy="-112" rx="58" ry="40" fill="#f07a14" stroke="' + K + '" stroke-width="6"/><ellipse cx="0" cy="-112" rx="30" ry="40" fill="#ff9a2e" stroke="' + K + '" stroke-width="5"/>' +
      '<ellipse cx="0" cy="-112" rx="8" ry="40" fill="none" stroke="' + K + '" stroke-width="4"/><path d="M14 -150 q16 -6 24 4" stroke="#3fa34d" stroke-width="5" fill="none" stroke-linecap="round"/></g>';
    if (id === 'bruja') return '<g class="l-hat" transform="rotate(-8)"><path d="M-46 -98 L6 -196 Q20 -214 40 -200 Q20 -192 22 -170 L50 -98 Z" fill="#3a1f55" stroke="' + K + '" stroke-width="6" stroke-linejoin="round"/>' +
      '<path d="M-40 -112 L46 -112 L50 -98 L-46 -98 Z" fill="#ff8a1f" stroke="' + K + '" stroke-width="5" stroke-linejoin="round"/><rect x="-6" y="-114" width="16" height="14" rx="2" fill="#7cff4f" stroke="' + K + '" stroke-width="4"/>' +
      '<ellipse cx="2" cy="-96" rx="98" ry="17" fill="#2a1540" stroke="' + K + '" stroke-width="6"/></g>';
    if (id === 'corona') { var g = '<g class="l-hat"><path d="M-92 -50 Q0 -150 92 -50" fill="none" stroke="#2f7d32" stroke-width="10" stroke-linecap="round"/>';
      [-150, -126, -103, -77, -54, -30].concat([-90]).forEach(function (a, i) { var r = a * Math.PI / 180, x = 100 * Math.cos(r), y = 100 * Math.sin(r) + 4, big = i === 6;
        var R = big ? 24 : 19; g += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + R + '" fill="#f7a51c" stroke="' + K + '" stroke-width="5"/><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (R * .55) + '" fill="#ffd23f"/><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (R * .2) + '" fill="#c2410c"/>'; });
      return g + '</g>'; }
    if (id === 'palma') { var c = ['#e63946', '#f4a261', '#2a9d8f', '#e9c46a', '#7b2cbf', '#ff006e'], band = '', x = -50, n = 0;
      while (x < 50) { var w = [10, 6, 14, 5, 9][n % 5]; band += '<rect x="' + x + '" y="-122" width="' + Math.min(w, 50 - x) + '" height="18" fill="' + c[n % 6] + '"/>'; x += w; n++; }
      return '<g class="l-hat" transform="rotate(-8)"><ellipse cx="0" cy="-94" rx="140" ry="26" fill="#e8c27a" stroke="' + K + '" stroke-width="6"/>' +
        '<path d="M-46 -100 Q-42 -180 0 -184 Q42 -180 46 -100Z" fill="#f0cf8a" stroke="' + K + '" stroke-width="6"/>' +
        '<clipPath id="lpalma"><path d="M-46 -100 Q-42 -180 0 -184 Q42 -180 46 -100Z"/></clipPath><g clip-path="url(#lpalma)">' + band + '</g>' +
        '<path d="M-46 -100 Q-42 -180 0 -184 Q42 -180 46 -100Z" fill="none" stroke="' + K + '" stroke-width="6"/><path d="M-100 -96 q100 18 200 0" stroke="#c99a4b" stroke-width="3" fill="none"/></g>'; }
    /* 1.0.11 · Navidad hasta Reyes */
    if (id === 'santa') return '<g class="l-hat" transform="rotate(-6)"><path d="M-72 -100 Q-52 -196 30 -196 Q84 -192 104 -134 L80 -124 Q62 -160 34 -158 Q48 -128 72 -100Z" fill="#d62839" stroke="' + K + '" stroke-width="6" stroke-linejoin="round"/>' +
      '<rect x="-88" y="-118" width="176" height="34" rx="17" fill="#fff" stroke="' + K + '" stroke-width="6"/><circle cx="96" cy="-128" r="20" fill="#fff" stroke="' + K + '" stroke-width="6"/></g>';
    if (id === 'gorro') { var st = ''; for (var i = 0; i < 3; i++) st += '<rect x="-90" y="' + (-176 + i * 24) + '" width="180" height="11" fill="#fff"/>';
      return '<g class="l-hat"><clipPath id="lgorro"><path d="M-80 -98 Q-80 -194 0 -196 Q80 -194 80 -98Z"/></clipPath><path d="M-80 -98 Q-80 -194 0 -196 Q80 -194 80 -98Z" fill="#1f8a4c"/>' +
        '<g clip-path="url(#lgorro)">' + st + '</g><path d="M-80 -98 Q-80 -194 0 -196 Q80 -194 80 -98Z" fill="none" stroke="' + K + '" stroke-width="6"/>' +
        '<rect x="-90" y="-116" width="180" height="30" rx="12" fill="#d62839" stroke="' + K + '" stroke-width="6"/><path d="M-70 -112v22M-50 -112v22M-30 -112v22M-10 -112v22M10 -112v22M30 -112v22M50 -112v22M70 -112v22" stroke="' + K + '" stroke-opacity=".25" stroke-width="4"/>' +
        '<circle cx="0" cy="-200" r="22" fill="#fff" stroke="' + K + '" stroke-width="6"/></g>'; }
    if (id === 'reno') { var a = 'M-46 -96 L-66 -168 M-60 -146 L-96 -160 M-64 -164 L-54 -198 M-62 -120 L-86 -124';
      return '<g class="l-hat"><path d="M-96 -62 Q0 -150 96 -62" fill="none" stroke="' + K + '" stroke-width="18" stroke-linecap="round"/><path d="M-96 -62 Q0 -150 96 -62" fill="none" stroke="#d62839" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="' + a + '" stroke="' + K + '" stroke-width="20" stroke-linecap="round" fill="none"/><path d="' + a + '" stroke="#a9713a" stroke-width="11" stroke-linecap="round" fill="none"/>' +
        '<g transform="scale(-1,1)"><path d="' + a + '" stroke="' + K + '" stroke-width="20" stroke-linecap="round" fill="none"/><path d="' + a + '" stroke="#a9713a" stroke-width="11" stroke-linecap="round" fill="none"/></g>' +
        '<circle cx="0" cy="-108" r="13" fill="#ffd23f" stroke="' + K + '" stroke-width="5"/></g>'; }
    return '';
  }
  function lumy(size, expr, open, hat) {
    addCss(); expr = EYES[expr] ? expr : 'normal';
    var w = document.createElement('span'); w.className = 'lumy l-' + expr + (open === false ? '' : ' l-open');
    w.style.setProperty('--ls', (size || 56) + 'px'); w.setAttribute('aria-hidden', 'true');
    w.innerHTML = '<svg viewBox="-112 -110 224 238" overflow="visible" style="overflow:visible"><ellipse cx="0" cy="120" rx="70" ry="8" fill="#000" opacity=".22"/><g class="l-tok">' +
      '<circle cx="0" cy="9" r="104" fill="' + MD + '"/><circle r="104" fill="' + M + '"/>' +
      '<g class="l-scr"><circle r="76" fill="' + SCR + '"/><path d="M-52 -46 q30 -22 64 -22" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".13"/>' +
      '<circle class="l-flash" r="76" fill="' + M + '" opacity="0"/><g class="l-eyes"><g class="l-blink">' + EYES[expr] + '</g></g></g>' + hatSVG(hat === undefined ? (MCG.ev ? MCG.ev.hat() : '') : hat) + '</g></svg>';
    return w;
  }
  window.MCG = window.MCG || {}; MCG.lumy = lumy;
})();
