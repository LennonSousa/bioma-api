import PropertyAttachment from '../models/PropertyAttachmentsModel';
import propertyView from './propertyView';
import logPropertyAttachment from './logPropertyAttachmentView';
import sharePropertyAttachmentView from './sharePropertyAttachmentView';

export default {
    render(propertyAttachment: PropertyAttachment) {
        return {
            id: propertyAttachment.id,
            name: propertyAttachment.name,
            path: propertyAttachment.path,
            received_at: propertyAttachment.received_at,
            expire: propertyAttachment.expire,
            expire_at: propertyAttachment.expire_at,
            schedule: propertyAttachment.schedule,
            schedule_at: propertyAttachment.schedule_at,
            order: propertyAttachment.order,
            property: propertyAttachment.property && propertyView.render(propertyAttachment.property),
            logs: propertyAttachment.logs ? logPropertyAttachment.renderMany(propertyAttachment.logs) : [],
            shares: propertyAttachment.shares ? sharePropertyAttachmentView.renderMany(propertyAttachment.shares) : [],
        }
    },

    renderDownload(propertyAttachment: PropertyAttachment) {
        return {
            path: `${process.env.UPLOADS_DIR}/properties/${propertyAttachment.property.id}/${propertyAttachment.path}`,
        }
    },

    renderMany(propertyAttachments: PropertyAttachment[]) {
        const propertyAttachmentsSorted = propertyAttachments.sort((a, b) => a.order - b.order);

        return propertyAttachmentsSorted.map(propertyAttachment => this.render(propertyAttachment));
    }
}