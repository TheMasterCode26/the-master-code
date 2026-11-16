/* NIKO 3D MODULAR ENGINE · Mascota Oficial 3D de The Master Code Academy (Codemy)
   Combina el sprite 3D fotorrealista original sin lentes (y variantes de manchas 3D)
   con capas vectoriales 3D desmontables alineadas 1:1 dentro del mismo contenedor animado
   (.cat-head.niko-real-body), preservando al 100% las animaciones y el aspecto 3D de Niko. */
(function () {
  var REACTIONS = [
    { id: 'saludo', label: 'Saludo', voice: 'hola' },
    { id: 'feliz', label: 'Feliz', voice: 'feliz' },
    { id: 'pensando', label: 'Pensando', voice: 'pensando' },
    { id: 'sorpresa', label: 'Asombro', voice: 'sorpresa' },
    { id: 'ganaste', label: 'Victoria', voice: 'ganaste' },
    { id: 'cool', label: 'Enfocado', voice: 'feliz' },
    { id: 'inspirado', label: 'Idea', voice: 'sorpresa' },
    { id: 'enojado', label: 'Caza-Bugs', voice: 'pensando' },
    { id: 'triste', label: 'Ups', voice: 'triste' },
    { id: 'durmiendo', label: 'Zzz', voice: 'pensando' },
    { id: 'celebrando', label: 'Celebrando', voice: 'ganaste' },
    { id: 'racha', label: 'Racha', voice: 'feliz' }
  ];

  var COAT_SPRITES = {
    classic: 'nolenses.webp',
    amber: 'amber.webp',
    midnight: 'midnight.webp',
    sakura: 'sakura.webp',
    mint: 'mint.webp'
  };

  function buildGearOverlay3D(gear, uid, emo) {
    gear = gear || {};
    emo = emo || 'saludo';
    var p = uid || ('ng' + Math.floor(Math.random() * 1e6) + '_');
    var hat = gear.hat || 'none';
    var glasses = gear.glasses || 'default';
    var neck = gear.neck || 'none';
    var ear = gear.ear || 'none';

    var defs =
      '<defs>' +
        '<linearGradient id="' + p + 'mint" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#8EFFDF"/><stop offset="52%" stop-color="#1FE0A8"/><stop offset="100%" stop-color="#0B6E5C"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + p + 'gold" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#FFF5BD"/><stop offset="48%" stop-color="#FBBF24"/><stop offset="100%" stop-color="#B45309"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + p + 'indigoFrame" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#4A4296"/><stop offset="55%" stop-color="#27215C"/><stop offset="100%" stop-color="#130F38"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + p + 'violet" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#E2D9FF"/><stop offset="52%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#431888"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + p + 'ruby" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#FDA4AF"/><stop offset="55%" stop-color="#E11D48"/><stop offset="100%" stop-color="#881337"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + p + 'darkMetal" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#3B4268"/><stop offset="55%" stop-color="#1E1B4B"/><stop offset="100%" stop-color="#0D0B28"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + p + 'lensSheen" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.30"/>' +
          '<stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.02"/>' +
          '<stop offset="100%" stop-color="#A5F3FC" stop-opacity="0.16"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + p + 'visor" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#3EF0B5" stop-opacity="0.72"/>' +
          '<stop offset="100%" stop-color="#38BDF8" stop-opacity="0.62"/>' +
        '</linearGradient>' +
        '<filter id="' + p + 'sh" x="-25%" y="-25%" width="150%" height="150%">' +
          '<feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#09061E" flood-opacity="0.45"/>' +
        '</filter>' +
      '</defs>';

    var out = defs;

    // 1) Aretes sobre oreja izquierda 3D
    if (ear === 'ring') {
      out += '<g filter="url(#' + p + 'sh)"><circle cx="15.5" cy="40" r="4.8" fill="none" stroke="url(#' + p + 'gold)" stroke-width="2.5"/><path d="M12.5 38 A4 4 0 0 1 17 36" fill="none" stroke="#FFFBEB" stroke-width="1" stroke-linecap="round"/></g>';
    } else if (ear === 'stud') {
      out += '<g filter="url(#' + p + 'sh)"><circle cx="16.8" cy="36" r="3.4" fill="url(#' + p + 'mint)" stroke="#16144A" stroke-width="1.2"/><circle cx="15.9" cy="35" r="1.1" fill="#FFFFFF" opacity="0.9"/></g>';
    }

    // 2) Lentes desmontables centrados 1:1 en los ojos 3D: izq (37.2, 62.9) y der (81.4, 60.8)
    if (glasses === 'default') {
      out +=
        '<g class="niko-glasses-default" filter="url(#' + p + 'sh)">' +
          '<path d="M8 58 L19 60.5 M100.5 59 L111 56" stroke="url(#' + p + 'indigoFrame)" stroke-width="2.8" stroke-linecap="round"/>' +
          '<rect x="17" y="59" width="4" height="3.2" rx="1" fill="url(#' + p + 'gold)"/>' +
          '<rect x="98.2" y="57.5" width="4" height="3.2" rx="1" fill="url(#' + p + 'gold)"/>' +
          '<circle cx="37.2" cy="62.8" r="18.6" fill="url(#' + p + 'lensSheen)" stroke="url(#' + p + 'indigoFrame)" stroke-width="3.6"/>' +
          '<circle cx="81.4" cy="60.8" r="18.6" fill="url(#' + p + 'lensSheen)" stroke="url(#' + p + 'indigoFrame)" stroke-width="3.6"/>' +
          '<path d="M23 53 A15 15 0 0 1 35 45.5" fill="none" stroke="#A5B4FC" stroke-width="1.2" stroke-linecap="round" opacity="0.72"/>' +
          '<path d="M67 51 A15 15 0 0 1 79 43.5" fill="none" stroke="#A5B4FC" stroke-width="1.2" stroke-linecap="round" opacity="0.72"/>' +
          '<path d="M55.2 61.5 Q59.3 56.2 63.4 60.5" fill="none" stroke="url(#' + p + 'gold)" stroke-width="2.8" stroke-linecap="round"/>' +
        '</g>';
    } else if (glasses === 'gold') {
      out +=
        '<g class="niko-glasses-gold" filter="url(#' + p + 'sh)">' +
          '<path d="M9 58 L19 60.5 M100 59 L110 56" stroke="url(#' + p + 'gold)" stroke-width="2.6" stroke-linecap="round"/>' +
          '<circle cx="37.2" cy="62.8" r="18.4" fill="url(#' + p + 'lensSheen)" stroke="url(#' + p + 'gold)" stroke-width="3.6"/>' +
          '<circle cx="81.4" cy="60.8" r="18.4" fill="url(#' + p + 'lensSheen)" stroke="url(#' + p + 'gold)" stroke-width="3.6"/>' +
          '<path d="M55.2 61 Q59.3 56 63.4 60" fill="none" stroke="url(#' + p + 'gold)" stroke-width="2.8" stroke-linecap="round"/>' +
        '</g>';
    } else if (glasses === 'neon') {
      out +=
        '<g class="niko-glasses-neon" filter="url(#' + p + 'sh)">' +
          '<path d="M13 50 L106 48 L108 71 Q90 77 65 73 L59 69 L53 73 Q28 78 12 72 Z" fill="url(#' + p + 'visor)" stroke="#16144A" stroke-width="2.2" stroke-linejoin="round"/>' +
          '<path d="M19 55 L46 54 M76 53 L99 52" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.72"/>' +
        '</g>';
    } else if (glasses === 'star') {
      out +=
        '<g class="niko-glasses-star" filter="url(#' + p + 'sh)">' +
          '<polygon points="37,43 43,54 55,55 46,63 48,75 37,69 26,75 28,63 19,55 31,54" fill="rgba(244,114,182,0.34)" stroke="#DB2777" stroke-width="2.5" stroke-linejoin="round"/>' +
          '<polygon points="81,41 87,52 99,53 90,61 92,73 81,67 70,73 72,61 63,53 75,52" fill="rgba(56,189,248,0.34)" stroke="#0284C7" stroke-width="2.5" stroke-linejoin="round"/>' +
          '<line x1="54" y1="57" x2="65" y2="56" stroke="#FFD15C" stroke-width="2.6" stroke-linecap="round"/>' +
        '</g>';
    }

    // 3) Sombreros / Diademas (sin gorras estorbosas)
    if (hat === 'bandana') {
      out +=
        '<g filter="url(#' + p + 'sh)">' +
          '<path d="M15 35 Q59 24 104 34 L102 43 Q59 33 17 44 Z" fill="url(#' + p + 'darkMetal)" stroke="#0F172A" stroke-width="1.6" stroke-linejoin="round"/>' +
          '<path d="M21 38 Q59 29 98 37" fill="none" stroke="url(#' + p + 'mint)" stroke-width="2.6" stroke-linecap="round"/>' +
          '<rect x="52" y="27.5" width="14" height="10.5" rx="3.2" fill="url(#' + p + 'mint)" stroke="#16144A" stroke-width="1.4"/>' +
          '<circle cx="59" cy="32.7" r="2.1" fill="#16144A"/>' +
          '<path d="M103 36 L114 31 L111 40 Z" fill="#1E1B4B" stroke="#3EF0B5" stroke-width="1.2"/>' +
        '</g>';
    } else if (hat === 'crown') {
      out +=
        '<g filter="url(#' + p + 'sh)">' +
          '<path d="M36 22 L39 5 L49 14 L59 1 L69 14 L79 5 L82 22 Z" fill="url(#' + p + 'gold)" stroke="#78350F" stroke-width="1.7" stroke-linejoin="round"/>' +
          '<ellipse cx="59" cy="22" rx="23" ry="3.8" fill="#B45309" stroke="#78350F" stroke-width="1.4"/>' +
          '<circle cx="59" cy="14" r="3" fill="url(#' + p + 'mint)" stroke="#16144A" stroke-width="1"/>' +
          '<circle cx="45" cy="17" r="2.1" fill="#F43F5E"/><circle cx="73" cy="17" r="2.1" fill="#38BDF8"/>' +
        '</g>';
    } else if (hat === 'wizard') {
      out +=
        '<g filter="url(#' + p + 'sh)">' +
          '<path d="M35 23 L57 -13 L83 23 Z" fill="url(#' + p + 'violet)" stroke="#16144A" stroke-width="1.7" stroke-linejoin="round"/>' +
          '<ellipse cx="59" cy="23.5" rx="35" ry="6.4" fill="#3B1578" stroke="#16144A" stroke-width="1.7"/>' +
          '<path d="M40 16 Q59 19 78 16" fill="none" stroke="url(#' + p + 'gold)" stroke-width="3.2" stroke-linecap="round"/>' +
          '<circle cx="58" cy="5" r="2.6" fill="#FFD15C"/>' +
        '</g>';
    } else if (hat === 'halo') {
      out +=
        '<g filter="url(#' + p + 'sh)">' +
          '<ellipse cx="59" cy="2" rx="27" ry="6.2" fill="none" stroke="#FFFFFF" stroke-width="5.2" opacity="0.65"/>' +
          '<ellipse cx="59" cy="2" rx="27" ry="6.2" fill="none" stroke="url(#' + p + 'mint)" stroke-width="3.4"/>' +
        '</g>';
    }

    // 4) Collares y Peluche de Lumy pegado al costado izquierdo (se anima con las reacciones de Niko)
    if (neck === 'lumy') {
      var lEye = '<rect x="-7.2" y="-3.8" width="4.4" height="6.8" rx="1.6" fill="#3EF0B5"/><rect x="2.8" y="-3.8" width="4.4" height="6.8" rx="1.6" fill="#3EF0B5"/>';
      if (emo === 'feliz' || emo === 'ganaste' || emo === 'celebrando') {
        lEye = '<path d="M-7.5 0.5 q2.5 -4.5 5 0 M2.5 0.5 q2.5 -4.5 5 0" fill="none" stroke="#3EF0B5" stroke-width="1.8" stroke-linecap="round"/>';
      } else if (emo === 'triste') {
        lEye = '<path d="M-7.2 -1 h4.4 v2 a2.2 2.2 0 0 1 -4.4 0 z M2.8 -1 h4.4 v2 a2.2 2.2 0 0 1 -4.4 0 z"/>';
      } else if (emo === 'durmiendo') {
        lEye = '<path d="M-7.5 0 q2.5 2.4 5 0 M2.5 0 q2.5 2.4 5 0" fill="none" stroke="#3EF0B5" stroke-width="1.5" stroke-linecap="round"/>';
      }
      var lShiftY = (emo === 'ganaste' || emo === 'celebrando') ? 76 : (emo === 'triste' ? 86 : 82);
      var lRot = (emo === 'pensando' || emo === 'cool') ? -10 : -5;
      out +=
        '<g class="niko-lumy-plush" transform="translate(8, ' + lShiftY + ') rotate(' + lRot + ')" filter="url(#' + p + 'sh)">' +
          '<circle cx="0" cy="2" r="15.5" fill="#1FA97A" stroke="#16144A" stroke-width="1.4"/>' +
          '<circle cx="0" cy="0" r="15" fill="url(#' + p + 'mint)" stroke="#16144A" stroke-width="1.5"/>' +
          '<circle cx="0" cy="0" r="10.8" fill="#08111B"/>' +
          '<path d="M-7 -6 q5 -3 10 -3" stroke="#FFFFFF" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.22"/>' +
          lEye +
        '</g>';
    } else if (neck === 'bowtie') {
      out +=
        '<g filter="url(#' + p + 'sh)">' +
          '<polygon points="44,104 59,110 44,116" fill="url(#' + p + 'ruby)" stroke="#16144A" stroke-width="1.4" stroke-linejoin="round"/>' +
          '<polygon points="74,104 59,110 74,116" fill="url(#' + p + 'ruby)" stroke="#16144A" stroke-width="1.4" stroke-linejoin="round"/>' +
          '<circle cx="59" cy="110" r="3.8" fill="#FB7185" stroke="#16144A" stroke-width="1.4"/>' +
        '</g>';
    } else if (neck === 'scarf') {
      out +=
        '<g filter="url(#' + p + 'sh)">' +
          '<path d="M35 103 Q59 113 83 103 Q85 110 59 117 Q33 110 35 103 Z" fill="url(#' + p + 'mint)" stroke="#16144A" stroke-width="1.5"/>' +
          '<path d="M62 110 L72 121 L60 123 L56 112 Z" fill="url(#' + p + 'mint)" stroke="#16144A" stroke-width="1.4"/>' +
        '</g>';
    } else if (neck === 'medal') {
      out +=
        '<g filter="url(#' + p + 'sh)">' +
          '<path d="M44 102 L59 112 L74 102" fill="none" stroke="#2563EB" stroke-width="3.6" stroke-linecap="round"/>' +
          '<circle cx="59" cy="113" r="6.8" fill="url(#' + p + 'gold)" stroke="#16144A" stroke-width="1.5"/>' +
          '<polygon points="59,108.5 60.5,112 64,112.5 61.3,115 62,118.2 59,116.5 56,118.2 56.7,115 54,112.5 57.5,112" fill="#FFFFFF"/>' +
        '</g>';
    }

    if (out === defs) return '';
    return '<svg class="niko-gear-svg" viewBox="0 0 120 120" aria-hidden="true">' + out + '</svg>';
  }

  function buildComicOverlay2D(emo, dir, gear) {
    gear = gear || {};
    var hasLumy = gear.neck === 'lumy';
    var rightSide = hasLumy ? true : (dir !== 'left');
    var pawX = rightSide ? 88 : 4;
    var bubbleX = rightSide ? 88 : 4;
    var badge = '';

    if (emo === 'saludo') {
      badge =
        '<g transform="translate(' + pawX + ', 64)">' +
          '<g class="niko-paw-wave comic-fx-2d">' +
            '<circle cx="14" cy="14" r="12" fill="#FFFFFF" stroke="#16144A" stroke-width="2.5"/>' +
            '<ellipse cx="14" cy="17" rx="5.5" ry="4.5" fill="#FF9E7D"/>' +
            '<circle cx="8" cy="10" r="2.2" fill="#FF9E7D"/><circle cx="14" cy="8.2" r="2.3" fill="#FF9E7D"/><circle cx="20" cy="10" r="2.2" fill="#FF9E7D"/>' +
          '</g>' +
        '</g>' +
        '<polygon class="comic-fx-2d" points="16,16 19,8 22,16 30,17 24,22 26,30 19,25 12,30 14,22 8,17" fill="#FFD15C" stroke="#16144A" stroke-width="1.8"/>';
    } else if (emo === 'feliz') {
      badge =
        '<path class="comic-fx-2d" d="M8 14 C8 8, 15 8, 15 14 C15 8, 22 8, 22 14 C22 21, 15 26, 15 26 C15 26, 8 21, 8 14 Z" fill="#F472B6" stroke="#16144A" stroke-width="1.8"/>' +
        '<circle class="comic-fx-2d" cx="102" cy="18" r="4.5" fill="#FFD15C" stroke="#16144A" stroke-width="1.6"/>';
    } else if (emo === 'pensando') {
      badge =
        '<g class="comic-fx-2d">' +
          '<circle cx="' + (rightSide ? 90 : 30) + '" cy="28" r="3.2" fill="#FFFFFF" stroke="#16144A" stroke-width="1.6"/>' +
          '<circle cx="' + (rightSide ? 98 : 22) + '" cy="20" r="4.5" fill="#FFFFFF" stroke="#16144A" stroke-width="1.6"/>' +
          '<rect x="' + bubbleX + '" y="-4" width="26" height="20" rx="8" fill="#38BDF8" stroke="#16144A" stroke-width="2"/>' +
          '<text x="' + (bubbleX + 13) + '" y="10" text-anchor="middle" font-family="Sora,sans-serif" font-weight="900" font-size="13" fill="#16144A">?</text>' +
        '</g>';
    } else if (emo === 'sorpresa') {
      badge =
        '<g class="comic-fx-2d">' +
          '<rect x="' + (rightSide ? 90 : 6) + '" y="-4" width="24" height="20" rx="6" fill="#FFD15C" stroke="#16144A" stroke-width="2"/>' +
          '<text x="' + (rightSide ? 102 : 18) + '" y="10" text-anchor="middle" font-family="Sora,sans-serif" font-weight="900" font-size="13" fill="#16144A">?!</text>' +
        '</g>';
    } else if (emo === 'ganaste' || emo === 'celebrando') {
      badge =
        '<g class="comic-fx-2d">' +
          '<polygon points="10,20 14,10 18,20 27,21 20,27 22,36 14,31 6,36 8,27 1,21" fill="#FFD15C" stroke="#16144A" stroke-width="1.8"/>' +
          '<polygon points="104,16 107,24 115,25 109,30 111,38 104,33 97,38 99,30 93,25 101,24" fill="#3EF0B5" stroke="#16144A" stroke-width="1.8"/>' +
          '<circle cx="96" cy="8" r="3" fill="#F472B6" stroke="#16144A" stroke-width="1.3"/>' +
        '</g>';
    } else if (emo === 'cool') {
      badge =
        '<g class="comic-fx-2d">' +
          '<polygon points="102,4 105,12 113,13 107,18 109,26 102,21 95,26 97,18 91,13 99,12" fill="#3EF0B5" stroke="#16144A" stroke-width="1.6"/>' +
        '</g>';
    } else if (emo === 'inspirado') {
      badge =
        '<g class="comic-fx-2d">' +
          '<path d="M104 -2 L97 10 H105 L100 22 L114 8 H105 Z" fill="#FFD15C" stroke="#16144A" stroke-width="1.8" stroke-linejoin="round"/>' +
          '<circle cx="14" cy="14" r="3.5" fill="#3EF0B5" stroke="#16144A" stroke-width="1.4"/>' +
        '</g>';
    } else if (emo === 'enojado') {
      badge =
        '<g class="comic-fx-2d">' +
          '<rect x="86" y="-4" width="32" height="18" rx="6" fill="#F43F5E" stroke="#16144A" stroke-width="1.8"/>' +
          '<text x="102" y="8" text-anchor="middle" font-family="Sora,sans-serif" font-weight="900" font-size="9" fill="#FFFFFF">BUG!</text>' +
        '</g>';
    } else if (emo === 'triste') {
      badge =
        '<path class="comic-fx-2d" d="M22 52 C25 58, 27 64, 22 66 C17 64, 19 58, 22 52 Z" fill="#38BDF8" stroke="#16144A" stroke-width="1.6"/>';
    } else if (emo === 'durmiendo') {
      badge =
        '<g class="comic-fx-2d">' +
          '<text x="92" y="16" font-family="Sora,sans-serif" font-weight="900" font-size="13" fill="#A855F7" stroke="#16144A" stroke-width="1">Z</text>' +
          '<text x="102" y="4" font-family="Sora,sans-serif" font-weight="900" font-size="17" fill="#38BDF8" stroke="#16144A" stroke-width="1">Z</text>' +
        '</g>';
    } else if (emo === 'racha') {
      badge =
        '<g class="comic-fx-2d">' +
          '<path d="M104 0 C110 10, 116 18, 112 28 C109 34, 98 34, 96 26 C94 19, 100 10, 104 0 Z" fill="#F97316" stroke="#16144A" stroke-width="1.8"/>' +
          '<path d="M104 12 C107 18, 109 22, 106 27 C104 29, 101 28, 100 24 C99 20, 102 16, 104 12 Z" fill="#FFD15C"/>' +
        '</g>';
    }

    return '<svg class="niko-fx-svg" viewBox="0 0 120 120" aria-hidden="true">' + badge + '</svg>';
  }

  function renderNiko3D(size, emotion, opts) {
    opts = opts || {};
    var emo = emotion || 'saludo';
    var dir = opts.dir === 'left' ? 'left' : 'right';
    var showComicFx = opts.comicFx !== false;
    var gear = opts.gear || window.CODEMY_ACTIVE_NIKO_GEAR || { glasses: 'default' };
    var base = (typeof window !== 'undefined' && window.NIKO_BASE_PATH) ? window.NIKO_BASE_PATH : '';
    var sprite = base + (COAT_SPRITES[gear.coat] || COAT_SPRITES.classic);
    var gearHtml = buildGearOverlay3D(gear, null, emo);
    var fxHtml = showComicFx ? buildComicOverlay2D(emo, dir, gear) : '';

    return (
      '<div class="codemy-cat niko-real l-' + emo + ' dir-' + dir + '" style="width:' + size + 'px;height:' + size + 'px;">' +
        '<div class="niko-shadow"></div>' +
        '<div class="cat-head niko-real-body">' +
          '<img class="niko-real-img" src="' + sprite + '" alt="Niko" draggable="false">' +
          gearHtml +
          fxHtml +
        '</div>' +
      '</div>'
    );
  }

  /* Banco de 64 frases unicas para la burbuja interactiva de Niko (Motivacion + Datos Curiosos + Tips) */
  var NIKO_PHRASES = [
    { cat: 'MOTIVACIÓN', emo: 'saludo', text: '¡Hola {name}! Hoy estás a un pequeño paso de entender algo que parecía imposible.' },
    { cat: 'MOTIVACIÓN', emo: 'feliz', text: 'Nadie nació sabiendo programar, {name}. Cada experto empezó dibujando su primer paso.' },
    { cat: 'MOTIVACIÓN', emo: 'inspirado', text: 'Equivocarse en un quiz no te quita inteligencia: te señala justo qué idea reforzar.' },
    { cat: 'MOTIVACIÓN', emo: 'ganaste', text: 'Un módulo hoy y otro mañana valen más que diez horas de estrés en un solo día.' },
    { cat: 'MOTIVACIÓN', emo: 'cool', text: 'Tu cerebro ya resuelve algoritmos todos los días cuando cruzas la calle o cocinas.' },
    { cat: 'MOTIVACIÓN', emo: 'feliz', text: 'Cada línea de lógica que ordenas entrena tu paciencia y claridad mental, {name}.' },
    { cat: 'MOTIVACIÓN', emo: 'inspirado', text: 'Las pantallas que hoy admiras fueron escritas bloque por bloque por personas como tú.' },
    { cat: 'MOTIVACIÓN', emo: 'saludo', text: 'No compares tu Paso 1 con el Paso 100 de otra persona. Vas justo a tu ritmo.' },
    { cat: 'MOTIVACIÓN', emo: 'ganaste', text: 'Cuando entiendes el porqué de un error, ese fallo se convierte en superpoder.' },
    { cat: 'MOTIVACIÓN', emo: 'feliz', text: 'Cinco minutos de práctica constante mantienen encendida tu racha y tu intuición.' },
    { cat: 'MOTIVACIÓN', emo: 'cool', text: 'Programar es convertir ideas invisibles en herramientas reales que ayudan a otros.' },
    { cat: 'MOTIVACIÓN', emo: 'inspirado', text: 'Si algo se siente difícil ahora, significa que tu mente está creciendo de nivel.' },
    { cat: 'MOTIVACIÓN', emo: 'saludo', text: 'Confía en el proceso, {name}: primero la idea visual, después la lógica y al final el código.' },
    { cat: 'MOTIVACIÓN', emo: 'ganaste', text: 'Ya diste el paso más difícil de aprender tecnología: empezar sin miedo.' },
    { cat: 'MOTIVACIÓN', emo: 'feliz', text: 'Tu futuro yo te va a agradecer haber dedicado estos minutos de curiosidad hoy.' },
    { cat: 'MOTIVACIÓN', emo: 'cool', text: 'Los mejores ingenieros no memorizan todo; saben hacer mejores preguntas.' },
    { cat: 'MOTIVACIÓN', emo: 'inspirado', text: 'Cada problema enorme se vuelve sencillo cuando lo partes en tres tareas chiquitas.' },
    { cat: 'MOTIVACIÓN', emo: 'feliz', text: 'Tu curiosidad vale oro: toca, prueba, falla y vuelve a intentar conmigo.' },
    { cat: 'MOTIVACIÓN', emo: 'saludo', text: '¡Ánimo {name}! Estás construyendo tu propio mapa hacia la tecnología real.' },
    { cat: 'MOTIVACIÓN', emo: 'ganaste', text: 'Cada ejercicio terminado al 100% demuestra disciplina, no suerte.' },
    { cat: 'MOTIVACIÓN', emo: 'pensando', text: 'Si te trabas en un reto, respira hondo y léelo en voz alta; la pista suele estar ahí.' },
    { cat: 'MOTIVACIÓN', emo: 'cool', text: 'No importa tu edad ni de dónde vienes: la lógica es un idioma abierto para todos.' },
    { cat: 'MOTIVACIÓN', emo: 'inspirado', text: 'Hoy practicas diagramas sencillos; mañana diseñarás sistemas completos.' },
    { cat: 'MOTIVACIÓN', emo: 'feliz', text: 'Aprender lento y firme siempre gana la carrera frente a memorizar con prisa.' },
    { cat: 'MOTIVACIÓN', emo: 'ganaste', text: 'Cada Bit que ganas aquí representa concentración real invertida en ti.' },
    { cat: 'MOTIVACIÓN', emo: 'saludo', text: 'Estoy en esta esquina por si necesitas un respiro o un empujoncito extra, {name}.' },
    { cat: 'DATO CURIOSO', emo: 'sorpresa', text: 'El primer "bug" informático real fue una polilla atrapada dentro de un relé de la computadora Harvard Mark II en 1947.' },
    { cat: 'DATO CURIOSO', emo: 'inspirado', text: 'Ada Lovelace escribió el primer algoritmo pensado para una máquina en 1843, un siglo antes de los microchips.' },
    { cat: 'DATO CURIOSO', emo: 'feliz', text: 'El lenguaje Python no lleva su nombre por la serpiente, sino por el grupo de comedia británico Monty Python.' },
    { cat: 'DATO CURIOSO', emo: 'sorpresa', text: 'La computadora de guía del Apolo 11 que llevó humanos a la Luna tenía apenas 72 KB de memoria de solo lectura.' },
    { cat: 'DATO CURIOSO', emo: 'pensando', text: 'Grace Hopper ayudó a crear el primer compilador para que programáramos con palabras en lugar de ceros y unos.' },
    { cat: 'DATO CURIOSO', emo: 'sorpresa', text: 'En 1964, Douglas Engelbart construyó el primer mouse de computadora con un bloque de madera y dos ruedas.' },
    { cat: 'DATO CURIOSO', emo: 'cool', text: 'La primera página web de la historia se publicó en 1991 por Tim Berners-Lee y sigue en línea hoy.' },
    { cat: 'DATO CURIOSO', emo: 'inspirado', text: 'En 1858, Florence Nightingale inventó gráficos circulares de datos que salvaron miles de vidas en hospitales.' },
    { cat: 'DATO CURIOSO', emo: 'sorpresa', text: 'Tu teléfono actual tiene millones de veces más capacidad de cómputo que toda la NASA en 1969.' },
    { cat: 'DATO CURIOSO', emo: 'feliz', text: 'Tux, el pingüino mascota de Linux, fue elegido en 1996 porque Linus Torvalds dijo que los pingüinos parecen contentos tras comer.' },
    { cat: 'DATO CURIOSO', emo: 'pensando', text: 'El nombre "Bluetooth" honra al rey vikingo Harald Blåtand, famoso por unificar tribus, igual que el protocolo une dispositivos.' },
    { cat: 'DATO CURIOSO', emo: 'sorpresa', text: 'Más del 90% de los servidores de internet y la supercomputación mundial funcionan sobre el núcleo Linux.' },
    { cat: 'DATO CURIOSO', emo: 'cool', text: 'El término "Cifrado César" tiene más de 2,000 años: Julio César desplazaba 3 posiciones las letras de sus cartas militares.' },
    { cat: 'DATO CURIOSO', emo: 'inspirado', text: 'El primer videojuego reconocido, Tennis for Two (1958), corría en la pantalla redonda de un osciloscopio de laboratorio.' },
    { cat: 'DATO CURIOSO', emo: 'sorpresa', text: 'En 1971, Ray Tomlinson envió el primer correo electrónico de red entre dos computadoras colocadas lado a lado.' },
    { cat: 'DATO CURIOSO', emo: 'pensando', text: 'Cada búsqueda moderna en internet recorre fibras ópticas submarinas gruesas como una manguera de jardín bajo los océanos.' },
    { cat: 'DATO CURIOSO', emo: 'feliz', text: 'El símbolo "@" (arroba) se elegía en teclados comerciales desde el siglo XIX para precios, mucho antes del email.' },
    { cat: 'DATO CURIOSO', emo: 'sorpresa', text: 'Un error en un solo guión matemático destruyó el cohete Mariner 1 segundos después de despegar en 1962.' },
    { cat: 'DATO CURIOSO', emo: 'cool', text: 'Java originalmente se llamaba "Oak" por un roble frente a la oficina de su creador, luego cambió por un café.' },
    { cat: 'DATO CURIOSO', emo: 'inspirado', text: 'Alan Turing propuso en 1950 la prueba que aún usamos para debatir si una máquina conversa como humano.' },
    { cat: 'DATO CURIOSO', emo: 'sorpresa', text: 'Los códigos QR se inventaron en 1994 en Japón para rastrear autopartes a alta velocidad; vienen de "Quick Response".' },
    { cat: 'DATO CURIOSO', emo: 'pensando', text: 'Margaret Hamilton escribió a mano el código tolerante a fallos que evitó que el alunizaje del Apolo 11 abortara.' },
    { cat: 'DATO CURIOSO', emo: 'cool', text: 'SQL nació en los años 70 en IBM para consultar bases de datos usando frases casi en inglés sencillo.' },
    { cat: 'DATO CURIOSO', emo: 'sorpresa', text: 'Un byte equivale a 8 bits y originalmente bastaba justo para guardar una sola letra o símbolo en pantalla.' },
    { cat: 'DATO CURIOSO', emo: 'feliz', text: 'La palabra "algoritmo" viene del matemático persa Al-Juarismi, quien vivió en Bagdad hace casi 1,200 años.' },
    { cat: 'DATO CURIOSO', emo: 'inspirado', text: 'Git, la herramienta mundial para guardar versiones de código, se diseñó en apenas dos semanas en 2005.' },
    { cat: 'TIP DE NIKO', emo: 'pensando', text: 'Regla de oro del diagrama de flujo: óvalo para Inicio/Fin, rectángulo para Acción y rombo para Decisión.' },
    { cat: 'TIP DE NIKO', emo: 'enojado', text: '¿Tienes un bug? Revisa primero si escribiste exactamente igual el nombre de tus variables.' },
    { cat: 'TIP DE NIKO', emo: 'inspirado', text: 'Piensa en una variable como una caja con etiqueta: el contenido cambia, la etiqueta la encuentras siempre.' },
    { cat: 'TIP DE NIKO', emo: 'cool', text: 'Si un proceso se repite muchas veces sin cambiar de estructura, un bucle te ahorra líneas y errores.' },
    { cat: 'TIP DE NIKO', emo: 'pensando', text: 'Antes de escribir una sola línea de código, explica tu solución en 3 pasos en español simple.' },
    { cat: 'TIP DE NIKO', emo: 'saludo', text: 'En la pestaña Práctica tienes 30 libros clave resumidos en qué enseñan y cómo lo explican.' },
    { cat: 'TIP DE NIKO', emo: 'inspirado', text: '¿Dudas entre IA, Datos, Software o Ciberdefensa? La Brújula Tech mide tu afinidad natural.' },
    { cat: 'TIP DE NIKO', emo: 'cool', text: 'Un rombo condicional siempre tiene al menos dos salidas claras: qué pasa si es Sí y qué pasa si es No.' },
    { cat: 'TIP DE NIKO', emo: 'pensando', text: 'Si pierdes todas tus vidas, puedes recargar con un video corto o usando tus Bits acumulados.' },
    { cat: 'TIP DE NIKO', emo: 'feliz', text: 'Completa los 10 sub-pasos y el Quiz Final de cada tema para desbloquear tu Reconocimiento Oficial.' },
    { cat: 'TIP DE NIKO', emo: 'enojado', text: 'Un buen algoritmo nunca deja pasos ambiguos: cualquiera debería llegar al mismo resultado siguiéndolo.' },
    { cat: 'TIP DE NIKO', emo: 'ganaste', text: 'Puedes arrastrarme a cualquier rincón de Mi Camino y tocarme cuando quieras otra dosis de ideas.' }
  ];

  window.renderNiko3D = renderNiko3D;
  window.NIKO_REACTIONS = REACTIONS;
  window.CODEMY_NIKO_PHRASES = NIKO_PHRASES;
})();
