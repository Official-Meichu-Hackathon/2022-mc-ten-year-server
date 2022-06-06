import model from '../models';
import logger from '../libs/logger';
import '../libs/config';

const memoryService = {
  async create(params) {
    try {
      const result = await model.Memory.create(params);
      logger.info('[Memory Service] Create memory successfully');
      return result;
    } catch (error) {
      logger.error('[Memory Service] Failed to create memory to database:', error);
      throw new Error(`Failed to create memory database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const result = await model.Memory.findOne(filter).lean();
      logger.info('[Memory Service] Find memory successfully');
      return result;
    } catch (error) {
      logger.error('[Memory Service]', error);
      throw new Error(`Failed to find memory in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      projection, filter, limit, skip, sort = { order: -1 }
    } = params;

    try {
      const total = await model.Memory.countDocuments(filter).lean();
      const data = await model.Memory.find(filter, projection, { limit, skip, sort }).lean();
      logger.info('[Memory Service] Find memories successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Memory Service]', error);
      throw new Error(`Failed to find memory in database, ${error}`);
    }
  },

  async updateOne(params) {
    const { _id } = params;
    try {
      const result = await model.Memory.updateOne({ _id }, params).lean();
      logger.info('[Memory Service] Update memory successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[Memory Service]', error);
      throw new Error(`Failed to update memory in database, ${error}`);
    }
  },
  async deleteOne(filter) {
    try {
      const result = await model.Memory.deleteOne(filter).lean();
      logger.info('[Memory Service] Delete memory successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[Memory Service]', error);
      throw new Error(`Failed to delete memory in database, ${error}`);
    }
  }
};

export default memoryService;
