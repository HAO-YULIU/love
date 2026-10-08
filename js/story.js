'use strict';
// ===== 劇本：八回 + 最後的選擇 + 七種結局 =====

// ───────── 第一回：工作室裡最不應該出現的東西 ─────────
async function ch1() {
  await chapter(1, '工作室裡最不應該出現的東西', 'day');
  await say([{ bg: 'lounge', show: ['wl', 'jr', 'jc'] },
    '星期五晚上八點。',
    '大直密室工作室剛結束最後一場測試。',
    '六個人坐在休息區吃晚餐。桌上放滿外送。',
    ['wl', '「為什麼測一次密室要吃三次宵夜？」'],
    ['jr', '「因為你每次都說餓。」'],
    ['wl', '「那是因為測試很消耗體力。」'],
    ['jc', '「你今天真正消耗體力的地方不是測密室。」'],
    ['wl', '「什麼？」'],
    ['jc', '「你盯著某個人的聊天視窗，盯了快一小時。」'],
    { shake: 'wl', sfx: 'pop' }, ['wl', '「你有病喔。」'],
    '維淪瞬間把手機蓋起來。所有人笑成一團。',
    { chat: ['大直密室🔒', 'jc', '欸欸 考你們 我把名字都裁掉了'] },
    ['jc', '「來來來，考大家。今天群組的截圖，我把名字全部裁掉了。沁蓉，妳是寫謎題的，猜得出誰是誰嗎？」'],
  ]);
  await P('P01');
  await say([
    ['jc', '「……妳是不是偷看過答案？」'],
    ['qr', '「你們的打字習慣比密室還好猜。」'],
    ['wl', '「好啦好啦，不管，我要點第二輪宵夜。」'],
    { show: ['ly', 'wl'] },
    ['ly', '「可以。但照我的規矩點。」'],
  ]);
  await P('P02');
  await say([{ show: ['zy', 'ly'] },
    '外送點好了。大家正要繼續吃——',
    '政庾一直沒說話，盯著手機上的一張照片。',
    ['zy', '「……機關房被動過。」'],
    ['qr', '「什麼？」'],
    ['zy', '「測試前我拍了一張照片。現在有人進去過。」'],
  ]);
  await P('P03');
  await say([
    ['zy', '「箱子的鎖不見了。」'],
    ['ly', '「那個箱子……」'],
    '令萓的臉色變了一下。',
    '只有令萓沒有笑。因為她剛剛在整理公司文件時，發現了一個奇怪的東西。',
    ['ly', '「沁蓉，可以來辦公室一下嗎？」'],
    { bg: 'office', show: ['ly'], sfx: 'door' },
    ['ly', '「你們測試的時候，我在機關房的箱子裡找到這個。不知道是誰放進去的。」'],
    '一份新的合約。標題寫著：「大直工作室股權合作提案」。',
  ]);
  await P('P04');
  await say([
    '其中一個名字被特別標記——',
    '君葇。',
    { show: ['ly', 'jr'] },
    '令萓抬頭，剛好透過玻璃，看到君葇正在和某個人聊天。',
  ]);
  await P('P05');
  await say([
    '君葇看到她們，很快把手機收起來。',
    '這一刻，令萓知道事情不單純。',
    { show: ['ly'] },
    ['ly', '「條款的部分我還沒看完。沁蓉，幫我。」'],
  ]);
  await P('P06');
  await say([
    ['ly', '「股權重新分配。管理階層重新調整。」'],
    ['ly', '「有人要被撤換。」'],
    ['qr', '「誰？」'],
    ['ly', '「上面沒寫。」'],
    '令萓把合約收進抽屜。',
    ['ly', '「我出去倒杯水。妳先在這裡待一下，冷靜一點。」'],
  ]);
  await explore('office', [
    { x: 120, y: 120, w: 560, h: 320, t: '白板', say: ['白板上是沁蓉自己寫的測試排程。', '「宵夜 3 次（維淪）」被誰用紅筆圈了起來，旁邊畫了一顆愛心。', '……是誰畫的？'] },
    { x: 40, y: 430, w: 140, h: 300, t: '文件櫃', say: ['文件櫃三個抽屜都鎖著。', '鑰匙只有令萓有。'] },
    { x: 980, y: 110, w: 520, h: 330, t: '窗外', say: ['窗外看得到美麗華的摩天輪。', '工作室剛開的時候，六個人曾經一起去搭過一次。', '那時候，大家都還很單純。'] },
    { x: 430, y: 440, w: 230, h: 130, t: '筆電', say: ['令萓的筆電，螢幕停在財務報表。', '一整排紅色的數字。', '她為什麼沒跟大家說？'] },
    { x: 1100, y: 470, w: 190, h: 330, t: '冰箱', frag: '創', say: ['冰箱上貼滿了磁鐵。', '最下面那個愛心磁鐵底下，壓著一張摺得很小的紙。', '紙上只有一個字，字跡很陌生。'] },
  ]);
  await say([{ bg: 'lounge', show: ['jc', 'wl', 'jr'], bgm: 'tense', sfx: 'door' },
    '就在此時，大門被打開。',
    { show: ['inv'] },
    '一名陌生男子走進工作室。',
    '他是新的投資方代表，也是工作室最近正在接觸的合作夥伴。',
    ['inv', '「你們六個人，誰是負責人？」'],
    '大家互看。然後五個人同時開口了。',
  ]);
  await P('P07');
  await say([
    '最後，沁蓉站起來。',
    { show: ['qr', 'inv'] },
    ['qr', '「我是。」'],
    '男子笑了。',
    ['inv', '「很好。」'],
    ['inv', '「那接下來——」'],
    ['inv', '「我們談談，誰應該離開這間工作室。」'],
    { show: [] },
    '投資方代表留下一張名片就走了。',
    { show: ['ly'] },
    ['ly', '「合約的事，妳打算怎麼辦？」'],
  ]);
  await choose('c1', [
    { t: '「先別告訴大家。我們自己查清楚。」', fx: () => { aff('ly', 6); } },
    { t: '「直接在群組問清楚，大家當面講。」', fx: () => { team(-6); aff('jr', -5); } },
    { t: '「我私下去問君葇。」', fx: () => { aff('jr', 5); aff('ly', 2); } },
  ], '合約的事，要怎麼處理？');
  await say([['ly', '「好。」'], '令萓點頭。可是她看沁蓉的眼神，好像知道得比她說的還多。']);
}

