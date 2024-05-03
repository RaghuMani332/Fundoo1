import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/Services/noteService/notes.service';

@Component({
  selector: 'app-notecontainer',
  templateUrl: './notecontainer.component.html',
  styleUrls: ['./notecontainer.component.scss']
})
export class NotecontainerComponent implements OnInit {

  noteList: any[] = [];
  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe((responce: any) => {
      console.log(responce.data);
      this.noteList = responce.data.OwnNotes.filter((note: any) => !note.isArchive && !note.isTrash && !note.IsPermanentDelete);

      console.log(this.noteList);
    }, err => console.log(err))
  }
  handleUpdateNoteList($event: { action: string, data: any }) {
    if ($event.action == "color") {

      this.noteList = this.noteList.map((ele: any) => {
        if (ele.noteId == $event.data.noteId) {
          return $event.data;
        }
        else {
          return ele;
        }
      })
    }
    else if ($event.action == 'archive' || $event.action=='trash') {
      this.noteList = this.noteList.filter((note: any) => note.noteId != $event.data.noteId);
    }
    else if($event.action=='update')
      {
        this.noteService.getAllNotesCall().subscribe((responce: any) => {
          this.noteList = responce.data.OwnNotes.filter((note: any) => !note.isArchive && !note.isTrash && !note.IsPermanentDelete);
            }, err => console.log(err))
      }
  }
}

