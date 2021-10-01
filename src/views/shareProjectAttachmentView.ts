import Share from '../models/SharesProjectAttachmentModel';
import projectAttachmentView from './projectAttachmentView';

export default {
    render(share: Share) {
        return {
            id: share.id,
            email: share.email,
            expire_at: share.expire_at,
            activated: share.activated,
            activated_at: share.activated_at,
            created_by: share.created_by,
            created_at: share.created_at,
            attachment: share.attachment && projectAttachmentView.render(share.attachment),
        }
    },

    renderMany(shares: Share[]) {
        const sharesSorted = shares.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

        return sharesSorted.map(share => this.render(share));
    }
}