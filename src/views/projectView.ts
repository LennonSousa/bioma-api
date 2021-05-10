import Project from '../models/ProjectsModel';
import customerView from './customerView';
import bankView from './bankView';
import propertyView from './propertyView';
import projectTypeView from './projectTypeView';
import projectStatusView from './projectStatusView';
import projectLineView from './projectLineView';
import eventProjectView from './eventProjectView';

export default {
    render(project: Project) {
        return {
            id: project.id,
            value: project.value,
            deal: project.deal,
            contract: project.contract,
            notes: project.notes,
            warnings: project.warnings,
            created_by: project.created_by,
            created_at: project.created_at,
            updated_by: project.updated_by,
            updated_at: project.updated_at,
            customer: customerView.render(project.customer),
            bank: bankView.render(project.bank),
            property: propertyView.render(project.property),
            type: projectTypeView.render(project.type),
            status: projectStatusView.render(project.status),
            line: projectLineView.render(project.line),
            events: project.events ? eventProjectView.renderMany(project.events) : [],
        }
    },

    renderMany(projects: Project[]) {
        return projects.map(project => this.render(project));
    }
}