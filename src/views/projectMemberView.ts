import ProjectMember from '../models/ProjectMembersModel';
import projectView from './projectView';
import userView from './userView';

export default {
    render(projectMember: ProjectMember) {
        return {
            id: projectMember.id,
            project: projectMember.project && projectView.render(projectMember.project),
            user: projectMember.user && userView.render(projectMember.user),
        }
    },

    renderMany(projectMembers: ProjectMember[]) {
        return projectMembers.map(projectMember => this.render(projectMember));
    }
}