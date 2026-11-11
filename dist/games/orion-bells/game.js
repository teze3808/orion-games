'use strict';
const byId = id => document.getElementById(id);
const t = OrionI18n.t;
const journeys = [
  [[2,3],[3,4],[4,6]], [[2,5],[4,5],[6,9]],
  [[3,5],[2,6],[6,8]], [[2,4],[5,6],[4,8]],
  [[3,6],[3,8],[5,10]], [[2,7],[4,7],[6,10]]
];
let variant = OrionProgress.variant('bells');
let savedVariant = variant;
let savedTarget = OrionProgress.read().hashTarget;
let stage = 0, minute = 0, hintDepth = 0;
let cluesOpen = false, solved = false, saveFailed = false, message = 'initial';

function firstTogether(a, b) {
  let time = a;
  while (time % b !== 0) time += a;
  return time;
}

function judge(time, a, b) {
  if (time === 0) return 'start';
  if (time % a || time % b) return 'apart';
  return time === firstTogether(a, b) ? 'success' : 'late';
}

function clockName(index) {
  return index === 0 ? t('Silver bell', '銀鐘') : t('Gold bell', '金鐘');
}

function renderClock(period, index) {
  const rings = minute > 0 && minute % period === 0;
  const angle = (minute % period) / period * 360;
  const cycle = t('Every ' + period + ' minutes', '每 ' + period + ' 分鐘');
  const status = rings ? t('Ringing ♫','響起 ♫') : t('At rest','靜止');
  return '<div class="clock ' + (rings ? 'ring' : '') + '"><div aria-hidden="true" class="face" style="--angle:' + angle + 'deg"></div><b>' + clockName(index) + '</b><small>' + cycle + '</small><small>' + (minute ? status : t('Starting chime','起始鐘聲')) + '</small></div>';
}

function renderLog(period, index) {
  const count = Math.floor(minute / period);
  const entries = [];
  for (let n = Math.max(1, count - 4); n <= count; n++) entries.push(n * period);
  const times = entries.length ? entries.join(' · ') : t('Waiting for the next chime','等候下次鐘聲');
  return '<div class="entry"><b>' + clockName(index) + '</b>' + (count > 5 ? '… ' : '') + times + '</div>';
}

function render() {
  const periods = journeys[variant][stage];
  const [a,b] = periods;
  const complete = solved && stage === 2;
  window.OrionDiscovery?.update(complete);
  document.title = t('The Harbour Bell Tower · Orion','海港雙鐘樓 · Orion');
  byId('progress').textContent = t('Locks open','已開啟的鎖') + ' · ' + (stage + Number(solved)) + ' / 3';
  byId('progress').parentElement.classList.toggle('complete',complete);
  byId('stageTitle').textContent = t('Lock ' + (stage+1),'第 '+(stage+1)+' 道鎖');
  byId('clocks').innerHTML = periods.map(renderClock).join('');
  byId('log').innerHTML = periods.map(renderLog).join('');
  byId('minuteLabel').textContent = t('Minute ','第 ') + minute + t('',' 分鐘');
  byId('minute').value = minute;
  byId('minute').disabled = solved;
  byId('back').disabled = solved || minute === 0;
  byId('forward').disabled = solved || minute === 60;
  const messages = {
    initial: t('Slide the clock or step forward one minute.','拖動時間滑桿，或逐分鐘前進。'),
    observe: t('Compare the minutes in the two bell logs.','比較兩個鐘的響鐘時間。'),
    start: t('That was the starting chime. Find the next one they share.','這是起始鐘聲。找出下一次齊鳴的時間。'),
    apart: t('The bells do not both ring here. Move the clock and try again.','兩個鐘在這一分鐘沒有齊鳴。移動時間再試一次。'),
    late: t('Both ring here! Can you find an earlier shared chime after minute 0?','兩個鐘都響了！第 0 分鐘之後還有更早的齊鳴嗎？'),
    success: t('Both bells ring for the first time together after the start. The lock opens!','這是開始後第一次齊鳴。箱鎖打開了！')
  };
  byId('feedback').textContent = messages[message];
  byId('check').hidden = solved;
  byId('next').hidden = !solved || complete;
  byId('hint').hidden = solved;
  byId('hint').setAttribute('aria-label',t('Reveal the next clue','顯示下一個提示'));
  byId('hint').setAttribute('aria-expanded',String(cluesOpen));
  byId('clues').hidden = !cluesOpen;
  const clues = [
    t('Watch a hand go all the way round. Its bell rings each time it gets back to the top.','留意指針轉一整圈。每次指針回到頂端，那個鐘就會響。'),
    t('Count in steps of '+a+' and look for the first number also reached in steps of '+b+'.','以 '+a+' 為一組順數，找出第一個也能以 '+b+' 為一組數到的正整數。'),
    t('Try minute '+firstTogether(a,b)+'.','試試第 '+firstTogether(a,b)+' 分鐘。')
  ];
  byId('hints').innerHTML = clues.slice(0,hintDepth).map(s=>'<li>'+s+'</li>').join('');
  byId('reward').hidden = !complete;
  byId('retrySave').hidden = !saveFailed;
  byId('saved').textContent = saveFailed ? t('You earned the sigil. Saving failed.','你已獲得符印，儲存失敗。') : t('Unison Sigil saved.','已儲存齊鳴符印。');
}

function setMinute(value) {
  if (solved || !Number.isInteger(value) || value < 0 || value > 60) return;
  minute = value;
  message = 'observe';
  render();
}

function resetLock() {
  minute = 0;
  solved = cluesOpen = saveFailed = false;
  hintDepth = 0;
  message = 'initial';
  render();
}

byId('minute').oninput = e => setMinute(Number(e.target.value));
byId('back').onclick = () => setMinute(minute - 1);
byId('forward').onclick = () => setMinute(minute + 1);
byId('check').onclick = () => {
  if (solved) return;
  message = judge(minute, ...journeys[variant][stage]);
  solved = message === 'success';
  if (solved) cluesOpen = false;
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('unison');
  render();
  if (solved && stage < 2) byId('next').focus();
};
byId('next').onclick = () => {
  if (!solved || stage >= 2) return;
  stage++;
  resetLock();
  byId('minute').focus();
};
byId('hint').onclick = () => {
  cluesOpen = true;
  hintDepth = Math.min(3,hintDepth + 1);
  render();
};
function closeClues() {
  cluesOpen = false;
  render();
  byId('hint').focus();
}
byId('close').onclick = closeClues;
window.addEventListener('keydown', e => { if (cluesOpen && e.key === 'Escape') closeClues(); });
byId('retrySave').onclick = () => {
  if (solved && stage === 2) saveFailed = !OrionProgress.earn('unison');
  render();
};
byId('replay').onclick = () => {
  variant = OrionProgress.nextVariant('bells',variant);
  savedVariant = OrionProgress.variant('bells');
  stage = 0;
  resetLock();
};
function syncProgress() {
  const current = OrionProgress.read();
  const next = OrionProgress.variant('bells');
  if (savedVariant !== next || savedTarget !== current.hashTarget) {
    savedVariant = variant = next;
    savedTarget = current.hashTarget;
    stage = 0;
    resetLock();
  } else render();
}
window.addEventListener('storage', e => {
  if (e.key === null || e.key === 'orion-expedition-progress-v1') syncProgress();
});
window.addEventListener('pageshow',syncProgress);
window.addEventListener('orion-language',render);
OrionI18n.apply();
