import {Mark} from '../../model/mark';
import {colorPlugin} from '../../plugin/color.plugin';
import {toggleColor} from '../../command/toggle-color.command';

export class TextColor extends Mark {

  get name() {
    return 'textColor';
  }

  get schema() {
    return {
      attrs: {
        color: ''
      },
      parseDOM: [
        {
          style: 'color',
          getAttrs: (node) => {
            debugger
            return {
              color: node.color
            };
          }
        }
      ],
      toDOM(node) {
        return ['span', {style: `color: ${node.attrs.color}`}, 0];
      }
    };
  }

  get plugins() {
    return [
      colorPlugin,
    ];
  }


  commands({type}) {
    return (attr) => toggleColor(type, attr);
  }


}


