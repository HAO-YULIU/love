'use strict';
// ===== 遊戲引擎：對話、選擇、手機、存檔、謎題框架 =====
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const TEST = /[?&]test=1/.test(location.search);
const LOBBY = 'https://hao-yuliu.github.io/escape-room/';
const SK = 'dz_v1_save', EK = 'dz_v1_end', FK = 'dz_v1_final', TOTAL = 54;
const sleep = (ms) => new Promise(r => setTimeout(r, TEST ? 0 : ms));
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = (s) => String(s).replace(/[\s，。、！？!?,.「」『』~～…]/g, '').trim();
function toLobby() { location.href = LOBBY; }

const C = {
  qr: { n: '沁蓉', c: '#F2A7BC', role: '負責人｜劇情與謎題' },
  zy: { n: '政庾', c: '#8DB4E8', role: '機關設計師' },
  jr: { n: '君葇', c: '#F1C27D', role: '社群與行銷' },
  wl: { n: '維淪', c: '#A8D39A', role: '美術與場景' },
  ly: { n: '令萓', c: '#C5A8EE', role: '企劃與財務' },
  jc: { n: '駿川', c: '#F5D66B', role: '主持與現場測試' },
  inv: { n: '投資方代表', c: '#C9C9C9' }, fd: { n: '創辦人', c: '#E8D4A0' }, unk: { n: 'Unknown', c: '#999' },
  ph: { n: '電話那頭', c: '#9AA', e: '📞' }, dir: { n: '導演', c: '#CCC' }, boy: { n: '陌生男生', c: '#9FD' },
};
for (const k of ['qr', 'zy', 'jr', 'wl', 'ly', 'jc', 'inv', 'fd', 'boy', 'dir']) C[k].img = PORTRAIT.url(k);
const CAST = ['qr', 'zy', 'jr', 'wl', 'ly', 'jc'];
const AFFK = ['zy', 'jr', 'wl', 'ly', 'jc'];
const RANKS = [[0, '售票口'], [7, '排隊中'], [14, '坐上車廂'], [21, '慢慢離地'], [28, '看見基隆河'], [35, '看見整個大直'], [42, '接近頂點'], [49, '抵達頂點']];

const avatar = (k) => { const c = C[k] || { n: k }; return `<span class="av" title="${esc(c.n)}">${c.img ? `<img src="${c.img}" alt="">` : c.e || esc(c.n[0])}</span>`; };

// ---------- 狀態 ----------
let S = null, CP = null, playing = false, fast = false;
const clone = (o) => JSON.parse(JSON.stringify(o));
function fresh() {
  return { ch: 1, aff: { zy: 40, jr: 40, wl: 40, ly: 40, jc: 40 }, team: 60, f: {}, frags: {}, solved: {}, clues: [], chat: [], posts: [], hints: 0, wrong: 0, t: 0, rid: null, obj: 0, caught: 0, read: 0 };
}
function save() {
  if (!S || !CP) return;
  try { localStorage.setItem(SK, JSON.stringify({ cp: CP, solved: S.solved, frags: S.frags, t: S.t, hints: S.hints, wrong: S.wrong, rid: S.rid, caught: S.caught, obj: S.obj })); } catch (e) {}
}
function loadSave() { try { return JSON.parse(localStorage.getItem(SK)); } catch (e) { return null; } }
function clr() { try { localStorage.removeItem(SK); } catch (e) {} }
function checkpoint(ch) { S.ch = ch; CP = clone(S); save(); }
function endings() { try { return JSON.parse(localStorage.getItem(EK)) || {}; } catch (e) { return {}; } }
function unlockEnd(k) { try { const e = endings(); e[k] = 1; localStorage.setItem(EK, JSON.stringify(e)); } catch (e) {} }
const solvedN = () => S ? Object.keys(S.solved).length : 0;
const rank = (n = solvedN()) => { let r = RANKS[0][1]; for (const [k, v] of RANKS) if (n >= k) r = v; return r; };

