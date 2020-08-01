import {Node} from '../../model/node';
import {chainCommands, exitCode} from '../../utils/prosemirror.util';

export class HardBreak extends Node {

  get name() {
    return 'hard_break';
  }

  get schema() {
    return {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [
        {tag: 'br'},
      ],
      toDOM: () => ['br'],
    };
  }

  keys({type}) {
    const command = chainCommands(exitCode, (state, dispatch) => {
      dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
      return true;
    });
    return {
      'Mod-Enter': command,
      'Shift-Enter': command,
    };
  }

}
