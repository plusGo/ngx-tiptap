import {Mark} from '../../model/mark';
import {toggleMark} from '../../utils/prosemirror.util';

export class Underline extends Mark {

  get name() {
    return 'underline';
  }

  get schema() {
    return {
      parseDOM: [
        {
          tag: 'u',
        },
        {
          style: 'text-decoration',
          getAttrs: value => value === 'underline',
        },
      ],
      toDOM: () => ['u', 0],
    };
  }

  keys({type}) {
    return {
      'Mod-u': toggleMark(type),
    };
  }

  commands({type}) {
    return () => toggleMark(type);
  }

}
