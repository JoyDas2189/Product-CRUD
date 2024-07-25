import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddBlogsComponent } from './blogs/add-blogs/add-blogs.component';
import { BlogsListComponent } from './blogs/blogs-list/blogs-list.component';
import { AddDestinaitonsComponent } from './destinations/add-destinaitons/add-destinaitons.component';
import { DestinationListComponent } from './destinations/destination-list/destination-list.component';
import { AddDestinationTypeComponent } from './destinationType/add-destination-type/add-destination-type.component';
import { DestinationTypeListComponent } from './destinationType/destination-type-list/destination-type-list.component';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { AddAboutComponent } from './about/add-about/add-about.component';
import { AboutListComponent } from './about/about-list/about-list.component';

@NgModule({
  declarations: [AppComponent, AddBlogsComponent, BlogsListComponent, AddDestinaitonsComponent, DestinationListComponent, AddDestinationTypeComponent, DestinationTypeListComponent, AddContactComponent, ContactListComponent, AddAboutComponent, AboutListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatFormField,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
