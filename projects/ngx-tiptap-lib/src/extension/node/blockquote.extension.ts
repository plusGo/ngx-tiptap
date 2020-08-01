import {Node} from '../../model/node';
import {toggleWrap, wrappingInputRule} from '../../utils/prosemirror.util';

export class Blockquote extends Node {

  get name() {
    return 'blockquote';
  }

  get schema() {
    return {
      content: 'block*',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: [
        {tag: 'blockquote'},
      ],
      toDOM: () => ['blockquote', 0],
    };
  }

  commands({type, schema}) {
    return () => toggleWrap(type, schema.nodes.paragraph);
  }

  keys({type}) {
    return {
      'Ctrl->': toggleWrap(type),
    };
  }

  inputRules({type}) {
    return [
      wrappingInputRule(/^\s*>\s$/, type),
    ];
  }

}
