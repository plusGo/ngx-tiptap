import {Mark} from '../../model/mark';
import {markInputRule, markPasteRule, toggleMark} from '../../utils/prosemirror.util';

export class Italic extends Mark {

  get name() {
    return 'italic';
  }

  get schema() {
    return {
      parseDOM: [
        {tag: 'i'},
        {tag: 'em'},
        {style: 'font-style=italic'},
      ],
      toDOM: () => ['em', 0],
    };
  }

  keys({type}) {
    return {
      'Mod-i': toggleMark(type),
    };
  }

  commands({type}) {
    return () => toggleMark(type);
  }

  inputRules({type}) {
    return [
      markInputRule(/(?:^|[^_])(_([^_]+)_)$/, type),
      markInputRule(/(?:^|[^*])(\*([^*]+)\*)$/, type),
    ];
  }

  pasteRules({type}) {
    return [
      markPasteRule(/_([^_]+)_/g, type),
      markPasteRule(/\*([^*]+)\*/g, type),
    ];
  }

}
