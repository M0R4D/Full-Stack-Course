import { EventsListComponent } from './components/event-area/events-list/events-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { AddEventComponent } from './components/event-area/add-event/add-event.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'events', component: EventsListComponent },
	{ path: 'add-event', component: AddEventComponent },

	{ path: "", redirectTo: "/home", pathMatch: "full" }, // pathMath: full = exact in React
    { path: "**", component: PageNotFoundComponent } // 404 - must be last!
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
