import service from 'service';
import validator from '../libs/validator';
import logger from '../libs/logger';

const idRule = {
  type: 'multi',
  rules: [
    { type: 'string' },
    { type: 'object' }
  ]
};

const fileRule = {
  name: {
    type: 'string',
    allowEmpty: false
  },
  url: {
    type: 'string',
    allowEmpty: 'false'
  },
  type: {
    type: 'enum',
    allowEmpty: false,
    value: ['thumbnail', 'slide']
  }
};

const fileController = {
  async addFile(req, res) {
    const { name, url, type } = req.headers;
    const params = {
      data: req.body,
      name,
      url,
      type
    };

    try {
      validator.validate(params, fileRule);
      // const result = await service.file.create(params);
      // res.send(result)
    } catch (error) {
      logger.error('[File Controller] Failed to addFile(upload)', error);
      res.status(400).json({ message: `Failed to addFile(upload), ${error}` });
    }
  },
  async getFile(req, res) {
    const rule = {
      _id: idRule
    };

    try {
      validator.validate(req.body, rule);
      // const result = await service.file.findOne(req.body);
      // res.json(result);
    } catch (error) {
      logger.error('[File Controller] Failed to getFile');
      res.status(400).json({ message: `Failed to getFile, ${error}` });
    }
  },
  async getFiles(req, res) {
    const rule = {
      _id: idRule,
      filter: {
        type: 'object',
        optional: true
      },
      limit: {
        type: 'number',
        optiona: true
      },
      skip: {
        type: 'number',
        optional: true
      },
      sort: {
        type: 'object',
        optiona: true
      }
    };

    try {
      validator.validate(req.body, rule);
      // const result = await service.file.find(req.body);
      // res.json(result);
    } catch (error) {
      logger.error('[File Controller] Failed to getFiles', error);
      res.status(400).json({ message: `Failed to getFiles, ${error}` });
    }
  },
  async removeFile(req, res) {
    const rule = {
      _id: idRule
    };

    try {
      validator.validate(req.body, rule);
      // const result = service.file.remove(req.boy);
      // res.json(result);
    } catch (error) {
      logger.error('[File Controller] Failed to remove Files');
      res.status(400).json({ message: `Failed to remove Files, ${error}` });
    }
  }
};

export default fileController;
