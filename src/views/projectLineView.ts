import ProjectLine from '../models/ProjectLinesModel';

export default {
    render(projectLine: ProjectLine) {
        return {
            id: projectLine.id,
            name: projectLine.name,
            order: projectLine.order,
        }
    },

    renderMany(projectLines: ProjectLine[]) {
        return projectLines.map(projectLine => this.render(projectLine));
    }
}