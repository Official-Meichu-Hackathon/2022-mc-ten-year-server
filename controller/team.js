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
const teamController = {
  async addTeam(req, res) {
    const rule = {
      teamname: {
        type: 'string',
        allowEmpty: false
      },
      category: {
        type: 'string',
        allowEmpty: false
      },
      year: {
        type: 'number',
        allowEmpty: false
      },
      tag: {
        type: 'array',
        allowEmpty: false
      },
      description: {
        type: 'string',
        allowEmpty: true
      },
      ctr: {
        type: 'number',
        allowEmpty: false
      },
      upvote: {
        type: 'number',
        allowEmpty: false
      },
      award: {
        type: 'array',
        allowEmpty: true
      }
    };
    try {
      validator.validate(req.body, rule);
      const found = await service.team.findOne({ teamname: req.body.teamname });
      if (found) {
        throw new Error('teamname already in use');
      }
      const body = await service.team.create(req.body);
      res.json(body);
    } catch (error) {
      logger.error('[Team Controller] Failed to addTeam:', error);
      res.status(400).json({ message: `Failed to addTeam, ${error}` });
    }
  },
  async getTeam(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const team = await service.team.findOne(req.body);
      res.json(team);
    } catch (error) {
      logger.error('[Team Controller] Failed to getTeam:', error);
      res.status(400).json({ message: `Failed to getTeam, ${error}` });
    }
  },
  async getTeams(req, res) {
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
      const team = await service.team.findAll(req.body);
      res.json(team);
    } catch (error) {
      logger.error('[Team Controller] Failed to getTeams:', error);
      res.status(400).json({ message: `Failed to getTeams, ${error}` });
    }
  },
  async modifyTeam(req, res) {
    const rule = {
      _id: idRule,
      teamname: {
        type: 'forbidden'
      },
      category: {
        type: 'forbidden'
      },
      year: {
        type: 'forbidden'
      },
      tag: {
        type: 'forbidden'
      },
      description: {
        type: 'forbidden'
      },
      ctr: {
        type: 'number',
        allowEmpty: false
      },
      upvote: {
        type: 'number',
        allowEmpty: false
      },
      award: {
        type: 'forbidden'
      }
    };
    //
    try {
      validator.validate(req.body, rule);
      const foundTeam = await service.team.findOne({ _id: req.body._id });
      if (!foundTeam) {
        throw new Error('Team ID is not exist');
      }
      const team = await service.team.updateOne(req.body);
      res.json(team);
    } catch (error) {
      logger.error('[Team Controller] Failed to modifyTeam:', error);
      res.status(400).json({ message: `Failed to modifyTeam, ${error}` });
    }
  },
  async removeTeam(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const team = await service.team.deleteOne(req.body);
      res.json(team);
    } catch (error) {
      logger.error('[Team Controller] Failed to removeTeam:', error);
      res.status(400).json({ message: `Failed to removeTeam, ${error}` });
    }
  }
};

export default teamController;
