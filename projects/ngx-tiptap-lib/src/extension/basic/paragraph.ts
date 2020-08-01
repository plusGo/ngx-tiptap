import {Node} from '../../model/node';
import {setBlockType} from '../../utils/prosemirror.util';

export class Paragraph extends Node {

  get name() {
    return 'paragraph';
  }

  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      draggable: false,
      parseDOM: [{
        tag: 'p',
      }],
      toDOM: () => ['p', 0],
    };
  }

  commands({type}) {
    return () => setBlockType(type);
  }

}
