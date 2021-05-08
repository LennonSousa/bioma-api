import ProjectType from '../models/ProjectTypesModel';

export default {
    render(projectType: ProjectType) {
        return {
            id: projectType.id,
            name: projectType.name,
            order: projectType.order,
        }
    },

    renderMany(projectTypes: ProjectType[]) {
        return projectTypes.map(projectType => this.render(projectType));
    }
}