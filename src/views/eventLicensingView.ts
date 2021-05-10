import EventLicensing from '../models/EventsLicensingModel';

export default {
    render(eventLicensing: EventLicensing) {
        return {
            id: eventLicensing.id,
            description: eventLicensing.description,
            done: eventLicensing.done,
            created_by: eventLicensing.created_by,
            created_at: eventLicensing.created_at,
            updated_by: eventLicensing.updated_by,
            updated_at: eventLicensing.updated_at,
            finished_at: eventLicensing.finished_at,
        }
    },

    renderMany(eventsLicensing: EventLicensing[]) {
        return eventsLicensing.map(eventLicensing => this.render(eventLicensing));
    }
}