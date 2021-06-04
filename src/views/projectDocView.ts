import ProjectDoc from '../models/ProjectDocsModel';
import projectView from './projectView';
import docProjectView from './docProjectView';

export default {
    render(projectDoc: ProjectDoc) {
        return {
            id: projectDoc.id,
            path: projectDoc.path,
            received_at: projectDoc.received_at,
            checked: projectDoc.checked,
            project: projectDoc.project && projectView.render(projectDoc.project),
            doc: projectDoc.doc && docProjectView.render(projectDoc.doc),
        }
    },

    renderMany(projectDocs: ProjectDoc[]) {
        return projectDocs.map(projectDoc => this.render(projectDoc));
    }
}