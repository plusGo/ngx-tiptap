import {
  autoJoin,
  baseKeymap,
  chainCommands,
  createParagraphNear,
  deleteSelection,
  exitCode,
  joinBackward,
  joinDown,
  joinForward,
  joinUp,
  lift,
  liftEmptyBlock,
  macBaseKeymap,
  newlineInCode,
  pcBaseKeymap,
  selectAll,
  selectNodeBackward,
  selectNodeForward,
  selectParentNode,
  setBlockType,
  splitBlock,
  splitBlockKeepMarks,
  toggleMark,
  wrapIn,
} from 'prosemirror-commands';

import {addListNodes, liftListItem, sinkListItem, splitListItem, wrapInList,} from 'prosemirror-schema-list';

import {textblockTypeInputRule, wrappingInputRule,} from 'prosemirror-inputrules';
import {insertText} from '../command/insert-text.command';
import {markInputRule} from '../command/mark-input-rule.command';
import {markPasteRule} from '../command/mark-paste-rule.command';
import {nodeInputRule} from '../command/node-input-rule.command';
import {pasteRule} from '../command/paste-rule.command';
import {removeMark} from '../command/remove-mark.command';
import {replaceText} from '../command/replace-text.command';
import {setInlineBlockType} from '../command/set-inline-block-type.command';
import {splitToDefaultListItem} from '../command/split-to-default-list-ltem.command';
import {toggleBlockType} from '../command/toggle-block-type.command';
import {toggleList} from '../command/toggle-list.command';
import {toggleWrap} from '../command/toggle-wrap.command';
import {updateMark} from '../command/update-mark.command';

export {
  // prosemirror-commands
  chainCommands,
  deleteSelection,
  joinBackward,
  selectNodeBackward,
  joinForward,
  selectNodeForward,
  joinUp,
  joinDown,
  lift,
  newlineInCode,
  exitCode,
  createParagraphNear,
  liftEmptyBlock,
  splitBlock,
  splitBlockKeepMarks,
  selectParentNode,
  selectAll,
  wrapIn,
  setBlockType,
  toggleMark,
  autoJoin,
  baseKeymap,
  pcBaseKeymap,
  macBaseKeymap,

  // prosemirror-schema-list
  addListNodes,
  wrapInList,
  splitListItem,
  liftListItem,
  sinkListItem,

  // prosemirror-inputrules
  wrappingInputRule,
  textblockTypeInputRule,

  // custom
  insertText,
  markInputRule,
  markPasteRule,
  nodeInputRule,
  pasteRule,
  removeMark,
  replaceText,
  setInlineBlockType,
  splitToDefaultListItem,
  toggleBlockType,
  toggleList,
  toggleWrap,
  updateMark,
};
