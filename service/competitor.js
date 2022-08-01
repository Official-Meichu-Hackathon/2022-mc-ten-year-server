import model from '../models';
import logger from '../libs/logger';
import '../libs/config';

const competitorService = {
  async create(params) {
    try {
      const result = await model.Competitors.create(params);
      logger.info('[Competitor Service] Create competitor successfully');
      return result;
    } catch (error) {
      logger.error('[Competitor Service] Failed to create competitor to database:', error);
      throw new Error(`Failed to create competitor database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const result = await model.Competitors.findOne(filter).lean();
      logger.info('[Competitor Service] Find competitor successfully');
      return result;
    } catch (error) {
      logger.error('[Competitor Service]', error);
      throw new Error(`Failed to find competitor in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      projection, filter, limit, skip, sort = { order: -1 }
    } = params;

    try {
      const total = await model.Competitors.countDocuments(filter).lean();
      const data = await model.Competitors.find(filter, projection, { limit, skip, sort }).lean();
      logger.info('[Competitor Service] Find competitors successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Competitor Service]', error);
      throw new Error(`Failed to find competitors in database, ${error}`);
    }
  },
  async updateOne(params) {
    const { _id } = params;
    try {
      const result = await model.Competitors.updateOne({ _id }, params).lean();
      logger.info('[Competitor Service] Update competitor successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[Competitor Service]', error);
      throw new Error(`Failed to update competitor in database, ${error}`);
    }
  },
  async deleteOne(filter) {
    try {
      const result = await model.Competitors.deleteOne(filter).lean();
      logger.info('[Competitor Service] Delete competitor successfully');
      return { deletedCount: result.deletedCount };
    } catch (error) {
      logger.error('[Competitor Service]', error);
      throw new Error(`Failed to delete competitor in database, ${error}`);
    }
  }
};

export default competitorService;
