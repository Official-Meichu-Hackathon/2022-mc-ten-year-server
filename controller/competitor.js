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
const competitorController = {
  async addCompetitor(req, res) {
    const rule = {
      name: {
        type: 'string',
        allowEmpty: false
      },
      phone_number: {
        type: 'string',
        allowEmpty: true
      },
      email_address: {
        type: 'string',
        allowEmpty: true
      },
      feedback: {
        type: 'string',
        allowEmpty: true
      },
      team_id: {
        type: 'multi',
        rules: [
          { type: 'string' },
          { type: 'object' }
        ],
        allowEmpty: false
      }
    };
    try {
      validator.validate(req.body, rule);
      const found = await service.competitor.findOne({ name: req.body.name }); // findOne' s parameter
      if (found) {
        throw new Error('competitor already in use');
      }
      const body = await service.competitor.create(req.body);
      res.json(body);
    } catch (error) {
      logger.error('[Competitor Controller] Failed to register:', error);
      res.status(400).json({ message: `Failed to addCompetitor, ${error}` });
    }
  },
  async getCompetitor(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const competitor = await service.user.findOne(req.body);
      res.json(competitor);
    } catch (error) {
      logger.error('[Competitor Controller] Failed to getCompetitor:', error);
      res.status(400).json({ message: `Failed to getCompetitor, ${error}` });
    }
  },
  async getCompetitors(req, res) { // rule's schema?
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
      const competitor = await service.competitor.findAll(req.body);
      res.json(competitor);
    } catch (error) {
      logger.error('[Competitor Controller] Failed to getCompetitors:', error);
      res.status(400).json({ message: `Failed to getCompetitors, ${error}` });
    }
  },
  async modifyCompetitor(req, res) {
    const rule = {
      name: {
        type: 'forbidden'
      },
      phone_number: {
        type: 'string',
        allowEmpty: true,
        min: 10
      },
      email_address: {
        type: 'string',
        allowEmpty: true
      },
      feedback: {
        type: 'string',
        allowEmpty: true
      },
      team_id: {
        type: 'object',
        allowEmpty: false
      }
    };

    try {
      validator.validate(req.body, rule);
      const competitor = await service.competitor.updateOne(req.body);
      res.json(competitor);
    } catch (error) {
      logger.error('[Competitor Controller] Failed to modifyCompetitor:', error);
      res.status(400).json({ message: `Failed to modifyCompetitor, ${error}` });
    }
  },
  async removeCompetitor(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const competitor = await service.competitor.deleteOne(req.body);
      res.json(competitor);
    } catch (error) {
      logger.error('[Competitor Controller] Failed to removeCompetitor:', error);
      res.status(400).json({ message: `Failed to removeCompetitor, ${error}` });
    }
  }
};

export default competitorController;
