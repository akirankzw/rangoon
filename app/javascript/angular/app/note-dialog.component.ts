import { Component, OnInit, Inject } from '@angular/core';
import { NgForm }                    from '@angular/forms';
import { Http, Headers }             from '@angular/http';
import { MdDialog, MdDialogRef }     from '@angular/material';

import { APP_CONFIG, AppConfig } from './app.config';

import { Book }   from './book';
import { Lesson } from './lesson';

import { NoteService } from './note.service';

import * as Clipboard from 'clipboard';

import templateString from './note-dialog.component.html';

@Component({
  template: templateString,
  styles: [
    `
    textarea {
      width: 550px;
      height: 220px;
    }
    `
  ]
})

export class NoteDialogComponent implements OnInit {
  headers = new Headers({ 'Content-Type': 'application/json' });
  book: Book;
  lesson: Lesson;
  emoji: string[];

  constructor(
    public dialogRef: MdDialogRef<NoteDialogComponent>,
    private noteService: NoteService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.emoji = config.emoji;
  }

  onSubmit(book: Book, f: NgForm): void {
    // note = {id: 35, start_at: "09:00", aasm_state: "booked", family_name: null, given_name: null…}
    this.noteService.updateNote(f.value.id, f.value.content)
      .then(response => {
        this.book.aasm_state = response.aasm_state;
      });
  }

  ngOnInit(): void {
    new Clipboard('.emoji', {
      target: function(trigger) {
        return trigger;
      }
    }).on('success', function(e) {
      let field = (<HTMLInputElement>document.forms[0].elements[1]);
      if (field.selectionStart || field.selectionStart === 0) {
        let startPos = field.selectionStart;
        let endPos   = field.selectionEnd;
        field.value = field.value.substring(0, startPos) + e.text + field.value.substring(endPos, field.value.length);
      } else {
        field.value += e.text;
      }
    });
  }
}
