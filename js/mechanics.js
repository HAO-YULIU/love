'use strict';
// ===== 謎題玩法（19 種，全部是新的玩法） =====
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const POOL = '的一是在不了有人這中大為上個國我以要他時來用們生到作地於出就分對成會可主發年動同工也能下過子說產種面而方後多定行學法所民得經十三之進著等部度家電力裡如水化高自二理起小物現實加量都兩體制機當使點從業本去把性好應開它合還因由其些然前外天政四日那社義事平形相全表間樣與關各重新線內數正心反你明看原又麼利比或但質氣第向道命此變條只沒結解問意建月公無系軍很情者最立代想已通並提直題黨程展五果料象員革位入常文總次品式活設及管特件長求老頭基資邊流路級少圖山統接知較將組見計別她手角期根論運農指幾九區強放決西被幹做必戰先回則任取據處府研質';
function shuffle(a, r = Math.random) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// 1. 是誰說的：替訊息配對說話的人
MECH.speaker = (el, d, api) => {
  const st = d.b.map(() => -1);
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="chatlist">${d.b.map((b, i) => `<div class="bub"><button class="who" data-i="${i}" type="button">？</button><span>${esc(b[0])}</span></div>`).join('')}</div><p class="tip" style="margin-top:10px">點每則訊息左邊的圓圈，切換成你覺得說這句話的人</p><button class="go" type="button">確認</button>`;
  const draw = () => $$('.who', el).forEach((w, i) => { const k = d.cast[st[i]]; w.innerHTML = k ? avatar(k) : '？'; });
  el.addEventListener('click', e => { const w = e.target.closest('.who'); if (!w) return; const i = +w.dataset.i; st[i] = (st[i] + 1) % d.cast.length; sfx('click'); draw(); });
  $('.go', el).onclick = () => {
    if (st.some(x => x < 0)) return api.ng('還有訊息沒有指定是誰說的。');
    const bad = st.filter((x, i) => d.cast[x] !== d.b[i][1]).length;
    bad ? api.ng(`有 ${bad} 則訊息配錯人了。`) : api.ok();
  };
  api.auto = () => { d.b.forEach((b, i) => st[i] = d.cast.indexOf(b[1])); draw(); $('.go', el).click(); };
};

// 2. 結帳：挑出剛好符合所有條件的組合
MECH.cart = (el, d, api) => {
  const on = new Set(), u = d.unit ?? '$';
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="items">${d.items.map((it, i) => `<button class="it" data-i="${i}" type="button"><b>${esc(it.n)}</b><span>${u}${it.p.toLocaleString()}</span>${it.tag ? `<small>${esc(it.tag)}</small>` : ''}</button>`).join('')}</div><div class="tot">${d.totLabel || '合計'}：<b>${u}0</b></div><button class="go" type="button">${d.go || '確認'}</button>`;
  const sum = () => [...on].reduce((a, i) => a + d.items[i].p, 0);
  const draw = () => { $$('.it', el).forEach((b, i) => b.classList.toggle('on', on.has(i))); $('.tot b', el).textContent = u + sum().toLocaleString(); };
  $('.items', el).onclick = e => { const b = e.target.closest('.it'); if (!b) return; const i = +b.dataset.i; on.has(i) ? on.delete(i) : on.add(i); sfx('click'); draw(); };
  $('.go', el).onclick = () => { const err = d.rule([...on].map(i => d.items[i]), sum()); err ? api.ng(err) : api.ok(); };
  api.auto = () => { on.clear(); d.sol.forEach(i => on.add(i)); draw(); $('.go', el).click(); };
};

