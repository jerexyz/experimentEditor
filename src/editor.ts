import { el, mount } from 'redom';
export default class Editor {
  constructor(domRoot: string) {
    this._editorRoot = document.querySelector(domRoot);
    if (!this._editorRoot) {
      throw new Error('edit root must be id or class name like:.hello #hello');
      return;
    }
    const editor: Element = el('div', {
      style: {
        height: '200px',
        border: '1px solid #ccc',
      },
    });
    mount(this._editorRoot, editor);
  }

  private _editorRoot: Element;
}
