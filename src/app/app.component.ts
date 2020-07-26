import {AfterViewInit, Component} from '@angular/core';
import {collab, getVersion, receiveTransaction, sendableSteps} from 'prosemirror-collab';
import {Authority} from './demo';
import {EditorState} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {DOMParser, Schema} from 'prosemirror-model';
import {schema} from 'prosemirror-schema-basic';
import {addListNodes} from 'prosemirror-schema-list';
import {exampleSetup} from 'prosemirror-example-setup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
