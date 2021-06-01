import ProjectAttachment from '../models/ProjectAttachmentsModel';
import projectView from './projectView';

export default {
    render(projectAttachment: ProjectAttachment) {
        return {
            id: projectAttachment.id,
            name: projectAttachment.name,
            path: projectAttachment.path,
            received_at: projectAttachment.received_at,
            expire: projectAttachment.expire,
            expire_at: projectAttachment.expire_at,
            project: projectAttachment.project && projectView.render(projectAttachment.project),
        }
    },

    renderDownload(projectAttachment: ProjectAttachment) {
        return {
            path: `${process.env.UPLOADS_DIR}/projects/${projectAttachment.project.id}/${projectAttachment.path}`,
        }
    },

    renderMany(projectAttachments: ProjectAttachment[]) {
        return projectAttachments.map(projectAttachment => this.render(projectAttachment));
    }
}