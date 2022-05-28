import model from '../models';
import logger from '../libs/logger';
import '../libs/config';

const teamService = {
  async create(params) {
    try {
      const result = await model.Teams.create(params);
      logger.info('[Team Service] Create team successfully');
      return result;
    } catch (error) {
      logger.error('[Team Service] Failed to create team to database:', error);
      throw new Error(`Failed to create team database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const result = await model.Teams.findOne(filter).lean();
      logger.info('[Team Service] Find team successfully');
      return result;
    } catch (error) {
      logger.error('[Team Service]', error);
      throw new Error(`Failed to find team in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      projection, filter, limit, skip, sort = { order: -1 }
    } = params;

    try {
      const total = await model.Teams.countDocuments(filter).lean();
      const data = await model.Teams.find(filter, projection, { limit, skip, sort }).lean();
      logger.info('[Team Service] Find teams successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Team Service]', error);
      throw new Error(`Failed to find teams in database, ${error}`);
    }
  },
  async updateOne(params) {
    const { _id } = params;

    try {
      const result = await model.Teams.updateOne({ _id }, params).lean();
      logger.info('[Team Service] Update team successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[Team Service]', error);
      throw new Error(`Failed to update team in database, ${error}`);
    }
  },
  async deleteOne(filter) {
    try {
      const result = await model.Teams.deleteOne(filter).lean();
      logger.info('[Team Service] Delete team successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[Team Service]', error);
      throw new Error(`Failed to delete team in database, ${error}`);
    }
  }
};

export default teamService;
