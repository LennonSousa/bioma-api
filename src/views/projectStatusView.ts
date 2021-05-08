import ProjectStatus from '../models/ProjectStatusModel';

export default {
    render(projectStatus: ProjectStatus) {
        return {
            id: projectStatus.id,
            name: projectStatus.name,
            order: projectStatus.order,
        }
    },

    renderMany(projectStatus: ProjectStatus[]) {
        return projectStatus.map(projectState => this.render(projectState));
    }
}