// 3. 找不同
MECH.spot = (el, d, api) => {
  const found = new Set(), r = d.r || 30;
  const mk = (alt) => `<svg viewBox="0 0 400 300" class="spimg">${d.base.map((s, i) => alt && d.alt[i] !== undefined ? d.alt[i] : s).join('')}<g class="marks"></g></svg>`;
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<p class="tip">${d.tip || `兩張圖有 ${d.diffs.length} 個地方不一樣，點任何一張都可以`}</p><div class="spot">${mk(0)}${mk(1)}</div><p class="cnt">0 / ${d.diffs.length}</p>`;
  const svgs = $$('svg', el);
  const mark = (i) => {
    found.add(i);
    svgs.forEach(s => $('.marks', s).insertAdjacentHTML('beforeend', `<circle cx="${d.diffs[i][0]}" cy="${d.diffs[i][1]}" r="${r}" class="mk"/>`));
    $('.cnt', el).textContent = `${found.size} / ${d.diffs.length}`; sfx('pop');
    if (found.size === d.diffs.length) api.ok();
  };
  svgs.forEach(s => s.addEventListener('click', e => {
    const pt = s.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(s.getScreenCTM().inverse());
    const i = d.diffs.findIndex(([x, y], j) => !found.has(j) && Math.hypot(x - p.x, y - p.y) < r);
    i >= 0 ? mark(i) : sfx('miss');
  }));
  api.auto = () => d.diffs.forEach((_, i) => !found.has(i) && mark(i));
};

// 4. 鏤空卡：把有洞的卡片疊到字陣上（可以旋轉），讀出藏起來的字
const rotH = (holes, sz, k) => { let h = holes.map(x => [...x]); for (let i = 0; i < k; i++) h = h.map(([y, x]) => [x, sz - 1 - y]); return h.sort((a, b) => a[0] - b[0] || a[1] - b[1]); };
MECH.grille = (el, d, api) => {
  const n = 8, sz = d.sz || 4, r = rng(d.seed || 1), g = Array.from({ length: n }, () => Array.from({ length: n }, () => POOL[Math.floor(r() * POOL.length)]));
  const target = rotH(d.holes, sz, d.rot || 0);
  target.forEach(([y, x], i) => g[d.off[0] + y][d.off[1] + x] = d.ans[i]);
  let pr = 0, pc = 0, rot = 0;
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="gr-wrap"><div class="gr" style="--c:${n}">${g.flat().map(c => `<span>${c}</span>`).join('')}</div><div class="sten" style="--s:${sz}"></div></div>
    <div class="pad"><button data-m="0,-1" type="button">←</button><button data-m="-1,0" type="button">↑</button><button data-m="1,0" type="button">↓</button><button data-m="0,1" type="button">→</button><button data-rot="1" type="button" title="旋轉卡片">⟳</button></div>
    <p class="tip">拖曳或用方向鍵移動卡片，⟳ 可以旋轉。洞裡由左到右、由上到下讀</p><div class="ans"><input placeholder="${d.ph || '洞裡看到的字'}" maxlength="12"><button class="go" type="button">確認</button></div>`;
  const st = $('.sten', el), inp = $('input', el);
  const place = () => { st.style.setProperty('--r', pr); st.style.setProperty('--cc', pc); const h = rotH(d.holes, sz, rot); st.innerHTML = Array.from({ length: sz * sz }, (_, i) => `<i class="${h.some(([y, x]) => y * sz + x === i) ? 'h' : ''}"></i>`).join(''); };
  const mv = (dr, dc) => { const a = pr, b = pc; pr = Math.max(0, Math.min(n - sz, pr + dr)); pc = Math.max(0, Math.min(n - sz, pc + dc)); if (a !== pr || b !== pc) sfx('slide'); place(); };
  place();
  $('.pad', el).onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.rot) { rot = (rot + 1) % 4; sfx('slide'); place(); return; } const [dr, dc] = b.dataset.m.split(',').map(Number); mv(dr, dc); };
  let drag = null;
  st.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, r: pr, c: pc }; st.setPointerCapture(e.pointerId); });
  st.addEventListener('pointermove', e => {
    if (!drag) return; const cell = $('.gr span', el).offsetWidth || 36;
    const nr = drag.r + Math.round((e.clientY - drag.y) / cell), nc = drag.c + Math.round((e.clientX - drag.x) / cell);
    mv(nr - pr, nc - pc);
  });
  st.addEventListener('pointerup', () => drag = null);
  const go = () => { (d.alt || []).concat(d.ans).some(a => norm(inp.value) === norm(a)) ? api.ok() : api.ng(norm(inp.value) ? '不是這幾個字。卡片的位置和方向都對了嗎？' : '先把看到的字打進來。'); };
  $('.go', el).onclick = go; inp.onkeydown = e => e.key === 'Enter' && go();
  api.auto = () => { pr = d.off[0]; pc = d.off[1]; rot = d.rot || 0; place(); inp.value = d.ans; go(); };
};

// 5. 注音鍵盤密碼
const KB_ROWS = [['1ㄅ', '2ㄉ', '3ˇ', '4ˋ', '5ㄓ', '6ˊ', '7˙', '8ㄚ', '9ㄞ', '0ㄢ', '-ㄦ'], ['qㄆ', 'wㄊ', 'eㄍ', 'rㄐ', 'tㄔ', 'yㄗ', 'uㄧ', 'iㄛ', 'oㄟ', 'pㄣ'], ['aㄇ', 'sㄋ', 'dㄎ', 'fㄑ', 'gㄕ', 'hㄘ', 'jㄨ', 'kㄜ', 'lㄠ', ';ㄤ'], ['zㄈ', 'xㄌ', 'cㄏ', 'vㄒ', 'bㄖ', 'nㄙ', 'mㄩ', ',ㄝ', '.ㄡ', '/ㄥ']];
MECH.zhuyin = (el, d, api) => {
  const kbHTML = `<div class="kb">${KB_ROWS.map(r => `<div>${r.map(k => `<span><b>${k.slice(1)}</b>${k[0]}</span>`).join('')}</div>`).join('')}</div><p class="tip" style="margin-top:6px">空白鍵＝一聲</p>`;
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="code">${esc(d.code)}</div><div class="kbw"><button class="xb kbb" type="button" style="display:block;margin:0 auto">⌨️ 看鍵盤對照表（算一次提示）</button></div><div class="ans"><input placeholder="翻譯成中文" maxlength="12"><button class="go" type="button">確認</button></div>`;
  const inp = $('input', el);
  $('.kbb', el).onclick = () => { S.hints++; sfx('page'); $('.kbw', el).innerHTML = kbHTML; };
  const go = () => (d.alt || []).concat(d.ans).some(a => norm(inp.value) === norm(a)) ? api.ok() : api.ng(norm(inp.value) ? '不是這句。一個字一個字對照鍵盤看看。' : '先把翻出來的字打進來。');
  $('.go', el).onclick = go; inp.onkeydown = e => e.key === 'Enter' && go();
  api.auto = () => { inp.value = d.ans; go(); };
};

// 6. 只有一個人說謊（或只有一個人說真話）
MECH.liar = (el, d, api) => {
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<ul class="stm">${d.s.map(([k, t]) => `<li>${avatar(k)}<b>${C[k].n}</b><span>「${esc(t)}」</span></li>`).join('')}</ul><p class="q">${d.q}</p><div class="opts">${d.o.map(k => `<button data-k="${k}" type="button">${avatar(k)}${C[k].n}</button>`).join('')}</div>`;
  $('.opts', el).onclick = e => { const b = e.target.closest('button'); if (!b) return; b.dataset.k === d.a ? api.ok() : api.ng(d.ngMsg || `如果是${C[b.dataset.k].n}，說謊的人數就不對了。`, d.pen || 0); };
  api.auto = () => $(`.opts [data-k="${d.a}"]`, el).click();
};

