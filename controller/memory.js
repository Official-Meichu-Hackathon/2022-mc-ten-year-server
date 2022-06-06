import logger from '../libs/logger';
import service from '../service';
import validator from '../libs/validator';
/*
const idRule = {
  type: 'multi',
  rules: [
    { type: 'string' },
    { type: 'object' }
  ]
};
*/
const memoryController = {
  async addMemory(req, res) {
    const rule = {
      year: {
        type: 'number',
        allowEmpty: false
      },
      theme: {
        type: 'string',
        allowEmpty: false
      },
      design_thought: {
        type: 'string',
        allowEmpty: false
      },
      innovation: {
        type: 'string',
        allowEmpty: false
      },
      convenor: {
        type: 'string',
        allowEmpty: false
      },
      dept: {
        type: 'array',
        item: 'string',
        allowEmpty: false
      },
      participant: {
        type: 'number',
        allowEmpty: false
      },
      system: {
        type: 'array',
        item: 'string',
        allowEmpty: false
      },
      place: {
        type: 'string',
        allowEmpty: false
      }
    };

    try {
      validator.validate(req.body, rule);
      const found = await service.memory.findOne({ year: req.body.year });
      if (found) {
        throw new Error('year already exist');
      }
      const body = await service.memory.create(req.body);
      res.json(body);
    } catch (error) {
      logger.error('[Memory Controller] Failed to addMemory', error);
      res.status(400).json({ message: `Failed to addMemory, ${error}` });
    }
  },
  async getMemory(req, res) {
    const rule = {
      year: {
        type: 'number',
        allowEmpty: false
      }
    };
    try {
      validator.validate(req.body, rule);
      const team = await service.memory.findOne(req.body);
      res.json(team);
    } catch (error) {
      logger.error('[Memory Controller] Failed to getMemory:', error);
      res.status(400).json({ message: `Failed to getMemory, ${error}` });
    }
  },
  async getMemories(req, res) {
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
      const team = await service.memory.findAll(req.body);
      res.json(team);
    } catch (error) {
      logger.error('[Memory Controller] Failed to getMemories:', error);
      res.status(400).json({ message: `Failed to getMemories, ${error}` });
    }
  },

  async modifyMemory(req, res) {
    const rule = {
      year: {
        type: 'number',
        allowEmpty: false,
        optional: true
      },
      theme: {
        type: 'string',
        allowEmpty: false,
        optional: true
      },
      design_thought: {
        type: 'string',
        allowEmpty: false,
        optional: true
      },
      innovation: {
        type: 'string',
        allowEmpty: false,
        optional: true
      },
      convenor: {
        type: 'string',
        allowEmpty: false,
        optional: true
      },
      dept: {
        type: 'array',
        item: 'string',
        allowEmpty: false,
        optional: true
      },
      participant: {
        type: 'number',
        allowEmpty: false,
        optional: true
      },
      system: {
        type: 'array',
        item: 'string',
        allowEmpty: false,
        optional: true
      },
      place: {
        type: 'string',
        allowEmpty: false,
        optional: true
      }
    };

    try {
      validator.validate(req.body, rule);
      const memory = await service.memory.updateOne(req.body);
      res.json(memory);
    } catch (error) {
      logger.error('[Memory Controller] Failed to modifyMemory:', error);
      res.status(400).json({ message: `Failed to modifyMemory, ${error}` });
    }
  },
  async removeMemory(req, res) {
    const rule = {
      year: {
        type: 'number',
        allowEmpty: false
      }
    };
    try {
      validator.validate(req.body, rule);
      const memory = await service.memory.deleteOne(req.body);
      res.json(memory);
    } catch (error) {
      logger.error('[Memory Controller] Failed to removeMemory:', error);
      res.status(400).json({ message: `Failed to removeMemory, ${error}` });
    }
  }
};

export default memoryController;
