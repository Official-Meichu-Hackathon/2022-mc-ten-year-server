import model from '../models';
import logger from '../libs/logger';
import '../libs/config';

const questionService = {
  async create(params) {
    try {
      const result = await model.Questions.create(params);
      logger.info('[Question Service] Create question successfully');
      return result;
    } catch (error) {
      logger.error('[Question Service] Failed to create question to database:', error);
      throw new Error(`Failed to create question database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const result = await model.Questions.findOne(filter).lean();
      logger.info('[Question Service] Find question successfully');
      return result;
    } catch (error) {
      logger.error('[Question Service]', error);
      throw new Error(`Failed to find questions in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      projection, filter, limit, skip, sort = { order: -1 }
    } = params;

    try {
      const total = await model.Questions.countDocuments(filter).lean();
      const data = await model.Questions.find(filter, projection, { limit, skip, sort }).lean();
      logger.info('[Question Service] Find questions successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Question Service]', error);
      throw new Error(`Failed to find questions in database, ${error}`);
    }
  },
  async updateOne(params) {
    const { _id } = params;
    try {
      const result = await model.Questions.updateOne({ _id }, params).lean();
      logger.info('[Question Service] Update question successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[Question Service]', error);
      throw new Error(`Failed to update question in database, ${error}`);
    }
  },
  async deleteOne(filter) {
    try {
      const result = await model.Questions.deleteOne(filter).lean();
      logger.info('[Question Service] Delete question successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[Question Service]', error);
      throw new Error(`Failed to delete question in database, ${error}`);
    }
  }
};

export default questionService;