// 7. 找字：在字陣裡圈出藏起來的詞
function genWS(n, words, seed) {
  const r = rng(seed), g = Array.from({ length: n }, () => Array(n).fill('')), pos = {};
  const dirs = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]];
  for (const w of words) {
    let ok = false;
    for (let t = 0; t < 800 && !ok; t++) {
      const [dr, dc] = dirs[Math.floor(r() * dirs.length)], y = Math.floor(r() * n), x = Math.floor(r() * n);
      const cells = [...w].map((_, i) => [y + dr * i, x + dc * i]);
      if (cells.every(([a, b], i) => a >= 0 && b >= 0 && a < n && b < n && (!g[a][b] || g[a][b] === w[i]))) {
        cells.forEach(([a, b], i) => g[a][b] = w[i]); pos[w] = cells; ok = true;
      }
    }
    if (!ok) throw new Error('找字題排不下：' + w);
  }
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!g[y][x]) g[y][x] = POOL[Math.floor(r() * POOL.length)];
  return { g, pos };
}
MECH.words = (el, d, api) => {
  const n = d.n || 8, { g, pos } = genWS(n, d.w, d.seed || 7), found = new Set();
  let start = null;
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="ws" style="--n:${n};--cell:min(38px, calc((100vw - 72px) / ${n}))">${g.flat().map((c, i) => `<span data-i="${i}">${c}</span>`).join('')}</div><div class="wl">${d.w.map(w => `<span data-w="${w}">${d.hide ? '？'.repeat(w.length) : d.first ? w[0] + '？'.repeat(w.length - 1) : w}</span>`).join('')}</div><p class="tip" style="margin-top:8px">點詞的第一個字，再點最後一個字（橫、直、斜、倒著都有可能）</p>`;
  const cells = $$('.ws span', el);
  const markWord = (w) => {
    found.add(w); pos[w].forEach(([y, x]) => cells[y * n + x].classList.add('f'));
    const t = $(`.wl [data-w="${w}"]`, el); t.classList.add('f'); t.textContent = w; sfx('pop');
    if (found.size === d.w.length) api.ok();
  };
  $('.ws', el).onclick = e => {
    const c = e.target.closest('span'); if (!c) return;
    const i = +c.dataset.i, y = i / n | 0, x = i % n;
    if (!start) { start = [y, x]; c.classList.add('sel'); sfx('click'); return; }
    const [y0, x0] = start; start = null; cells.forEach(s => s.classList.remove('sel'));
    const dy = Math.sign(y - y0), dx = Math.sign(x - x0), len = Math.max(Math.abs(y - y0), Math.abs(x - x0)) + 1;
    if (!(y0 === y || x0 === x || Math.abs(y - y0) === Math.abs(x - x0))) return sfx('miss');
    const s = Array.from({ length: len }, (_, k) => g[y0 + dy * k][x0 + dx * k]).join('');
    const w = d.w.find(w => !found.has(w) && (w === s || w === [...s].reverse().join('')));
    w ? markWord(w) : sfx('miss');
  };
  api.auto = () => d.w.forEach(w => {
    if (found.has(w)) return; const p = pos[w];
    cells[p[0][0] * n + p[0][1]].click(); cells[p[p.length - 1][0] * n + p[p.length - 1][1]].click();
  });
};

// 8. 點字：挑出藏在文字裡的字（墨點、藏頭）
MECH.tap = (el, d, api) => {
  const chars = []; let t = false;
  for (const ch of d.text) {
    if (ch === '{') { t = true; continue; } if (ch === '}') { t = false; continue; }
    chars.push({ ch, t });
  }
  const sel = new Set();
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="tc">${chars.map((c, i) => c.ch === '\n' ? '<span class="br"></span>' : `<span data-i="${i}" class="${c.t && d.dots ? 'dot' : ''}">${esc(c.ch)}</span>`).join('')}</div><p class="picked"></p><p class="tip">點字選取，再點一次取消</p><button class="go" type="button">確認</button>`;
  const draw = () => { $$('.tc span[data-i]', el).forEach(s => s.classList.toggle('sel', sel.has(+s.dataset.i))); $('.picked', el).textContent = [...sel].sort((a, b) => a - b).map(i => chars[i].ch).join(''); };
  $('.tc', el).onclick = e => { const s = e.target.closest('span[data-i]'); if (!s) return; const i = +s.dataset.i; sel.has(i) ? sel.delete(i) : sel.add(i); sfx('click'); draw(); };
  $('.go', el).onclick = () => {
    const want = chars.map((c, i) => c.t ? i : -1).filter(i => i >= 0);
    const ok = want.length === sel.size && want.every(i => sel.has(i));
    ok ? api.ok() : api.ng(sel.size ? (want.every(i => sel.has(i)) ? '多選了幾個字。' : '還不是藏起來的那幾個字。') : '先點選你找到的字。');
  };
  api.auto = () => { sel.clear(); chars.forEach((c, i) => c.t && sel.add(i)); draw(); $('.go', el).click(); };
};

