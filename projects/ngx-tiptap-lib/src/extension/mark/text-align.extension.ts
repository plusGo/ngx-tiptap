import {Mark} from '../../model/mark';
import {toggleTextAlign} from '../../command/toggle-text-align.command';

export class TextAlign extends Mark {

  get name() {
    return 'textAlign';
  }

  get defaultOptions() {
    return {
      textAlign: ['left', 'center', 'right', 'justify'],
    };
  }

  get schema() {
    return {
      attrs: {
        textAlign: ''
      },
      parseDOM: [
        {
          tag: 'p',
          getAttrs: node => {
            return node.style.textAlign;
          }
        }
      ],
      toDOM: (node) => {
        debugger
        return ['p', {style: `text-align:${node.attrs.textAlign}`}]
      },
    };
  }

  keys({type}) {
    return {};
  }

  commands({type}) {
    return (attr) => toggleTextAlign(type, attr);
  }

}
