import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  title!:String
  description!:String
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<EditNoteComponent>) { 
    this.title=data.title
    this.description=data.description
  }

  ngOnInit(): void {
  }
  handleUpdateNote()
  {
    this.dialogRef.close({...this.data,title:this.title,description:this.description})
  }

}