// ───────── 第二回：誰喜歡誰？ ─────────
async function ch2() {
  await chapter(2, '誰喜歡誰？', 'day');
  await say([{ bg: 'lounge', show: ['jc', 'wl', 'jr'] },
    '隔天。工作室突然收到一封匿名信。',
    '信封上只寫著：「致大直密室工作室的各位」。',
  ]);
  await P('P08');
  await say([
    ['qr', '「寄信的人……就在我們裡面。」'],
    ['jc', '「我先講，我不是那三組。」'],
    ['wl', '「你不要自己先對號入座。」'],
    ['jc', '「我是預防性澄清。」'],
    ['jr', '「這該不會是哪個新密室的宣傳企劃吧～」'],
  ]);
  await choose('c2a', [
    { t: '「應該是吧，誰這麼有梗。」（笑著帶過）', fx: () => team(3) },
    { t: '「不對，一定有人在搞鬼。」', fx: () => { team(-4); aff('ly', 3); } },
  ], '妳覺得這封信是……');
  await say([
    '可是越查越不對。',
    { post: '某人每天都會等某人下班。', wait: 300 },
    { post: '有人曾經半夜送一個人回家。', wait: 300 },
    { post: '有人曾經因為看到某個人和別人約會，直接把整份企劃重做。', wait: 300 },
    { post: '有人喜歡的人，其實正在喜歡別人。' },
    '一個叫 @dazhi.unknown 的匿名帳號，開始公開一些工作室內部的訊息。',
    '這些事情，全部是真的。',
    ['jc', '「手機打開看匿名帳號。誰要先自首？」'],
    '沒有人說話。沁蓉決定自己查。',
  ]);
  await P('P09');
  await say([{ show: ['zy'] },
    '22:30。比沁蓉晚五分鐘。每一天。',
    '沁蓉想起來，這幾個月下班，政庾總是「剛好」也要去搭捷運。',
    ['zy', '「……幹嘛一直看我。」'],
    ['qr', '「沒事。」'],
    { show: ['jc', 'wl'] },
    ['jc', '「第二則。半夜送人回家。我剛好截過某人的限動。」'],
    ['wl', '「你為什麼要截我的限動！」'],
    ['jc', '「我又沒說是你。」'],
  ]);
  await P('P10');
  await say([
    ['qr', '「劍南路……」'],
    '君葇昨天在群組說過，她住劍南路那邊。',
    { show: ['wl'] },
    '維淪耳朵整個紅了。',
    ['wl', '「那天太晚了啦，捷運都沒了，順路而已。」'],
    ['jc', '「你住新店。」'],
    ['wl', '「……」'],
  ]);
  await P('P11');
  await say([{ show: ['jr'] },
    '凌晨兩點十三分。v7「全部重做」。編輯者：君葇。',
    '前一晚，維淪發了一則和女生吃飯的限動。',
    ['jr', '「……那個企劃本來就要改啦～」'],
    ['wl', '「那是我妹欸。」'],
    ['jr', '「我又沒問。」'],
    '君葇轉身去倒水。可是她的耳朵，跟維淪一樣紅。',
    ['qr', '（三組感情……現在要把傳聞配給人。猜錯的話——）'],
  ]);
  await P('P12');
  await say([
    '三則傳聞，三個人。',
    '可是第四則，「有人喜歡的人，其實正在喜歡別人」——',
    '沒有人知道在說誰。',
    { show: [] },
    '大家散了之後，沁蓉一個人留在休息區。',
  ]);
  await explore('lounge', [
    { x: 420, y: 120, w: 760, h: 200, t: '霓虹招牌', say: ['「大直密室」四個字是維淪親手設計的。', '開幕那天，君葇拍了一百張招牌的照片，只選了一張發文。', '照片角落，剛好拍到正在掛招牌的維淪。'] },
    { x: 880, y: 520, w: 560, h: 100, t: '桌上的外送', say: ['外送單上的備註欄寫著：「少冰半糖，不要珍珠。」', '那是駿川的口味。可是點的人不是駿川。'] },
    { x: 1430, y: 300, w: 140, h: 360, t: '盆栽', say: ['令萓每天都會來澆的盆栽。', '土裡插著一張小卡：「不要讓它死掉。——令萓」'] },
    { x: 150, y: 420, w: 620, h: 240, t: '沙發', frag: '辦', say: ['沙發縫裡卡著一張紙。', '跟冰箱上那張一樣的紙、一樣陌生的字跡。', '只有一個字。'] },
  ]);
  await say([{ show: ['jc', 'wl'], bgm: 'day' },
    ['wl', '「我不管，今天換你去買飲料。」'],
    ['jc', '「憑什麼？成語接龍，輸的去。」'],
    ['wl', '「……沁蓉救我。」'],
  ]);
  await P('P13');
  await say([
    ['jc', '「……好，我去。」'],
    ['jc', '「但在我走之前，我要證明一件事：上週五，維淪真的在盯某人的聊天視窗。」'],
    ['wl', '「你沒有證據。」'],
    ['jc', '「坐在你旁邊的人就是證據。沁蓉，幫我把座位排回來。」'],
  ]);
  await P('P14');
  await say([{ show: ['zy', 'wl'] },
    ['jc', '「所以，政庾，你看到了吧？」'],
    ['zy', '「沒看到」'],
    '政庾說得太快了。',
    '沁蓉開始注意到——政庾最近一直在躲她。',
    '君葇不停找機會單獨和令萓聊天。',
    '維淪每天都在問：「君葇今天有沒有來？」',
    { show: ['jc'] },
    '而駿川——每天晚上固定有一個男人打給他。',
    '每次電話一響，他就走到外面接。',
    { sfx: 'phone' },
    '晚上九點。電話又響了。',
  ]);
  await P('P15');
  await say([
    '電話掛掉。',
    '駿川轉身，剛好看到門邊的沁蓉。',
    ['jc', '「……妳聽到了？」'],
  ]);
  await choose('c2b', [
    { t: '「什麼？我只是來拿外套。」（假裝沒聽到）', fx: () => aff('jc', 6) },
    { t: '「『他』是誰？」（追問）', fx: () => { aff('jc', -6); team(-3); } },
    { t: '「我聽到了。我不會說出去。」', fx: () => { aff('jc', 10); team(2); } },
  ]);
  await say([
    ['jc', '「……謝了。」'],
    '駿川笑了一下，那個笑容跟平常看戲的時候不一樣。',
    '沁蓉第一次意識到——',
    '原來六個人中，沒有任何一個人，真的像表面上那麼簡單。',
  ]);
}

