import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/Services/noteService/notes.service';

@Component({
  selector: 'app-notecontainer',
  templateUrl: './notecontainer.component.html',
  styleUrls: ['./notecontainer.component.scss']
})
export class NotecontainerComponent implements OnInit {

  noteList:any[]=[];
  constructor(private noteService:NotesService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe((responce:any)=>
      {
        console.log(responce.data);
        // this.noteList=responce.data;  
        this.noteList=responce.data.OwnNotes.filter((note: any) => !note.isArchive);
        console.log(this.noteList);
      },err=>console.log(err))
  }

  // handleUpdateNoteList($event: { action: string, data: any }) {

  //   this.noteService.getAllNotesCall().subscribe((responce:any)=>
  //     {
  //       console.log(responce.data);
  //       // this.noteList=responce.data;  
  //       this.noteList=responce.data.filter((ele:any)=>ele.OwnNotes.isArchive)
      
  //       console.log(this.noteList);
  //     },err=>console.log(err)) 
  // }

  handleUpdateNoteList($event: { action: string, data: any }) {
    this.noteService.getAllNotesCall().subscribe((response: any) => {
        console.log(response.data);

        // Filter own notes based on the "isArchive" property
        this.noteList = response.data.OwnNotes.filter((note: any) => !note.isArchive);

        console.log(this.noteList);
    }, err => console.log(err));
}


  
}

// import { Component, OnInit } from '@angular/core';
// import { NotesService } from 'src/app/Services/noteService/notes.service';

// @Component({
//   selector: 'app-notecontainer',
//   templateUrl: './notecontainer.component.html',
//   styleUrls: ['./notecontainer.component.scss']
// })
// export class NotecontainerComponent implements OnInit {

//   noteList: any[] = [];

//   constructor(private noteService: NotesService) { }

//   ngOnInit(): void {
//     this.noteService.getAllNotesCall().subscribe({
//       next: (res: any) => {
//         console.log(res.data);
//         // Access properties as needed: res.data.OwnNotes and res.data.CollabNotes
//       },
//       error: (err: any) => {
//         console.error(err);
//         // Handle errors if any
//       }
//     });
//   }

// }
