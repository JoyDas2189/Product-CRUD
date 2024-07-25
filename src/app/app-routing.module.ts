import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationListComponent } from './destinations/destination-list/destination-list.component';
import { BlogsListComponent } from './blogs/blogs-list/blogs-list.component';
import { DestinationTypeListComponent } from './destinationType/destination-type-list/destination-type-list.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { AboutListComponent } from './about/about-list/about-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/destinationType', pathMatch: 'full' },
  { path: 'destinationType', component: DestinationTypeListComponent },
  { path: 'destinations', component: DestinationListComponent },
  { path: 'blogs', component: BlogsListComponent },
  { path: 'contact', component: ContactListComponent},
  { path: 'about', component: AboutListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
