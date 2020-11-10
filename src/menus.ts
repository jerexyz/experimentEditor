const MENU_TITLES = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4',
  H5: 'H5',
  H6: 'H6',
  p: '正文',
};

const COLORS = ['#66CCCC', '#CCFF66', '#FF99CC', '#FF9900', '#FF0033'];

const setTitle = (): Element => {
  const titleGroupEl = document.createElement('div');
  for (const type in MENU_TITLES) {
    const childEl = document.createElement(type);
    childEl.className = 'em-group-item';
    childEl.innerText = MENU_TITLES[type];
    childEl.dataset.cmd = 'formatBlock';
    titleGroupEl.appendChild(childEl);
  }
  titleGroupEl.className = 'em-group';
  return titleGroupEl;
};

const setBold = (): Element => {
  const boldGroupEl = document.createElement('div');
  boldGroupEl.className = 'em-group';
  const boldEl = document.createElement('p');
  boldEl.className = 'em-group-item';
  boldEl.dataset.cmd = 'bold';
  boldEl.innerText = '加粗';
  boldGroupEl.appendChild(boldEl);
  return boldGroupEl;
};

const setColor = (): Element => {
  const colorGroupEl = document.createElement('div');
  colorGroupEl.className = 'em-group';
  colorGroupEl.style.padding = '0';
  for (const color of COLORS) {
    const colorEl = document.createElement('div');
    colorEl.style.backgroundColor = color;
    colorEl.className = 'em-group-item';
    colorEl.dataset.cmd = 'foreColor';
    colorEl.dataset.color = color;
    colorGroupEl.appendChild(colorEl);
  }
  return colorGroupEl;
};

export default [setTitle(), setBold(), setColor()];
