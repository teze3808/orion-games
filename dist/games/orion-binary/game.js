'use strict';
const $ = id => document.getElementById(id), t = OrionI18n.t;
const weights = [8, 4, 2, 1];
const stages = [
  {title: ['Wake the first platform', '喚醒第一座平台'], target: 5,
   mission: ['Tap the lamps and watch the reading change. Make the reading match the gate’s request, then send your signal.', '點按星燈，觀察讀數如何改變。讓讀數符合星門的要求，再傳送訊號。']},
  {title: ['Across the dark bridge', '穿越暗夜之橋'], target: 10,
   mission: ['The live meter has gone dark. Use what you discovered to send the requested number. The gate will report the value it received.', '即時讀數熄滅了。運用剛才的發現，傳送指定的數字。星門會告訴你收到的數值。']},
  {title: ['The tower replies', '高塔的回信'], target: 13,
   mission: ['The tower has set the lamps. Read this fixed pattern and tell the keeper which ordinary number it represents.', '高塔已設定星燈。讀取這個固定圖案，告訴守星者它代表哪個日常使用的數字。']}
];
let stage = 0, bits = [0, 0, 0, 0], solved = false, hintDepth = 0;
let feedback = '', lastValue = null, history = [], saveFailed = false;
let observedTarget = OrionProgress.read().hashTarget;
function valueOf(pattern) { return pattern.reduce((sum, bit, i) => sum + bit * weights[i], 0); }
function validPattern(pattern) { return Array.isArray(pattern) && pattern.length === 4 && pattern.every(bit => bit === 0 || bit === 1); }
function hints() {
  return [
    [t('Try one lamp at a time. Compare its engraved number with the reading.', '試試每次只開一盞燈，比較燈上的數字和讀數。'),
     t('Only lit lamps contribute to the total. Can you split 5 into two lamp values?', '只有亮燈的數值會加入總數。你能把 5 分成兩盞燈的數值嗎？'),
     t('Light 4 and 1; leave 8 and 2 off. Send 0101.', '開啟 4 和 1，關掉 8 和 2。傳送 0101。')],
    [t('The rules are the same even with the live meter hidden.', '即使即時讀數隱藏了，規則仍然相同。'),
     t('Start with the largest lamp value that fits inside 10. What is left?', '先選不超過 10 的最大燈值。還差多少？'),
     t('Light 8 and 2; leave 4 and 1 off. Send 1010.', '開啟 8 和 2，關掉 4 和 1。傳送 1010。')],
    [t('A 1 means that lamp is on; a 0 means it is off.', '1 表示燈開著，0 表示燈關掉。'),
     t('Read positions from left to right: 8, 4, 2, 1. Add only the lit positions.', '從左至右的位值是 8、4、2、1。只把亮燈位置的數值相加。'),
     t('The signal 1101 means 8 + 4 + 1. Enter 13.', '訊號 1101 表示 8 + 4 + 1。輸入 13。')]
  ][stage];
}
function render() {
  document.title = t('The Starlight Tower · Orion’s Expedition', '星燈塔 · Orion 的探險');
  $('stageLabel').textContent = t(`SIGNAL ${stage + 1} OF 3 · COMPUTING`, `第 ${stage + 1} 個訊號，共 3 個 · 電腦科學`);
  $('stageTitle').textContent = t(...stages[stage].title);
  $('mission').textContent = t(...stages[stage].mission);
  $('targetLabel').textContent = stage === 2 ? t('Incoming pattern', '收到的圖案') : t('The gate requests', '星門要求');
  $('targetValue').textContent = stage === 2 ? bits.join('') : String(stages[stage].target);
  $('consoleTitle').textContent = stage === 2 ? t('Received signal · lamps are fixed', '收到的訊號 · 星燈已固定') : t('Your signal · tap a lamp to change it', '你的訊號 · 點按星燈來改變狀態');
  weights.forEach((weight, i) => {
    const lamp = $('lamp' + i), on = bits[i] === 1;
    lamp.setAttribute('aria-pressed', String(on));
    lamp.setAttribute('aria-label', t(`Lamp worth ${weight}: ${on ? 'on' : 'off'}, bit ${bits[i]}`, `燈值 ${weight}：${on ? '開' : '關'}，位元 ${bits[i]}`));
    lamp.disabled = solved || stage === 2;
    $('bit' + i).textContent = String(bits[i]);
    $('state' + i).textContent = on ? t('ON', '開') : t('OFF', '關');
  });
  $('reading').textContent = stage === 0 ? t(`Live reading: ${valueOf(bits)}`, `即時讀數：${valueOf(bits)}`) : stage === 1 ? t('Live meter covered — send a signal to test it.', '即時讀數已遮蓋 — 傳送訊號來測試。') : t('Read the lit lamps to decode the reply.', '讀取亮著的星燈，解開回信。');
  $('decode').hidden = stage !== 2;
  $('answerForm').hidden = solved;
  $('submit').textContent = stage === 2 ? t('Tell the keeper', '告訴守星者') : t('Send the signal', '傳送訊號');
  const messages = {
    invalid: t('Enter a whole number from 0 to 15 using digits only.', '請只用數字輸入 0 至 15 的整數。'),
    invalidPattern: t('The lamps need four on/off states. Explore the lamps again.', '星燈需要四個開／關狀態。請重新探索星燈。'),
    wrong: stage === 2 ? t('That number does not match the lit lamps. Compare the positions and try again.', '這個數字與亮燈不符。比較各個位置，再試一次。') : t(`The gate received ${lastValue}. It needs ${stages[stage].target}. Adjust the lamps and try again.`, `星門收到 ${lastValue}，它需要 ${stages[stage].target}。調整星燈，再試一次。`),
    solved: t(`Signal accepted: ${bits.join('')} represents ${stages[stage].target}. A platform rises!`, `訊號獲接納：${bits.join('')} 代表 ${stages[stage].target}。平台升起了！`),
    complete: t('Decoded! 1101 represents 13. The star gate opens to the night sky.', '解開了！1101 代表 13。星門向夜空敞開。')
  };
  $('feedback').textContent = messages[feedback] || '';
  $('next').hidden = !solved || stage === 2;
  $('next').textContent = stage === 0 ? t('Cross to the second platform →', '走向第二座平台 →') : t('Listen for the tower’s reply →', '聆聽高塔的回信 →');
  const complete = solved && stage === 2;
  $('reward').hidden = !complete; $('notes').hidden = !complete;
  $('scene').classList.toggle('complete', complete);
  $('sceneStatus').textContent = complete ? t('A path of starlight is yours.', '星光之路為你開啟。') : t('Four lamps. A language of light.', '四盞星燈，光的語言。');
  $('seals').textContent = stages.map((_, i) => i < stage || (i === stage && solved) ? '✦' : '◇').join(' ');
  $('hints').hidden = hintDepth === 0;
  $('hints').innerHTML = hints().slice(0, hintDepth).map(h => `<li>${h}</li>`).join('');
  $('hint').disabled = hintDepth === 3;
  $('hint').setAttribute('aria-expanded', String(hintDepth > 0));
  $('hint').setAttribute('aria-label', t('Reveal the next clue', '顯示下一個提示'));
  $('log').innerHTML = history.length ? history.map(h => `<li>${h.pattern} — ${h.decode ? t(`your answer: ${h.answer}`, `你的答案：${h.answer}`) : t(`gate received: ${h.value}`, `星門收到：${h.value}`)} · ${h.ok ? t('accepted', '獲接納') : t('try again', '再試一次')}</li>`).join('') : `<li>${t('Your signals will appear here.', '你的訊號會顯示在這裡。')}</li>`;
  $('retrySave').hidden = !saveFailed;
  $('saveStatus').textContent = saveFailed ? t('Sigil earned, but this browser could not save it. Try saving again.', '已獲得符印，但瀏覽器無法儲存。請再次嘗試儲存。') : OrionProgress.has('starlight') ? t('Starlight Sigil saved in your collection.', '星光符印已存入你的收藏。') : '';
}
function toggleLamp(i) {
  if (solved || stage === 2 || !Number.isInteger(i) || i < 0 || i > 3) return;
  bits[i] = 1 - bits[i]; feedback = ''; render();
}
function submitSignal() {
  if (solved) return;
  if (!validPattern(bits)) { feedback = 'invalidPattern'; render(); return; }
  const raw = $('answer').value.trim();
  if (stage === 2 && (!/^\d{1,2}$/.test(raw) || Number(raw) > 15)) {
    feedback = 'invalid'; render(); return;
  }
  lastValue = valueOf(bits);
  const answer = stage === 2 ? Number(raw) : lastValue;
  const ok = answer === stages[stage].target;
  history.unshift({pattern: bits.join(''), value: lastValue, answer, decode: stage === 2, ok});
  history = history.slice(0, 10);
  if (ok) {
    solved = true; feedback = stage === 2 ? 'complete' : 'solved';
    if (stage === 2) saveFailed = !OrionProgress.earn('starlight');
  } else feedback = 'wrong';
  render();
  if (solved && stage < 2) $('next').focus();
}
function resetStage() {
  bits = stage === 2 ? [1, 1, 0, 1] : [0, 0, 0, 0];
  solved = false; hintDepth = 0; feedback = ''; lastValue = null; history = []; saveFailed = false;
  $('answer').value = ''; $('notes').open = false; render();
}
function resetMission() { stage = 0; resetStage(); }
weights.forEach((_, i) => $('lamp' + i).addEventListener('click', () => toggleLamp(i)));
$('answerForm').addEventListener('submit', event => { event.preventDefault(); submitSignal(); });
$('next').onclick = () => { if (!solved || stage === 2) return; stage++; resetStage(); $(stage === 2 ? 'answer' : 'lamp0').focus(); };
$('hint').onclick = () => { hintDepth = Math.min(3, hintDepth + 1); render(); };
$('replay').onclick = () => { resetMission(); $('lamp0').focus(); };
$('retrySave').onclick = () => { saveFailed = !OrionProgress.earn('starlight'); render(); };
function syncProgress() {
  const target = OrionProgress.read().hashTarget, reset = target !== observedTarget && !OrionProgress.has('starlight');
  observedTarget = target;
  if (reset || (solved && stage === 2 && !OrionProgress.has('starlight') && !saveFailed)) resetMission(); else render();
}
window.addEventListener('orion-language', render);
window.addEventListener('storage', e => { if (e.key === 'orion-expedition-progress-v1' || e.key === null) syncProgress(); });
window.addEventListener('pageshow', syncProgress);
resetMission(); OrionI18n.apply();
