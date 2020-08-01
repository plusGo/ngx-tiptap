import {Extension} from './extension';

export interface CommandOptions {
  type: string;
  schema: any;
}

export class Mark extends Extension {

  constructor(options = {}) {
    super(options);
  }

  get type() {
    return 'mark';
  }

  get view() {
    return null;
  }

  get schema() {
    return null;
  }

  command(commandOptions?: CommandOptions): () => ((state?, dispatch?, view?) => boolean) {
    return () => {
      return null;
    };
  }

}
