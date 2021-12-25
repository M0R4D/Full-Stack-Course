import VacationModel from "../Models/VacationModel";


export class VacationsState {
    public vacations: VacationModel[] = []; 
}

// Vacation Action Type: 
export enum VacationsActionType {
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted"
}

// Vacation Action:
export interface VacationAction {
    type: VacationsActionType;
    payload?: any; 
}

// Vacation Action Creators: 
export function vacationsDownloadedAction(vacations: VacationModel[]): VacationAction {
    return { type: VacationsActionType.VacationsDownloaded, payload: vacations };
}
export function vacationAddedAction(addedVacation: VacationModel): VacationAction {
    return { type: VacationsActionType.VacationAdded, payload: addedVacation };
}
export function vacationUpdatedAction(updatedVacation: VacationModel): VacationAction {
    return { type: VacationsActionType.VacationUpdated, payload: updatedVacation };
}
export function vacationDeletedAction(id: number): VacationAction {
    return { type: VacationsActionType.VacationDeleted, payload: id };
}

// Vacation Reducer: 
export function vacationsReducer(currentState: VacationsState = new VacationsState(), action: VacationAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.VacationsDownloaded: // payload = all vacations
            newState.vacations = action.payload;
            break;

        case VacationsActionType.VacationAdded: // payload = added vacation
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.VacationUpdated: // payload = updated vacation
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationID === action.payload.vacationID);
            newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.VacationDeleted: // payload = vacation id to delete
            const indexToDelete = newState.vacations.findIndex(v => v.vacationID === action.payload);
            newState.vacations.splice(indexToDelete, 1);
            break;
    }

    return newState;

}