import {findParentNode, findSelectedNodeOfType} from 'prosemirror-utils';

export function getNodeAttrs(state, type) {
  const {from, to} = state.selection;
  let nodes = [];

  state.doc.nodesBetween(from, to, $node => {
    nodes = [...nodes, $node];
  });

  const node = nodes
    .reverse()
    .find(nodeItem => nodeItem.type.name === type.name);

  if (node) {
    return node.attrs;
  }

  return {};
}


export function nodeEqualsType({types, node}) {
  return (Array.isArray(types) && types.includes(node.type)) || node.type === types;
}

export default function nodeIsActive(state, type, attrs = {}) {
  const predicate = $node => $node.type === type;
  const node = findSelectedNodeOfType(type)(state.selection)
    || findParentNode(predicate)(state.selection);

  if (!Object.keys(attrs).length || !node) {
    return !!node;
  }

  return node.node.hasMarkup(type, {...node.node.attrs, ...attrs});
}

