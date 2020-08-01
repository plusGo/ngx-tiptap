import {Mark} from '../../model/mark';
import {toggleColor} from '../../command/toggle-color.command';

export class BackgroundColor extends Mark {

  get name() {
    return 'backgroundColor';
  }

  get schema() {
    return {
      attrs: {
        color: ''
      },
      parseDOM: [
        {
          style: 'background-color',
          getAttrs: (color) => {
            return {
              color
            };
          }
        }
      ],
      toDOM(node) {
        return ['span', {style: `background-color: ${node.attrs.color}`}, 0];
      }
    };
  }

  commands({type}) {
    return (attr) => toggleColor(type, attr);
  }


}


