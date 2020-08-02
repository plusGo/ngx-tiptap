import {Node} from '../../model/node';
import {setBlockType} from '../../utils/prosemirror.util';
import {toggleTextAlign} from '../../command/toggle-text-align.command';

const ALIGN_PATTERN = /(left|right|center|justify)/;


export class Paragraph extends Node {

  get name() {
    return 'paragraph';
  }

  get schema() {
    return {
      attrs: {
        align: {default: null},
      },
      content: 'inline*',
      group: 'block',
      draggable: false,
      parseDOM: [{
        tag: 'p',
        getAttrs
      }],
      toDOM,
    };
  }

  commands({type}) {
    return (attr) => {
      if (attr.align) {
        return toggleTextAlign(attr.align);
      }
      return setBlockType(type);
    };
  }

}

function getAttrs(dom: HTMLElement): any {
  const {
    textAlign,
  } = dom.style;

  let align = dom.getAttribute('align') || textAlign || '';
  align = ALIGN_PATTERN.test(align) ? align : null;

  const id = dom.getAttribute('id') || '';
  return {align, id};
}

function toDOM(node: any): Array<any> {
  const {
    align,
    id,
  } = node.attrs;
  const attrs = {} as any;

  let style = '';
  if (align && align !== 'left') {
    style += `text-align: ${align};`;
  }

  if (style) {
    attrs.style = style;
  }

  if (id) {
    attrs.id = id;
  }

  return ['p', attrs, 0];
}
