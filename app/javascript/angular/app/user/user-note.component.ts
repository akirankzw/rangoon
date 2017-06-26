import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Note } from '../note';

import { NoteService } from '../note.service';

import templateString from './user-note.component.html';

@Component({
  template: templateString
})

export class UserNoteComponent implements OnInit {
  note: Note = new Note();

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.noteService.getNote(+params['id']))
      .subscribe(note => this.note = note);
  }
}
