import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }


  public getAllEvents(): Promise<EventModel[]> {
    return this.http.get<EventModel[]>(environment.eventUrl).toPromise();
  }
  public getAllCategories(): Promise<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
  }
  public getEventsPerCategory(categoryId: string): Promise<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(environment.eventsPerCategoryUrl + categoryId).toPromise();
  }
  public addEvent(event:EventModel): Promise<EventModel> {
    return this.http.post<EventModel>(environment.eventUrl, event).toPromise();
  }
  public deleteEvent(_id: string): Promise<void> {
    return this.http.delete<void>(environment.eventUrl + _id).toPromise();
  }
}
