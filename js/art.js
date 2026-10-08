'use strict';
// ===== 場景美術：全部是 SVG，1600×900，畫面會自動裁切填滿 =====
const svgWrap = (inner, extra = '') => `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${inner}${extra}</svg>`;

// 小工具
const R = (x, y, w, h, f, o = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" ${o}/>`;
const grad = (id, a, b, v = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="${v ? 1 : 0}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const glow = (id, c, o = .6) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;

function ferris(cx, cy, r, lit = 1) {
  let s = `<g opacity=".95"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#F7B6C8" stroke-width="4" opacity=".8"/>`;
  for (let i = 0; i < 24; i++) {
    const a = i / 24 * Math.PI * 2, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    s += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#F7B6C8" stroke-width="1.5" opacity=".45"/>`;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="${['#FF8FB1', '#FFD27A', '#9BD0FF'][i % 3]}" opacity="${lit ? .95 : .3}"/>`;
  }
  return s + `<path d="M${cx - r * .55} ${cy + r * 1.35} L${cx} ${cy} L${cx + r * .55} ${cy + r * 1.35}" stroke="#E7A3B6" stroke-width="8" fill="none"/></g>`;
}
function city(y, c1 = '#1E1028', c2 = '#2A1534', seed = 3) {
  let s = '', x = 0, k = seed;
  const rnd = () => (k = (k * 9301 + 49297) % 233280) / 233280;
  while (x < 1600) {
    const w = 60 + rnd() * 90, h = 120 + rnd() * 260;
    s += R(x, y - h, w, h + 400, rnd() > .5 ? c1 : c2);
    for (let wy = y - h + 18; wy < y - 20; wy += 26) for (let wx = x + 10; wx < x + w - 14; wx += 20) if (rnd() > .62) s += R(wx, wy, 9, 13, rnd() > .3 ? '#FFD98A' : '#FF9FC0', `opacity="${(.4 + rnd() * .5).toFixed(2)}"`);
    x += w + 4;
  }
  return s;
}
function stars(n = 60, h = 400, seed = 7) {
  let s = '', k = seed;
  const rnd = () => (k = (k * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) s += `<circle cx="${(rnd() * 1600).toFixed(0)}" cy="${(rnd() * h).toFixed(0)}" r="${(rnd() * 1.6 + .4).toFixed(1)}" fill="#fff" opacity="${(rnd() * .6 + .2).toFixed(2)}"/>`;
  return s;
}
function lamp(x, y, c = '#FFD9A0') {
  return `<line x1="${x}" y1="0" x2="${x}" y2="${y - 30}" stroke="#2A1A20" stroke-width="3"/><path d="M${x - 50} ${y} Q${x} ${y - 70} ${x + 50} ${y} Z" fill="#3A222C"/><ellipse cx="${x}" cy="${y + 4}" rx="16" ry="8" fill="${c}"/><circle cx="${x}" cy="${y + 120}" r="260" fill="url(#lampg)"/>`;
}

const ART = {
  // 休息區：霓虹招牌、沙發、外送
  lounge: () => `<defs>${grad('lw', '#4A2433', '#2A1520')}${glow('lampg', '#FFC98A', .28)}${glow('neon', '#FF7AA8', .5)}</defs>
    ${R(0, 0, 1600, 900, 'url(#lw)')}
    ${R(0, 640, 1600, 260, '#2A1A1E')}${R(0, 636, 1600, 8, '#5A3440')}
    <g opacity=".22">${Array.from({ length: 16 }, (_, i) => R(i * 100, 0, 2, 636, '#000')).join('')}</g>
    <circle cx="800" cy="200" r="300" fill="url(#neon)"/>
    <text x="800" y="230" text-anchor="middle" font-family="Noto Serif TC,serif" font-weight="900" font-size="110" fill="#FFE1EC" stroke="#FF6E9E" stroke-width="3" letter-spacing="20" style="filter:drop-shadow(0 0 18px #FF6E9E)">大直密室</text>
    <text x="800" y="290" text-anchor="middle" font-family="Noto Sans TC,sans-serif" font-size="26" fill="#FFC2D6" letter-spacing="14" opacity=".85">DAZHI ESCAPE STUDIO</text>
    ${lamp(330, 120)}${lamp(1270, 120)}
    <g><rect x="150" y="470" width="620" height="190" rx="40" fill="#7A2C44"/><rect x="170" y="420" width="580" height="120" rx="40" fill="#8E3652"/><rect x="120" y="470" width="70" height="200" rx="30" fill="#6A2238"/><rect x="730" y="470" width="70" height="200" rx="30" fill="#6A2238"/></g>
    <g><rect x="880" y="590" width="560" height="26" rx="10" fill="#C9935A"/><rect x="910" y="616" width="16" height="90" fill="#8A5A30"/><rect x="1394" y="616" width="16" height="90" fill="#8A5A30"/>
      <rect x="930" y="540" width="90" height="56" rx="6" fill="#F6EEE0"/><rect x="1040" y="550" width="80" height="44" rx="6" fill="#E8B04B"/><path d="M1150 595 l20 -60 h50 l20 60z" fill="#F4F0E8"/><rect x="1270" y="530" width="34" height="64" rx="8" fill="#FFF" opacity=".85"/><rect x="1272" y="550" width="30" height="40" rx="6" fill="#D49A66"/><rect x="1320" y="545" width="80" height="48" rx="6" fill="#E95A5A"/></g>
    <g><rect x="1470" y="420" width="70" height="240" fill="#3A2A2A"/><circle cx="1505" cy="400" r="70" fill="#3E6A4A"/><circle cx="1470" cy="360" r="50" fill="#4E8A5E"/></g>`,

  // 辦公室：桌子、文件櫃、白板、冰箱、窗外夜景
  office: () => `<defs>${grad('ow', '#3A2A36', '#241820')}${grad('win', '#1A1030', '#3A1A40')}<clipPath id="winclip"><rect x="985" y="115" width="510" height="320"/></clipPath>${glow('lampg', '#FFE2B0', .25)}</defs>
    ${R(0, 0, 1600, 900, 'url(#ow)')}${R(0, 660, 1600, 240, '#1E1418')}
    <g><rect x="980" y="110" width="520" height="330" fill="url(#win)" stroke="#5A4048" stroke-width="10"/><g clip-path="inset(0)">${''}</g>
      <g clip-path="url(#winclip)"><g transform="translate(985 148) scale(.31875)">${stars(40, 300)}${ferris(1200, 400, 260)}${city(900, '#1A1028', '#24142E', 5)}</g></g>
      <line x1="1240" y1="110" x2="1240" y2="440" stroke="#5A4048" stroke-width="8"/></g>
    <g><rect x="120" y="120" width="560" height="320" rx="8" fill="#F4F1EA" stroke="#B9B2A8" stroke-width="8"/>
      <text x="150" y="180" font-family="Noto Sans TC" font-size="30" fill="#2A60B0">本週測試</text>
      <text x="150" y="225" font-family="Noto Sans TC" font-size="24" fill="#333">・新密室 測 3 場</text><text x="150" y="262" font-family="Noto Sans TC" font-size="24" fill="#333">・宵夜 3 次（維淪）</text>
      <text x="150" y="299" font-family="Noto Sans TC" font-size="24" fill="#C03050">・機關三 感應器壞!!</text>
      <path d="M470 170 q60 -20 90 30 q-40 60 -90 30" stroke="#E8335C" stroke-width="4" fill="none"/><text x="560" y="390" font-family="Noto Sans TC" font-size="22" fill="#666">— 沁蓉</text></g>
    <g><rect x="200" y="560" width="760" height="28" rx="6" fill="#B98A5A"/><rect x="220" y="588" width="20" height="160" fill="#7A5A3A"/><rect x="920" y="588" width="20" height="160" fill="#7A5A3A"/>
      <rect x="430" y="440" width="230" height="130" rx="10" fill="#222"/><rect x="442" y="452" width="206" height="104" rx="4" fill="#5AA0E0" opacity=".6"/><rect x="400" y="568" width="290" height="10" rx="4" fill="#444"/>
      <rect x="720" y="520" width="150" height="44" fill="#F8F4EC"/><rect x="730" y="508" width="150" height="44" fill="#FFFFFF" transform="rotate(-4 800 530)"/></g>
    <g><rect x="40" y="430" width="140" height="300" rx="6" fill="#6A5A60"/><rect x="52" y="450" width="116" height="80" fill="#7A6A70"/><rect x="52" y="545" width="116" height="80" fill="#7A6A70"/><rect x="52" y="640" width="116" height="80" fill="#7A6A70"/>
      <rect x="96" y="485" width="28" height="8" rx="4" fill="#CCC"/><rect x="96" y="580" width="28" height="8" rx="4" fill="#CCC"/><rect x="96" y="675" width="28" height="8" rx="4" fill="#CCC"/></g>
    <g><rect x="1100" y="470" width="190" height="330" rx="12" fill="#E9E4DC"/><line x1="1100" y1="590" x2="1290" y2="590" stroke="#C9C2B8" stroke-width="4"/><rect x="1260" y="510" width="10" height="60" rx="4" fill="#B0A898"/><rect x="1260" y="610" width="10" height="80" rx="4" fill="#B0A898"/>
      <circle cx="1150" cy="520" r="14" fill="#E8335C"/><rect x="1180" y="505" width="40" height="30" fill="#FFE27A" transform="rotate(8 1200 520)"/><circle cx="1230" cy="640" r="12" fill="#5AA0E0"/></g>
    <g><rect x="1340" y="610" width="200" height="140" rx="8" fill="#3A3238"/><rect x="1350" y="620" width="180" height="40" rx="4" fill="#4A4248"/><rect x="1450" y="590" width="80" height="24" fill="#EEE"/></g>
    ${lamp(800, 60)}`,

  // 後門：夜晚小巷、EXIT 燈、濕地面
  backdoor: () => `<defs>${grad('bw', '#0E0A18', '#1C1426')}${glow('exitg', '#4CFF9A', .35)}${glow('doorg', '#FFD9A0', .45)}${glow('lampg', '#FFE0B0', .2)}</defs>
    ${R(0, 0, 1600, 900, 'url(#bw)')}
    <g fill="#1A1420">${R(0, 0, 420, 900, '#18121E')}${R(1180, 0, 420, 900, '#18121E')}</g>
    <g opacity=".5">${Array.from({ length: 30 }, (_, i) => R(i % 2 ? 0 : 1180, i * 30, 420, 2, '#000')).join('')}</g>
    <g>${stars(30, 300, 11)}</g>
    <rect x="620" y="250" width="360" height="520" fill="#2A2230" stroke="#4A3A48" stroke-width="10"/>
    <rect x="640" y="270" width="320" height="500" fill="#3A2E3C"/><circle cx="930" cy="530" r="10" fill="#C9A86A"/>
    <path d="M640 770 L960 770 L1100 900 L500 900Z" fill="url(#doorg)" opacity=".6"/>
    <rect x="720" y="170" width="160" height="60" rx="6" fill="#0E3A22"/><text x="800" y="214" text-anchor="middle" font-family="Arial" font-weight="900" font-size="40" fill="#7CFFB0">EXIT</text><circle cx="800" cy="200" r="160" fill="url(#exitg)"/>
    ${R(0, 770, 1600, 130, '#120E18')}
    <g opacity=".35">${Array.from({ length: 14 }, (_, i) => `<ellipse cx="${100 + i * 110}" cy="${820 + (i % 3) * 22}" rx="${40 + (i % 4) * 14}" ry="6" fill="#7CFFB0" opacity="${.15 + (i % 3) * .1}"/>`).join('')}</g>
    <g><rect x="1240" y="560" width="160" height="210" rx="10" fill="#2A3A30"/><rect x="1230" y="545" width="180" height="22" rx="6" fill="#3A4A40"/><text x="1320" y="680" text-anchor="middle" font-size="30" fill="#5A7A60">♻</text></g>
    <g><rect x="200" y="640" width="100" height="130" fill="#3A2A20"/><rect x="190" y="630" width="120" height="16" fill="#4A3A2A"/><rect x="320" y="690" width="70" height="80" fill="#4A3424"/></g>
    <g stroke="#9AB" stroke-width="1.5" opacity=".25">${Array.from({ length: 50 }, (_, i) => `<line x1="${(i * 97) % 1600}" y1="${(i * 53) % 700}" x2="${(i * 97) % 1600 - 8}" y2="${(i * 53) % 700 + 30}"/>`).join('')}</g>`,

  // 拍攝棚：粉色背板、環形燈、攝影機
  studio: () => `<defs>${grad('sw', '#3A1A2A', '#1E0E18')}${grad('bd', '#F7C3D2', '#E890AC')}${glow('ring', '#FFF6E8', .55)}${glow('lampg', '#FFE6D0', .2)}</defs>
    ${R(0, 0, 1600, 900, 'url(#sw)')}${R(0, 700, 1600, 200, '#1A0E14')}
    <path d="M330 80 H1270 V700 Q800 760 330 700Z" fill="url(#bd)"/>
    <g fill="#FFF" opacity=".55">${[[520, 240], [1080, 210], [700, 420], [960, 470], [450, 520], [1150, 520], [820, 180]].map(([x, y], i) => `<path transform="translate(${x} ${y}) scale(${.8 + (i % 3) * .3})" d="M0 10 C-20 -14 -44 6 -24 26 L0 48 L24 26 C44 6 20 -14 0 10Z"/>`).join('')}</g>
    <text x="800" y="150" text-anchor="middle" font-family="Noto Serif TC" font-weight="900" font-size="54" fill="#B3264D" letter-spacing="14">戀愛密室　宣傳拍攝</text>
    <g><circle cx="190" cy="300" r="110" fill="none" stroke="#FFF6E8" stroke-width="22"/><circle cx="190" cy="300" r="200" fill="url(#ring)"/><line x1="190" y1="410" x2="190" y2="760" stroke="#333" stroke-width="10"/><path d="M130 780 L190 740 L250 780" stroke="#333" stroke-width="8" fill="none"/></g>
    <g><circle cx="1420" cy="290" r="100" fill="none" stroke="#FFF6E8" stroke-width="20"/><circle cx="1420" cy="290" r="190" fill="url(#ring)"/><line x1="1420" y1="390" x2="1420" y2="760" stroke="#333" stroke-width="10"/></g>
    <g><rect x="1180" y="560" width="190" height="110" rx="14" fill="#222"/><circle cx="1180" cy="615" r="40" fill="#111" stroke="#444" stroke-width="8"/><circle cx="1180" cy="615" r="18" fill="#3A6AB0"/><rect x="1300" y="535" width="60" height="30" rx="6" fill="#333"/><path d="M1270 670 L1230 840 M1270 670 L1310 840 M1270 670 L1270 840" stroke="#444" stroke-width="8"/><circle cx="1350" cy="580" r="7" fill="#FF3355"/></g>
    <g><rect x="230" y="620" width="120" height="16" fill="#6A3A2A"/><path d="M240 636 L220 760 M340 636 L360 760" stroke="#6A3A2A" stroke-width="10"/><rect x="230" y="560" width="120" height="60" fill="#2A2A2A"/><text x="290" y="600" text-anchor="middle" font-size="22" fill="#fff" font-family="Noto Sans TC">導演</text></g>`,

  // 會議室：玻璃隔間、長桌、投影
  meeting: () => `<defs>${grad('mw', '#22202E', '#141220')}${glow('proj', '#BFD8FF', .35)}${glow('lampg', '#FFFFFF', .12)}</defs>
    ${R(0, 0, 1600, 900, 'url(#mw)')}${R(0, 690, 1600, 210, '#14121A')}
    <rect x="420" y="90" width="760" height="420" fill="#E8EEF6"/><circle cx="800" cy="300" r="420" fill="url(#proj)"/>
    <text x="800" y="200" text-anchor="middle" font-family="Noto Serif TC" font-weight="900" font-size="54" fill="#1E2A44">大直工作室</text>
    <text x="800" y="275" text-anchor="middle" font-family="Noto Serif TC" font-weight="700" font-size="48" fill="#1E2A44">股權合作提案</text>
    <line x1="560" y1="320" x2="1040" y2="320" stroke="#8C1C3A" stroke-width="3"/>
    <text x="800" y="380" text-anchor="middle" font-family="Noto Sans TC" font-size="28" fill="#4A5670">管理階層重新調整｜機密</text>
    <g opacity=".25" stroke="#9AA6C0" stroke-width="3">${Array.from({ length: 9 }, (_, i) => `<line x1="${i * 200}" y1="0" x2="${i * 200}" y2="690"/>`).join('')}</g>
    <path d="M200 640 L1400 640 L1520 760 L80 760Z" fill="#3A2C30"/><path d="M200 640 L1400 640 L1400 650 L200 650Z" fill="#5A4448"/>
    <g fill="#2A2028">${[300, 520, 740, 960, 1180].map(x => `<rect x="${x}" y="560" width="110" height="90" rx="20"/>`).join('')}</g>
    <g><rect x="1240" y="600" width="90" height="40" rx="8" fill="#333"/><circle cx="1250" cy="620" r="12" fill="#9CF"/><path d="M1240 620 L800 300" stroke="#BFD8FF" stroke-width="2" opacity=".25"/></g>
    <g><rect x="560" y="660" width="140" height="10" fill="#F4F0E8"/><rect x="900" y="662" width="90" height="10" fill="#F4F0E8"/></g>`,

  // 大直街頭：美麗華摩天輪、捷運高架
  street: () => `<defs>${grad('st', '#120A24', '#3A1A3A')}${glow('lampg', '#FFE0B0', .3)}${glow('fw', '#FF8FB1', .35)}</defs>
    ${R(0, 0, 1600, 900, 'url(#st)')}${stars(80, 420)}
    <circle cx="1150" cy="330" r="380" fill="url(#fw)"/>${ferris(1150, 330, 250)}
    ${city(720)}
    <g><rect x="0" y="520" width="1600" height="34" fill="#3A2A3A"/><rect x="0" y="512" width="1600" height="10" fill="#5A4458"/>${[120, 520, 920, 1320].map(x => R(x, 554, 40, 200, '#2E2230')).join('')}
      <g><rect x="380" y="470" width="420" height="50" rx="16" fill="#D9D2E0"/>${Array.from({ length: 9 }, (_, i) => R(400 + i * 44, 482, 30, 22, '#FFE9A8', 'rx="3"')).join('')}<rect x="380" y="500" width="420" height="8" fill="#8C1C3A"/></g></g>
    ${R(0, 760, 1600, 140, '#1A1220')}<rect x="0" y="752" width="1600" height="10" fill="#3A2A3A"/>
    <g>${[260, 760, 1360].map(x => `<line x1="${x}" y1="760" x2="${x}" y2="560" stroke="#2A2030" stroke-width="10"/><circle cx="${x}" cy="555" r="14" fill="#FFE0B0"/><circle cx="${x}" cy="640" r="150" fill="url(#lampg)"/>`).join('')}</g>
    <g><rect x="80" y="610" width="70" height="150" fill="#2A1A2A"/><text x="115" y="700" text-anchor="middle" writing-mode="tb" font-family="Noto Serif TC" font-size="30" fill="#FF9FC0">大直站</text></g>`,

  // 夜晚屋頂（結局用）
  night: () => `<defs>${grad('nt', '#0A0618', '#2A1438')}${glow('mn', '#FFF2D0', .5)}</defs>
    ${R(0, 0, 1600, 900, 'url(#nt)')}${stars(120, 600, 19)}
    <circle cx="1280" cy="170" r="200" fill="url(#mn)"/><circle cx="1280" cy="170" r="60" fill="#FFF4DA"/>
    <g transform="translate(-80 120) scale(.8)">${ferris(450, 420, 230, 1)}</g>${city(780, '#120A1C', '#1A0E24', 9)}`,
};

// 沒有照片的角色：剪影
function SIL(k) {
  const c = { inv: '#3A3A44', fd: '#4A3A2A', unk: '#2A2A2A', boy: '#2A4A44', dir: '#3A3A3A', ph: '#2A2A3A' }[k] || '#3A2A34';
  return `<svg viewBox="0 0 300 400"><rect width="300" height="400" fill="#2A1A24"/><circle cx="150" cy="140" r="70" fill="${c}"/><path d="M40 400 Q40 250 150 240 Q260 250 260 400Z" fill="${c}"/><text x="150" y="160" text-anchor="middle" font-size="60" fill="#FFF" opacity=".25" font-family="Noto Serif TC">？</text></svg>`;
}

// 標題主視覺
function titleArt() {
  return svgWrap(`<defs>${grad('tt', '#1A0814', '#3E1424')}${glow('tg', '#FF8FB1', .4)}</defs>
    ${R(0, 0, 1600, 900, 'url(#tt)')}${stars(90, 500, 23)}
    <circle cx="800" cy="380" r="520" fill="url(#tg)"/>
    <g opacity=".55">${ferris(800, 360, 300)}</g>
    ${city(860, '#14081A', '#1E0C22', 13)}
    <g fill="none" stroke="#DDB86E" stroke-width="2" opacity=".35"><path d="M120 120 Q300 60 420 160 T720 140"/><path d="M1480 120 Q1300 60 1180 160 T880 140"/></g>
    <g>${[[160, 180], [1440, 200], [260, 700], [1350, 680], [420, 120], [1200, 110]].map(([x, y], i) => `<g transform="translate(${x} ${y}) scale(${.6 + (i % 3) * .25})" opacity=".8">${Array.from({ length: 5 }, (_, j) => `<ellipse cx="0" cy="-18" rx="12" ry="20" fill="#F4A6BC" transform="rotate(${j * 72})"/>`).join('')}<circle r="7" fill="#FFE27A"/></g>`).join('')}</g>`);
}

// 大直地圖（地圖題用，400×300）
function dazhiMap() {
  return `<rect width="400" height="300" fill="#F6EEDF"/>
    <path d="M-10 250 C80 210 120 260 200 236 S320 190 410 214 L410 240 C320 220 260 266 200 262 S70 240 -10 280Z" fill="#9CC8E8"/>
    <text x="250" y="245" font-size="11" fill="#3A6A90" font-family="Noto Sans TC">基隆河</text>
    <path d="M30 20 L370 120" stroke="#E2D2BA" stroke-width="10"/><text x="60" y="22" font-size="10" fill="#8A7460" transform="rotate(16 60 22)" font-family="Noto Sans TC">北安路</text>
    <path d="M190 0 L170 300" stroke="#E2D2BA" stroke-width="9"/><text x="196" y="40" font-size="10" fill="#8A7460" font-family="Noto Sans TC">大直街</text>
    <path d="M80 300 L150 200" stroke="#E2D2BA" stroke-width="12"/><text x="92" y="268" font-size="10" fill="#8A7460" font-family="Noto Sans TC" transform="rotate(-55 92 268)">大直橋</text>
    <path d="M60 190 C140 180 220 160 300 120 S370 70 400 60" stroke="#A0522D" stroke-width="5" fill="none" stroke-dasharray="10 4"/>
    <text x="330" y="60" font-size="10" fill="#A0522D" font-family="Noto Sans TC">捷運文湖線（高架）</text>
    <g font-family="Noto Sans TC" font-size="11" fill="#5A1428" font-weight="700">
      <circle cx="190" cy="168" r="7" fill="#fff" stroke="#A0522D" stroke-width="3"/><text x="150" y="160">大直站</text>
      <circle cx="300" cy="120" r="7" fill="#fff" stroke="#A0522D" stroke-width="3"/><text x="310" y="140">劍南路站</text>
      <circle cx="70" cy="189" r="7" fill="#fff" stroke="#A0522D" stroke-width="3"/><text x="40" y="178">松山機場</text></g>
    <g transform="translate(330 70)"><circle r="20" fill="none" stroke="#E8335C" stroke-width="2"/>${Array.from({ length: 8 }, (_, i) => `<circle cx="${(Math.cos(i * Math.PI / 4) * 20).toFixed(1)}" cy="${(Math.sin(i * Math.PI / 4) * 20).toFixed(1)}" r="3" fill="#E8335C"/>`).join('')}<path d="M-10 32 L0 0 L10 32" stroke="#E8335C" stroke-width="2" fill="none"/></g>
    <text x="300" y="30" font-size="10" fill="#E8335C" font-family="Noto Sans TC" font-weight="700">美麗華摩天輪</text>
    <g fill="#E4D6C4">${[[100, 80], [240, 60], [250, 180], [110, 130], [320, 170], [30, 110], [140, 30]].map(([x, y]) => `<rect x="${x}" y="${y}" width="34" height="24" rx="3"/>`).join('')}</g>
    <g font-family="Noto Sans TC" font-size="9" fill="#9A8470"><text x="101" y="96">實踐大學</text><text x="252" y="196">住宅區</text><text x="322" y="186">劍南路口</text><text x="141" y="46">敬業三路</text></g>
    <path d="M10 290 L60 290" stroke="#333" stroke-width="2"/><text x="10" y="284" font-size="9" fill="#333">N↑</text>`;
}