// ---------- 計時 ----------
setInterval(() => {
  if (playing && S && !document.hidden) { S.t++; if (S.t % 15 === 0) save(); hud(); }
}, 1000);
function fmt(s) { const h = s / 3600 | 0, m = (s % 3600) / 60 | 0, x = s % 60, p = n => String(n).padStart(2, '0'); return (h ? h + ':' + p(m) : p(m)) + ':' + p(x); }
let chTitle = '';
function hud() {
  if (!S) return;
  $('#h-time').textContent = fmt(S.t);
  $('#h-rank').textContent = rank();
  $('#h-pz').textContent = `謎題 ${solvedN()} / ${TOTAL}`;
  $('#h-ch').innerHTML = chTitle;
}

// ---------- 畫面 ----------
function show(id) { $$('.scr').forEach(s => s.classList.toggle('on', s.id === id)); }
function toast(html, cls = '') {
  if (TEST) return;
  const t = document.createElement('div'); t.className = 'toast ' + cls; t.innerHTML = html;
  $('#toasts').appendChild(t); setTimeout(() => t.remove(), 3200);
}
function fxShow(html, ms = 1200) {
  if (TEST) return Promise.resolve();
  const d = document.createElement('div'); d.innerHTML = html; $('#fx').appendChild(d.firstElementChild);
  return new Promise(r => setTimeout(() => { $('#fx').innerHTML = ''; r(); }, ms));
}
function flash() { if (TEST) return; const d = document.createElement('div'); d.className = 'flashw'; document.body.appendChild(d); setTimeout(() => d.remove(), 600); }

function setBg(k, extra = '') { $('#bg').innerHTML = ART[k] ? svgWrap(ART[k](), extra) : ''; $('#bg').dataset.k = k; }
function stage(list = []) {
  const st = $('#stage');
  st.innerHTML = list.map(k => {
    const c = C[k];
    return `<figure class="pt" data-k="${k}">${c.img ? `<img src="${c.img}" alt="${c.n}">` : `<div class="sil">${SIL(k)}</div>`}<figcaption><span class="seal">${c.n}</span></figcaption></figure>`;
  }).join('');
  st.dataset.n = list.length;
}

// ---------- 對話 ----------
let ADV = null;
function line(who, text) {
  return new Promise(res => {
    const box = $('#box'), nm = $('#nm'), tx = $('#tx');
    box.hidden = false;
    if (who) {
      const c = C[who] || { n: who, c: '#fff' };
      nm.textContent = c.n; nm.style.setProperty('--c', c.c); nm.hidden = false; box.classList.remove('narr');
    } else { nm.hidden = true; box.classList.add('narr'); }
    const figs = $$('#stage .pt'), here = figs.some(f => f.dataset.k === who);
    figs.forEach(f => f.classList.toggle('dim', !!who && here && f.dataset.k !== who));
    S && S.read++;
    if (TEST) { tx.textContent = text; res(); return; }
    let i = 0, done = false, auto = null;
    $('#more').hidden = true; tx.textContent = '';
    const full = () => {
      done = true; clearInterval(iv); tx.textContent = text; $('#more').hidden = false;
      if (fast) auto = setTimeout(finish, 280);
    };
    const finish = () => { clearTimeout(auto); ADV = null; res(); };
    const iv = setInterval(() => { i += fast ? 4 : 1; tx.textContent = text.slice(0, i); if (i % 3 === 0) sfx('type'); if (i >= text.length) full(); }, 26);
    ADV = () => { if (!done) full(); else finish(); };
  });
}
async function say(seq) {
  for (const it of seq) {
    if (typeof it === 'string') await line(null, it);
    else if (Array.isArray(it)) await line(it[0], it[1]);
    else if (it && typeof it === 'object') {
      if (it.bg) setBg(it.bg);
      if (it.show) stage(it.show);
      if (it.sfx) sfx(it.sfx);
      if (it.bgm !== undefined) AU.bgm(it.bgm);
      if (it.chat) chat(...it.chat);
      if (it.post) post(it.post);
      if (it.clue) clue(...it.clue);
      if (it.shake) { $$('#stage .pt').forEach(f => f.dataset.k === it.shake && (f.classList.remove('shake'), void f.offsetWidth, f.classList.add('shake'))); }
      if (it.fn) await it.fn();
      if (it.wait) await sleep(it.wait);
    }
  }
}
document.addEventListener('click', (e) => {
  if (!$('#game').classList.contains('on')) return;
  if (e.target.closest('#hud, #choices, #modal, #phone, #panel')) return;
  ADV && ADV();
});
document.addEventListener('keydown', (e) => {
  if ((e.key === ' ' || e.key === 'Enter') && ADV && !e.target.closest('input') && $('#modal').hidden && $('#phone').hidden) { e.preventDefault(); ADV(); }
});

