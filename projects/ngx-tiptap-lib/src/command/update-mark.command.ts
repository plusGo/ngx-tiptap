import {getMarkRange} from '../utils/mark.util';

export function updateMark(type, attrs) {
  return (state, dispatch) => {
    const {tr, selection, doc} = state;
    let {from, to} = selection;
    const {$from, empty} = selection;

    if (empty) {
      const range = getMarkRange($from, type);

      from = range.from;
      to = range.to;
    }

    const hasMark = doc.rangeHasMark(from, to, type);

    if (hasMark) {
      tr.removeMark(from, to, type);
    }

    tr.addMark(from, to, type.create(attrs));

    return dispatch(tr);
  };
}
