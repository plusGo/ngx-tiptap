export const toggleTextAlign = (align) => {
  return (state, dispatch) => {
    const {schema, selection} = state;

    const tr = setTextAlign(state.tr.setSelection(selection), schema, align);
    if (tr.docChanged) {
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    } else {
      return false;
    }
  };
};

export function setTextAlign(
  tr,
  schema, align) {
  const {selection, doc} = tr;
  if (!selection || !doc) {
    return tr;
  }
  const {from, to} = selection;
  const {nodes} = schema;


  const heading = nodes.heading;
  const paragraph = nodes.paragraph;

  const tasks = [];

  const allowedNodeTypes = new Set([heading, paragraph]);
  doc.nodesBetween(from, to, (node, pos, parentNode) => {
    const nodeType = node.type;
    if (allowedNodeTypes.has(nodeType)) {
      tasks.push({
        node,
        pos,
        nodeType,
      });
    }
    return true;
  });

  if (!tasks.length) {
    return tr;
  }

  tasks.forEach(job => {
    const {node, pos, nodeType} = job;
    let {attrs} = node;
    attrs = {
      ...attrs,
      align,
      indent: 1
    };
    tr = tr.setNodeMarkup(pos, nodeType, attrs, node.marks);
  });

  return tr;
}



