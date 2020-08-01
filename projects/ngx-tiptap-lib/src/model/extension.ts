export class Extension {
  options: any;
  editor: any;

  constructor(options = {}) {
    this.options = {
      ...this.defaultOptions,
      ...options,
    };
  }

  init() {
    return null;
  }

  bindEditor(editor = null) {
    this.editor = editor;
  }

  get name() {
    return null;
  }

  get type() {
    return 'extension';
  }

  get defaultOptions() {
    return {};
  }

  get plugins() {
    return [];
  }

  inputRules(params?: any) {
    return [];
  }

  pasteRules(params?: any) {
    return [];
  }

  keys(params?: any) {
    return {};
  }

}