// ───────── 第三回：第一次修羅場 ─────────
async function ch3() {
  await chapter(3, '第一次修羅場', 'tense');
  await say([{ bg: 'office', show: ['zy', 'qr'] },
    '某天晚上，六個人一起留下來測試新密室。',
    '測試途中，政庾的手機在桌上亮了。',
    '他看了一眼。什麼都沒說，直接離開。',
    ['qr', '（他的鎖定畫面……）'],
  ]);
  await P('P16');
  await say([{ bg: 'backdoor', show: [], sfx: 'door' },
    '沁蓉跟了出去。',
    '政庾站在工作室後門。君葇正在跟他說話。',
    '兩人看起來像是在吵架。沁蓉沒有靠近，躲在門後。',
  ]);
  await P('P17');
  await say([{ show: ['qr'], bgm: 'sad' },
    '沁蓉站在門後，整個人愣住。',
    '她第一次知道——',
    '政庾喜歡她。',
    { sfx: 'heart' },
    { show: ['wl'] },
    '可是就在此時，另一邊的維淪也出現了。',
    '他看到沁蓉，又看到政庾和君葇——',
    '瞬間誤會。他轉身就走。',
    ['qr', '「維淪！」'],
    '維淪回頭，笑著說：',
    ['wl', '「沒事。」'],
    ['wl', '「真的沒事。」'],
    '可是他的表情，完全不像沒事。',
    ['wl', '「妳真的什麼都不知道嗎？」'],
  ]);
  await choose('c3a', [
    { t: '「我真的不知道。」', fx: () => aff('wl', 3) },
    { t: '「你是說……政庾？」', fx: () => { aff('wl', 4); aff('zy', 3); } },
    { t: '「你喜歡君葇，對吧？」', fx: () => { aff('wl', 8); team(2); } },
  ]);
  await say([
    '維淪沒有回答，走了。',
    { show: [] },
    '沁蓉一個人站在後門。',
  ]);
  await explore('backdoor', [
    { x: 620, y: 250, w: 360, h: 520, t: '後門', say: ['門沒關好，裡面傳來測試用的機關聲。', '剛剛他們就站在這裡。'] },
    { x: 1230, y: 545, w: 180, h: 225, t: '回收桶', say: ['回收桶裡有好幾個空的烏龍拿鐵杯子。', '杯身都寫著：少冰半糖。'] },
    { x: 190, y: 630, w: 200, h: 140, t: '紙箱', say: ['舊道具的紙箱，上面寫著「第一間工作室」。', '大直工作室，原來不是從這裡開始的。'] },
    { x: 720, y: 170, w: 160, h: 60, t: 'EXIT 燈', frag: '人', say: ['EXIT 燈的燈罩裡，夾著一張小紙片。', '第三張。同樣的字跡。'] },
  ]);
  await say([{ bg: 'office', show: [], bgm: 'tense' },
    '沁蓉回到工作室，去美術間找維淪。他不在。',
    '桌上只有一個調色盤，和一個上了鎖的櫃子。',
  ]);
  await P('P18');
  await P('P19');
  await say([
    '每一頁，都是同一個女生。',
    '戴著頭巾、在前台笑的君葇。在拍招牌的君葇。在打字、嘴角揚起「～」的君葇。',
    ['qr', '（維淪喜歡君葇，喜歡很久了。）'],
    ['qr', '（可是，他怎麼會剛好出現在後門？）'],
  ]);
  await P('P20');
  await say([{ show: ['ly'] },
    ['ly', '「是我說的。」'],
    ['qr', '「為什麼？」'],
    ['ly', '「因為他早晚都要知道。」'],
    ['ly', '「與其讓他胡思亂想，不如讓他親眼看到。」'],
    '令萓說完就走了。沁蓉覺得自己好像被當成了一顆棋子。',
    { show: [] },
    '那天晚上，沁蓉翻出工作室很久以前的聊天紀錄。',
  ]);
  await P('P21');
  await say([{ sfx: 'ding' },
    '凌晨，維淪發了一篇貼文。',
  ]);
  await P('P22');
  await say([{ bg: 'street', show: ['zy'], bgm: 'love' },
    '隔天下班。22:25。',
    '沁蓉走出工作室，政庾就站在門口，假裝在滑手機。',
    ['zy', '「……要去捷運站？」'],
    ['qr', '（他每天都在這裡等。）'],
  ]);
  await choose('c3b', [
    { t: '假裝什麼都沒聽到，自己先走。', fx: () => { aff('zy', -4); team(-2); } },
    { t: '「一起走吧。」', fx: () => aff('zy', 8) },
  ]);
  await say(['大直的夜晚，摩天輪還亮著。', '兩個人走在捷運高架底下，誰都沒有提後門的事。']);
}

// ───────── 第四回：假情侶企劃 ─────────
async function ch4() {
  await chapter(4, '假情侶企劃', 'love');
  await say([{ bg: 'meeting', show: ['jr', 'jc'] },
    '工作室決定推出一款戀愛主題的密室。',
    ['jr', '「宣傳企劃～ 六個工作人員要先扮成情侶，拍宣傳影片～」'],
    ['jc', '「然後玩家可以投票選配對。我覺得很讚。」'],
    '這個決定，讓整間工作室直接變成大型修羅場。',
    '沁蓉和政庾一組。君葇和維淪一組。駿川被安排成「戀愛顧問」。',
    ['jc', '「那令萓呢？」'],
  ]);
  await choose('c4', [
    { t: '「令萓跟駿川一組，戀愛顧問陪練。」', fx: () => { aff('ly', 4); aff('jc', 4); } },
    { t: '「令萓當導演吧，她最會看戲。」', fx: () => { aff('ly', 7); } },
    { t: '「令萓跟維淪一組。」', fx: () => { aff('wl', -4); aff('jr', -3); team(-3); } },
  ], '令萓要怎麼安排？');
  await say([{ bg: 'studio', show: ['dir'] },
    '拍攝第一天。導演把分鏡丟過來。',
    ['dir', '「主視覺：男朋友第一次送女朋友回家。站位照我寫的排。」'],
  ]);
  await P('P23');
  await P('P24');
  await say([{ show: ['zy', 'qr'] },
    '第一場：送回家。',
    '劇本被維淪亂改過，台詞全被打散了。',
  ]);
  await P('P25');
  await say([
    { sfx: 'shutter' }, ['dir', '「Action！」'],
    ['zy', '「到了」'],
    ['dir', '「卡！政庾，你是在報站名嗎？」'],
    '政庾緊張到完全不會演。',
    ['qr', '「你平常不是很會講嗎？」'],
    ['zy', '「這跟機關不一樣。」'],
    ['qr', '「你不是最會解謎？」'],
    ['zy', '「感情沒有攻略。」'],
    { sfx: 'heart' },
    '這一句話，讓沁蓉愣住。',
    '因為她突然不知道——他是在演戲，還是在說真話。',
  ]);
  await choose('c4b', [
    { t: '「那我們一起寫一份攻略。」', fx: () => aff('zy', 10) },
    { t: '「……你在演戲吧？」', fx: () => { aff('zy', -3); team(-2); } },
    { t: '（什麼都沒說，只是看著他）', fx: () => aff('zy', 4) },
  ]);
  await say([{ show: ['dir'] }, ['dir', '「燈光太冷了！誰去調一下！」']]);
  await P('P26');
  await say([{ sfx: 'shutter' }, ['dir', '「好，這條過了。場記，對一下 NG 跟正式那條的差別。」']]);
  await P('P27');
  await say([['dir', '「最後一場告白戲。道具戒指拿來。」'], ['jc', '「戒指有一個是夜市買的……我不知道是哪個。」']]);
  await P('P28');
  await say([{ show: ['jr', 'wl'] },
    '另一邊，君葇和維淪一起拍攝。',
    '維淪一路亂講，逗得全場大笑。',
    '但鏡頭一關，他卻突然很認真。',
    ['wl', '「如果有一天，我真的告白。」'],
    ['wl', '「妳會答應嗎？」'],
    '君葇沒有回答，只是看著他。',
    ['jr', '「你先學會不要那麼害怕再說。」'],
    '維淪笑了一下。',
    ['wl', '「我知道了。」'],
  ]);
  await P('P29');
  await say([{ show: ['ly'] },
    '而角落裡，令萓靜靜看著他們。',
    '她知道——有人在說謊。',
  ]);
}