function choose(id, opts, prompt = '') {
  return new Promise(res => {
    if (TEST) { const i = (window.__pick && window.__pick(id, opts)) ?? 0; (window.__log ||= []).push(id + ':' + i); opts[i].fx?.(); res(i); return; }
    const box = $('#choices');
    box.innerHTML = (prompt ? `<p class="cq">${prompt}</p>` : '') + opts.map((o, i) => `<button data-i="${i}">${o.t}</button>`).join('');
    box.hidden = false;
    box.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      e.stopPropagation(); sfx('click'); box.hidden = true; box.innerHTML = '';
      const i = +b.dataset.i; opts[i].fx?.(); res(i);
    };
  });
}

// ---------- 數值 ----------
function aff(k, d) {
  if (!d) return;
  S.aff[k] = Math.max(0, Math.min(100, S.aff[k] + d));
  toast(`${avatar(k)}<span>${C[k].n} 的好感 ${d > 0 ? '♥ +' + d : '−' + (-d)}</span>`, d > 0 ? 'up' : 'down');
  if (d > 0) sfx('heart');
}
function team(d) {
  if (!d) return;
  S.team = Math.max(0, Math.min(100, S.team + d));
  toast(`🤝 <span>工作室凝聚力 ${d > 0 ? '+' + d : d}</span>`, d > 0 ? 'up' : 'down');
}
function flag(k, v = 1) { S.f[k] = v; }

// ---------- 手機 ----------
function chat(th, who, text) { S.chat.push({ th, w: who, t: text }); if (!TEST) { sfx('ding'); toast(`${avatar(who)}<span><b>${C[who]?.n ?? who}</b>：${esc(text).slice(0, 40)}</span>`); } $('#badge').hidden = false; }
function post(text) { S.posts.push(text); $('#badge').hidden = false; if (!TEST) { sfx('ding'); toast(`🕶 <span><b>@dazhi.unknown</b> 發了新貼文</span>`); } }
function clue(n, d) { if (!S.clues.some(c => c.n === n)) { S.clues.push({ n, d }); toast(`📎 <span>獲得線索：<b>${esc(n)}</b></span>`); } }
function getFrag(ch) { if (S.frags[ch]) return; S.frags[ch] = 1; sfx('frag'); toast(`✉️ <span>找到匿名信的碎片：「<b>${ch}</b>」（${Object.keys(S.frags).length} / 5）</span>`); save(); if (Object.keys(S.frags).length === 5) ach('lv_frag'); }
const FRAGS = ['創', '辦', '人', '還', '在'];
let phTab = 'chat';
function openPhone(tab = phTab) {
  phTab = tab; $('#badge').hidden = true; sfx('click');
  const p = $('#phone'); p.hidden = false;
  const T = { chat: '聊天', anon: '匿名帳號', clue: '線索', rel: '關係', end: '結局' };
  let body = '';
  if (tab === 'chat') {
    const groups = {}; S.chat.forEach(m => (groups[m.th] ||= []).push(m));
    body = Object.keys(groups).length ? Object.entries(groups).map(([th, ms]) => `<p class="thread-h">— ${esc(th)} —</p><div class="msgs">${ms.map(m => `<div class="m ${m.w === 'qr' ? 'me' : ''} ${m.w === 'unk' ? 'sys' : ''}">${avatar(m.w)}<div><small>${C[m.w]?.n ?? m.w}</small><p>${esc(m.t)}</p></div></div>`).join('')}</div>`).join('') : '<p class="thread-h">還沒有訊息</p>';
  } else if (tab === 'anon') {
    body = S.posts.length ? S.posts.map(t => `<div class="post"><header><i>?</i>@dazhi.unknown</header><p>${esc(t)}</p></div>`).reverse().join('') : '<p class="thread-h">這個帳號還沒有貼文</p>';
  } else if (tab === 'clue') {
    body = `<p class="thread-h">匿名信的碎片（${Object.keys(S.frags).length} / 5）</p><div class="frags">${FRAGS.map(c => `<span class="${S.frags[c] ? 'got' : ''}">${S.frags[c] ? c : '？'}</span>`).join('')}</div>` +
      (S.clues.length ? S.clues.map(c => `<div class="clue"><b>${esc(c.n)}</b>${esc(c.d)}</div>`).join('') : '<p class="thread-h">還沒有線索</p>');
  } else if (tab === 'rel') {
    body = AFFK.map(k => `<div class="rel">${avatar(k)}<div><b>${C[k].n}</b><small>${C[k].role}</small><div class="meter"><i style="width:${S.aff[k]}%"></i></div></div></div>`).join('') +
      `<div class="rel"><span class="av">🤝</span><div><b>工作室凝聚力</b><small>太低的話，工作室會撐不下去</small><div class="meter team"><i style="width:${S.team}%"></i></div></div></div>`;
  } else body = galleryHTML();
  p.innerHTML = `<div class="ph"><div class="ph-top"><header><span>沁蓉的手機</span><button id="phX" aria-label="關閉">×</button></header><div class="ph-tabs">${Object.entries(T).map(([k, v]) => `<button data-t="${k}" class="${k === tab ? 'on' : ''}">${v}</button>`).join('')}</div></div><div class="ph-body">${body}</div></div>`;
  $('#phX').onclick = () => { p.hidden = true; sfx('click'); };
  $$('.ph-tabs button', p).forEach(b => b.onclick = () => openPhone(b.dataset.t));
  const pb = $('.ph-body', p); if (tab === 'chat') pb.scrollTop = pb.scrollHeight;
}
$('#phone').addEventListener('click', (e) => { if (e.target.id === 'phone') e.target.hidden = true; });

