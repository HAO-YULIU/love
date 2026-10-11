'use strict';
// ===== 音效：Web Audio 即時合成；配樂：audio/bgm.mp3 =====
const AU = (() => {
  let ctx = null, master = null, sfxBus = null, bgmBus = null, on = true;
  try { on = localStorage.getItem('dz_snd') !== '0'; } catch (e) {}

  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = on ? 0.9 : 0; master.connect(ctx.destination);
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.55; sfxBus.connect(master);
    bgmBus = ctx.createGain(); bgmBus.gain.value = BGM_VOL; bgmBus.connect(master);
    loadBgm();
  }
  const t0 = () => ctx.currentTime;

  function tone(f, d = 0.15, type = 'sine', v = 0.4, when = 0, bus = sfxBus, slide = 0) {
    if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain(), t = t0() + when;
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f * slide), t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(bus); o.start(t); o.stop(t + d + 0.05);
  }
  function noise(d = 0.2, v = 0.3, when = 0, freq = 2000, q = 1, type = 'bandpass') {
    if (!ctx) return;
    const len = Math.floor(ctx.sampleRate * d), buf = ctx.createBuffer(1, len, ctx.sampleRate), ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(), t = t0() + when;
    s.buffer = buf; f.type = type; f.frequency.value = freq; f.Q.value = q; g.gain.value = v;
    s.connect(f); f.connect(g); g.connect(sfxBus); s.start(t);
  }
  const N = (n) => 440 * Math.pow(2, (n - 69) / 12); // MIDI → Hz

  const SFX = {
    click: () => tone(1200, 0.05, 'triangle', 0.15),
    type: () => tone(2400 + Math.random() * 400, 0.018, 'square', 0.025),
    pop: () => { tone(660, 0.08, 'sine', 0.3); tone(990, 0.1, 'sine', 0.2, 0.05); },
    miss: () => tone(220, 0.08, 'triangle', 0.12),
    ok: () => [72, 76, 79, 84].forEach((n, i) => tone(N(n), 0.35, 'triangle', 0.28, i * 0.07)),
    ng: () => { tone(180, 0.22, 'square', 0.12, 0, sfxBus, 0.7); tone(150, 0.25, 'square', 0.1, 0.1, sfxBus, 0.7); },
    ding: () => { tone(N(88), 0.25, 'sine', 0.25); tone(N(81), 0.4, 'sine', 0.22, 0.12); },
    page: () => noise(0.25, 0.25, 0, 3500, 0.7, 'highpass'),
    slide: () => tone(500, 0.04, 'sine', 0.08, 0, sfxBus, 1.3),
    shutter: () => { noise(0.05, 0.6, 0, 4000, 1); noise(0.08, 0.5, 0.08, 2500, 1); },
    heart: () => { tone(70, 0.16, 'sine', 0.7, 0, sfxBus, 0.6); tone(65, 0.18, 'sine', 0.55, 0.2, sfxBus, 0.6); },
    door: () => { tone(90, 0.4, 'sine', 0.5, 0, sfxBus, 0.5); noise(0.3, 0.25, 0, 300, 1, 'lowpass'); },
    objection: () => { [60, 64, 67, 72].forEach(n => tone(N(n), 0.6, 'sawtooth', 0.12)); noise(0.3, 0.5, 0, 1200, 0.8); tone(N(48), 0.7, 'square', 0.15); },
    rank: () => [79, 83, 86, 91, 95].forEach((n, i) => tone(N(n), 0.6, 'sine', 0.18, i * 0.09)),
    frag: () => [96, 91, 100, 93].forEach((n, i) => tone(N(n), 0.3, 'sine', 0.12, i * 0.06)),
    caught: () => { tone(880, 0.12, 'square', 0.15); tone(660, 0.2, 'square', 0.15, 0.12); },
    warn: () => tone(1500, 0.05, 'sine', 0.1),
    weigh: () => { tone(300, 0.15, 'triangle', 0.25, 0, sfxBus, 1.5); noise(0.1, 0.15, 0.1, 5000, 2); },
    chap: () => { tone(N(57), 1.6, 'triangle', 0.2); tone(N(64), 1.6, 'triangle', 0.15, 0.15); tone(N(69), 1.8, 'sine', 0.15, 0.3); noise(1.2, 0.1, 0, 6000, 0.5, 'highpass'); },
    phone: () => { for (let i = 0; i < 2; i++) { tone(N(84), 0.12, 'square', 0.08, i * 0.3); tone(N(88), 0.12, 'square', 0.08, i * 0.3 + 0.13); } },
    end: () => [60, 64, 67, 71, 74, 79].forEach((n, i) => tone(N(n), 1.8, 'triangle', 0.15, i * 0.18)),
  };

  // ---- 配樂：audio/bgm.mp3 整場循環播放，音量固定；換場景不切歌、不忽大忽小 ----
  const BGM_VOL = 0.2, XF = 1.5; // 固定音量（壓在音效底下）、首尾交叉淡入淡出秒數
  let buf = null, loading = false, nextAt = 0, timer = null;
  function loadBgm() {
    if (buf || loading || !ctx) return;
    loading = true;
    fetch('audio/bgm.mp3').then(r => r.arrayBuffer())
      .then(a => new Promise((ok, ng) => ctx.decodeAudioData(a, ok, ng)))
      .then(b => { buf = b; nextAt = ctx.currentTime + 0.05; tick(); timer = setInterval(tick, 500); })
      .catch(() => { loading = false; });
  }
  // 提前排好下一輪，與上一輪重疊 XF 秒，接縫聽不出來
  function tick() {
    if (!buf || ctx.state !== 'running' || ctx.currentTime < nextAt - 3) return;
    const t = Math.max(nextAt, ctx.currentTime + 0.05), d = buf.duration;
    const s = ctx.createBufferSource(), g = ctx.createGain();
    s.buffer = buf; s.connect(g); g.connect(bgmBus);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(1, t + XF);
    g.gain.setValueAtTime(1, t + d - XF);
    g.gain.linearRampToValueAtTime(0.0001, t + d);
    s.start(t); s.stop(t + d + 0.05);
    nextAt = t + d - XF;
  }
  // 切到背景分頁就暫停，回來接著播
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend(); else ctx.resume().then(tick);
  });
  // 劇情裡指定的情緒（day / tense…）一律沿用同一首，不中斷
  function bgm() { if (ctx) loadBgm(); }
  return {
    init,
    sfx(n) { if (!on) return; init(); try { SFX[n]?.(); } catch (e) {} },
    bgm,
    get on() { return on; },
    toggle() { on = !on; try { localStorage.setItem('dz_snd', on ? '1' : '0'); } catch (e) {} init(); if (master) master.gain.value = on ? 0.9 : 0; return on; },
  };
})();
const sfx = (n) => AU.sfx(n);
