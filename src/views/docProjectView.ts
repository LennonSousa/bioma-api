import DocProject from '../models/DocsProjectModel';
import projectDocView from './projectDocView';

export default {
    render(docProject: DocProject) {
        return {
            id: docProject.id && docProject.id,
            name: docProject.name,
            active: docProject.active,
            order: docProject.order,
            docs: docProject.docs ? projectDocView.renderMany(docProject.docs) : [],
        }
    },

    renderMany(docProjects: DocProject[]) {
        return docProjects.map(docProject => this.render(docProject));
    }
}