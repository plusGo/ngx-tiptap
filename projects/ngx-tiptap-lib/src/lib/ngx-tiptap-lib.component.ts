import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgxTipTapEditor} from '../model/editor';
import {HardBreak} from '../extension/node/hard-break.extension';
import {Bold} from '../extension/mark/bold.extension';
import {Italic} from '../extension/mark/italic.extension';
import {Strike} from '../extension/mark/strike.extension';
import {Underline} from '../extension/mark/undeline.extension';
import {History} from '../extension/common/History.extension';
import {Heading} from '../extension/node/heading.extension';
import {TextColor} from '../extension/mark/text-color.extension';
import {BackgroundColor} from '../extension/mark/background-color.extension';
import {CodeBlock} from '../extension/node/code-block.extension';

@Component({
  selector: 'ngx-tiptap-editor',
  template: `
    <div class="ngx-tiptap-editor-toolbar">
      <div class="ngx-tiptap-editor-toolbar-menus">
        <div class="ngx-tiptap-editor-toolbar-menu-item" (click)="command('undo')">
          <i nz-icon nzType="undo" nzTheme="outline"></i>
        </div>
        <div class="ngx-tiptap-editor-toolbar-menu-item" (click)="command('redo')">
          <i nz-icon nzType="redo" nzTheme="outline"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('bold')" (click)="command('bold')">
          <i nz-icon nzType="bold" nzTheme="outline"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('italic')" (click)="command('italic')">
          <i nz-icon nzType="italic" nzTheme="outline"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('strike')" (click)="command('strike')">
          <i nz-icon nzType="strikethrough" nzTheme="outline"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('underline')" (click)="command('underline')">
          <i nz-icon nzType="underline" nzTheme="outline"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('heading',{level:1})"
             (click)="command('heading',{level:1})">
          h1
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('textColor',{color:'red'})"
             (click)="command('textColor',{color:'red'})">
          red
        </div>
        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('backgroundColor',{color:'yellow'})"
             (click)="command('backgroundColor',{color:'yellow'})">
          yellow
        </div>


      </div>
    </div>
    <div #editorContent class="ngx-tiptap-editor-content"></div>
  `,
  styles: []
})
export class NgxTiptapLibComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorContent') editorContentRef: ElementRef;
  editor: NgxTipTapEditor;

  constructor() {
    this.editor = new NgxTipTapEditor({
      extensions: [
        new HardBreak(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new TextColor(),
        new CodeBlock(),
        new BackgroundColor(),
        new Heading({levels: [1, 2, 3]}),
      ],
      content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `,
    });
  }

  ngAfterViewInit(): void {
    this.editorContentRef.nativeElement.appendChild(this.editor.element.firstChild);
    this.editor.setParentComponent(this);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  isActive(extension: string, options?: any): boolean {
    return this.editor.isActive[extension](options);
  }

  command(extension: string, options?: any): void {
    const command = this.editor.commands[extension];
    command(options);
  }
}
