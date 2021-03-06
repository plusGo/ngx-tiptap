import {Mark} from '../../model/mark';
import {markInputRule, markPasteRule, toggleMark} from '../../utils/prosemirror.util';

export class Strike extends Mark {

  get name() {
    return 'strike';
  }

  get schema() {
    return {
      parseDOM: [
        {
          tag: 's',
        },
        {
          tag: 'del',
        },
        {
          tag: 'strike',
        },
        {
          style: 'text-decoration',
          getAttrs: value => value === 'line-through',
        },
      ],
      toDOM: () => {
        debugger
        return ['s', 0];
      },
    };
  }

  keys({type}) {
    return {
      'Mod-d': toggleMark(type),
    };
  }

  commands({type}) {
    return () => toggleMark(type);
  }

  inputRules({type}) {
    return [
      markInputRule(/~([^~]+)~$/, type),
    ];
  }

  pasteRules({type}) {
    return [
      markPasteRule(/~([^~]+)~/g, type),
    ];
  }

}