// ───────── 第五回：真正的告白者 ─────────
async function ch5() {
  await chapter(5, '真正的告白者', 'tense');
  await say([{ bg: 'lounge', show: ['jc'] },
    '就在宣傳活動正式公開前，匿名帳號又更新了。',
    { post: '令人在意的，從來不是密室裡的機關。' }, { post: '萓草忘憂，可是有些事忘不掉。' }, { post: '知道答案的人，通常最安靜。' },
    { post: '道歉之前，請先說實話。' }, { post: '一個人的秘密，六個人的修羅場。' }, { post: '切記：猜錯的人，會失去最重要的東西。' },
  ]);
  await P('P30');
  await say([{ show: ['ly', 'jc'] },
    ['jc', '「……令萓知道一切？」'],
    '所有人都看向令萓。',
    ['ly', '「我本來就知道很多事。」'],
    ['ly', '「但不代表帳號是我的。」'],
  ]);
  await choose('c5b', [
    { t: '「我相信令萓。」', fx: () => { aff('ly', 8); flag('trustLy'); } },
    { t: '（先觀察，什麼都不說）', fx: () => {} },
    { t: '「是不是妳？說清楚。」', fx: () => { aff('ly', -8); team(-5); } },
  ]);
  await say([
    { post: '誰是第一個真正喜歡上別人的人？' },
    { sfx: 'ding' }, { sfx: 'ding', wait: 200 },
    '同一個晚上，六個人全部收到私訊。',
    '每一個人收到的內容都不一樣。',
  ]);
  await P('P31');
  await say([{ show: ['jc'], bgm: 'sad' },
    '駿川看到自己那一封的時候，整個人愣住。',
    '「妳喜歡的人就在你們之中。」',
    '因為他很清楚——自己喜歡的那個男生，不在工作室。',
    '至少，他原本是這麼以為的。',
  ]);
  await P('P32');
  await P('P33');
  await say([
    ['jc', '「……誰會在我加班的時候送飲料？」'],
    ['jc', '「誰會記得我喝少冰半糖？」'],
    ['jc', '「誰會在我講到感情的時候，突然變得很安靜？」'],
    '他拿出手機，打開通訊錄。',
  ]);
  await P('P34');
  await say([{ bg: 'office' }, ['jc', '「還差一個證據。」'], '你們一起去辦公室印轉帳紀錄。']);
  await explore('office', [
    { x: 1340, y: 590, w: 200, h: 160, t: '印表機', frag: '還', say: ['印表機吐出轉帳紀錄的時候，還夾帶了一張不屬於任何人的紙。', '第四張。'] },
    { x: 120, y: 120, w: 560, h: 320, t: '白板', say: ['白板上多了一行字：「戀愛密室　宣傳上線倒數 3 天」。', '是君葇的字。'] },
    { x: 980, y: 110, w: 520, h: 330, t: '窗外', say: ['摩天輪今天沒有亮燈。'] },
  ]);
  await P('P35');
  await say([{ show: ['jc'] },
    '最後，他把所有線索拼起來。',
    '答案竟然指向——',
    '政庾。',
    { sfx: 'heart' },
    ['jc', '「……我完蛋了。」'],
    '駿川笑著說，可是眼睛紅紅的。',
  ]);
  await choose('c5a', [
    { t: '在他旁邊坐下來，陪他一下。', fx: () => aff('jc', 10) },
    { t: '「欸你哭了喔？」（開玩笑）', fx: () => { aff('jc', -5); } },
    { t: '「要不要先別說？政庾他……」', fx: () => { aff('jc', -3); aff('zy', 2); } },
  ]);
  await say([{ bg: 'lounge', show: ['wl', 'jr', 'zy'] }, '第二天，大家開始互相懷疑。', ['wl', '「到底誰寄的啦！」']]);
  await P('P36');
  await say([{ show: ['ly'] }, '所有人的目光，又一次落在令萓身上。', '令萓只是笑了一下，沒有否認。']);
}

