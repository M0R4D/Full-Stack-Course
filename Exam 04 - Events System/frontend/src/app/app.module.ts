import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { EventsListComponent } from './components/event-area/events-list/events-list.component';
import { AddEventComponent } from './components/event-area/add-event/add-event.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
	declarations: [
		LayoutComponent,
		HomeComponent,
		PageNotFoundComponent,
		EventsListComponent,
		AddEventComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule, 
		BrowserAnimationsModule,
        MatIconModule
	],
	providers: [],
	bootstrap: [LayoutComponent]
})
export class AppModule { }
