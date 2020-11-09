import styles from './editor.scss';
import DomNodeCollection from './nodeCollection';
import menus from './menus';
import { setStyle } from './utils';

type Options = {
  style: {
    height: sting;
  };
};
export default class Editor {
  private _editorRoot: DomNodeCollection;
  constructor(domRoot: string, opts: Options) {
    // 保持样式引用
    this.styles = styles;

    this._editorRoot = new DomNodeCollection(
      document.querySelectorAll(domRoot),
    );
    this._editorRoot.addClass('editor');
    if (!this._editorRoot) {
      throw new Error('edit root must be id or class name like:.hello #hello');
      return;
    }
    this.initMenuContainer();
    this.initEditorContainer(opts);
  }

  initMenuContainer(): void {
    const menuEl = document.createElement('div');
    const menuID = `editor_menus_${Math.random()}`;
    menuEl.className = 'editor-menus';
    menuEl.setAttribute('id', menuID);
    menus.forEach((menuItem) => {
      menuEl.appendChild(menuItem);
    });

    const menuNode = new DomNodeCollection([menuEl]);

    this._editorRoot.append(menuNode);
    requestAnimationFrame(() => {
      document.getElementById(menuID).addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          const nodeName = e.target.nodeName;
          const result = document.execCommand('formatBlock', false, '<h1>');
          console.log(result);
        },
        false,
      );
    });
  }

  initEditorContainer(opts: Options): void {
    const editorContainer = document.createElement('div');
    this._editorContainer = editorContainer;
    editorContainer.setAttribute('id', 'test');
    editorContainer.setAttribute('contenteditable', true);
    editorContainer.className = 'editor-container';
    setStyle(editorContainer, opts.style);

    this._editorRoot.append(editorContainer);
  }
}
