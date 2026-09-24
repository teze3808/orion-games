/* Shared tablet workbench. Move existing nodes so game IDs and handlers stay intact. */
(() => {
  const kind = document.body.dataset.mission;
  const main = document.querySelector('main');
  const root = document.querySelector(kind === 'hash' ? '.game' : '.adventure');
  const oldDesk = document.querySelector(kind === 'hash' ? '.console' : '.desk');
  const find = selector => document.querySelector(selector);
  const make = (tag, cls, en, zh) => {
    const node = document.createElement(tag); node.className = cls;
    if (en) { node.dataset.en = en; node.dataset.zh = zh; node.textContent = en; }
    return node;
  };
  document.body.classList.add('play-layout');
  const top = make('section','mission-progress');
  top.dataset.en='Mission progress';top.dataset.zh='任務進度';top.dataset.i18nAttr='aria-label';
  const count = make('strong','progress-count');
  const bar = document.createElement('progress');
  bar.dataset.en='Seals completed';bar.dataset.zh='已解開封印';bar.dataset.i18nAttr='aria-label';
  top.append(count, bar);
  const stageLabel = find(kind === 'cipher' ? '#chapter' : '#stageLabel');
  if (stageLabel) top.append(stageLabel);
  root.before(top);
  const work = make('section','experiment-panel');
  const result = make('section','result-panel');
  root.append(work,result);
  work.append(make('h2','panel-label','Experiment','動手探索'));
  result.append(make('h2','panel-label','Results & discoveries','結果與發現'));
  const move = (selector, target) => { const node=find(selector); if(node)target.append(node); };
  if (kind === 'hash') {
    const story=find('.story');
    const intro=make('section','mission-intro');
    ['.chapter','h1','.intro'].forEach(s=>{const n=story.querySelector(s); if(n)intro.append(n);});
    top.before(intro);
    ['.console-top','#form','.console-foot'].forEach(s=>move(s,work));
    ['#gateState','#status','#treasure','.attempt-heading','#history','.bottom-story'].forEach(s=>move(s,result));
    const art=make('div','gate-art'); art.setAttribute('aria-hidden','true');result.append(art);
    story.remove();
  } else {
    ['#stageTitle','#taskTitle','#mission','#instruction'].forEach(s=>move(s,work));
    if(kind==='cipher') {
      ['.letter','#context','#controls','.hint-area'].forEach(s=>move(s,work));
      ['#preview','#status','#next','#treasure','#notes'].forEach(s=>move(s,result));
    } else if(kind==='levers') {
      ['.instrument','#fixedLoad','.drag-help','#controls','.hint-area'].forEach(s=>move(s,work));
      ['#reading','#feedback','#solutions','#next','#reward','#observations','#notes'].forEach(s=>move(s,result));
    } else if(kind==='binary') {
      ['.target','.console','#answerForm','.hint-area'].forEach(s=>move(s,work));
      ['#reading','#feedback','#next','#reward'].forEach(s=>move(s,result));
      oldDesk.querySelectorAll('details').forEach(n=>result.append(n));
    } else {
      ['#stepGuide','#inspect','#sample','.play-surface','#finishControls','.hint-area'].forEach(s=>move(s,work));
      ['.goal-panel','#feedback','#next','#reward'].forEach(s=>move(s,result));
      const trays=make('div','result-trays');trays.id='resultTrays';result.append(trays);
      oldDesk.querySelectorAll('details').forEach(n=>result.append(n));
    }
    move('.scene',result);
  }
  oldDesk.remove();
  root.className='play-grid';root.append(work,result);
  // Keep the story available without taking the experiment off the first tablet screen.
  const intro=find('.opening') || find('main > .intro');
  if(intro){intro.classList.add('mission-intro');const story=intro.querySelector('p:last-child');
    if(story){const details=make('details','story-disclosure');details.append(make('summary','','Read the story','閱讀故事'),story);intro.append(details);}}
  window.OrionLayout = {
    update(stage, solved, total) {
      const completed=stage+(solved?1:0);bar.max=total;bar.value=completed;
      count.textContent=OrionI18n.t(`Seals opened · ${completed} / ${total}`, `已解開 ${completed} / ${total} 道封印`);
    },
    moveTrays() {
      const trays=find('#vessels .collection-trays');
      if(trays)find('#resultTrays').replaceChildren(trays);
    }
  };
})();
