import logger from '../libs/logger';
import service from '../service';
import validator from '../libs/validator';

const idRule = {
  type: 'multi',
  rules: [
    { type: 'string' },
    { type: 'object' }
  ]
};
const staffController = {
  async addStaff(req, res) {
    const rule = {
      memory: {
        // type: { ...idRule },
        type: 'string',
        allowEmpty: true
      },
      dept: {
        type: 'string',
        allowEmpty: false
      },
      content: {
        type: 'string',
        allowEmpty: true,
        min: 10,
        max: 100
      },
      name: {
        type: 'string',
        allowEmpty: false
      }
    };

    try {
      validator.validate(req.body, rule);
      const found = await service.staff.findOne({ name: req.body.name });
      if (found) {
        throw new Error('staffname already in use');
      }
      const body = await service.staff.create(req.body);
      res.json(body);
    } catch (error) {
      // logger.error('[Staff Controller] Failed to add a staff:', error);
      res.status(400).json({ message: `Failed to add a staff, ${error}` });
    }
  },
  async getStaff(req, res) {
    const rule = {
      _id: idRule
    };

    try {
      validator.validate(req.body, rule);
      const staff = await service.staff.findOne(req.body);
      res.json(staff);
    } catch (error) {
      logger.error('[Staff Controller] Failed to getStaff:', error);
      res.status(400).json({ message: `Failed to getStaff, ${error}` });
    }
  },
  async getStaffs(req, res) {
    const rule = {
      filter: {
        type: 'object',
        optional: true
      },
      limit: {
        type: 'number',
        optional: true
      },
      skip: {
        type: 'number',
        optional: true
      },
      sort: {
        type: 'object',
        optional: true
      }
    };

    try {
      validator.validate(req.body, rule);
      const staff = await service.staff.findAll(req.body);
      res.json(staff);
    } catch (error) {
      logger.error('[Staff Controller] Failed to getStaffs:', error);
      res.status(400).json({ message: `Failed to getStaffs, ${error}` });
    }
  },
  async modifyStaff(req, res) {
    const rule = {
      // memory: {
      //   // type: { ...idRule }
      //   type: 'string'
      // },
      _id: idRule,
      dept: {
        type: 'string'
      },
      content: {
        type: 'string',
        min: 10,
        max: 100
      },
      name: {
        type: 'string'
      }
    };

    try {
      validator.validate(req.body, rule);
      const foundStaff = await service.staff.findOne({ _id: req.body._id });
      if (!foundStaff) {
        throw new Error('Staff ID is not exist');
      }
      const staff = await service.staff.updateOne(req.body);
      res.json(staff);
    } catch (error) {
      logger.error('[Staff Controller] Failed to modifyStaff:', error);
      res.status(400).json({ message: `Failed to modifyStaff, ${error}` });
    }
  },
  async removeStaff(req, res) {
    const rule = {
      _id: idRule
    };

    try {
      validator.validate(req.body, rule);
      const staff = await service.staff.deleteOne(req.body);
      res.json(staff);
    } catch (error) {
      logger.error('[User Controller] Failed to removeUser:', error);
      res.status(400).json({ message: `Failed to removeUser, ${error}` });
    }
  },
  async removeStaffs(req, res) {
    const rule = {
      name: {
        type: 'string',
        optional: true
      }
    };

    try {
      validator.validate(req.body, rule);
      req.body.filter = { ...req.body, isAdmin: true };
      const staff = await service.staff.deleteMany(req.body);
      res.json(staff);
    } catch (error) {
      logger.error('[Staff Controller] Failed to removeStaffs:', error);
      res.status(400).json({ message: `Failed to removeStaffs, ${error}` });
    }
  }
};

export default staffController;
