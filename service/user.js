import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import model from '../models';
import logger from '../libs/logger';
import '../libs/config';

const jwtKey = process.env.JWT_KEY;
const saltRound = 10;

const userService = {
  async create(params) {
    try {
      const salt = await bcrypt.genSalt(saltRound);
      const hashPassword = await bcrypt.hash(params.password, salt);
      // eslint-disable-next-line no-param-reassign
      params.password = hashPassword;
      const result = await model.Users.create(params);
      logger.info('[User Service] Create user successfully');
      return result;
    } catch (error) {
      logger.error('[User Service] Failed to create user to database:', error);
      throw new Error(`Failed to create user database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const result = await model.Users.findOne(filter).lean();
      logger.info('[User Service] Find user successfully');
      return result;
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to find users in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      projection, filter, limit, skip, sort = { order: -1 }
    } = params;

    try {
      const total = await model.Users.countDocuments(filter).lean();
      const data = await model.Users.find(filter, projection, { limit, skip, sort }).lean();
      logger.info('[User Service] Find users successfully');
      return { total, data };
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to find users in database, ${error}`);
    }
  },
  async login(params) {
    const { username, password } = params;
    try {
      const user = await model.Users.findOne({ username }).lean();
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        logger.info('[User Service] Correct username');
        const token = jwt.sign(
          { _id: user._id, username: user.username },
          jwtKey
        );
        return { token };
      }
      return { success: false };
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error('Invalid user login data');
    }
  },
  async updateOne(params) {
    const { _id } = params;
    if (params.password) {
      const salt = await bcrypt.genSalt(saltRound);
      const hashPassword = await bcrypt.hash(params.password, salt);
      // eslint-disable-next-line no-param-reassign
      params.password = hashPassword;
    }

    try {
      const result = await model.Users.updateOne({ _id }, params).lean();
      logger.info('[User Service] Update user successfully');
      return result.n > 0 ? { success: true } : {};
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to update user in database, ${error}`);
    }
  }
};

export default userService;