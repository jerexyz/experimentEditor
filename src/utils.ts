export function setStyle(el: Element, styles: { [string]: string }): void {
  for (const property in styles) {
    el.style[property] = styles[property];
  }
}
