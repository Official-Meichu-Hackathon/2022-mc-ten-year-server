import model from '../models';
import logger from '../libs/logger';
import '../libs/config';

const staffService = {
  async create(params) {
    try {
      const result = await model.Staffs.create(params);
      logger.info('[Staff Service] Create staff successfully');
      return result;
    } catch (error) {
      logger.error('[Staff Service] Failed to create staff to database:', error);
      throw new Error(`Failed to create staff database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const result = await model.Staffs.findOne(filter).lean();
      logger.info('[Staff Service] Find staffs successfully');
      return result;
    } catch (error) {
      logger.error('[Staff Service]', error);
      throw new Error(`Failed to find staffs in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      projection, filter, limit, skip, sort = { order: -1 }
    } = params;

    try {
      const total = await model.Staffs.countDocuments(filter).lean();
      const data = await model.Staffs.find(filter, projection, { limit, skip, sort }).lean();
      logger.info('[Staff Service] Find staffs successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Staff Service]', error);
      throw new Error(`Failed to find staffs in database, ${error}`);
    }
  },
  async updateOne(params) {
    const { _id } = params;
    try {
      const result = await model.Staffs.updateOne({ _id }, params).lean();
      logger.info('[Staff Service] Update staff successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[Staff Service]', error);
      throw new Error(`Failed to update staff in database, ${error}`);
    }
  },
  async deleteOne(filter) {
    try {
      const result = await model.Staffs.deleteOne(filter).lean();
      logger.info('[Staff Service] Delete staff successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[Staff Service]', error);
      throw new Error(`Failed to delete staff in database, ${error}`);
    }
  },
  async deleteMany(params) {
    const { filter } = params;
    try {
      const result = await model.Staffs.deleteMany(filter).lean();
      logger.info('[Staff Service] Delete staffs successfully');
      return { deletedCount: result.deletedCount };
    } catch (error) {
      logger.error('[Staff Service]', error);
      throw new Error(`Failed to delete staffs in database, ${error}`);
    }
  }
};

export default staffService;
