import EventLicensing from '../models/EventsLicensingModel';

export default {
    render(eventLicensing: EventLicensing) {
        return {
            id: eventLicensing.id,
            description: eventLicensing.description,
            done: eventLicensing.done,
            created_at: eventLicensing.created_at,
            updated_at: eventLicensing.updated_at,
            finished_at: eventLicensing.finished_at,
        }
    },

    renderMany(eventsLicensing: EventLicensing[]) {
        return eventsLicensing.map(eventLicensing => this.render(eventLicensing));
    }
}