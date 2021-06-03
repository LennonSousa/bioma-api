import PropertyAttachment from '../models/PropertyAttachmentsModel';
import propertyView from './propertyView';

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
            property: propertyAttachment.property && propertyView.render(propertyAttachment.property),
        }
    },

    renderDownload(propertyAttachment: PropertyAttachment) {
        return {
            path: `${process.env.UPLOADS_DIR}/properties/${propertyAttachment.property.id}/${propertyAttachment.path}`,
        }
    },

    renderMany(propertyAttachments: PropertyAttachment[]) {
        return propertyAttachments.map(propertyAttachment => this.render(propertyAttachment));
    }
}