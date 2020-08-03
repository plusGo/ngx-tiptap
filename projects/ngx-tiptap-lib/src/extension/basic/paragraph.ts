import {Node} from '../../model/node';
import {setBlockType} from '../../utils/prosemirror.util';
import {toggleTextAlign} from '../../command/toggle-text-align.command';
import convertToCSSPTValue from '../../utils/css.util';
import {minMax} from '../../utils/math.util';
import {toggleTextIndent} from '../../command/toggle-indent-align.command';

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
      debugger
      if (attr.indent) {
        return toggleTextIndent(attr.indent);
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
  return minMax(
    Math.floor(ptValue / INDENT_MARGIN_PT_SIZE),
    MIN_INDENT_LEVEL,
    MAX_INDENT_LEVEL
  );
}

export const convertPaddingLeftToIndentValue = (paddingLeft: string) => {
  if (paddingLeft && paddingLeft.indexOf('em') !== -1) {
    return Math.round(parseInt(paddingLeft, 10) / 2);
  }
  if (paddingLeft && paddingLeft.indexOf('px') !== -1) {
    return Math.round(parseInt(paddingLeft, 10) / 28);
  }
}

function getAttrs(dom: HTMLElement): any {
  const {
    textAlign,
    paddingLeft,
  } = dom.style;

  let align = dom.getAttribute('align') || textAlign || '';
  align = ALIGN_PATTERN.test(align) ? align : null;

  let indent;
  if (paddingLeft) {
    indent = convertPaddingLeftToIndentValue(paddingLeft);
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
