import { EntityRepository, Repository } from 'typeorm';

import EventsLicensingModel from '../models/EventsLicensingModel';

@EntityRepository(EventsLicensingModel)
class EventsLicensingRepository extends Repository<EventsLicensingModel> { }

export { EventsLicensingRepository };