// 9. 連連看：左邊每一項配對到右邊
const TAGC = ['#E8335C', '#3A7BD5', '#2E8A5E', '#C98A1A', '#8A4AD0', '#D05A9A', '#4AA0B0'];
MECH.connect = (el, d, api) => {
  const as = d.L.map(() => -1); let cur = null;
  const lab = (x) => typeof x === 'string' && C[x] ? `${avatar(x)}<span>${C[x].n}</span>` : `<span>${esc(x)}</span>`;
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="cn"><div class="cl">${d.lt ? `<p class="tip">${d.lt}</p>` : ''}${d.L.map((x, i) => `<button data-l="${i}" type="button">${lab(x)}<i class="tag"></i></button>`).join('')}</div><div class="cr">${d.rt ? `<p class="tip">${d.rt}</p>` : ''}${d.R.map((x, i) => `<button data-r="${i}" type="button"><i class="tag" style="background:${TAGC[i % TAGC.length]}">${i + 1}</i>${lab(x)}</button>`).join('')}</div></div><p class="tip" style="margin-top:8px">先點左邊，再點右邊配對</p><button class="go" type="button">確認</button>`;
  const draw = () => $$('.cl button', el).forEach((b, i) => { b.classList.toggle('sel', cur === i); const t = $('.tag', b); t.textContent = as[i] >= 0 ? as[i] + 1 : ''; t.style.background = as[i] >= 0 ? TAGC[as[i] % TAGC.length] : ''; });
  el.addEventListener('click', e => {
    const l = e.target.closest('[data-l]'), r = e.target.closest('[data-r]');
    if (l) { cur = +l.dataset.l; sfx('click'); draw(); }
    else if (r && cur !== null) { as[cur] = +r.dataset.r; cur = as.findIndex((x, i) => x < 0 && i > cur); if (cur < 0) cur = null; sfx('pop'); draw(); }
  });
  $('.go', el).onclick = () => {
    if (as.some(x => x < 0)) return api.ng('還有沒配對的。');
    const bad = as.filter((x, i) => x !== d.a[i]).length;
    bad ? api.ng(`有 ${bad} 組配錯了。`, d.pen || 0) : api.ok();
  };
  api.auto = () => { d.a.forEach((x, i) => as[i] = x); draw(); $('.go', el).click(); };
};

// 10. 邏輯表：每一列只能圈一個
MECH.grid = (el, d, api) => {
  const st = d.rows.map(() => d.cols.map(() => 0));
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<ol class="clues">${d.clues.map(c => `<li>${c}</li>`).join('')}</ol><div style="overflow:auto"><table class="lg"><tr><th></th>${d.cols.map(c => `<th>${c}</th>`).join('')}</tr>${d.rows.map((r, i) => `<tr><th>${C[r] ? C[r].n : r}</th>${d.cols.map((_, j) => `<td data-r="${i}" data-c="${j}"></td>`).join('')}</tr>`).join('')}</table></div><p class="tip" style="margin-top:8px">點格子：○ 是答案、× 是刪去</p><button class="go" type="button">確認</button>`;
  const draw = () => $$('.lg td', el).forEach(td => { const v = st[td.dataset.r][td.dataset.c]; td.textContent = ['', '○', '×'][v]; td.classList.toggle('x', v === 2); });
  $('.lg', el).onclick = e => { const td = e.target.closest('td'); if (!td) return; const i = +td.dataset.r, j = +td.dataset.c; st[i][j] = (st[i][j] + 1) % 3; sfx('click'); draw(); };
  $('.go', el).onclick = () => {
    const pick = st.map(r => r.reduce((a, v, j) => v === 1 ? [...a, j] : a, []));
    if (pick.some(p => p.length !== 1)) return api.ng('每一列都要剛好圈一個 ○。');
    const p = pick.map(x => x[0]);
    if (new Set(p).size !== p.length && !d.multi) return api.ng('同一欄不能圈兩次。');
    p.every((x, i) => x === d.a[i]) ? api.ok() : api.ng('有條件沒有滿足，再檢查一次。');
  };
  api.auto = () => { st.forEach((r, i) => r.forEach((_, j) => r[j] = j === d.a[i] ? 1 : 2)); draw(); $('.go', el).click(); };
};

