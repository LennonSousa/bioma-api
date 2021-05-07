import Project from '../models/ProjectsModel';
import customerView from './customerView';
import bankView from './bankView';
import propertyView from './propertyView';

export default {
    render(project: Project) {
        return {
            id: project.id,
            name: project.name,
            value: project.value,
            deal: project.deal,
            contract: project.contract,
            notes: project.notes,
            warnings: project.warnings,
            created_at: project.created_at,
            updated_at: project.updated_at,
            customer: customerView.render(project.customer),
            bank: bankView.render(project.bank),
            property: propertyView.render(project.property),
            type: project.type,
            status: project.status,
            line: project.line,
            events: project.events,
        }
    },

    renderMany(projects: Project[]) {
        return projects.map(project => this.render(project));
    }
}