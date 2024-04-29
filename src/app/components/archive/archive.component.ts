import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/Services/noteService/notes.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  archiveList:any=[]
  constructor(private noteService:NotesService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe((responce:any)=>
      {
        console.log(responce.data);
        // this.noteList=responce.data;  
        this.archiveList=responce.data.OwnNotes.filter((note: any) => note.isArchive);
        console.log(this.archiveList);
      },err=>console.log(err))
  }



}