// ───────── 第六回：背叛 ─────────
async function ch6() {
  await chapter(6, '背叛', 'tense');
  await say([{ bg: 'meeting', show: ['inv'], sfx: 'ding' },
    '原本六個人正在籌備新的大型密室。',
    '突然，公司收到一封正式通知。',
    '投資方決定：撤換目前的工作室負責團隊。',
    '也就是說——六個人，可能全部失去這間工作室。',
    { show: ['ly', 'qr'] },
    '大家開始查原因。最後，證據竟然指向令萓。',
    ['qr', '「妳真的做了？」'],
    ['ly', '「對。」'],
    ['qr', '「為什麼？」'],
    ['ly', '「因為有人一定要離開。」'],
    ['qr', '「誰？」'],
  ]);
  await P('P37');
  await say([{ bgm: 'sad' },
    ['ly', '「……我。」'],
    '所有人愣住。',
    '原來令萓早就知道，工作室出現了財務問題。',
    '如果不引入投資方，整間工作室會撐不下去。',
    '她故意成為「壞人」，想把自己推出去，讓其他人留下。',
    '但事情卻被誤解成背叛。',
  ]);
  await choose('c6a', [
    { t: '「謝謝妳替我們扛。可是我們不要妳一個人走。」', fx: () => { aff('ly', 10); team(6); flag('trustLy'); } },
    { t: '「妳應該先跟我們說的。」', fx: () => { aff('ly', -3); team(-2); } },
  ]);
  await say([['ly', '「……那就一起想辦法。先砍預算。」']]);
  await P('P38');
  await say([{ show: ['ly', 'zy'], bgm: 'tense' },
    '預算砍下來了。也許還有機會。',
    '可是就在這時——真正的資料曝光了。',
  ]);
  await P('P39');
  await P('P40');
  await P('P41');
  await say([{ show: ['jr'] },
    '是君葇。',
    '她提前把工作室最大的企劃，賣給了另一家公司。',
  ]);
  await P('P42');
  await explore('meeting', [
    { x: 420, y: 90, w: 760, h: 420, t: '投影幕', say: ['投影幕還停在「股權合作提案」。', '管理階層重新調整。', '原來被標記的名字，從來不是要被撤換的人——而是準備離開的人。'] },
    { x: 300, y: 560, w: 990, h: 90, t: '椅子', say: ['君葇的位子是空的。', '她的外套還掛在椅背上。'] },
    { x: 1220, y: 580, w: 130, h: 80, t: '投影機', frag: '在', say: ['投影機底下壓著一張紙片。', '最後一張。同樣的字跡。'] },
  ]);
  await say([{ bg: 'lounge', show: ['wl', 'jr'] },
    '整間工作室，第一次徹底失控。',
    '而最生氣的不是沁蓉。',
    '是維淪。因為他一直喜歡君葇。',
    ['wl', '「妳為什麼連跟我說都不願意？」'],
    { shake: 'wl' },
  ]);
  await choose('c6c', [
    { t: '「維淪，先冷靜一下。」', fx: () => aff('wl', 3) },
    { t: '「君葇一定有她的理由！」（替君葇說話）', fx: () => { aff('jr', 4); aff('wl', -4); team(-5); } },
    { t: '「大家都坐下來。我們好好談。」', fx: () => team(5) },
  ]);
  await say([
    '君葇低下頭。',
    ['jr', '「因為我怕說了……」'],
    ['jr', '「我就真的走不了了。」'],
    '她拿起包包，衝出了工作室。筆電還開著。',
  ]);
  await P('P43');
  await P('P44');
  await say([{ bg: 'street', show: ['jr'], bgm: 'sad' },
    '沁蓉在大直站追上了君葇。',
    ['jr', '「沁蓉……對不起。那個主管職，是我一直很想要的。」'],
    ['jr', '「可是我也很想留在這裡。」'],
  ]);
  await choose('c6b', [
    { t: '「留下來吧。企劃的事，我們一起想辦法收拾。」', fx: () => { aff('jr', 5); team(5); flag('jrLeave', 0); } },
    { t: '「去吧。這是妳的夢想。我們會在這裡。」', fx: () => { aff('jr', 8); team(-3); flag('jrLeave', 1); } },
  ]);
  await say(['君葇抱住沁蓉，哭了很久。', '摩天輪的燈，一格一格亮起來。']);
}

// ───────── 第七回：感情攤牌 ─────────
async function ch7() {
  await chapter(7, '感情攤牌', 'love');
  await say([{ bg: 'lounge', show: CAST },
    '六個人最後決定：',
    '今晚，所有事情一次說清楚。',
    '沒有工作。沒有密室。沒有謎題。',
    '只有六個人。',
  ]);
  await P('P45');
  await say([{ show: ['jc', 'zy'] },
    '駿川深吸一口氣。',
    ['jc', '「我……我先來好了。」'],
    '他看了沁蓉一眼，像在等什麼。',
  ]);
  await choose('c7a', [
    { t: '（點點頭）「你說吧。我們都在。」', fx: () => { aff('jc', 10); flag('jcSupport'); team(3); } },
    { t: '「要不要……改天再說？」', fx: () => { aff('jc', -6); team(-4); } },
  ]);
  await P('P46');
  await say([{ bgm: 'love' },
    ['jc', '「我有喜歡的人。」'],
    '所有人看著他。',
    ['jc', '「是男生。」'],
    ['jc', '「而且就在這裡。」'],
    '整間房間安靜下來。接著，他看向政庾。',
    '政庾愣住。',
    '駿川笑了一下。',
    ['jc', '「你現在不用回答。」'],
    ['jc', '「至少今天不要。」'],
    '政庾沒有說話。',
    { show: ['wl', 'jr'] },
    '接著是維淪。他站起來，把一幅畫放到桌上。',
  ]);
  await P('P47');
  await say([
    ['wl', '「我喜歡妳。」'],
    '君葇沒有笑。',
    ['jr', '「我知道。」'],
    ['wl', '「那妳……」'],
    ['jr', '「我現在不能答應。」'],
    '維淪苦笑。',
    ['wl', '「至少妳沒有騙我。」'],
    { show: ['qr', 'zy'] },
    '最後，沁蓉轉向政庾。',
  ]);
  await P('P48');
  await say([
    ['qr', '「你喜歡我？」'],
    '政庾點頭。',
    ['zy', '「嗯」'],
    ['qr', '「多久？」'],
  ]);
  await P('P49');
  await P('P50');
  await say([
    ['qr', '「……一年？」'],
    ['zy', '「從工作室搬來大直的那個春天」'],
    ['qr', '「那你為什麼不早點說？」'],
    '政庾看著她。',
    ['zy', '「因為我怕說出口，連朋友都做不成」'],
    { sfx: 'heart' },
  ]);
  await choose('c7b', [
    { t: '「……其實，我也心動了。」', fx: () => { aff('zy', 15); flag('love'); } },
    { t: '「給我一點時間，好嗎？」', fx: () => aff('zy', 5) },
    { t: '「我們先當朋友，好不好？」', fx: () => { aff('zy', -5); flag('friend'); } },
  ]);
  await say([
    '這一刻，所有人第一次把真正的感情放在桌上。',
    '可是故事還沒有結束。',
    '因為真正的大問題，才剛出現。',
  ]);
}

// ───────── 第八回：大直愛情摩天輪的最後一關 ─────────
async function ch8() {
  await chapter(8, '大直愛情摩天輪的最後一關', 'tense');
  await say([{ bg: 'office', show: [] },
    '工作室準備關門時，電腦突然收到最後一封郵件。',
    '寄件人：Unknown。',
    '標題：《最後一場密室》。',
    { chat: ['Unknown', 'unk', '你們六個人的故事，我全部知道。'] },
  ]);
  await P('P51');
  await P('P52');
  await P('P53');
  await say([{ show: ['ly'] }, ['ly', '「最早的企劃……我好像知道在哪裡。」']]);
  await P('P54');
  await say([{ bg: 'night', show: CAST },
    '六個人去了大直橋下那間早就沒人用的小工作室。',
    '在積滿灰塵的桌上，找到一份泛黃的企劃書。',
    '上面只有一句話。',
    '「真正好的密室，不是讓玩家解出答案。」',
    '「而是讓玩家離開之後，還一直想著裡面發生過什麼。」',
    { bg: 'office', show: [] },
    '回到工作室，郵件的最後是一道選擇題。',
  ]);
}

