export const toggleTextAlign = (markType, attrs?) => {
  return (state, dispatch, view) => {
    const {schema, selection} = state;
    const tr = setTextAlign(state.tr.setSelection(selection), schema, attrs.textAlign);
    debugger
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
  schema,
  alignment
) {
  const {selection, doc} = tr;
  if (!selection || !doc) {
    return tr;
  }
  const {from, to} = selection;
  const {nodes} = schema;

  const blockquote = nodes.blockquote;
  const listItem = nodes.list_item;
  const heading = nodes.heading;
  const paragraph = nodes.paragraph;

  const tasks = [];
  alignment = alignment || null;

  const allowedNodeTypes = new Set([blockquote, heading, listItem, paragraph]);

  doc.nodesBetween(from, to, (node, pos, parentNode) => {
    const nodeType = node.type;
    const align = node.attrs.align || null;
    if (align !== alignment && allowedNodeTypes.has(nodeType)) {
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
    if (alignment) {
      attrs = {
        ...attrs,
        align: alignment,
      };
    } else {
      attrs = {
        ...attrs,
        align: null,
      };
    }
    tr = tr.setNodeMarkup(pos, nodeType, attrs, node.marks);
  });

  return tr;
}


