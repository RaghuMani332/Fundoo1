// import { Component, Input, OnInit } from '@angular/core';
// import { MatIconRegistry } from '@angular/material/icon';
// import { DomSanitizer } from '@angular/platform-browser';
// import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, MORE_ICON, PIN_ICON, REMINDER_ICON, TICK_ICON } from 'src/assets/svg-icons';

// @Component({
//   selector: 'app-note-card',
//   templateUrl: './note-card.component.html',
//   styleUrls: ['./note-card.component.scss']
// })
// export class NoteCardComponent implements OnInit {

//   showIcons:boolean=false;
//   textbar:boolean=false;

//   @Input() notesData!: any;
//   constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry) 
//   {
//     matIconRegistry.addSvgIconLiteral("reminder-icon", domSanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
//     matIconRegistry.addSvgIconLiteral("colabrator-icon", domSanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
//     matIconRegistry.addSvgIconLiteral("color-plate-icon", domSanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
//     matIconRegistry.addSvgIconLiteral("img-icon", domSanitizer.bypassSecurityTrustHtml(IMG_ICON))
//     matIconRegistry.addSvgIconLiteral("archieve-icon", domSanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
//     matIconRegistry.addSvgIconLiteral("more-icon", domSanitizer.bypassSecurityTrustHtml(MORE_ICON))
//     matIconRegistry.addSvgIconLiteral("pin-icon", domSanitizer.bypassSecurityTrustHtml(PIN_ICON))
//     matIconRegistry.addSvgIconLiteral("tick-icon", domSanitizer.bypassSecurityTrustHtml(TICK_ICON))

//   }

//   ngOnInit(): void {
//   }

// }

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Services/dataService/data.service';
import { NotesService } from 'src/app/Services/noteService/notes.service';
import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, MORE_ICON, PIN_ICON, REMINDER_ICON, UNARCHIVE_ICON } from 'src/assets/svg-icons';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  trashList: any = []
  @Input() notesData!: any;
  @Input() container!: string;

  @Output() updateList = new EventEmitter<any>();

  searchString:string=''
  subscription!:Subscription

  


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private noteService: NotesService , private dataService:DataService,public dialog: MatDialog) {
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral("collabrator-icon", sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
    iconRegistry.addSvgIconLiteral("color-icon", sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON))
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral("pin-icon", sanitizer.bypassSecurityTrustHtml(PIN_ICON))
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON))
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON))
  }

  ngOnInit(): void {
    this.subscription=this.dataService.currSearchString.subscribe(res=>this.searchString=res)

  }



  handleNoteIconsClick(action: string, note: any, color?: string) {
    if (action == "archive") {
      this.noteService.archiveApiCall(note).subscribe(response => {
        this.updateList.emit({ action: action, data: note });
      }, err => {
        console.log(err)
      })
    }
    else if (action == "trash") {
      this.noteService.trashNoteApiCall(note).subscribe(res=>{
        this.updateList.emit({action:action,data:note})
      })
    }
    else if (action == "color") {
      note.bgColor = color
      this.noteService.changeColorApiCall(note).subscribe(res => {
        this.updateList.emit({ action: action, data: { ...note, bgColor: color } })
      })
    }
    else if (action == "restore") {
    this.noteService.trashNoteApiCall(note).subscribe(res=>{
      this.updateList.emit({action:action,data:note})
    })
    }
    else if (action == "permanentDelete") {
      this.noteService.permanentDeleteApiCall(note).subscribe(res => {
        this.updateList.emit({ action: action, data: note })
      },
        err => console.log(err))
    }
  }
  handleEditnote(note:any)
  {
    const dialogRef=this.dialog.open(EditNoteComponent, {
      data: note
    }); 
    dialogRef.afterClosed().subscribe(res=>{this.noteService.updateNoteApiCall(res).subscribe(result=>{
      this.updateList.emit({action:'update',data:result})})})
  
  }

}

