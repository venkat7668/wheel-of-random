import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { WheelComponent } from './components/wheel/wheel.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { GroupComponent } from './components/group/group.component';
import { LogsComponent } from './components/logs/logs.component';

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    SidenavComponent,
    GroupComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
