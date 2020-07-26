import {AfterViewInit, Component} from '@angular/core';
import {collab, getVersion, receiveTransaction, sendableSteps} from 'prosemirror-collab';
import {EditorState} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {DOMParser, Schema} from 'prosemirror-model';
import {schema} from 'prosemirror-schema-basic';
import {addListNodes} from 'prosemirror-schema-list';
import {exampleSetup} from 'prosemirror-example-setup';
import {Authority} from '../demo';

@Component({
  selector: 'app-ballon',
  templateUrl: './ballon.component.html',
  styleUrls: ['./ballon.component.scss']
})
export class BallonComponent implements AfterViewInit {
  ngAfterViewInit(): void {

    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks
    });

    const doc = DOMParser.fromSchema(mySchema).parse({type: 'doc', content: [{type: 'text', text: '123'}]});
    const authority = new Authority(doc);


    this.collabEditor(authority, document.querySelector('#content1'));
    this.collabEditor(authority, document.querySelector('#content2'));
    setTimeout(() => {
      this.collabEditor(authority, document.querySelector('#content3'));
    }, 2000);
  }

  collabEditor(authority, place) {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks
    });

    const myState = EditorState.create({
      doc: authority.doc,
      plugins: [...exampleSetup({schema: mySchema}), collab({version: authority.steps.length})]
    });
    const view = new EditorView(place, {
      state: myState,
      dispatchTransaction: (transaction) => {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
        debugger
        const sendable = sendableSteps(newState);
        if (sendable) {
          authority.receiveSteps(sendable.version, sendable.steps,
            sendable.clientID);
        }
      }
    });

    authority.onNewSteps.push(() => {
      const version = getVersion(view.state);
      const newData = authority.stepsSince(getVersion(view.state));
      view.dispatch(
        receiveTransaction(view.state, newData.steps, newData.clientIDs)
      );
      console.log(view.state.doc.toJSON());
    });

    return view;
  }


}
