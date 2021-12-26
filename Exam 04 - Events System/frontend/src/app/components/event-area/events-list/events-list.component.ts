import { EventModel } from './../../../models/event.model';
import { CategoryModel } from './../../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
	selector: 'app-events-list',
	templateUrl: './events-list.component.html',
	styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
	public categories: CategoryModel[];
	public events: EventModel[];
	public value = -1;

	constructor(private eventService: EventsService) { }

	async ngOnInit() {
		try {
			this.categories = await this.eventService.getAllCategories();
		}
		catch (error) {
			console.log(error);
		}
	}

	public async showEvents(args: Event) {
		try {
			let categoryId = (args.target as HTMLSelectElement).value;
			const categories = await this.eventService.getEventsPerCategory(categoryId);
			this.events = categories[0].events;
			this.events.forEach( event => {
				let formattedDateTime = new Date(event.eventTime);
				// event.eventTime = formattedDateTime.toLocaleDateString("en-il") + " " + formattedDateTime.toLocaleTimeString();
				event.eventTime = formattedDateTime.toLocaleString("en-il").slice(0, -3);
			});
			this.value = this.events.length;
		}
		catch (error) {
			console.log(error);
		}
	}
	public async deleteEvent(eventId: string) {
		const answer = window.confirm(
			'Are you sure you want to delete this event?'
		);
		if (!answer) return;
		await this.eventService.deleteEvent(eventId);
		const eventIndex = this.events.findIndex((t) => t._id === eventId);
		this.events.splice(eventIndex, 1);
		alert('Event Deleted');
	}
}


