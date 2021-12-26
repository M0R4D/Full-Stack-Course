import { EventModel } from "./event.model";

export class CategoryModel {
    _id: string;
    name: string;
    events: EventModel[];
}