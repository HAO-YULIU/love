'use strict';
/* 回報問題：玩家遇到卡住、錯誤時，送到夜語工作室的 bug_reports（只能新增；大廳管理頁「回報處理」看得到）
 * 自動附上：所在位置與遊戲時間（各遊戲設定 Report.where）、裝置與畫面、最近的錯誤訊息（最多 10 筆）
 * 這個檔案最先載入，才收得到一開始發生的錯誤。送出靠 index.html 裡的 SD.report()。
 */
const Report = (() => {
  const errs = [];
  const push = m => { errs.push({ t: new Date().toISOString().slice(11, 19), m: String(m).slice(0, 300) }); if (errs.length > 10) errs.shift(); };
  addEventListener('error', e => push(`${e.message} @ ${(e.filename || '').split('/').pop()}:${e.lineno}`));
  addEventListener('unhandledrejection', e => push('promise: ' + ((e.reason && e.reason.message) || e.reason)));

  function info() {
    let w = {}; try { w = (R.where && R.where()) || {}; } catch (e) { /* 還沒進遊戲 */ }
    return {
      at: String(w.at || '標題畫面').slice(0, 40), time: w.time || null, ...(w.extra || {}),
      ua: navigator.userAgent.slice(0, 200), vp: [innerWidth, innerHeight, devicePixelRatio], touch: matchMedia('(pointer: coarse)').matches,
      errors: errs.slice(),
    };
  }
  function css() {
    if (document.getElementById('bugr-css')) return;
    const s = document.createElement('style'); s.id = 'bugr-css';
    s.textContent = `#bugr{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.66)}
#bugr[hidden]{display:none}
#bugr .bugr-card{width:min(440px,100%);max-height:calc(100% - 32px);overflow:auto;box-sizing:border-box;padding:20px 20px 16px;border-radius:14px;background:#17151d;color:#eee8f2;border:1px solid #4a4458;box-shadow:0 18px 50px rgba(0,0,0,.5);font:15px/1.7 "Noto Sans TC","PingFang TC",sans-serif;text-align:left}
#bugr h3{margin:0 0 8px;font-size:19px}
#bugr p{margin:0 0 10px}#bugr small{color:#a49cb0;font-size:12.5px}
#bugr textarea{display:block;width:100%;box-sizing:border-box;min-height:120px;margin:0 0 6px;padding:10px 12px;border-radius:8px;border:1px solid #4a4458;background:#0b0a0f;color:#fff;font:inherit;resize:vertical;user-select:text;-webkit-user-select:text}
#bugr .bugr-st{min-height:1.5em;margin:0 0 8px;font-size:14px;color:#ffb3b3}
#bugr .bugr-btns{display:flex;gap:10px;justify-content:flex-end}
#bugr button{font:inherit;padding:8px 18px;border-radius:999px;border:1px solid #5a5468;background:transparent;color:#eee8f2;cursor:pointer}
#bugr button.bugr-go{background:#e8b04a;border-color:#e8b04a;color:#1b1406;font-weight:700}
#bugr button:disabled{opacity:.55;cursor:default}`;
    document.head.appendChild(s);
  }
  function open() {
    css();
    let m = document.getElementById('bugr');
    if (!m) {
      m = document.createElement('div'); m.id = 'bugr'; m.hidden = true;
      m.innerHTML = `<div class="bugr-card" role="dialog" aria-modal="true" aria-labelledby="bugrT"><h3 id="bugrT">🐞 回報問題</h3>
        <p>遇到卡住、畫面怪怪的、謎題有問題……告訴我們發生了什麼事，確認之後會盡快處理。</p>
        <textarea maxlength="2000" placeholder="例如：在哪裡、做了什麼之後，發生了什麼事"></textarea>
        <p><small class="bugr-where"></small></p><p class="bugr-st"></p>
        <div class="bugr-btns"><button type="button" class="bugr-x">取消</button><button type="button" class="bugr-go">送出</button></div></div>`;
      document.body.appendChild(m);
      m.addEventListener('click', e => { if (e.target === m || e.target.closest('.bugr-x')) m.hidden = true; });
      // 打字時不要觸發遊戲的快捷鍵
      ['keydown', 'keyup', 'keypress'].forEach(k => m.addEventListener(k, e => { e.stopPropagation(); if (k === 'keydown' && e.key === 'Escape') m.hidden = true; }));
      m.querySelector('.bugr-go').onclick = send;
    }
    const i = info();
    m.querySelector('.bugr-where').textContent = `會一起送出：${i.at}${i.time ? '・遊戲時間 ' + i.time : ''}・裝置與畫面大小・最近錯誤 ${i.errors.length} 筆。不會附上帳號密碼。`;
    m.querySelector('.bugr-st').textContent = ''; m.querySelector('.bugr-go').disabled = false;
    m.hidden = false; setTimeout(() => m.querySelector('textarea').focus(), 50);
  }
  async function send() {
    const m = document.getElementById('bugr'), ta = m.querySelector('textarea'), st = m.querySelector('.bugr-st'), btn = m.querySelector('.bugr-go');
    const msg = ta.value.trim();
    if (!msg) { st.textContent = '請寫一下發生了什麼事'; return; }
    btn.disabled = true; st.textContent = '送出中……';
    const i = info();
    let ok = false;
    try { ok = !!(window.SD && SD.report && await SD.report({ message: msg.slice(0, 2000), station: i.at, info: i })); } catch (e) { ok = false; }
    if (ok) { ta.value = ''; st.textContent = '已送出，謝謝你！'; setTimeout(() => { m.hidden = true; }, 1200); }
    else { btn.disabled = false; st.textContent = '現在送不出去（可能沒有網路），等一下再試一次。'; }
  }
  const R = { open, info, where: null };
  return R;
})();
