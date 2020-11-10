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
    const menuID = `editor_menus_${Math.random().toString(36).substring(2)}`;
    menuEl.className = 'editor-menus';
    menuEl.setAttribute('id', menuID);
    menus.forEach((menuItem) => {
      menuEl.appendChild(menuItem);
    });

    const menuNode = new DomNodeCollection([menuEl]);

    this._editorRoot.append(menuNode);
    requestAnimationFrame(() => {
      document.getElementById(menuID).addEventListener(
        'mousedown',
        (e) => {
          e.preventDefault();
          const nodeName = e.target.nodeName;
          const dataSet = e.target.dataset;
          this.restoreRange();
          switch (dataSet.cmd) {
            case 'formatBlock':
              if (nodeName === 'p') {
                document.execCommand('removeFormat');
                break;
              }
              document.execCommand(dataSet.cmd, false, nodeName);
              break;
            case 'bold':
              document.execCommand(dataSet.cmd);
              break;
            case 'foreColor':
              document.execCommand(dataSet.cmd, false, dataSet.color);
              break;
            default:
              break;
          }
        },
        false,
      );
    });
  }

  initEditorContainer(opts: Options): void {
    const editorContainer = document.createElement('div');
    this._editorContainer = editorContainer;
    const editorID = `editor_${Math.random().toString(36).substring(2)}`;
    editorContainer.setAttribute('id', editorID);
    editorContainer.setAttribute('contenteditable', true);
    editorContainer.className = 'editor-container';
    setStyle(editorContainer, opts.style);

    this._editorRoot.append(editorContainer);
    requestAnimationFrame(() => {
      document.getElementById(editorID)?.addEventListener('blur', () => {
        this.backupRange();
      });
    });
  }

  backupRange(): void {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    this.currentSelection = {
      startContainer: range.startContainer,
      startOffset: range.startOffset,
      endContainer: range.endContainer,
      endOffset: range.endOffset,
    };
  }
  restoreRange(): void {
    if (this.currentSelection) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      const range = document.createRange();
      range.setStart(
        this.currentSelection.startContainer,
        this.currentSelection.startOffset,
      );
      range.setEnd(
        this.currentSelection.endContainer,
        this.currentSelection.endOffset,
      );
      // 向选区中添加一个区域
      selection.addRange(range);
    }
  }
}
