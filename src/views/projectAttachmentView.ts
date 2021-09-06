import ProjectAttachment from '../models/ProjectAttachmentsModel';
import projectView from './projectView';
import logProjectAttachment from './logProjectAttachmentView';

export default {
    render(projectAttachment: ProjectAttachment) {
        return {
            id: projectAttachment.id,
            name: projectAttachment.name,
            path: projectAttachment.path,
            received_at: projectAttachment.received_at,
            expire: projectAttachment.expire,
            expire_at: projectAttachment.expire_at,
            schedule: projectAttachment.schedule,
            schedule_at: projectAttachment.schedule_at,
            order: projectAttachment.order,
            project: projectAttachment.project && projectView.render(projectAttachment.project),
            logs: projectAttachment.logs ? logProjectAttachment.renderMany(projectAttachment.logs) : [],
        }
    },

    renderDownload(projectAttachment: ProjectAttachment) {
        return {
            path: `${process.env.UPLOADS_DIR}/projects/${projectAttachment.project.id}/${projectAttachment.path}`,
        }
    },

    renderMany(projectAttachments: ProjectAttachment[]) {
        const projectAttachmentsSorted = projectAttachments.sort((a, b) => a.order - b.order);

        return projectAttachmentsSorted.map(projectAttachment => this.render(projectAttachment));
    }
}