// ---------- 一般面板 ----------
function panel(title, html) {
  const p = $('#panel'); p.hidden = false;
  p.innerHTML = `<div class="pn"><header><h3>${title}</h3><button class="xb" id="pnX">關閉</button></header>${html}</div>`;
  $('#pnX').onclick = () => { p.hidden = true; sfx('click'); };
  return p;
}
$('#panel').addEventListener('click', (e) => { if (e.target.id === 'panel') e.target.hidden = true; });

// ---------- 謎題框架 ----------
const PZ = {}, MECH = {};
let pzOpen = null;
async function P(id) {
  const z = PZ[id];
  if (!z) throw new Error('沒有這題 ' + id);
  if (S.solved[id]) { z.r?.(); return; }
  await openPuzzle(id);
}
function openPuzzle(id, standalone = false) {
  return new Promise(res => {
    const z = PZ[id], m = $('#modal');
    m.innerHTML = `<div class="pz"><header><span class="pno">第 ${+id.slice(1)} 題</span><h3>${z.t}</h3><button class="hintb" type="button">💡 令萓的小紙條</button></header>${z.ctx ? `<p class="ctx">${z.ctx}</p>` : ''}<div class="pzb"></div><p class="hintp" hidden></p><p class="msg"></p></div>`;
    m.hidden = false; sfx('page');
    const pz = $('.pz', m), msg = $('.msg', m), hp = $('.hintp', m);
    let hi = 0, ngs = 0;
    $('.hintb', m).onclick = () => {
      const h = z.h || [];
      if (hi >= h.length) { hp.hidden = false; return; }
      S.hints++; hp.hidden = false; sfx('page');
      hp.innerHTML = h.slice(0, ++hi).map((t, i) => `<b>提示 ${i + 1}</b>　${t}`).join('<br>');
      if (hi >= h.length) $('.hintb', m).textContent = '💡 沒有更多提示了';
    };
    const api = {
      done: false,
      ok() {
        if (api.done) return; api.done = true; api.cleanup?.();
        const before = rank();
        S.solved[id] = 1; sfx('ok'); msg.className = 'msg ok'; msg.textContent = z.okMsg || '✔ 解開了！';
        z.r?.(); api.onOk?.(ngs); save(); hud();
        const after = rank();
        setTimeout(async () => { m.hidden = true; m.innerHTML = ''; pzOpen = null; if (before !== after && !standalone) await rankUp(after); res(); }, TEST ? 0 : 900);
      },
      ng(t = '好像不對喔，再想想。', pen = 0) {
        ngs++; S.wrong++; sfx('ng'); msg.className = 'msg'; msg.textContent = t;
        pz.classList.remove('shake'); void pz.offsetWidth; pz.classList.add('shake');
        if (pen) team(-pen);
      },
      say(t) { msg.className = 'msg'; msg.textContent = t; },
      get ngs() { return ngs; },
    };
    pzOpen = { id, api };
    MECH[z.m]($('.pzb', m), z.d, api, z);
    m.__auto = () => api.auto && api.auto();
  });
}
async function rankUp(r) {
  sfx('rank');
  await fxShow(`<div class="rankup"><small>摩 天 輪 升 高</small><b>${r}</b></div>`, 2000);
}

