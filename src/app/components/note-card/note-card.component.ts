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
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotesService } from 'src/app/Services/noteService/notes.service';
import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, MORE_ICON, PIN_ICON, REMINDER_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  // Add this line to define the showIcons property
  @Input() notesData!: any;

  @Output() updateList=new EventEmitter<any>();


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private noteService: NotesService) {
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral("collabrator-icon", sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
    iconRegistry.addSvgIconLiteral("color-icon", sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON))
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral("pin-icon", sanitizer.bypassSecurityTrustHtml(PIN_ICON))
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON))    
  }

  ngOnInit(): void {
  }


 
  handleNoteIconsClick(action: string, note: any) {
    if(action=="archive"){      
      this.noteService.archiveApiCall(note).subscribe(response => {         
      this.updateList.emit({action:action,data:note});      
      },err=>{console.log(err)
      })
    }
    
}
}

