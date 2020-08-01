import {colorPluginKey} from '../plugin/color.plugin';


export const getActiveColorMarks = (state) => {
  const pluginState = colorPluginKey.getState(state);
  return pluginState && pluginState.activeColorMarks;
};
export const toggleColor = (markType, attrs?) => {
  return (state, dispatch, view) => {
    const activeColorMarks = getActiveColorMarks(state);
    const {schema, selection, tr} = state;
    const {$from, $to} = selection;

    if (activeColorMarks[markType.name] && activeColorMarks[markType.name].attrs.color === attrs.color) {
      tr.removeMark($from.pos, $to.pos, markType).removeStoredMark(markType);
    } else {
      const colorMark = markType.create({color: attrs.color});
      tr.addMark($from.pos, $to.pos, colorMark).setStoredMarks([colorMark]);
    }
    dispatch(tr);
    return true;
  };
};

