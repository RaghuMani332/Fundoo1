import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotesService } from 'src/app/Services/noteService/notes.service';
import { DELETE_FOREVER_ICON, RESTORE_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
trashList:any=[]
  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry,private notesService:NotesService)  {
    matIconRegistry.addSvgIconLiteral("delete-forever-icon", domSanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON)),
    matIconRegistry.addSvgIconLiteral("restore-icon", domSanitizer.bypassSecurityTrustHtml(RESTORE_ICON))
   }
   @Output() deletedList=new EventEmitter<any>()

  ngOnInit(): void {
    this.notesService.getAllNotesCall().subscribe(res=>{
      this.trashList=res.data.OwnNotes.filter((note: any) => note.isTrash && !note.isPermanentDelete);
      console.log(this.trashList);
      
    },err=>console.log(err)
    )
  }

  handelUpdateTrashList($event:{action:string,data:any})
  {
    this.trashList=this.trashList.filter((ele:any)=>ele.noteId!=$event.data.noteId)
    // if($event.action=='trash')
    //   {
    //     this.trashList=this.trashList.filter((ele:any)=>ele.noteId!=$event.data.noteId)
    //   }
    // else if($event.action=='restore')
    //   {
    //     this.trashList=this.trashList.filter((ele:any)=>ele.noteId!=$event.data.noteId)
    //   }
    //   else if ($event.action == "permanentDelete") {
    //     this.trashList=this.trashList.filter((ele:any)=>ele.noteId!=$event.data.noteId)
    //   }
      
  }


}
