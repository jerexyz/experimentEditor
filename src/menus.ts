const MENU_TITLES = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

const setTitle = (): Element => {
  const titleEl = document.createElement('div');
  MENU_TITLES.forEach((type) => {
    const childEl = document.createElement(type);
    childEl.className = 'emi-title';
    childEl.innerText = type;
    titleEl.appendChild(childEl);
  });
  titleEl.className = 'em-item';
  return titleEl;
};

export default [setTitle()];
