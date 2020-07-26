import {AfterViewInit, Component} from '@angular/core';
import {collab, sendableSteps} from 'prosemirror-collab';
import {EditorState} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {DOMParser, Schema} from 'prosemirror-model';
import {schema} from 'prosemirror-schema-basic';
import {addListNodes} from 'prosemirror-schema-list';
import {exampleSetup} from 'prosemirror-example-setup';

@Component({
  selector: 'app-ballon-demo2',
  templateUrl: './ballon-demo2.component.html',
  styleUrls: ['./ballon-demo2.component.scss']
})
export class BallonDemo2Component implements AfterViewInit {
  clientId: number = Math.floor(Math.random() * 0xFFFFFFFF);
  ws = new WebSocket('ws://localhost:8080/draft/' + this.clientId);

  constructor() {
  }

  ngAfterViewInit(): void {

    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks
    });

    const myState = EditorState.create({
      doc: DOMParser.fromSchema(mySchema).parse({type: 'doc', content: []}),
      plugins: [...exampleSetup({schema: mySchema}), collab({version: 0, clientId: this.clientId})]
    });

    const doc = DOMParser.fromSchema(mySchema).parse({type: 'doc', content: [{type: 'text', text: '123'}]});

    const view = new EditorView(document.querySelector('#ballon-editor'), {
      state: myState,
      dispatchTransaction: (transaction) => {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
        const sendable = sendableSteps(newState);
        if (sendable) {
          const data = {
            version: sendable.version,
            steps: sendable.steps,
            clientID: sendable.clientID,
          };
          this.ws.send(JSON.stringify(data));
          // authority.receiveSteps(sendable.version, sendable.steps,
          //   sendable.clientID);
        }
      }
    });

    this.ws.onmessage = (data) => {
      debugger
    };
  }

}
