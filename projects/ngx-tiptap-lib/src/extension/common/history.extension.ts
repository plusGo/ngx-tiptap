import {history, redo, redoDepth, undo, undoDepth,} from 'prosemirror-history';
import {Extension} from '../../model/extension';

export class History extends Extension {

  get name() {
    return 'history';
  }

  get defaultOptions() {
    return {
      depth: '',
      newGroupDelay: '',
    };
  }

  keys() {
    const keymap = {
      'Mod-z': undo,
      'Mod-y': redo,
      'Shift-Mod-z': redo,
      // Russian language
      'Mod-я': undo,
      'Shift-Mod-я': redo,
    };

    return keymap;
  }

  get plugins() {
    return [
      history({
        depth: this.options.depth,
        newGroupDelay: this.options.newGroupDelay,
      }),
    ];
  }

  commands() {
    return {
      undo: () => undo,
      redo: () => redo,
      undoDepth: () => undoDepth,
      redoDepth: () => redoDepth,
    };
  }

}
