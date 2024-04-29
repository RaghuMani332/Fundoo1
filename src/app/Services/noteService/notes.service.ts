import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpService:HttpService) { }
  getAllNotesCall()
  {
    return this.httpService.getAllNotes()
  }
  addNoteCall(data:any)
  {
    return this.httpService.addNoteApi(data)
  }
  archiveApiCall(data:any)
  {
    return this.httpService.archiveApi(data)
  }
}