// ───────── 最後的選擇 ─────────
function finalChoice() {
  return new Promise(res => {
    const nf = Object.keys(S.frags).length;
    const opts = [['A', '為了愛情，離開工作室'], ['B', '為了友情，留下'], ['C', '不選任何人，只相信自己'], ['D', '無論如何，六個人繼續一起做密室']];
    if (TEST) {
      const i = window.__pick ? window.__pick('final') : 0;
      if (i === 4) { const ok = tryTrue(window.__trueAns ?? '創辦人'); window.__trueMsg = ok; if (ok === true) return res('et'); }
      return res(pickEnding(['A', 'B', 'C', 'D'][Math.min(i, 3)]));
    }
    setBg('office'); stage([]); $('#box').hidden = true; AU.bgm('tense');
    const box = $('#choices');
    box.innerHTML = `<p class="cq">你會選擇——</p>${opts.map(([k, t]) => `<button data-k="${k}">${k}：${t}</button>`).join('')}<button data-k="E" style="border-style:dashed">🔒　真正答案</button><p style="font-size:13px;color:#C9B4BE;margin:4px 0 0">匿名信的碎片 ${nf} / 5</p>`;
    box.hidden = false;
    box.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return; e.stopPropagation(); sfx('click');
      if (b.dataset.k !== 'E') { box.hidden = true; box.innerHTML = ''; return res(pickEnding(b.dataset.k)); }
      const p = panel('🔒 真正答案', `<p>選項被鎖住了。上面寫著：</p><p style="text-align:center;font:700 18px var(--serif);color:#5A1428">「這些匿名信，真正的寄件人是誰？」</p><div class="frags">${FRAGS.map(c => `<span class="${S.frags[c] ? 'got' : ''}">${S.frags[c] ? c : '？'}</span>`).join('')}</div><div class="ans"><input id="trueIn" placeholder="寄件人" maxlength="10"><button class="go" id="trueGo">解鎖</button></div><p class="msg" id="trueMsg"></p>`);
      const go = () => {
        const r = tryTrue($('#trueIn').value);
        if (r === true) { p.hidden = true; box.hidden = true; box.innerHTML = ''; res('et'); }
        else { sfx('ng'); $('#trueMsg').textContent = r; }
      };
      $('#trueGo').onclick = go; $('#trueIn').onkeydown = e => e.key === 'Enter' && go();
    };
  });
}
function tryTrue(v) {
  const nf = Object.keys(S.frags).length;
  if (!/創辦人|創始人|創辦者/.test(norm(v))) return norm(v) ? '鎖沒有打開。不是這個人。' : '先輸入答案。';
  if (nf < 5) return `你還沒有找齊所有匿名信的來源（${nf} / 5）。有些碎片還藏在工作室的某個角落。`;
  if (S.f.jrLeave) return '君葇已經決定離開了。六個人沒有全部都在，這個選項打不開。';
  if (S.team < 60) return `六個人之間還有太多裂痕（凝聚力 ${S.team}）。這個選項打不開。`;
  if (solvedN() < TOTAL) return '還有謎題沒有解開。';
  return true;
}
function pickEnding(k) {
  if (S.team < 25) return 'e6';
  if (k === 'A') return 'e1';
  if (k === 'B') return 'e2';
  if (k === 'C') return S.f.jrLeave ? 'e3' : 'e6';
  if (S.f.jcSupport && S.aff.jc >= 60) return 'e4';
  if (S.f.trustLy && S.aff.ly >= 60) return 'e5';
  return 'e2';
}

