import DomNodeCollection from './DomNodeCollection';
import menus from './menus/menus';
import { setStyle } from './utils';

type Options = {
  style: {
    height: sting;
  };
};
export default class Editor {
  private _editorRoot: DomNodeCollection;
  constructor(domRoot: string, opts: Options) {
    this._editorRoot = new DomNodeCollection(
      document.querySelectorAll(domRoot),
    );
    if (!this._editorRoot) {
      throw new Error('edit root must be id or class name like:.hello #hello');
      return;
    }
    this.initMenuContainer();
    this.initEditorContainer(opts);
  }

  initMenuContainer(): void {
    const menuEl = document.createElement('div');
    setStyle(menuEl, { height: '20px', display: 'flex' });
    const menuNode = new DomNodeCollection([menuEl]);
    menuNode.append(menus);
    menuNode.on('click', (...args) => {
      console.log(args);
    });
    this._editorRoot.append(menuNode);
  }

  initEditorContainer(opts: Options): void {
    const editorContainer = document.createElement('div');
    editorContainer.setAttribute('contenteditable', true);

    setStyle(editorContainer, {
      height: '200px',
      border: '1px solid #ccc',
      ...opts.style,
    });

    this._editorRoot.append(editorContainer);
  }
}
