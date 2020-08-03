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
import {ListItem} from '../extension/node/list-item.extension';
import {OrderedList} from '../extension/node/ordered-list.extension';
import {BulletList} from '../extension/node/bullet-list.extension';
import {Blockquote} from '../extension/node/blockquote.extension';

@Component({
  selector: 'ngx-tiptap-editor',
  template: `
    <div class="ngx-tiptap-editor-toolbar">
      <div class="ngx-tiptap-editor-toolbar-menus">
        <div class="ngx-tiptap-editor-toolbar-menu-item" (click)="command('undo')">
          <i class="iconfont icon-revocation"></i>
        </div>
        <div class="ngx-tiptap-editor-toolbar-menu-item" (click)="command('redo')">
          <i class="iconfont icon-redo"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('bold')" (click)="command('bold')">
          <i class="iconfont icon-bold"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('italic')"
             (click)="command('italic')">
          <i class="iconfont icon-Italic"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('strike')"
             (click)="command('strike')">
          <i class="iconfont icon-strike"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('underline')"
             (click)="command('underline')">
          <i class="iconfont icon-underline"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('heading',{level:1})"
             (click)="command('heading',{level:1})">
          h1
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('paragraph')"
             (click)="command('paragraph')">
          <i nz-icon nzType="edit" nzTheme="outline"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('textColor',{color:'red'})"
             (click)="command('textColor',{color:'red'})">
          red
        </div>
        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('textColor',{color:'blue'})"
             (click)="command('textColor',{color:'blue'})">
          blue
        </div>
        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('backgroundColor',{color:'yellow'})"
             (click)="command('backgroundColor',{color:'yellow'})">
          yellow
        </div>


        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('ordered_list')"
             (click)="command('ordered_list')">
          <i nz-icon nzType="ordered-list" nzTheme="outline"></i>
        </div>
        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('bullet_list')"
             (click)="command('bullet_list')">
          <i nz-icon nzType="unordered-list" nzTheme="outline"></i>
        </div>

        <div class="ngx-tiptap-editor-toolbar-menu-divider"></div>


        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('paragraph',{align:'left'})"
             (click)="command('paragraph',{align:'left'})">
          <i class="iconfont icon-left"></i>
        </div>


        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('paragraph',{align:'center'})"
             (click)="command('paragraph',{align:'center'})">
          <i class="iconfont icon-center"></i>
        </div>


        <div class="ngx-tiptap-editor-toolbar-menu-item" [class.active]="isActive('paragraph',{align:'right'})"
             (click)="command('paragraph',{align:'right'})">
          <i class="iconfont icon-right"></i>
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
        new Blockquote(),
        new Strike(),
        new Underline(),
        new History(),
        new TextColor(),
        new CodeBlock(),
        new ListItem(),
        new OrderedList(),
        new BulletList(),
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