// ───────── 結局 ─────────
const EG = [
  ['e1', 'END 01', '老闆娘與機關王', '最後選擇 A。'],
  ['e2', 'END 02', '比戀愛更難的是友情', '最後選擇 B。'],
  ['e3', 'END 03', '有些喜歡，不一定要在一起', '讓君葇去追她的夢，最後選 C。'],
  ['e4', 'END 04', '下一場，換我心動', '在駿川開口前支持他、跟他很要好，最後選 D。'],
  ['e5', 'END 05', '最會看戲的人，其實也在戲裡', '一路都相信令萓，最後選 D。'],
  ['e6', 'END 06', '倒了，就重新開始', '讓大家互相猜忌，或只相信自己。'],
  ['et', 'TRUE END', '解我們', '找齊匿名信的五個碎片、讓六個人都留下、保住工作室，打開被鎖住的選項。'],
];
function galleryHTML() {
  const e = endings();
  return `<p class="thread-h">已收集 ${Object.keys(e).length} / 7</p><div class="gal">${EG.map(([k, no, t, h]) => `<div class="${e[k] ? 'got' : ''}"><small>${no}</small><b>${e[k] ? '《' + t + '》' : '？？？'}</b><p>${h}</p></div>`).join('')}</div>`;
}
const END_TEXT = {
  e1: () => [['qr', '「我選 A。」'], '沁蓉選擇了政庾。兩人決定正式交往。', '工作室裡的其他人，也慢慢找到自己的方向。', '君葇沒有和維淪交往，但她答應重新認識他。', '駿川和政庾，成了最尷尬的一對朋友。', ['jc', '「幸好你沒有喜歡我。」'], ['zy', '「……」'], '最後，六個人仍然一起工作。', '只是每次做戀愛密室時，大家都會故意把最難的情侶題，丟給沁蓉和政庾。'],
  e2: () => ['沁蓉沒有選擇任何人。', ['qr', '「政庾，我很珍惜你。」'], ['qr', '「可是現在的我，不想因為一段感情，改變我們所有人的關係。」'], '政庾接受了。維淪也決定停止追君葇。', '六個人最後坐在工作室門口。', ['jc', '「所以我們現在到底是什麼？」'], ['ly', '「同事。」'], ['wl', '「太冷淡了吧。」'], ['jr', '「那就朋友～」'], ['qr', '「那就——」'], '她看著招牌。', ['qr', '「一起把這間工作室做大。」'], '六個人一起把手放在中間。'],
  e3: () => ['君葇最終接受了外面的工作。', '維淪沒有挽留，只是把一封信交給她。', '裡面只有一句話：', ['wl', '「妳去追妳想要的，我追我想要的人。」'], '君葇笑著哭了。她離開了工作室。', '幾個月後，大直工作室推出新的密室。', '其中一間，名字叫《最後一封情書》。', '設計者名單的最後一個名字，是——君葇。', '她離開了，但沒有真的離開這群人。'],
  e4: () => ['駿川決定告訴政庾。', ['jc', '「我喜歡你。」'], '政庾沉默很久。', ['zy', '「對不起」'], ['jc', '「沒關係。」'], '但幾天後，政庾主動找到他。', ['zy', '「我可能不能回答你想要的答案」'], ['zy', '「但我希望你不要因為我而離開」'], '駿川看著他，笑了。', ['jc', '「成交。」'], '兩人的感情沒有真正開始，卻成為一段非常深的友情。', { show: ['jc', 'boy'] }, '後來，駿川在一次密室測試裡，遇到一個新的男生。', '對方解出最後一道題後，對他說：', ['boy', '「你的密室很好玩。」'], '駿川愣住。', ['jc', '「那你要不要再玩第二次？」'], ['boy', '「可以啊。」'], '駿川回頭，對政庾說：', ['jc', '「我走新的路了。」']],
  e5: () => ['因為沁蓉一路都相信令萓，最後她終於說出口。', ['ly', '「匿名信，是我寄的。」'], '她故意把六個人的秘密慢慢攤開。目的不是破壞大家，而是逼所有人面對自己的感情。', ['ly', '「你們都在等別人先說。」'], ['ly', '「可是如果所有人都一直不說，最後就什麼都沒有。」'], ['qr', '「那妳自己的感情呢？」'], '令萓愣了一下。第一次說不出話。', '最後，她笑著說：', ['ly', '「我啊？」'], ['ly', '「可能我也在等一個人。」'], ['ly', '「只是他到現在都不知道。」'], '——沒有人知道，她喜歡的是誰。'],
  e6: () => ['六個人之間的猜忌，已經大到誰都不願意留下。', '投資方撤資。工作室正式關門。', { bg: 'street' }, '六個人站在大直街頭，沒有人說話。', ['jc', '「所以我們現在去哪？」'], ['qr', '「不知道。」'], '五分鐘後，維淪突然開口。', ['wl', '「那我們自己開一家新的。」'], '所有人一起看他。', ['jr', '「蛤？」'], ['wl', '「既然這間倒了，那我們就重新開一間。」'], '畫面最後，六個人開始搬家具。', '新的招牌，慢慢掛了上去。', '《大直愛情摩天輪：第二季》'],
  et: () => [{ show: ['fd'] }, '鎖打開了。', '門口傳來腳步聲。', '真正的寄件人，不是令萓，不是君葇，不是任何一個角色。', '而是——工作室的創辦人。', '他一直在遠端觀察。所有人都嚇了一跳。', ['fd', '「你們知道，我為什麼做這一切嗎？」'], '沒有人回答。他拿出那份最早的企劃書。', ['fd', '「真正好的密室，不是讓玩家解出答案，而是讓玩家離開之後，還一直想著裡面發生過什麼。」'], ['fd', '「你們的愛情也是。沒有標準答案。」'], ['fd', '「所以，我把選擇留給你們。」'], { show: CAST }, '六個人彼此看著。最後，沁蓉笑了。', ['qr', '「那我們繼續做吧。」'], '大家都點頭。', '他們沒有全部配成情侶。', '有人在一起。有人錯過。有人重新認識。有人離開又回來。', '但六個人最終決定：工作室不拆。', '他們要做一個全新的大型密室。名字就叫——《大直愛情摩天輪》。', '第一句宣傳文案是：「歡迎來到一間不能相信任何人的工作室。」', ['jc', '「這不是我們嗎？」'], ['ly', '「對。」'], ['wl', '「那玩家到底要解什麼？」'], '沁蓉看向其他五人，笑著說：', ['qr', '「解我們。」']],
};
let replay = false;
async function ending(code) {
  playing = false;
  const [, no, title] = EG.find(x => x[0] === code);
  AU.bgm(code === 'e6' ? 'sad' : 'end');
  await say([{ bg: code === 'e6' ? 'lounge' : 'night', show: code === 'et' ? [] : ['qr'] }, ...END_TEXT[code]()]);
  unlockEnd(code);
  sfx('end');
  if (!replay) {
    try { window.SD?.clear?.(S.rid, S.t, S.hints, code); } catch (e) {}
    if (!S.hints) ach('lv_nohint');
    if ((S.f.ear || 0) >= 2 && !S.caught) ach('lv_ear');
    if (S.obj >= 3) ach('lv_obj');
    ach('lv_rank');
    try { localStorage.setItem(FK, JSON.stringify(clone(CP))); } catch (e) {}
    clr();
  } else {
    try { window.SD?.clear?.(null, null, 0, code); } catch (e) {}
  }
  if (Object.keys(endings()).length >= 7) ach('lv_all');
  $('#e-no').textContent = no;
  $('#e-title').textContent = `《${title}》`;
  $('#e-body').innerHTML = END_TEXT[code]().filter(x => typeof x === 'string' || Array.isArray(x)).map(x => typeof x === 'string' ? `<p style="margin:0 0 6px">${esc(x)}</p>` : `<p style="margin:0 0 6px"><b style="color:${C[x[0]].c}">${C[x[0]].n}</b>　${esc(x[1])}</p>`).join('');
  $('#e-stat').innerHTML = replay ? `（從最後一封郵件重看的結局，不會列入排行榜）<br>已收集結局 ${Object.keys(endings()).length} / 7`
    : `通關時間 ${fmt(S.t)}・解開謎題 ${solvedN()} / ${TOTAL}・提示 ${S.hints} 次・摩天輪高度：${code === 'et' ? '轉完一整圈' : rank()}<br>匿名信碎片 ${Object.keys(S.frags).length} / 5・工作室凝聚力 ${S.team}<br>已收集結局 ${Object.keys(endings()).length} / 7`;
  window.__ended = code;
  show('end');
  $('#e-body').scrollTop = 0;
}

// ───────── 流程 ─────────
const CH = [null, ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8];
async function run(from) {
  show('game'); playing = true; hud();
  for (let c = from; c <= 8; c++) await CH[c]();
  const code = await finalChoice();
  await ending(code);
}
async function newGame() {
  AU.init(); clr(); replay = false;
  S = fresh(); CP = clone(S);
  try { S.rid = await window.SD?.begin?.(); } catch (e) {}
  run(1);
}
function loadGame() {
  const d = loadSave(); if (!d) return newGame();
  AU.init(); replay = false;
  S = clone(d.cp); Object.assign(S, { solved: d.solved || {}, frags: d.frags || {}, t: d.t || 0, hints: d.hints || 0, wrong: d.wrong || 0, rid: d.rid, caught: d.caught || 0, obj: d.obj || 0 });
  CP = clone(d.cp);
  run(S.ch);
}
async function replayFinal() {
  let cp; try { cp = JSON.parse(localStorage.getItem(FK)); } catch (e) {}
  if (!cp) return;
  AU.init(); replay = true; S = clone(cp); CP = clone(cp);
  S.solved = Object.fromEntries(Object.keys(PZ).map(k => [k, 1]));
  show('game'); playing = false; chTitle = '最後一封郵件'; hud();
  const code = await finalChoice();
  await ending(code);
}

