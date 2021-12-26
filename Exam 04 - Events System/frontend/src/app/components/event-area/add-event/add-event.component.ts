import { EventModel } from './../../../models/event.model';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-event',
	templateUrl: './add-event.component.html',
	styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
	public categories: CategoryModel[];
	public event = new EventModel();

	constructor(private eventService: EventsService, private router: Router) { }

	async ngOnInit() {
		try {
			this.categories = await this.eventService.getAllCategories();

		} 
		catch (error) {
			alert(error);
		}
	}
	public async addEvent() {
		try {
			this.event = await this.eventService.addEvent(this.event);
			alert("Event added successfully");
			this.router.navigateByUrl('/events');
		} 
		catch (error) {
			alert(error);
		}
	}
}
