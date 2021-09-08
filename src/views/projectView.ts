import Project from '../models/ProjectsModel';
import projectDocView from './projectDocView';
import customerView from './customerView';
import bankView from './bankView';
import propertyView from './propertyView';
import projectTypeView from './projectTypeView';
import projectStatusView from './projectStatusView';
import projectLineView from './projectLineView';
import eventProjectView from './eventProjectView';
import attachmentView from './projectAttachmentView';
import memberView from './projectMemberView';
import logProjectView from './logProjectView';

export default {
    render(project: Project) {
        return {
            id: project.id,
            value: project.value,
            deal: project.deal,
            paid: project.paid,
            paid_date: project.paid_date,
            contract: project.contract,
            analyst: project.analyst,
            analyst_contact: project.analyst_contact,
            notes: project.notes,
            warnings: project.warnings,
            warnings_text: project.warnings_text,
            created_by: project.created_by,
            created_at: project.created_at,
            updated_by: project.updated_by,
            updated_at: project.updated_at,
            docs: project.docs ? projectDocView.renderMany(project.docs) : [],
            customer: project.customer && customerView.render(project.customer),
            bank: project.bank && bankView.render(project.bank),
            property: project.property && propertyView.render(project.property),
            type: project.type && projectTypeView.render(project.type),
            status: project.status && projectStatusView.render(project.status),
            line: project.line && projectLineView.render(project.line),
            events: project.events ? eventProjectView.renderMany(project.events) : [],
            attachments: project.attachments ? attachmentView.renderMany(project.attachments) : [],
            members: project.members ? memberView.renderMany(project.members) : [],
            logs: project.logs ? logProjectView.renderMany(project.logs) : [],
        }
    },

    renderMany(projects: Project[]) {
        return projects.map(project => this.render(project));
    }
}