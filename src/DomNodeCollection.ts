class DomNodeCollection {
  constructor(arr: Array<Element>) {
    this.elements = arr;
  }

  public html(string: string): void | string {
    if (string || string === '') {
      this.elements.forEach((el) => {
        el.innerHTML = string;
      });
    } else {
      return this.elements[0].innerHTML;
    }
  }

  public empty(): void {
    this.html('');
  }

  public append(someEl: unknown): void {
    if (someEl instanceof DomNodeCollection) {
      this.elements.forEach((el) => {
        someEl.elements.forEach((subEl) => {
          el.innerHTML += subEl.outerHTML;
        });
      });
    } else if (someEl instanceof HTMLElement) {
      this.elements.forEach((el) => {
        el.innerHTML += someEl.outerHTML;
      });
    } else if (typeof someEl === 'string') {
      this.elements.forEach((el) => {
        el.innerHTML += someEl;
      });
    }
  }

  attr(someAttribute: unknown): void {
    const attrs = this.elements[0].attributes;

    if (attrs[someAttribute]) {
      return attrs[someAttribute].nodeValue;
    } else {
      return undefined;
    }
  }

  addClass(...classes: string[]): void {
    this.elements.forEach((el) => {
      el.className += ' ' + classes.join(' ');
    });
  }

  removeClass(...classes: string[]): void {
    this.elements.forEach((el) => {
      classes.forEach((c) => {
        el.classList.remove(c);
      });
    });
  }

  children(): void {
    const children = [];

    this.elements.forEach((el) => {
      Array.from(el.children).forEach((child) => {
        children.push(child);
      });
    });

    return new DomNodeCollection(children);
  }

  parent(): void {
    const parents = [];

    this.elements.forEach((el) => {
      parents.push(el.parentNode);
    });

    return new DomNodeCollection(parents);
  }

  find(selector: string): void {
    const results = [];

    this.elements.forEach((el) => {
      const hits = Array.from(el.querySelectorAll(`${selector}`));
      hits.forEach((hit) => results.push(hit));
    });

    return new DomNodeCollection(results);
  }

  remove(selector: string): void {
    this.elements.forEach((el) => {
      if (selector) {
        Array.from(el.querySelectorAll(selector)).forEach((child) => {
          // el might not be the direct parent of the child
          child.parentNode.removeChild(child);
        });
      } else {
        el.parentNode.removeChild(el);
        this.elements = [];
      }
    });
  }

  on(ev: string, cb: () => void): void {
    this.elements.forEach((el) => {
      el.addEventListener(ev, cb);

      if (!el.attributes.listeners) {
        el.attributes.listeners = {};
        el.attributes.listeners[ev] = cb;
      } else {
        el.attributes.listeners[ev] = cb;
      }
    });
  }

  off(ev: string): void {
    this.elements.forEach((el) => {
      el.removeEventListener(ev, el.attributes.listeners[ev]);
    });
  }

  style(styles: { [string]: string }): void {
    this.elements.forEach((el) => {
      for (const property in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, property)) {
          el.style[property] = styles[property];
        }
      }
    });
  }
}

export default DomNodeCollection;
