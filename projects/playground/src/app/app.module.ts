import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { SharedModule } from './shared';

import { AppComponent } from './app.component';
import { AuthorsComponent } from './elements/authors/authors.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
