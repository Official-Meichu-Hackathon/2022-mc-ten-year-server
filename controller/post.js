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
const generalPostRule = {
  name: {
    type: 'string',
    optional: true
  },
  description: {
    type: 'string',
    optional: true
  },
  short_description: {
    type: 'string',
    max: 30,
    optional: true
  },
  slide: {
    type: 'string',
    optional: true
  },
  link: {
    type: 'array',
    items: 'string',
    optional: true
  },
  thumbnail_path: {
    type: 'string',
    optional: true
  },
  team_id: {
    ...idRule,
    optional: true
  }
};
const postController = {
  async addPost(req, res) {
    const rule = {
      name: {
        type: 'string',
        allowEmpty: false
      },
      description: {
        type: 'string',
        allowEmpty: false
      },
      short_description: {
        type: 'string',
        max: 30,
        allowEmpty: false
      },
      slide: {
        type: 'string',
        allowEmpty: false
      },
      link: {
        type: 'array',
        items: 'string',
        optional: true
      },
      thumbnail_path: {
        type: 'string',
        optional: true
      },
      team_id: {
        ...idRule,
        allowEmpty: false
      }
    };

    try {
      validator.validate(req.body, rule);
      // const foundTeam = await service.team.findOne({ _id: req.body.team_id });
      // if (!foundTeam) {
      //  throw new Error('team not found');
      // }
      const body = await service.post.create(req.body);
      res.json(body);
    } catch (error) {
      logger.error('[Post Controller] Failed to addpost:', error);
      res.status(400).json({ message: `Failed to addpost, ${error}` });
    }
  },
  async getPost(req, res) {
    const rule = {
      _id: idRule
    };

    try {
      validator.validate(req.body, rule);
      const post = await service.post.findOne(req.body);
      res.json(post);
    } catch (error) {
      logger.error('[Post Controller] Failed to getPost:', error);
      res.status(400).json({ message: `Failed to getPost, ${error}` });
    }
  },
  async getPosts(req, res) {
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
      if (req.body.filter != null) validator.validate(req.body.filter, generalPostRule);
      const post = await service.post.findAll(req.body);
      res.json(post);
    } catch (error) {
      logger.error('[Post Controller] Failed to getPosts:', error);
      res.status(400).json({ message: `Failed to getPosts, ${error}` });
    }
  },
  async modifyPost(req, res) {
    const rule = {
      _id: {
        ...idRule,
        allowEmpty: false
      },
      ...generalPostRule
    };

    try {
      validator.validate(req.body, rule);
      // const foundTeam = await service.team.findOne({ _id: req.body.team_id });
      // if (!foundTeam) {
      //  throw new Error('team not found');
      // }
      if (req.body.thumbnail_path != null && req.body.thumbnail_path === '') req.body.thumbnail_path = 'placeHolder';
      const post = await service.post.updateOne(req.body);
      res.json(post);
    } catch (error) {
      logger.error('[Post Controller] Failed to modifyPost:', error);
      res.status(400).json({ message: `Failed to modifyPost, ${error}` });
    }
  },
  async removePost(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const post = await service.post.deleteOne(req.body);
      res.json(post);
    } catch (error) {
      logger.error('[Post Controller] Failed to removePost:', error);
      res.status(400).json({ message: `Failed to removePost, ${error}` });
    }
  },
  async removePosts(req, res) {
    const rule = generalPostRule;
    try {
      validator.validate(req.body, rule);
      const post = await service.post.deleteMany(req.body);
      res.json(post);
    } catch (error) {
      logger.error('[Post Controller] Failed to removePosts:', error);
      res.status(400).json({ message: `Failed to removePosts, ${error}` });
    }
  }
};

export default postController;