// 11. 排座位 / 站位
const LAYOUT = {
  rect: { w: 520, h: 300, table: '<rect x="70" y="110" width="380" height="80" rx="16" fill="#C9935A"/><text x="260" y="156" text-anchor="middle" style="font-size:14px;fill:#fff">會議桌</text>', s: [[130, 55, '上左'], [260, 55, '上中'], [390, 55, '上右'], [130, 245, '下左'], [260, 245, '下中'], [390, 245, '下右']] },
  g3: { w: 520, h: 300, table: '<rect x="40" y="10" width="440" height="280" rx="10" fill="#2B1A22"/><path d="M186 10 V290 M333 10 V290 M40 103 H480 M40 196 H480" stroke="#5A4048" stroke-width="2"/><rect x="50" y="20" width="420" height="260" rx="6" fill="none" stroke="#DDB86E" stroke-dasharray="8 6"/>', s: [[113, 56, '左上'], [260, 56, '中上'], [406, 56, '右上'], [113, 150, '左中'], [260, 150, '正中'], [406, 150, '右中'], [113, 243, '左下'], [260, 243, '中下'], [406, 243, '右下']] },
};
const PROPS = { lamp: { n: '路燈', e: '🏮' }, bike: { n: '機車', e: '🛵' }, cam: { n: '攝影機', e: '🎥' }, cake: { n: '蛋糕', e: '🎂' } };
const tokLabel = (k) => C[k] ? C[k].n : PROPS[k].n;
function seatSolve(d) {
  const L = LAYOUT[d.layout], n = L.s.length, ks = d.tokens, out = [];
  const rec = (i, used, p) => {
    if (out.length > 1) return;
    if (i === ks.length) { if (d.cons.every(c => c[1](p))) out.push({ ...p }); return; }
    for (let s = 0; s < n; s++) if (!used.has(s)) { used.add(s); p[ks[i]] = s; rec(i + 1, used, p); used.delete(s); delete p[ks[i]]; }
  };
  rec(0, new Set(), {});
  return out;
}
MECH.seat = (el, d, api) => {
  const L = LAYOUT[d.layout], p = {}; let cur = d.tokens[0];
  const tokSvg = (k, x, y) => C[k]?.img ? `<clipPath id="cp-${k}"><circle cx="${x}" cy="${y}" r="30"/></clipPath><image href="${C[k].img}" x="${x - 30}" y="${y - 30}" width="60" height="60" clip-path="url(#cp-${k})" preserveAspectRatio="xMidYMid slice"/><circle cx="${x}" cy="${y}" r="30" fill="none" stroke="#DDB86E" stroke-width="3" class="tk"/>` : `<text x="${x}" y="${y + 12}" text-anchor="middle" style="font-size:34px;fill:#000">${C[k] ? C[k].n[0] : PROPS[k].e}</text>`;
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<ol class="cons">${d.cons.map(c => `<li>${c[0]}</li>`).join('')}</ol><div class="tray">${d.tokens.map(k => `<button data-k="${k}" type="button">${C[k] ? avatar(k) : `<span class="av">${PROPS[k].e}</span>`}${tokLabel(k)}</button>`).join('')}</div><svg class="seat-svg" viewBox="0 0 ${L.w} ${L.h}"></svg><p class="tip">先點上面的人（或道具），再點位置放下去；點已經放好的位置可以拿起來</p><button class="go" type="button">確認</button>`;
  const svg = $('svg', el);
  const draw = () => {
    const at = Object.fromEntries(Object.entries(p).map(([k, s]) => [s, k]));
    svg.innerHTML = L.table + L.s.map(([x, y, lb], i) => `<circle class="slot ${at[i] ? 'hl' : ''}" data-s="${i}" cx="${x}" cy="${y}" r="34"/>${at[i] ? tokSvg(at[i], x, y) : `<text x="${x}" y="${y + 4}" text-anchor="middle">${lb}</text>`}`).join('');
    $$('.tray button', el).forEach(b => { b.classList.toggle('sel', b.dataset.k === cur); b.classList.toggle('placed', p[b.dataset.k] !== undefined && b.dataset.k !== cur); });
  };
  $('.tray', el).onclick = e => { const b = e.target.closest('button'); if (!b) return; cur = b.dataset.k; sfx('click'); draw(); };
  svg.addEventListener('click', e => {
    const c = e.target.closest('.slot'); if (!c) return; const s = +c.dataset.s;
    const occ = Object.keys(p).find(k => p[k] === s);
    if (occ && (!cur || occ === cur)) { delete p[occ]; cur = occ; sfx('click'); draw(); return; }
    if (!cur) return;
    if (occ) delete p[occ];
    p[cur] = s; sfx('pop'); cur = d.tokens.find(k => p[k] === undefined) || null; draw();
  });
  $('.go', el).onclick = () => {
    if (d.tokens.some(k => p[k] === undefined)) return api.ng('還有人沒有位置。');
    const bad = d.cons.map((c, i) => c[1](p) ? -1 : i).filter(i => i >= 0);
    $$('.cons li', el).forEach((li, i) => { li.className = bad.includes(i) ? 'bad' : 'good'; });
    bad.length ? api.ng(`還有 ${bad.length} 個條件沒有滿足（紅色的那幾條）。`) : api.ok();
  };
  draw();
  api.auto = () => { const s = seatSolve(d)[0]; Object.assign(p, s); draw(); $('.go', el).click(); };
};

// 12. 偷聽：按住靠近，對方回頭前要放手
MECH.listen = (el, d, api) => {
  let prog = 0, hold = false, state = 'idle', until = performance.now() + 1500, shown = 0, caught = 0;
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="ls"><span class="ls-eye">👀</span><div class="ls-pair">${d.who.map(k => avatar(k)).join('')}</div><div class="ls-bar"><i></i></div><div class="ls-lines"></div></div><button class="hold" type="button">按住：靠近偷聽</button><p class="tip" style="margin-top:6px">眼睛 👀 一閃就要放手，被看到會被發現。電腦可以按住空白鍵</p>`;
  const eye = $('.ls-eye', el), pair = $('.ls-pair', el), bar = $('.ls-bar i', el), lines = $('.ls-lines', el), btn = $('.hold', el);
  const setHold = (v) => { hold = v; btn.classList.toggle('on', v); btn.textContent = v ? '偷聽中……' : '按住：靠近偷聽'; };
  btn.addEventListener('pointerdown', e => { e.preventDefault(); setHold(true); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(t => btn.addEventListener(t, () => setHold(false)));
  const kd = e => { if (e.key === ' ') { e.preventDefault(); setHold(true); } }, ku = e => { if (e.key === ' ') setHold(false); };
  document.addEventListener('keydown', kd); document.addEventListener('keyup', ku);
  const iv = setInterval(() => {
    const now = performance.now();
    if (now > until) {
      if (state === 'idle') { state = 'warn'; until = now + (d.warn || 700); sfx('warn'); }
      else if (state === 'warn') { state = 'look'; until = now + 1300; }
      else { state = 'idle'; until = now + (d.gap?.[0] ?? 1600) + Math.random() * ((d.gap?.[1] ?? 3200) - (d.gap?.[0] ?? 1600)); }
    }
    eye.className = 'ls-eye ' + (state === 'idle' ? '' : state); pair.classList.toggle('look', state === 'look');
    if (hold) {
      if (state === 'look') { caught++; S.caught++; prog = Math.max(0, prog - 25); setHold(false); sfx('caught'); api.say('被看到了！先躲起來……'); state = 'idle'; until = now + 1800; }
      else prog = Math.min(100, prog + (d.spd || 1.1));
    }
    bar.style.width = prog + '%';
    const want = Math.floor(prog / 100 * d.lines.length + 0.0001);
    while (shown < want) { lines.insertAdjacentHTML('beforeend', `<p>${esc(d.lines[shown++])}</p>`); sfx('type'); }
    if (prog >= 100) { api.ok(); }
  }, 50);
  api.cleanup = () => { clearInterval(iv); document.removeEventListener('keydown', kd); document.removeEventListener('keyup', ku); };
  api.onOk = () => { if (!caught) (S.f.ear = (S.f.ear || 0) + 1); };
  api.auto = () => { prog = 100; };
};

// 13. 填空：把詞放回正確的空格
MECH.cloze = (el, d, api) => {
  const nb = d.a.length, fill = Array(nb).fill(-1); let cur = 0;
  let html = '', bi = 0;
  for (const seg of d.segs) html += typeof seg === 'number' ? `<button class="bl" data-b="${seg}" type="button">　</button>` : esc(seg).replace(/\n/g, '<br>');
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="cz">${html}</div><div class="bank">${d.bank.map((w, i) => `<button data-w="${i}" type="button">${esc(w)}</button>`).join('')}</div><p class="tip" style="margin-top:8px">點空格，再點下面的詞填進去；點填好的空格可以清掉</p><button class="go" type="button">確認</button>`;
  void bi;
  const draw = () => { $$('.bl', el).forEach(b => { const i = +b.dataset.b; b.textContent = fill[i] >= 0 ? d.bank[fill[i]] : '　'; b.classList.toggle('cur', i === cur); }); $$('.bank button', el).forEach(b => b.classList.toggle('used', fill.includes(+b.dataset.w))); };
  $('.cz', el).onclick = e => { const b = e.target.closest('.bl'); if (!b) return; const i = +b.dataset.b; if (fill[i] >= 0 && cur === i) fill[i] = -1; cur = i; sfx('click'); draw(); };
  $('.bank', el).onclick = e => { const b = e.target.closest('button'); if (!b) return; const w = +b.dataset.w; const was = fill.indexOf(w); if (was >= 0) fill[was] = -1; fill[cur] = w; sfx('pop'); const nx = fill.findIndex(x => x < 0); cur = nx >= 0 ? nx : cur; draw(); };
  $('.go', el).onclick = () => { if (fill.some(x => x < 0)) return api.ng('還有空格沒填。'); const bad = fill.filter((x, i) => x !== d.a[i]).length; bad ? api.ng(`有 ${bad} 個空格填錯了。`) : api.ok(); };
  draw();
  api.auto = () => { d.a.forEach((x, i) => fill[i] = x); draw(); $('.go', el).click(); };
};

// 14. 調色：調出跟目標一樣的顏色
const PAINT = { r: ['紅', [214, 40, 57]], y: ['黃', [247, 200, 40]], b: ['藍', [36, 82, 190]], w: ['白', [255, 255, 255]], k: ['黑', [30, 30, 34]] };
const mixRGB = (c) => { const t = Object.values(c).reduce((a, b) => a + b, 0); if (!t) return null; return [0, 1, 2].map(i => Math.round(Object.entries(c).reduce((a, [k, n]) => a + PAINT[k][1][i] * n, 0) / t)); };
MECH.mix = (el, d, api) => {
  const ks = d.paints || ['r', 'y', 'b', 'w', 'k'], c = Object.fromEntries(ks.map(k => [k, 0])), T = mixRGB(d.target);
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="mx"><div><div class="sw" style="background:rgb(${T})"></div><small>${d.tname || '目標'}</small></div><div><div class="sw cur"></div><small>你調的顏色</small></div></div><div class="paints">${ks.map(k => `<div class="paint"><i style="background:rgb(${PAINT[k][1]})"></i><span>${PAINT[k][0]}</span><div><button data-k="${k}" data-d="-1" type="button">−</button><b data-n="${k}">0</b><button data-k="${k}" data-d="1" type="button">＋</button></div></div>`).join('')}</div><p class="simil"></p><button class="go" type="button">就是這個顏色</button>`;
  const dist = () => { const m = mixRGB(c); return m ? Math.hypot(...m.map((v, i) => v - T[i])) : 999; };
  const draw = () => { const m = mixRGB(c); $('.sw.cur', el).style.background = m ? `rgb(${m})` : 'repeating-linear-gradient(45deg,#eee,#eee 8px,#fff 8px,#fff 16px)'; ks.forEach(k => $(`[data-n="${k}"]`, el).textContent = c[k]); $('.simil', el).textContent = m ? `相似度 ${Math.max(0, Math.round(100 - dist() / 4.4))}%` : '加一點顏料看看'; };
  $('.paints', el).onclick = e => { const b = e.target.closest('button'); if (!b) return; const k = b.dataset.k; c[k] = Math.max(0, Math.min(6, c[k] + +b.dataset.d)); sfx('click'); draw(); };
  $('.go', el).onclick = () => dist() < 7 ? api.ok() : api.ng('還差一點，比例再調調看。');
  draw();
  api.auto = () => { ks.forEach(k => c[k] = d.target[k] || 0); draw(); $('.go', el).click(); };
};

// 15. 天秤：用有限的次數找出不一樣重的那一個
MECH.scale = (el, d, api) => {
  const n = d.n, lab = d.labels || Array.from({ length: n }, (_, i) => String(i + 1));
  let odd, uses, side, pick = null;
  const reset = (m) => { odd = TEST ? 0 : Math.floor(Math.random() * n); uses = 0; side = Array(n).fill(0); pick = null; draw(0); if (m) $('.sc-log', el).textContent = m; };
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<svg class="sc-art" viewBox="0 0 420 170"><rect x="200" y="70" width="20" height="90" fill="#8A6A3A"/><rect x="150" y="155" width="120" height="12" rx="6" fill="#6A4A2A"/><g class="beam"><rect x="50" y="64" width="320" height="12" rx="6" fill="#B98A4A"/><path d="M70 76 L40 126 H120 L90 76" fill="none" stroke="#8A6A3A" stroke-width="2"/><path d="M330 76 L300 126 H380 L350 76" fill="none" stroke="#8A6A3A" stroke-width="2"/><ellipse cx="80" cy="128" rx="46" ry="8" fill="#E8335C" opacity=".6"/><ellipse cx="340" cy="128" rx="46" ry="8" fill="#3A7BD5" opacity=".6"/></g><circle cx="210" cy="70" r="10" fill="#DDB86E"/></svg>
    <div class="coins">${lab.map((l, i) => `<button class="coin" data-i="${i}" type="button">${l}</button>`).join('')}</div>
    <p class="tip" style="margin-top:8px">點一下放左盤（紅）、再點放右盤（藍）、再點拿下來。最多秤 ${d.max} 次</p>
    <div class="sc-btns"><button class="go w" type="button">秤一下</button><button class="go p" type="button" style="background:#2E8A5E">指認</button><button class="go z" type="button" style="background:#888">全部拿下來</button></div><p class="sc-log"></p>`;
  const beam = $('.beam', el), log = $('.sc-log', el);
  function draw(tilt) {
    $$('.coin', el).forEach((b, i) => { b.className = 'coin' + (side[i] === 1 ? ' l' : side[i] === 2 ? ' r' : '') + (pick === i ? ' pick' : ''); });
    if (tilt !== undefined) beam.style.transform = `rotate(${tilt * 8}deg)`;
  }
  $('.coins', el).onclick = e => {
    const b = e.target.closest('.coin'); if (!b) return; const i = +b.dataset.i; sfx('click');
    if (pick !== null) { pick = i; draw(); return; }
    side[i] = (side[i] + 1) % 3; draw();
  };
  $('.w', el).onclick = () => {
    if (uses >= d.max) return reset(`秤只能用 ${d.max} 次。重新來過（不一樣的那個也換了）。`);
    const w = (s) => side.reduce((a, v, i) => a + (v === s ? (i === odd ? (d.heavy ? 1.1 : 0.9) : 1) : 0), 0);
    const L = w(1), Rr = w(2); uses++; sfx('weigh');
    const t = L > Rr ? -1 : L < Rr ? 1 : 0;
    draw(t);
    log.textContent = `第 ${uses} 次：${t < 0 ? '左邊比較重' : t > 0 ? '右邊比較重' : '一樣重'}（還能秤 ${d.max - uses} 次）`;
  };
  $('.p', el).onclick = () => {
    if (pick === null) { pick = -1; draw(); log.textContent = '點你覺得是「不一樣」的那一個，再按一次指認'; return; }
    if (pick < 0) return;
    if (pick === odd) api.ok(); else { api.ng(`不是 ${lab[pick]}。`); reset(`重新來過（不一樣的那個也換了）。`); }
  };
  $('.z', el).onclick = () => { side.fill(0); pick = null; draw(0); };
  reset();
  api.auto = () => { pick = odd; $('.p', el).click(); };
};

// 16. 成語接龍（小心同音不同字）
MECH.idiom = (el, d, api) => {
  let k = 0; const r = rng(d.seed || 3);
  const opts = d.steps.map(s => shuffle(s, r));
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="chain"></div><div class="opts"></div>`;
  const draw = () => {
    const done = [d.start, ...d.steps.slice(0, k).map(s => s[0])];
    $('.chain', el).innerHTML = done.map(w => `<span>${w}</span>`).join('<i>→</i>') + (k < d.steps.length ? `<i>→</i><span class="next">${done[done.length - 1].slice(-1)}＿＿＿</span>` : '');
    $('.opts', el).innerHTML = k < d.steps.length ? opts[k].map(w => `<button data-w="${w}" type="button" style="padding:8px 18px;font-family:var(--serif)">${w}</button>`).join('') : '';
  };
  $('.opts', el).onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.w === d.steps[k][0]) { k++; sfx('pop'); draw(); if (k === d.steps.length) api.ok(); }
    else api.ng(b.dataset.w[0] !== d.steps[k][0][0] ? `「${b.dataset.w[0]}」跟「${d.steps[k][0][0]}」只是音很像，不是同一個字。` : '這不是成語喔。');
  };
  draw();
  api.auto = () => { while (k < d.steps.length) $(`.opts [data-w="${d.steps[k][0]}"]`, el).click(); };
};

