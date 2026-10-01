/* Post-play discoveries: no answers before completion, no external video or storage. */
(() => {
  'use strict';
  const lessons = {
    light: {
      title: ['Light colours add together!', '光的顏色可以相加！'],
      steps: [
        ['🔴 + 🟢 → 🟡', 'Red and green light shining on the same white screen can look yellow. You discovered a new colour by adding light!', '紅光和綠光照在同一片白色屏幕上，可以看起來是黃色。加上光，就發現新顏色！'],
        ['🔴 + 🔵 → 🟣 · 🟢 + 🔵 → 🩵', 'The other pairs make magenta and cyan. Switching one lamp off changes the mixture again.', '另外兩種配搭會產生洋紅和青色。關掉一盞光燈，混合結果又會改變。'],
        ['🔴 + 🟢 + 🔵 → ⚪', 'With the three lights balanced, red, green and blue together look white. With every lamp off, the screen is dark.', '三種光強度配合時，紅、綠、藍一起會看起來是白色。全部關掉，屏幕就變暗。']
      ],
      takeaway: ['This is additive colour mixing: adding light. Screens use red, green and blue light too. Paint and ink mix differently. Our virtual lamps have fixed strengths; real colours depend on the lamps and surface.', '這叫加色混合：把光相加。顯示屏也會用紅、綠、藍光。顏料和墨水的混合方式不同。虛擬光燈強度固定；真實顏色會受光燈和表面影響。'],
      question: ['All three lamps are on. If you switch off blue, what colour will remain?', '三盞光燈都開着。如果關掉藍光，會留下甚麼顏色？']
    },
    sort: {
      title: ['Compare, swap, put in order!', '比較、交換、排好次序！'],
      steps: [
        ['3  1  2 → 1  3  2', 'Example: smallest first. Compare the numbers. Swap 3 and 1 to put the smallest at the left.', '例子：由小到大。比較數字，把 3 和 1 交換，讓最小的在左邊。'],
        ['1  3  2 → 1  2  3', 'Now swap 3 and 2. Read every neighbouring pair: the numbers never go down. Sorted!', '再把 3 和 2 交換。逐對看相鄰數字，數字沒有變小。排好了！'],
        ['1  1  2  3   ↔   3  2  1  1', 'Equal values may stay together. A largest-first rule changes the direction. The rule tells us which order to use.', '相同數值可以並排。如果規則是由大到小，方向就反過來。規則告訴我們該用哪種次序。']
      ],
      takeaway: ['Sorting arranges a list by a rule. Computers follow step-by-step sorting methods called algorithms. This game lets you choose your own swaps; you do not need to find the fewest moves.', '排序把一列資料按規則排列。電腦會按照逐步的方法排序，這些方法叫演算法。本遊戲讓你自己選擇交換方法，不需要追求最少步數。'],
      question: ['To arrange books from shortest to tallest, which book would you put at the left first?', '要把書本由矮到高排列，你會先把哪本放在最左邊？']
    },
    water: {
      title: ['Different forms, still water!', '形態不同，仍然是水！'],
      steps: [
        ['❄ → 💧 → · · ·', 'Warmth can melt ice into liquid water and help water evaporate into a gas. Evaporation can happen without boiling.', '加暖可以讓冰融化成液態水，也能幫助水蒸發成氣體。不沸騰也能蒸發。'],
        ['· · · → 💧 → ❄', 'Cooling water vapour can make liquid water: condensation. Cooling liquid water enough makes ice: freezing.', '冷卻水蒸氣可以變回液態水，叫凝結。液態水冷卻到足夠程度會結冰，叫凝固。'],
        ['❄ = H₂O    💧 = H₂O', 'The form changes, but the substance is still water. Water vapour is invisible; our dots are only a model.', '形態改變了，但物質仍然是水。水蒸氣看不見；圓點只是模型。']
      ],
      takeaway: ['Ice is solid, water can be liquid, and water vapour is gas. Real changes take time. Clouds contain tiny liquid droplets or ice crystals, not visible water vapour.', '冰是固態，水可以是液態，水蒸氣是氣態。真實變化需要時間。雲含有微小水滴或冰晶，不是看得見的水蒸氣。'],
      question: ['Water drops appear on the outside of a cold glass. Did they come through the glass, or from water vapour in the air?', '冷杯外面出現水珠。它們穿過杯子而來，還是來自空氣中的水蒸氣？']
    },
    logic: {
      title: ['Little rules can make big decisions!', '小規則，也能作出大決定！'],
      steps: [
        ['A ✓ + B ✓ → AND ✓', 'AND means both. The bridge opens only when A and B are both present.', 'AND（且）表示兩者都要有。只有 A 和 B 都在，橋才打開。'],
        ['A ✓ or B ✓ → OR ✓', 'OR means at least one. A alone works, B alone works, and both together work too!', 'OR（或）表示至少一個。只有 A、只有 B，或兩個都有，都可以！'],
        ['A ✓ → NOT ✕    A ✕ → NOT ✓', 'NOT turns one answer around. If A is present the bridge closes; if A is absent it opens.', 'NOT（非）把一個答案反轉。有 A 就關橋，沒有 A 就開橋。']
      ],
      takeaway: ['Computers use true and false rules to make decisions. In this game a gem is either present or absent. Your test rows are a truth table: evidence for every possible input.', '電腦會用真和假的規則作決定。遊戲中的寶石只有「有」和「沒有」兩種狀態。你的測試紀錄就是「真值表」：記下每個可能輸入的結果。'],
      question: ['A door needs a ticket AND a key. Would a key by itself be enough?', '一道門需要門票「且」需要鑰匙。只有鑰匙夠不夠？']
    },
    hash: {
      title: ['Different codes, same little label!', '不同密碼，相同小標籤！'],
      steps: [
        ['1234 → 1 + 2 + 3 + 4 → 10 → 0', 'Example: add the four digits. Keep only the last digit of the total: 0.', '例子：把四個數字相加，只留下總和的個位數：0。'],
        ['4321 → 4 + 3 + 2 + 1 → 10 → 0', 'Swap the digits around. This different code also gets the label 0!', '把數字次序調換。這組不同的密碼也得到標籤 0！'],
        ['1234 ≠ 4321     0 = 0', 'Different inputs with the same hash are a collision. Using the same code twice does not count.', '不同輸入得到相同雜湊值，就叫「碰撞」。重複同一組密碼不算碰撞。']
      ],
      takeaway: ['A hash is a label made by a rule. This gate checks the label, so more than one code can open it. Our tiny teaching hash is not a safe real lock.', '雜湊值是按照規則算出的小標籤。大門只檢查標籤，所以不止一組密碼能開門。這個簡單的教學雜湊不能保護真正的門鎖。'],
      question: ['Can you find two different codes whose digits add to the same total?', '你能找出兩組不同密碼，讓數字相加的總和一樣嗎？']
    },
    cipher: {
      title: ['A wheel can hide a message!', '轉輪可以把訊息藏起來！'],
      steps: [
        ['A B C D E F …', 'Example: set a shift of 3. Every letter moves forward three places.', '例子：設定移動 3 格。每個字母都向前移動三個位置。'],
        ['A → D     B → E     C → F', 'Use the same shift for every letter. ABC becomes DEF.', '每個字母都移動相同格數。ABC 就變成 DEF。'],
        ['D → A     E → B     F → C', 'To read the secret, move back three places. After Z, the wheel wraps around to A.', '要讀出秘密，就往回移動三格。轉輪上的 Z 之後會接回 A。']
      ],
      takeaway: ['This is a Caesar cipher: a shared letter-shifting rule. It is fun for puzzles, but easy to try all the shifts, so it cannot protect real secrets.', '這叫「凱撒密碼」：大家共用一個移動字母的規則。它適合解謎，但別人很容易試完所有格數，所以不能保護真正的秘密。'],
      question: ['With a shift of 1, what does Z become?', '向前移動 1 格，Z 會變成甚麼？']
    },
    binary: {
      title: ['On and off can tell a number!', '亮與暗，也能說出數字！'],
      steps: [
        ['8     4     2     1', 'Each lamp has a value. From left to right: 8, 4, 2, 1.', '每盞燈都有數值。由左至右是 8、4、2、1。'],
        ['○     ●     ○     ●', 'Example: turn on the lamps worth 4 and 1. Their total is 5.', '例子：點亮數值 4 和 1 的燈，加起來就是 5。'],
        ['0     1     0     1   =   5', 'Write 1 for on and 0 for off. That makes the binary number 0101.', '亮燈寫 1，熄燈寫 0，就得到二進制數字 0101。']
      ],
      takeaway: ['Binary uses only 0 and 1. The position tells you each 1’s value. Add the values of the lit lamps to read the number.', '二進制只用 0 和 1。位置決定每個 1 的數值。把亮燈的數值加起來，就能讀出數字。'],
      question: ['What total would you get if all four lamps were on?', '如果四盞燈全部亮起，總和會是多少？']
    },
    levers: {
      title: ['Distance helps a small load balance!', '距離能幫小砝碼取得平衡！'],
      steps: [
        ['2 × 3     ▲     3 × 1', 'Example: two blocks sit three spaces left of the pivot. Three blocks sit one space right.', '例子：左邊兩個砝碼離支點三格；右邊三個砝碼離支點一格。'],
        ['6     ▲     3', 'Compare blocks × distance. The left turning effect is 6; the right is only 3. Left tips down.', '比較「砝碼數量 × 距離」。左邊轉動作用是 6，右邊只有 3，左邊會下沉。'],
        ['2 × 3  =  3 × 2', 'Move the right load out to two spaces. Both sides now make 6, so the beam stays level.', '把右邊砝碼移到離支點兩格。兩邊都得到 6，橫樑就保持水平。']
      ],
      takeaway: ['Both weight and distance matter! A lighter load farther from the pivot can balance a heavier load closer in. Our game uses identical blocks and ignores the beam’s weight.', '重量和距離都重要！較輕的砝碼放遠一點，也能平衡靠近支點的重砝碼。遊戲使用相同砝碼，並忽略橫樑本身的重量。'],
      question: ['If you use fewer blocks, should you move them closer to the pivot or farther away?', '如果減少砝碼，要把它們移近支點，還是移遠一點？']
    },
    mixtures: {
      title: ['Choose a tool for each material!', '按材料特性，選出合適工具！'],
      steps: [
        ['🧲  ←  Fe', 'A magnet attracts the iron in our sample. The sand stays behind.', '磁鐵會吸走樣本中的鐵，沙則留下。'],
        ['🪨  │  💧 →', 'A paper filter catches sand. Water and dissolved salt pass through together.', '濾紙截留沙。水和已溶解的鹽會一起穿過濾紙。'],
        ['💧 ↑     ◇', 'When water evaporates into the air, salt stays behind. The water has changed place, not vanished!', '水蒸發進入空氣後，鹽會留下。水只是去了別處，沒有消失！']
      ],
      takeaway: ['Different materials behave differently. That lets us separate a mixture. A filter cannot catch dissolved salt. These are pretend experiments; real separation may be incomplete.', '不同材料有不同特性，讓我們能把混合物分開。濾紙不能截留已溶解的鹽。這是虛擬實驗；真實的分離未必完全。'],
      question: ['Why would filtering salty water still leave you with salty water?', '為甚麼鹽水經過濾紙後，仍然是鹽水？']
    },
    seeds: {
      title: ['Sprouting and growing need different things!', '發芽和長大，需要的條件不一樣！'],
      steps: [
        ['🫘 + 💧 → 🌱', 'In our bean model, a moist seed can sprout with suitable warmth and air. A dry seed cannot sprout.', '在這個豆類模型中，種子在濕潤、溫暖且有空氣的環境能發芽；乾燥的種子不能發芽。'],
        ['🌱 + ☀ → 🌿', 'A bean can start sprouting in darkness using stored food. Later, its leaves need light to make food and grow healthily.', '豆子能靠儲存的養分在黑暗中開始發芽。之後，葉子需要光來製造養分，才能健康生長。'],
        ['A: 💧 ☀     B: 💧 ☾', 'To test light fairly, change only the light. Keep moisture, warmth, starting age and time the same.', '要公平比較光的影響，就只改變光照，保持濕度、溫度、起始生長階段和時間相同。']
      ],
      takeaway: ['A fair test changes one thing at a time. Our beans show that starting to sprout is different from growing healthy leaves. Other kinds of seeds can have different needs.', '公平測試每次只改變一個條件。豆子的例子告訴我們：開始發芽和長出健康葉子並不一樣。其他種類的種子，需求可能不同。'],
      question: ['If you change both water and light, can you tell which one caused the result?', '如果同時改變水分和光照，你能知道是哪一個造成結果嗎？']
    },
    mist: {
      title: ['Each clue can shrink the search!', '每個提示，都能縮小搜尋範圍！'],
      steps: [
        ['1  2  3  [4]  5  6  7  8', 'Example: a boat is in cave 6. You do not know that yet! Start near the middle: cave 4.', '例子：船藏在洞穴 6，但你還不知道！先從中間附近的洞穴 4 開始。'],
        ['×  ×  ×  ×  5  6  7  8', 'The clue says “higher than 4”. You can rule out 1, 2, 3 and 4 together.', '提示說「比 4 大」。你可以一次排除 1、2、3、4。'],
        ['5  [6 ⚓]  7  8', 'Try the middle of what remains. Cave 6 finds the boat in this example!', '再試剩餘範圍的中間附近。這個例子在洞穴 6 就找到船了！']
      ],
      takeaway: ['This strategy is called binary search. When numbers are in order, checking the middle lets a higher/lower clue remove about half the choices.', '這個方法叫「二分搜尋」。數字依次排列時，檢查中間位置，就能利用「更大／更小」提示排除大約一半選項。'],
      question: ['Why might a middle cave give you more useful information than the very first cave?', '為甚麼先試中間的洞穴，通常比先試第一個更有幫助？']
    },
    circuits: {
      title: ['A lamp needs a complete loop!', '燈需要一條完整迴路！'],
      steps: [
        ['+ ── / ── 💡 ── −', 'An open switch leaves a gap. With no complete path through the lamp, it stays off.', '斷開的開關留下缺口。經過燈的通路不完整，燈就不會亮。'],
        ['+ ────── 💡 ── −', 'Close the switch. The path now goes from one battery terminal through the lamp to the other terminal.', '閉合開關後，通路從電池一端經過燈，接回另一端。'],
        ['A → 💡     B → 💡     C → A + B', 'A and B control separate branches. The shared switch C can interrupt both branches at once.', 'A 和 B 各自控制一條支路。共用開關 C 可以同時切斷兩條支路。']
      ],
      takeaway: ['Follow the whole path, not just the switch beside a lamp. A branch can work while another is open, but a gap in their shared path stops both. This game shows on/off, not brightness.', '要檢查整條通路，不只看燈旁的開關。一條支路斷開，另一條仍可接通；但共用通路斷開，兩盞燈都會熄滅。遊戲只模擬亮或暗，不模擬亮度。'],
      question: ['Which switch would you use to turn off both lamps together?', '你會用哪個開關，同時關掉兩盞燈？']
    }
  };
  const lesson = lessons[document.body.dataset.mission];
  if (!lesson) return;
  const t = (...pair) => OrionI18n.t(...pair);
  const dialog = document.createElement('dialog');
  dialog.id = 'discoveryDialog'; dialog.className = 'discovery-dialog';
  dialog.setAttribute('aria-labelledby', 'discoveryTitle');
  dialog.innerHTML = `<div class="discovery-toolbar"><span id="discoveryBadge"></span><button type="button" id="discoveryLanguage"></button><button type="button" id="discoveryClose"></button></div>
    <h2 id="discoveryTitle" tabindex="-1"></h2><p id="discoveryIntro"></p>
    <div class="discovery-animation"><div id="discoveryPicture" aria-hidden="true"></div><p id="discoveryCaption" aria-live="polite" aria-atomic="true"></p></div>
    <div class="discovery-controls"><button type="button" id="discoveryPrevious"></button><span id="discoveryStep"></span><button type="button" id="discoveryNext"></button><button type="button" id="discoveryPlay"></button></div>
    <h3 id="discoveryIdeaLabel"></h3><p id="discoveryIdea"></p><aside><strong id="discoveryQuestionLabel"></strong><p id="discoveryQuestion"></p></aside>
    <div class="discovery-actions"><button type="button" id="discoveryDone"></button><a href="../../" id="discoveryMap"></a></div>`;
  document.body.append(dialog);
  const $ = id => document.getElementById(id);
  const reopen = document.createElement('button');
  reopen.type = 'button'; reopen.className = 'discovery-reopen'; reopen.hidden = true;
  reopen.setAttribute('aria-haspopup', 'dialog'); reopen.setAttribute('aria-controls', dialog.id);
  (document.querySelector('.result-panel') || document.querySelector('main')).append(reopen);
  let complete = false, step = 0, timer = null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function stop() { clearTimeout(timer); timer = null; }
  function paint() {
    $('discoveryBadge').textContent = t('DISCOVERY UNLOCKED', '解開新知識');
    $('discoveryLanguage').textContent = t('繁體中文', 'English');
    $('discoveryLanguage').setAttribute('aria-label', t('Read in Traditional Chinese', '以英文閱讀'));
    $('discoveryClose').textContent = t('Close ×', '關閉 ×');
    $('discoveryTitle').textContent = t(...lesson.title);
    $('discoveryIntro').textContent = t('You solved the mystery. Here is the idea you explored!', '你解開了謎團！一起看看剛才探索的知識吧！');
    if ($('discoveryPicture').textContent !== lesson.steps[step][0]) {
      const frame = document.createElement('span'); frame.className = 'discovery-frame';
      frame.textContent = lesson.steps[step][0]; $('discoveryPicture').replaceChildren(frame);
    }
    $('discoveryCaption').textContent = t(...lesson.steps[step].slice(1));
    $('discoveryStep').textContent = t(`Step ${step + 1} of 3`, `第 ${step + 1} 步，共 3 步`);
    $('discoveryPrevious').textContent = t('← Back', '← 上一步');
    $('discoveryNext').textContent = t('Next →', '下一步 →');
    $('discoveryPrevious').disabled = step === 0; $('discoveryNext').disabled = step === 2;
    $('discoveryPlay').textContent = timer !== null ? t('Pause', '暫停') : t('▶ Play again', '▶ 再看一次');
    $('discoveryIdeaLabel').textContent = t('The big idea', '記住這個小秘密');
    $('discoveryIdea').textContent = t(...lesson.takeaway);
    $('discoveryQuestionLabel').textContent = t('Wonder about it…', '想一想……');
    $('discoveryQuestion').textContent = t(...lesson.question);
    $('discoveryDone').textContent = t('Got it · back to the game', '明白了 · 返回遊戲');
    $('discoveryMap').textContent = t('Choose another mission →', '選擇另一個任務 →');
    reopen.textContent = t('✧ See what you discovered', '✧ 重看我的發現');
  }
  function tick() {
    timer = setTimeout(() => { timer = null; if (!dialog.open) return; step++; if (step < 2) tick(); paint(); }, 7000);
  }
  function open() {
    if (!complete || dialog.open) return;
    stop(); step = 0; dialog.showModal();
    if (!reduced.matches) tick();
    paint(); $('discoveryTitle').focus();
  }
  function close() { stop(); dialog.close(); if (complete) reopen.focus(); }
  $('discoveryClose').onclick = $('discoveryDone').onclick = close;
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('close', () => { stop(); paint(); });
  $('discoveryPrevious').onclick = () => { stop(); step = Math.max(0, step - 1); paint(); };
  $('discoveryNext').onclick = () => { stop(); step = Math.min(2, step + 1); paint(); };
  $('discoveryPlay').onclick = () => { if (timer !== null) stop(); else { step = 0; tick(); } paint(); };
  $('discoveryLanguage').onclick = () => OrionI18n.set(OrionI18n.lang === 'en' ? 'zh-Hant' : 'en');
  reopen.onclick = open;
  window.addEventListener('orion-language', paint);
  reduced.addEventListener('change', () => { if (reduced.matches) { stop(); paint(); } });
  window.OrionDiscovery = {
    update(value) {
      const wasComplete = complete; complete = Boolean(value); reopen.hidden = !complete;
      if (!complete) { stop(); if (dialog.open) dialog.close(); }
      else if (!wasComplete) queueMicrotask(open);
    }
  };
  paint();
})();
