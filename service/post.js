import model from '../models';
import logger from '../libs/logger';
import '../libs/config';

const postService = {
  async create(params) {
    try {
      const result = await model.Posts.create(params);
      logger.info('[Post Service] Create post successfully');
      return result;
    } catch (error) {
      logger.error('[Post Service] Failed to create post to database:', error);
      throw new Error(`Failed to create post to database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const result = await model.Posts.findOne(filter).lean();
      logger.info('[Post Service] Find post successfully');
      return result;
    } catch (error) {
      logger.error('[Post Service] Failed to find post in database:', error);
      throw new Error(`Failed to find post in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      projection, filter, limit, skip, sort = { order: -1 }
    } = params;

    try {
      const total = await model.Posts.countDocuments(filter).lean();
      const data = await model.Posts.find(filter, projection, { limit, skip, sort }).lean();
      logger.info('[Post Service] Find posts successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Post Service] Failed to find posts in database:', error);
      throw new Error(`Failed to find posts in database, ${error}`);
    }
  },
  async updateOne(params) {
    const { _id } = params;
    try {
      const result = await model.Posts.updateOne({ _id }, params).lean();
      logger.info('[Post Service] Update post successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[Post Service] Failed to update post in database:', error);
      throw new Error(`Failed to update post in database, ${error}`);
    }
  },
  async deleteOne(filter) {
    try {
      const result = await model.Posts.deleteOne(filter).lean();
      logger.info('[Post Service] Delete post successfully');
      return { deletedCount: result.deletedCount };
    } catch (error) {
      logger.error('[Post Service] Failed to delete post in database:', error);
      throw new Error(`Failed to delete post in database, ${error}`);
    }
  },
  async deleteMany(filter) {
    try {
      const result = await model.Posts.deleteMany(filter).lean();
      logger.info('[Post Service] Delete posts successfully');
      return { deletedCount: result.deletedCount };
    } catch (error) {
      logger.error('[Post Service] Failed to delete posts in database:', error);
      throw new Error(`Failed to delete posts in database, ${error}`);
    }
  }
};

export default postService;
