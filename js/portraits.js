'use strict';
// ===== 角色立繪：全部用 SVG 畫，不使用照片 =====
const PORTRAIT = (() => {
  const SK = '#F8DECD', SK2 = '#EDBDA4', SK3 = '#D99A80', LINE = '#3A2228';
  const face = {
    oval: 'M92 166 C92 110 118 86 150 86 C182 86 208 110 208 166 C208 210 186 238 150 242 C114 238 92 210 92 166Z',
    round: 'M88 166 C88 108 116 84 150 84 C184 84 212 108 212 166 C212 214 188 242 150 246 C112 242 88 214 88 166Z',
  };
  const eye = (cx, iris, girl, y = 178) => `
    <path d="M${cx - 17} ${y} Q${cx} ${y - 20} ${cx + 17} ${y} Q${cx + 14} ${y + 15} ${cx} ${y + 16} Q${cx - 14} ${y + 15} ${cx - 17} ${y}Z" fill="#fff"/>
    <ellipse cx="${cx}" cy="${y + 1}" rx="11" ry="14" fill="${iris}"/>
    <ellipse cx="${cx}" cy="${y + 7}" rx="8" ry="7" fill="#fff" opacity=".22"/>
    <ellipse cx="${cx}" cy="${y + 1}" rx="5.5" ry="7" fill="#140A0E" opacity=".8"/>
    <circle cx="${cx + 4}" cy="${y - 5}" r="4" fill="#fff"/><circle cx="${cx - 4}" cy="${y + 6}" r="2" fill="#fff" opacity=".9"/><circle cx="${cx + 5}" cy="${y + 8}" r="1" fill="#fff" opacity=".8"/>
    <path d="M${cx - 19} ${y + 1} Q${cx} ${y - 22} ${cx + 19} ${y}" stroke="${LINE}" stroke-width="${girl ? 5 : 4.2}" fill="none" stroke-linecap="round"/>
    ${girl ? `<path d="M${cx + (cx < 150 ? -18 : 18)} ${y - 1} l${cx < 150 ? -7 : 7} -5 M${cx + (cx < 150 ? -15 : 15)} ${y - 7} l${cx < 150 ? -5 : 5} -5" stroke="${LINE}" stroke-width="3" stroke-linecap="round"/>` : ''}
    <path d="M${cx - 7} ${y + 17} Q${cx} ${y + 19} ${cx + 7} ${y + 17}" stroke="${SK3}" stroke-width="1.6" fill="none" opacity=".6"/>`;
  const happyEye = (cx, y = 180) => `<path d="M${cx - 15} ${y} Q${cx} ${y - 16} ${cx + 15} ${y}" stroke="${LINE}" stroke-width="4.6" fill="none" stroke-linecap="round"/>`;
  const brow = (cx, c, tilt = 0) => `<path d="M${cx - 13} ${150 + (cx < 150 ? tilt : 0)} Q${cx} ${143} ${cx + 13} ${150 + (cx > 150 ? tilt : 0)}" stroke="${c}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
  const nose = `<ellipse cx="150" cy="202" rx="2.2" ry="1.6" fill="${SK3}" opacity=".8"/>`;
  const blush = (o = .35) => { o = Math.min(.6, o + .15); return `<ellipse cx="114" cy="206" rx="15" ry="8.5" fill="#F7849E" opacity="${o}"/><ellipse cx="186" cy="206" rx="15" ry="8.5" fill="#F7849E" opacity="${o}"/><g stroke="#F06A8A" stroke-width="1.6" opacity="${o}" stroke-linecap="round"><path d="M107 208 l4 -6 M113 209 l4 -6 M119 208 l4 -6 M179 208 l4 -6 M185 209 l4 -6 M191 208 l4 -6"/></g>`; };
  const MOUTH = {
    smile: `<path d="M142 218 Q150 225 158 218" stroke="#A8485C" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    soft: `<path d="M144 219 Q147 222 150 219 Q153 222 156 219" stroke="#A8485C" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    grin: `<path d="M138 214 Q150 234 162 214 Z" fill="#8E2E40"/><path d="M139.5 215 Q150 219 160.5 215 L160 218 Q150 222 140 218Z" fill="#fff"/><path d="M145 227 Q150 230 155 227" stroke="#F08A9E" stroke-width="3.4" stroke-linecap="round"/>`,
    talk: `<path d="M144 216 Q150 214 156 216 Q155 226 150 227 Q145 226 144 216Z" fill="#8E2E40"/><path d="M146 223 Q150 225 154 223" stroke="#F08A9E" stroke-width="2.6" stroke-linecap="round"/>`,
    smirk: `<path d="M142 220 Q151 224 160 215" stroke="#A8485C" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    flat: `<path d="M144 220 L156 219" stroke="#A8485C" stroke-width="2.8" stroke-linecap="round"/>`,
  };
  const ears = (f) => { const x = f === 'round' ? 96 : 101; return `<ellipse cx="${x}" cy="174" rx="9" ry="15" fill="${SK2}"/><ellipse cx="${300 - x}" cy="174" rx="9" ry="15" fill="${SK2}"/>`; };
  const neck = `<path d="M131 232 L131 300 Q150 314 169 300 L169 232Z" fill="${SK2}"/><path d="M131 236 Q150 262 169 236 L169 250 Q150 270 131 250Z" fill="${SK3}" opacity=".35"/>`;
  const torso = (fill) => `<path d="M34 400 C40 336 82 306 128 296 Q150 310 172 296 C218 306 260 336 266 400Z" fill="${fill}"/>`;
  const glassesRound = (c) => `<g fill="rgba(255,255,255,.12)" stroke="${c}" stroke-width="2.6"><circle cx="124" cy="174" r="21"/><circle cx="176" cy="174" r="21"/></g><path d="M145 172 Q150 166 155 172" stroke="${c}" stroke-width="2.4" fill="none"/><path d="M103 170 L94 166 M197 170 L206 166" stroke="${c}" stroke-width="2.4"/>`;
  const glassesRect = (c) => `<g fill="rgba(255,255,255,.1)" stroke="${c}" stroke-width="2"><rect x="102" y="160" width="40" height="28" rx="11"/><rect x="158" y="160" width="40" height="28" rx="11"/></g><path d="M142 170 Q150 165 158 170" stroke="${c}" stroke-width="2" fill="none"/>`;

  const BG = { qr: ['#F7D2DD', '#E7A6BA'], zy: ['#D3E1F5', '#9DB7DE'], jr: ['#FBE4C4', '#F0BE86'], wl: ['#DCEBD3', '#A9CB98'], ly: ['#E6DAF7', '#BFA6E8'], jc: ['#FBEFBE', '#F0D46E'], inv: ['#E3E3E8', '#B7B7C2'], fd: ['#F3E7CF', '#D9BE88'], boy: ['#D3EFE8', '#94D3C2'], dir: ['#E5E1DA', '#BDB4A6'] };

  const D = {
    // 沁蓉：黑長直、齊瀏海、白色緞帶、黑色盤扣旗袍領
    qr: () => {
      const H = '#1E161C';
      return { hairBack: `<path d="M86 160 C80 92 114 64 150 64 C186 64 220 92 214 160 L224 336 C204 350 182 346 172 334 L170 250 L130 250 L128 334 C118 346 96 350 76 336Z" fill="${H}"/>`,
        body: torso('#1A141C') + `<path d="M126 288 L126 306 Q150 322 174 306 L174 288 Q150 302 126 288Z" fill="#2A2030" stroke="#433848" stroke-width="2"/>
          <g stroke="#F1E6D6" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M150 312 q8 6 0 12 q-8 -6 0 -12"/><path d="M176 330 h18 M185 324 v12"/><path d="M180 358 h18 M189 352 v12"/></g>
          <path d="M150 324 C162 336 176 344 178 400" stroke="#3A3040" stroke-width="2" fill="none"/>`,
        face: 'oval', eyes: eye(124, '#4A2A28', 1) + eye(176, '#4A2A28', 1), brows: brow(124, H) + brow(176, H), mouth: MOUTH.smile, blush: blush(.4),
        hairFront: `<path d="M96 156 C92 98 118 74 150 74 C182 74 208 98 204 156 L196 150 L190 134 L183 150 L175 132 L167 150 L158 134 L150 150 L142 134 L133 150 L125 132 L117 150 L110 134 L104 152Z" fill="${H}"/>
          <path d="M100 152 C94 196 98 236 106 268 L92 270 C84 226 84 186 96 150Z" fill="${H}"/><path d="M200 152 C206 196 202 236 194 268 L208 270 C216 226 216 186 204 150Z" fill="${H}"/>
          <path d="M120 82 C134 76 160 76 176 84" stroke="#4A3A48" stroke-width="5" opacity=".6" fill="none" stroke-linecap="round"/>`,
        extra: `<g fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"><path d="M93 150 C86 210 100 262 90 336"/><path d="M207 150 C214 210 200 262 210 336"/></g><g fill="#FFFFFF"><path d="M93 148 l-12 -8 l1 16z"/><path d="M93 148 l12 -8 l-1 16z"/><path d="M207 148 l-12 -8 l1 16z"/><path d="M207 148 l12 -8 l-1 16z"/></g>` };
    },
    // 政庾：黑色瓜皮頭（帶灰色光澤）、圓框眼鏡、瞇眼笑、黑T
    zy: () => {
      const H = '#1C1A20';
      return { hairBack: '', body: torso('#202026') + `<path d="M128 296 Q150 316 172 296" stroke="#33333C" stroke-width="5" fill="none"/>`,
        face: 'round', eyes: happyEye(124) + happyEye(176), brows: brow(124, H, 2) + brow(176, H, 2), mouth: MOUTH.grin, blush: blush(.3),
        hairFront: `<path d="M90 172 C82 100 116 68 150 68 C186 68 220 100 210 172 C206 156 204 146 200 142 C170 152 130 152 100 142 C96 146 94 156 90 172Z" fill="${H}"/>
          <path d="M100 140 C130 156 170 156 200 140" stroke="${H}" stroke-width="6" fill="none"/>
          <path d="M112 96 C132 80 172 80 192 98" stroke="#8A8A98" stroke-width="12" opacity=".55" fill="none" stroke-linecap="round"/>
          <path d="M106 112 C122 98 140 94 150 94" stroke="#A0A0B0" stroke-width="5" opacity=".45" fill="none" stroke-linecap="round"/>`,
        extra: glassesRound('#8A6A52') };
    },
    // 君葇：粉紅格紋頭巾、黑髮帶點青綠髮尾、碎花上衣＋圍裙、深藍領結
    jr: () => {
      const H = 'url(#hg-jr)';
      return { defs: `<linearGradient id="hg-jr" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="#1E181E"/><stop offset="1" stop-color="#3F6E68"/></linearGradient>
          <pattern id="ging" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#F6B4C2"/><rect width="6" height="12" fill="#E37F98" opacity=".55"/><rect width="12" height="6" fill="#E37F98" opacity=".55"/></pattern>
          <pattern id="flo" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#F6E9EC"/><circle cx="6" cy="6" r="3" fill="#E9A3B4"/><circle cx="17" cy="15" r="2.5" fill="#F1BF8C"/><circle cx="16" cy="5" r="1.4" fill="#9CC79A"/></pattern>
          <pattern id="apr" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#F7DFC4"/><circle cx="5" cy="5" r="2.6" fill="#E3864E"/><circle cx="12" cy="12" r="2" fill="#E9A06A"/></pattern>`,
        hairBack: `<path d="M90 160 C86 100 116 72 150 72 C184 72 214 100 210 160 L216 286 C200 296 186 292 178 280 L176 240 L124 240 L122 280 C114 292 100 296 84 286Z" fill="${H}"/>`,
        body: torso('url(#flo)') + `<path d="M104 400 L112 318 C130 326 170 326 188 318 L196 400Z" fill="url(#apr)" stroke="#E3864E" stroke-width="3"/>
          <path d="M112 318 L100 300 M188 318 L200 300" stroke="#E3864E" stroke-width="7" stroke-linecap="round"/>
          <path d="M136 298 L150 312 L164 298" fill="#3A4870"/><path d="M150 308 l-14 12 l2 -16z M150 308 l14 12 l-2 -16z" fill="#2B3658"/>`,
        face: 'oval', eyes: eye(124, '#3E2A26', 1) + eye(176, '#3E2A26', 1), brows: brow(124, '#1E181E') + brow(176, '#1E181E'), mouth: MOUTH.soft, blush: blush(.35),
        hairFront: `<path d="M100 150 C116 128 146 120 178 128 C162 138 140 160 124 176 C118 160 110 150 100 152Z" fill="#1E181E"/><path d="M198 150 C194 140 188 132 178 128 C192 140 198 160 200 178Z" fill="#1E181E"/>
          <path d="M98 150 C92 190 96 226 102 252 L90 254 C84 214 84 180 96 148Z" fill="${H}"/>`,
        extra: `<path d="M86 152 C82 92 116 64 150 64 C186 64 218 92 214 152 C194 130 172 120 150 120 C126 120 104 130 86 152Z" fill="url(#ging)"/>
          <path d="M86 152 C104 130 126 120 150 120 C172 120 194 130 214 152" stroke="#D86F8A" stroke-width="3" fill="none"/>
          <path d="M210 120 l26 -10 l-10 22z M212 128 l24 14 l-22 6z" fill="url(#ging)" stroke="#D86F8A" stroke-width="2"/>` };
    },
    // 維淪：棕色報童帽、白襯衫、咖啡色背心、深色領帶
    wl: () => {
      return { hairBack: `<path d="M100 146 C94 164 96 184 104 196 C106 180 106 162 110 148Z M200 146 C206 164 204 184 196 196 C194 180 194 162 190 148Z" fill="#2A1E1A"/>`,
        body: torso('#F4F1EA') + `<path d="M70 400 C78 344 104 318 128 306 L150 360 L172 306 C196 318 222 344 230 400Z" fill="#6A4A36"/>
          <path d="M128 296 L118 318 L144 312 Z M172 296 L182 318 L156 312Z" fill="#FFFFFF" stroke="#D8D2C6" stroke-width="2"/>
          <path d="M144 308 L156 308 L160 352 L150 368 L140 352Z" fill="#26283A"/><g fill="#C9A86A"><circle cx="150" cy="378" r="3.5"/><circle cx="150" cy="394" r="3.5"/></g>`,
        face: 'oval', eyes: eye(124, '#3A2620', 0) + eye(176, '#3A2620', 0), brows: brow(124, '#2A1E1A', -2) + brow(176, '#2A1E1A', -2), mouth: MOUTH.talk, blush: blush(.18),
        hairFront: `<path d="M104 150 C112 140 124 136 134 140 C128 146 120 152 112 162Z" fill="#2A1E1A"/><path d="M196 150 C190 142 180 138 170 140 C178 146 184 152 190 162Z" fill="#2A1E1A"/>`,
        extra: `<path d="M84 152 C76 98 114 70 156 70 C200 70 226 100 216 140 C200 126 170 120 150 120 C124 120 102 132 84 152Z" fill="#6B5040"/>
          <path d="M150 72 L150 120 M118 80 L112 128 M186 80 L192 124" stroke="#56402F" stroke-width="2"/><circle cx="154" cy="73" r="5" fill="#56402F"/>
          <path d="M90 148 C118 128 188 124 220 138 C220 150 210 156 198 152 C172 144 128 146 100 158 C92 158 88 154 90 148Z" fill="#4E3828"/>` };
    },
    // 令萓：棕色長捲髮、燦笑、黑色袍子＋白色領片
    ly: () => {
      const H = '#6A3E2A';
      return { hairBack: `<path d="M86 160 C80 92 114 64 150 64 C186 64 220 92 214 160 C226 200 214 230 228 262 C238 290 220 310 232 340 C206 356 186 344 176 330 L172 250 L128 250 L124 330 C114 344 94 356 68 340 C80 310 62 290 72 262 C86 230 74 200 86 160Z" fill="${H}"/>`,
        body: torso('#1E1A22') + `<path d="M118 300 L150 336 L182 300 L176 296 L150 322 L124 296Z" fill="#F4F0EA"/><path d="M90 400 C96 360 116 336 140 322 L150 400Z M210 400 C204 360 184 336 160 322 L150 400Z" fill="#2A2530"/>`,
        face: 'oval', eyes: eye(124, '#4A2A1C', 1, 176) + eye(176, '#4A2A1C', 1, 176), brows: brow(124, '#5A3424') + brow(176, '#5A3424'), mouth: MOUTH.grin, blush: blush(.45),
        hairFront: `<path d="M96 160 C90 100 118 74 150 74 C182 74 210 100 204 160 C196 128 178 108 156 104 C150 120 128 136 104 146 C100 150 98 154 96 160Z" fill="${H}"/>
          <path d="M98 154 C88 196 100 230 94 268 L84 266 C86 226 80 192 96 150Z M202 154 C212 196 200 230 206 268 L216 266 C214 226 220 192 204 150Z" fill="${H}"/>
          <path d="M124 86 C138 78 166 78 182 90" stroke="#9A6448" stroke-width="6" opacity=".55" fill="none" stroke-linecap="round"/>`,
        extra: `<circle cx="100" cy="198" r="4" fill="#E8C66A"/><circle cx="200" cy="198" r="4" fill="#E8C66A"/>` };
    },
    // 駿川：圓臉、黑短髮、細金框眼鏡、黃色襯衫＋白T、銀項鍊
    jc: () => {
      const H = '#1A1618';
      return { hairBack: '', body: torso('#F2F0EC') + `<path d="M34 400 C40 336 82 306 124 296 L140 330 L120 400Z M266 400 C260 336 218 306 176 296 L160 330 L180 400Z" fill="#EFC94C"/>
          <path d="M124 296 L140 330 L130 334 L112 300Z M176 296 L160 330 L170 334 L188 300Z" fill="#E0B43A"/>
          <path d="M128 300 Q150 340 172 300" stroke="#C8CCD4" stroke-width="3" fill="none"/><path d="M128 300 Q150 340 172 300" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="2 3" fill="none"/>`,
        face: 'round', eyes: eye(122, '#2E2020', 0, 176) + eye(178, '#2E2020', 0, 176), brows: brow(122, H, -1) + brow(178, H, -1), mouth: MOUTH.smirk, blush: blush(.22),
        hairFront: `<path d="M90 164 C82 98 116 70 152 70 C190 70 220 100 210 164 C206 144 198 132 188 128 C182 140 168 146 156 140 C150 150 134 152 120 144 C110 148 98 154 90 164Z" fill="${H}"/>
          <path d="M120 144 L126 160 M156 140 L152 158 M188 128 L194 150" stroke="${H}" stroke-width="7" stroke-linecap="round"/>`,
        extra: glassesRect('#C9A050') };
    },
    // 配角
    inv: () => ({ hairBack: '', body: torso('#2B2F3A') + `<path d="M128 296 L150 340 L172 296 L162 292 L150 318 L138 292Z" fill="#fff"/><path d="M146 312 h8 l4 40 l-8 10 l-8 -10z" fill="#8C1C3A"/>`, face: 'oval', eyes: eye(124, '#2A2A2A', 0) + eye(176, '#2A2A2A', 0), brows: brow(124, '#222', -4) + brow(176, '#222', -4), mouth: MOUTH.smirk, blush: '',
      hairFront: `<path d="M92 160 C86 96 120 72 154 72 C192 72 216 100 208 156 C200 130 190 118 170 112 C150 120 120 122 100 140 Z" fill="#20202A"/><path d="M110 110 C140 92 180 96 200 116" stroke="#4A4A58" stroke-width="5" fill="none" opacity=".6"/>`, extra: '' }),
    fd: () => ({ hairBack: '', body: torso('#5A4632') + `<path d="M128 296 L150 330 L172 296" fill="#EDE4D4"/>`, face: 'oval', eyes: happyEye(124) + happyEye(176), brows: brow(124, '#9A9A9A') + brow(176, '#9A9A9A'), mouth: MOUTH.smile, blush: blush(.2),
      hairFront: `<path d="M94 160 C88 100 120 76 152 76 C186 76 214 100 206 160 C202 138 192 124 176 118 C150 128 120 126 104 136 C98 144 96 150 94 160Z" fill="#B8B4AE"/>`, extra: glassesRect('#6A5A4A') }),
    boy: () => ({ hairBack: '', body: torso('#3E7A70') + `<path d="M128 296 Q150 314 172 296" stroke="#2E5A52" stroke-width="5" fill="none"/>`, face: 'oval', eyes: eye(124, '#3A2A20', 0) + eye(176, '#3A2A20', 0), brows: brow(124, '#3A2A20') + brow(176, '#3A2A20'), mouth: MOUTH.smile, blush: blush(.25),
      hairFront: `<path d="M92 162 C84 98 118 70 152 70 C190 70 218 98 208 162 C200 140 186 126 170 122 C176 136 150 146 120 138 C108 146 98 152 92 162Z" fill="#4A3020"/>`, extra: '' }),
    dir: () => ({ hairBack: '', body: torso('#3A3A40'), face: 'oval', eyes: eye(124, '#2A2A2A', 0) + eye(176, '#2A2A2A', 0), brows: brow(124, '#222', -3) + brow(176, '#222', -3), mouth: MOUTH.flat, blush: '',
      hairFront: '', extra: `<path d="M88 150 C82 96 116 70 150 70 C186 70 220 96 212 150 C190 130 170 124 150 124 C128 124 108 132 88 150Z" fill="#2A2A30"/><path d="M84 146 C120 130 186 130 226 146 L228 158 C190 146 120 146 86 160Z" fill="#1E1E24"/><text x="150" y="112" text-anchor="middle" font-size="20" font-weight="900" fill="#E8C66A" font-family="Arial">DIR</text><path d="M92 170 C92 120 208 120 208 170" stroke="#444" stroke-width="7" fill="none"/><rect x="82" y="160" width="18" height="30" rx="6" fill="#333"/><rect x="200" y="160" width="18" height="30" rx="6" fill="#333"/>` }),
  };

  function svg(k) {
    const d = D[k](), bg = BG[k] || BG.inv, f = d.face || 'oval';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 36 240 320"><defs><radialGradient id="bgg-${k}" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></radialGradient><linearGradient id="skin-${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SK}"/><stop offset="1" stop-color="#F3CDB8"/></linearGradient>${d.defs || ''}</defs>
      <rect width="300" height="400" fill="url(#bgg-${k})"/><circle cx="60" cy="60" r="30" fill="#fff" opacity=".18"/><circle cx="250" cy="110" r="18" fill="#fff" opacity=".15"/>
      <g transform="translate(150 172) scale(1.1) translate(-150 -172)">${d.hairBack}</g>
      <g transform="translate(0 -34) translate(150 400) scale(.82) translate(-150 -400)">${neck}${d.body}</g>
      <g transform="translate(150 172) scale(1.1) translate(-150 -172)">${ears(f)}<path d="${face[f]}" fill="url(#skin-${k})"/>
      ${d.blush}${d.eyes}${d.brows}${nose}${d.mouth}${d.hairFront}${d.extra}</g></svg>`;
  }
  const url = (k) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg(k));
  return { svg, url };
})();
