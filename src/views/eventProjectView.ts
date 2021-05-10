import EventProject from '../models/EventsProjectModel';

export default {
    render(eventProject: EventProject) {
        return {
            id: eventProject.id,
            description: eventProject.description,
            done: eventProject.done,
            created_by: eventProject.created_by,
            created_at: eventProject.created_at,
            updated_by: eventProject.updated_by,
            updated_at: eventProject.updated_at,
            finished_at: eventProject.finished_at,
        }
    },

    renderMany(eventsProject: EventProject[]) {
        return eventsProject.map(eventProject => this.render(eventProject));
    }
}