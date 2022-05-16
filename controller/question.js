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
const questionController = {
  async addQuestion(req, res) {
    const rule = {
      question: {
        type: 'string',
        allowEmpty: false
      },
      tags: {
        type: 'array',
        allowEmpty: true
      },
      answer: {
        type: 'string',
        allowEmpty: false
      },
      worthy: {
        type: 'number',
        allowEmpty: false
      },
      createTime: {
        type: 'string',
        allowEmpty: false
      }
    };
    try {
      validator.validate(req.body, rule);
      const body = await service.question.create(req.body);
      res.json(body);
    } catch (error) {
      logger.error('[Question Controller] Failed to add question:', error);
      res.status(400).json({ message: `Failed to add question, ${error}` });
    }
  },

  async getQuestion(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const question = await service.question.findOne(req.body);
      res.json(question);
    } catch (error) {
      logger.error('[Question Controller] Failed to getQuestion:', error);
      res.status(400).json({ message: `Failed to getQuestion, ${error}` });
    }
  },
  // 5/9/0134
  // getquestions have not done
  async getQuestions(req, res) {
    const rule = {
      filter: {
        type: 'string',
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
      const question = await service.question.findAll(req.body);
      res.json(question);
    } catch (error) {
      logger.error('[Question Controller] Failed to getQuestions:', error);
      res.status(400).json({ message: `Failed to getQuestions, ${error}` });
    }
  },
  async modifyQuestion(req, res) {
    const rule = {
      question: {
        type: 'string',
        allowEmpty: false
      },
      tags: [{
        type: 'string',
        allowEmpty: true
      }],
      // if addqustion is used by us
      answer: {
        type: 'string',
        required: false
      },
      worthy: {
        type: 'number',
        allowEmpty: true
      },
      createTime: {
        type: 'forbidden'
      }
    };
    try {
      validator.validate(req.body, rule);
      const question = await service.question.updateOne(req.body);
      res.json(question);
    } catch (error) {
      logger.error('[Question Controller] Failed to modifyQuestion:', error);
      res.status(400).json({ message: `Failed to modifyQuestion, ${error}` });
    }
  },
  // 是否需要是 admin

  async removeQuestion(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const question = await service.question.deleteOne(req.body);
      res.json(question);
    } catch (error) {
      logger.error('[Question Controller] Failed to removeQuestion:', error);
      res.status(400).json({ message: `Failed to removeQuestion, ${error}` });
    }
  }
};

export default questionController;
