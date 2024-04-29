import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DELETE_FOREVER_ICON, RESTORE_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry)  {
    matIconRegistry.addSvgIconLiteral("delete-forever-icon", domSanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON)),
    matIconRegistry.addSvgIconLiteral("restore-icon", domSanitizer.bypassSecurityTrustHtml(RESTORE_ICON))
   }

  ngOnInit(): void {
  }

}
