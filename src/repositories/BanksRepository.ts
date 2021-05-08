import { EntityRepository, Repository } from 'typeorm';

import BanksModel from '../models/BanksModel';

@EntityRepository(BanksModel)
class BanksRepository extends Repository<BanksModel> { }

export { BanksRepository };