// 17. 圖像謎語
MECH.rebus = (el, d, api) => {
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<div class="rebus">${d.show}</div><div class="ans"><input placeholder="${d.ph || '答案'}" maxlength="12"><button class="go" type="button">確認</button></div>`;
  const inp = $('input', el);
  const go = () => d.a.some(a => norm(inp.value) === norm(a)) ? api.ok() : api.ng(norm(inp.value) ? '不是這個。' : '先把答案打進來。');
  $('.go', el).onclick = go; inp.onkeydown = e => e.key === 'Enter' && go();
  api.auto = () => { inp.value = d.a[0]; go(); };
};

// 18. 對質：找出證詞和證據互相矛盾的地方
MECH.cross = (el, d, api) => {
  let si = -1, ei = -1;
  el.innerHTML = `<div class="ce">${d.card ? `<div class="card">${d.card}</div>` : ''}<h4>${avatar(d.who)} ${C[d.who].n} 的證詞</h4><div class="sl">${d.s.map((s, i) => `<button data-s="${i}" type="button">「${esc(s)}」</button>`).join('')}</div><h4>📎 手上的證據</h4><div class="el">${d.e.map((x, i) => `<button data-e="${i}" type="button"><b>${esc(x[0])}</b>${esc(x[1])}</button>`).join('')}</div><button class="objb" type="button">異議！</button></div>`;
  const draw = () => { $$('[data-s]', el).forEach(b => b.classList.toggle('sel', +b.dataset.s === si)); $$('[data-e]', el).forEach(b => b.classList.toggle('sel', +b.dataset.e === ei)); };
  el.addEventListener('click', e => { const s = e.target.closest('[data-s]'), x = e.target.closest('[data-e]'); if (s) { si = +s.dataset.s; sfx('click'); draw(); } if (x) { ei = +x.dataset.e; sfx('click'); draw(); } });
  $('.objb', el).onclick = async () => {
    if (si < 0 || ei < 0) return api.ng('先選一句證詞，再選一個證據。');
    if (d.a.some(([a, b]) => a === si && b === ei)) { sfx('objection'); await fxShow('<div class="objection">異議！</div>', 1100); api.ok(); }
    else api.ng(d.ngMsg || '這兩個放在一起，看不出矛盾。');
  };
  api.onOk = (ngs) => { if (!ngs) S.obj++; };
  api.auto = () => { [si, ei] = d.a[0]; draw(); $('.objb', el).click(); };
};

// 19. 地圖：在大直地圖上標出位置
MECH.map = (el, d, api) => {
  let pin = null;
  el.innerHTML = `${d.card ? `<div class="card">${d.card}</div>` : ''}<svg class="mp" viewBox="0 0 400 300">${dazhiMap()}<g class="pin"></g></svg><p class="tip">點地圖放下圖釘</p><button class="go" type="button">就是這裡</button>`;
  const s = $('svg', el);
  const put = (x, y) => { pin = [x, y]; $('.pin', s).innerHTML = `<path d="M${x} ${y} l-9 -22 a10 10 0 1 1 18 0z" fill="#E8335C" stroke="#fff" stroke-width="2"/><circle cx="${x}" cy="${y - 27}" r="4" fill="#fff"/>`; sfx('pop'); };
  s.addEventListener('click', e => { const pt = s.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(s.getScreenCTM().inverse()); put(p.x, p.y); });
  $('.go', el).onclick = () => { if (!pin) return api.ng('先在地圖上放圖釘。'); Math.hypot(pin[0] - d.zone[0], pin[1] - d.zone[1]) < d.zone[2] ? api.ok() : api.ng(d.ngMsg || '線索跟這裡對不上。'); };
  api.auto = () => { put(d.zone[0], d.zone[1]); $('.go', el).click(); };
};
