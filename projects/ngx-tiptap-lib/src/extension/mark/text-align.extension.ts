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
        align: ''
      },
      parseDOM: [
        {
          style: 'text-align',
          getAttrs: align => {
            debugger
            return {
              align
            };
          }
        }
      ],
      toDOM: (node) => {
        debugger
        return ['p', {style: `text-align:${node.attrs.align}`}];
      },
    };
  }

  keys({type}) {
    return {};
  }

  commands({type}) {
    return (attr) => {
      debugger
      return toggleTextAlign(type, attr);
    };
  }

}
