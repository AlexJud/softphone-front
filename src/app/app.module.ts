import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SoftphoneUiComponent } from './components/softphone-ui/softphone-ui.component';
import { ContentComponent } from './components/content/content.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTreeModule} from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { HttpService } from './services/http/http.service';
import { EventService } from './services/event.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SoftphoneUiComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatTreeModule,
    MatCheckboxModule,
    MatTableModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatChipsModule
  ],
  providers: [HttpService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
