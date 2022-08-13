import service from '../service';
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
  fileName: {
    type: 'string',
    allowEmpty: false
  },
  fileType: {
    type: 'enum',
    allowEmpty: false,
    values: ['ten_year_thumbnail', 'ten_year_slide']
  }
};

const fileController = {
  async addFile(req, res) {
    const { filename: fileName, filetype: fileType } = req.headers;
    const params = {
      fileName,
      fileType
    };

    try {
      validator.validate(params, fileRule);
      const result = await service.file.create({ ...params, file: req.body });
      res.send(result);
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
      const result = await service.file.findOne(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[File Controller] Failed to getFile');
      res.status(400).json({ message: `Failed to getFile, ${error}` });
    }
  },
  async getFiles(req, res) {
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
      const result = await service.file.findAll(req.body);
      res.json(result);
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
      const deletedFile = await service.file.findOne(req.body);
      const params = {
        _id: req.body._id,
        fileName: deletedFile.fileName,
        fileType: deletedFile.fileType
      };
      const result = await service.file.remove(params);
      res.json(result);
    } catch (error) {
      logger.error('[File Controller] Failed to remove Files');
      res.status(400).json({ message: `Failed to remove Files, ${error}` });
    }
  }
};

export default fileController;
