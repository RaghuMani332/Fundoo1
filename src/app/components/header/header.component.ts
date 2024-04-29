import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Services/dataService/data.service';
import { LIST_VIEW_ICON, MENU_ICON, OTHER_MENU_ICON, REFRESH_ICON, SEARCH_ICON, SETTING_ICON } from 'src/assets/svg-icons';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  drawerState:boolean=false;
  subscription!:Subscription
  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry,private dataService : DataService) { 
    matIconRegistry.addSvgIconLiteral("menu-icon", domSanitizer.bypassSecurityTrustHtml(MENU_ICON)),
    matIconRegistry.addSvgIconLiteral("search-icon", domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON)),
    matIconRegistry.addSvgIconLiteral("refresh-icon", domSanitizer.bypassSecurityTrustHtml(REFRESH_ICON)),
    matIconRegistry.addSvgIconLiteral("setting-icon", domSanitizer.bypassSecurityTrustHtml(SETTING_ICON))
    matIconRegistry.addSvgIconLiteral("list-view-icon", domSanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON))
    matIconRegistry.addSvgIconLiteral("other-menu-icon", domSanitizer.bypassSecurityTrustHtml(OTHER_MENU_ICON))
   }

  ngOnInit(): void {
    this.subscription=this.dataService.currDrawerState.subscribe(res=>this.drawerState=res)
  }
  handleDrawerClick()
  {
   this.dataService.toggleDrawerState(!this.drawerState) 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