// ───────── 標題畫面 ─────────
function howTo() {
  panel('怎麼玩', `<p>你是<b>沁蓉</b>，大直密室工作室的負責人。這次沒有鬼，只有六個人、三組感情，和一個什麼都知道的匿名帳號。</p>
  <ul><li><b>點畫面</b>繼續對話；右上角 ⏩ 可以快轉。</li>
  <li>📱 <b>手機</b>裡有群組、匿名帳號的貼文、你蒐集到的線索，和每個人對你的好感。</li>
  <li>全劇有 <b>54 道謎題</b>，每解開 7 題，<b>摩天輪</b>就會升高一格（售票口 → 抵達頂點）。</li>
  <li>卡關時按「💡 令萓的小紙條」，會一步一步給提示（會記錄次數）。</li>
  <li>有些畫面可以<b>調查</b>：點可疑的地方。工作室裡藏著<b>五張匿名信的碎片</b>，找齊才有機會看到真結局。</li>
  <li>你的選擇會影響好感和<b>工作室凝聚力</b>，共有 <b>七種結局</b>。</li>
  <li>遊戲會自動存檔。看完一個結局後，可以「回到最後一封郵件」看別的結局。</li></ul>
  <p style="color:#8A7480;font-size:13px">建議遊玩時間：60 分鐘起，難度普通～困難。有音效，建議開聲音。</p>`);
}
function refreshTitle() {
  const d = loadSave();
  $('#bCont').hidden = !d;
  let fk = null; try { fk = localStorage.getItem(FK); } catch (e) {}
  $('#bFinal').hidden = !fk;
  const e = Object.keys(endings()).length;
  $('#t-meta').textContent = d ? `上次玩到第 ${'一二三四五六七八'[(d.cp?.ch || 1) - 1]} 回・已解開 ${Object.keys(d.solved || {}).length} / ${TOTAL} 題` + (e ? `・已收集結局 ${e} / 7` : '') : (e ? `已收集結局 ${e} / 7` : '愛情／心機／職場／友情／背叛／修羅場｜七種結局');
}
function toTitle() { playing = false; ADV = null; $('#choices').hidden = true; $('#modal').hidden = true; $('#exbar')?.remove(); AU.bgm('title'); refreshTitle(); show('title'); }

(function initTitle() {
  $('#t-art').innerHTML = titleArt();
  $('#petals').innerHTML = Array.from({ length: 24 }, (_, i) => `<i style="left:${(i * 37) % 100}%;--dx:${(i % 5 - 2) * 40}px;animation-duration:${8 + (i % 7)}s;animation-delay:${-(i * 1.3) % 12}s"></i>`).join('');
  $('#cast').innerHTML = CAST.map(k => `<figure><img src="${C[k].img}" alt="${C[k].n}">${C[k].n}</figure>`).join('');
  $('#bNew').onclick = () => {
    AU.init(); sfx('click');
    if (loadSave()) {
      const p = panel('重新開始？', `<p>你有一個還沒玩完的進度。重新開始的話，舊的進度會被覆蓋。</p><div class="menu-list"><button id="ynY">重新開始</button><button id="ynN">算了，繼續上次的</button></div>`);
      $('#ynY').onclick = () => { p.hidden = true; newGame(); };
      $('#ynN').onclick = () => { p.hidden = true; loadGame(); };
    } else newGame();
  };
  $('#bCont').onclick = () => { sfx('click'); loadGame(); };
  $('#bFinal').onclick = () => { sfx('click'); replayFinal(); };
  $('#bGal').onclick = () => { AU.init(); sfx('click'); panel('結局圖鑑', galleryHTML()); };
  $('#bHow').onclick = () => { AU.init(); sfx('click'); howTo(); };
  $('#eFinal').onclick = () => { sfx('click'); replayFinal(); };
  $('#eGal').onclick = () => { sfx('click'); panel('結局圖鑑', galleryHTML()); };
  $('#eTitle').onclick = () => { sfx('click'); toTitle(); };
  $('#hPhone').onclick = (e) => { e.stopPropagation(); openPhone(); };
  $('#hFast').onclick = (e) => { e.stopPropagation(); fast = !fast; $('#hFast').classList.toggle('on', fast); sfx('click'); };
  const sndIcon = () => $('#hSnd').textContent = AU.on ? '🔊' : '🔇';
  $('#hSnd').onclick = (e) => { e.stopPropagation(); AU.toggle(); sndIcon(); };
  sndIcon();
  $('#hMenu').onclick = (e) => {
    e.stopPropagation(); sfx('click');
    const p = panel('選單', `<div class="menu-list"><button id="mHow">怎麼玩</button><button id="mGal">結局圖鑑</button><button id="mSnd">音效：${AU.on ? '開' : '關'}</button><button id="mTitle">回到標題（進度會保留在這一回的開頭）</button></div>`);
    $('#mHow').onclick = howTo;
    $('#mGal').onclick = () => panel('結局圖鑑', galleryHTML());
    $('#mSnd').onclick = () => { AU.toggle(); sndIcon(); $('#mSnd').textContent = `音效：${AU.on ? '開' : '關'}`; };
    $('#mTitle').onclick = () => { p.hidden = true; save(); toTitle(); };
  };
  document.addEventListener('pointerdown', () => { AU.init(); if (!AU._t) { AU._t = 1; if ($('#title').classList.contains('on')) AU.bgm('title'); } }, { once: true });
  refreshTitle();
})();

// 連線逾時保護（跟其他密室一樣）
setTimeout(() => {
  const h = document.getElementById('sd-hide');
  if (h && !window.SD) { h.remove(); document.body.innerHTML = '<section class="scr on" style="display:grid;place-items:center;text-align:center;padding:20px"><div><h1 style="font-family:var(--serif)">連線失敗</h1><p>無法確認你的角色，請重新整理，或回到大廳重新進入。</p><button class="btn gold" onclick="location.reload()">重新整理</button> <button class="btn" onclick="toLobby()">回到大廳</button></div></section>'; }
}, 12000);

// 測試用：直接打開某一題
window.__openPZ = (id) => { if (!S) { S = fresh(); CP = clone(S); } return openPuzzle(id, true); };