// ---------- 調查（場景熱點） ----------
// spots: [{x,y,w,h, t:'名稱', say:[...], frag:'創', once}]
function explore(bgKey, spots, exitText = '調查完畢，繼續') {
  return new Promise(res => {
    if (TEST) {
      const F = window.__frags, want = (c) => F === undefined ? true : Array.isArray(F) ? F.includes(c) : !!F;
      for (const s of spots) if (s.frag && want(s.frag)) getFrag(s.frag);
      res();
      return;
    }
    const seen = new Set();
    const draw = () => {
      const hs = spots.map((s, i) => `<rect class="hs ${seen.has(i) ? 'seen' : ''}" data-i="${i}" x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="12" tabindex="0"><title>${s.t}</title></rect>${s.frag && !S.frags[s.frag] ? `<circle class="glint" cx="${s.x + s.w / 2}" cy="${s.y + s.h / 2}" r="6" fill="#FFF6D0"/>` : ''}`).join('');
      setBg(bgKey, hs);
    };
    draw(); stage([]); $('#box').hidden = true;
    const bar = document.createElement('div');
    bar.id = 'exbar';
    bar.style.cssText = 'position:absolute;left:50%;bottom:calc(20px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:5;display:flex;flex-direction:column;align-items:center;gap:8px';
    bar.innerHTML = `<p style="margin:0;background:rgba(20,8,14,.8);padding:6px 14px;border-radius:999px;font-size:14px;color:#F3DCA4">🔍 點畫面中可疑的地方調查</p><button class="btn gold" id="exDone">${exitText}</button>`;
    $('#game').appendChild(bar);
    let busy = false;
    const onClick = async (e) => {
      const r = e.target.closest('.hs'); if (!r || busy) return;
      e.stopPropagation();
      busy = true; bar.style.visibility = 'hidden';
      const i = +r.dataset.i, s = spots[i]; seen.add(i); sfx('click');
      await say(s.say || ['沒什麼特別的。']);
      if (s.frag) getFrag(s.frag);
      s.fn && await s.fn();
      $('#box').hidden = true; draw(); busy = false; bar.style.visibility = '';
    };
    $('#bg').addEventListener('click', onClick);
    $('#exDone').onclick = (e) => { e.stopPropagation(); sfx('click'); $('#bg').removeEventListener('click', onClick); bar.remove(); res(); };
  });
}

// ---------- 章節卡 ----------
async function chapter(n, title, bgm = 'day') {
  chTitle = `第${'一二三四五六七八'[n - 1]}回<span>　${title}</span>`;
  checkpoint(n); hud();
  $('#box').hidden = true; stage([]); AU.bgm(bgm); sfx('chap');
  setBg('night');
  await fxShow(`<div class="chapter-card"><small>第 ${'一二三四五六七八'[n - 1]} 回</small><b>${title}</b></div>`, 3000);
}

// ---------- 成就 ----------
function ach(code) { try { window.SD?.ach?.(code); } catch (e) {} (S.ach ||= {})[code] = 1; }
