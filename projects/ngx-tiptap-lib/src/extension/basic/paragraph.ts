import {Node} from '../../model/node';
import {setBlockType} from '../../utils/prosemirror.util';
import {toggleTextAlign} from '../../command/toggle-text-align.command';
import convertToCSSPTValue from '../../utils/css.util';
import {clamp} from '../../utils/math.util';

const ALIGN_PATTERN = /(left|right|center|justify)/;
export const ATTRIBUTE_INDENT = 'data-indent';


export class Paragraph extends Node {

  get name() {
    return 'paragraph';
  }

  get schema() {
    return {
      attrs: {
        align: {default: null},
        indent: {default: null},
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
      if (attr.indent) {
        // return toggleTextIndent(attr.indent);
      }
      if (attr.align) {
        return toggleTextAlign(attr.align);
      }
      return setBlockType(type);
    };
  }

}

export const MIN_INDENT_LEVEL = 0;
export const INDENT_MARGIN_PT_SIZE = 36;
export const MAX_INDENT_LEVEL = 7;

export function convertMarginLeftToIndentValue(marginLeft: string): number {
  const ptValue = convertToCSSPTValue(marginLeft);
  return clamp(
    MIN_INDENT_LEVEL,
    Math.floor(ptValue / INDENT_MARGIN_PT_SIZE),
    MAX_INDENT_LEVEL
  );
}

function getAttrs(dom: HTMLElement): any {
  const {
    textAlign,
    marginLeft,
  } = dom.style;

  let align = dom.getAttribute('align') || textAlign || '';
  align = ALIGN_PATTERN.test(align) ? align : null;

  let indent = parseInt(dom.getAttribute(ATTRIBUTE_INDENT), 10);
  if (!indent && marginLeft) {
    indent = convertMarginLeftToIndentValue(marginLeft);
  }

  indent = indent || MIN_INDENT_LEVEL;

  const id = dom.getAttribute('id') || '';
  return {align, id, indent};
}

function toDOM(node: any): Array<any> {
  const {
    align,
    id,
    indent
  } = node.attrs;
  const attrs = {} as any;

  let style = '';
  if (align && align !== 'left') {
    style += `text-align: ${align};`;
  }

  if (id) {
    attrs.id = id;
  }

  if (indent && indent !== 0) {
    style += `padding-left: ${indent}em`;
  }

  if (style) {
    attrs.style = style;
  }

  return ['p', attrs, 0];
}
