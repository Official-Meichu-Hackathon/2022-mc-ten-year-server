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
const userController = {
  async register(req, res) {
    const rule = {
      isAdmin: {
        type: 'boolean',
        allowEmpty: false
      },
      username: {
        type: 'string',
        allowEmpty: false,
        min: 1
      },
      password: {
        type: 'string',
        allowEmpty: false,
        min: 6
      }
      // goodPost: {
      //   type: 'array',
      //   items: idRule
      // },
      // questions: {
      //   type: 'array',
      //   items: idRule
      // }

    };

    try {
      validator.validate(req.body, rule);
      const found = await service.user.findOne({ username: req.body.username });
      if (found) {
        throw new Error('username already in use');
      }
      const body = await service.user.create(req.body);
      res.json(body);
    } catch (error) {
      logger.error('[User Controller] Failed to register:', error);
      res.status(400).json({ message: `Failed to register, ${error}` });
    }
  },
  async getUser(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const user = await service.user.findOne(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to getUser:', error);
      res.status(400).json({ message: `Failed to getUser, ${error}` });
    }
  },
  async getUsers(req, res) {
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
      const user = await service.user.findAll(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to getUsers:', error);
      res.status(400).json({ message: `Failed to getUsers, ${error}` });
    }
  },
  // TODO: unable to delete goodPost
  async modifyUser(req, res) {
    const rule = {
      isAdmin: {
        type: 'forbidden'
      },
      username: {
        type: 'string',
        allowEmpty: false,
        min: 6,
        optional: true
      },
      password: {
        type: 'string',
        allowEmpty: false,
        min: 6
      },
      goodPost: { ...idRule, optional: true },
      deletePost: { ...idRule, optional: true }
      // questions: { ...idRule, optional: true }
    };

    try {
      validator.validate(req.body, rule);

      if (req.body.goodPost && req.body.deletePost) {
        throw new Error('choose either to add or delete goodPost');
      }

      // goodPost
      if (req.body.goodPost) {
        const data = await service.user.findOne({ _id: req.body._id });
        // check if the post exist in PostSchema
        const foundPost = data.goodPost.some((x) => x.equals(req.body.goodPost));
        if (foundPost) throw new Error('goodPost already exist');

        // add the new posts to the params to be updated
        data.goodPost.push(req.body.goodPost);
        req.body.goodPost = data.goodPost;
      }

      // Question
      // if (req.body.questions) {
      //   const data = await service.user.findOne({ _id: req.body._id });
      //   // check if the question exist in QuestionSchema
      //   const foundQuestion = data.questions.some((x) => x.equals(req.body.questions));
      //   if (foundQuestion) throw new Error('question already exist');

      //   // add the new questions to the params to be updated
      //   data.questions.push(req.body.questions);
      //   req.body.questions = data.questions;
      // }
      const user = await service.user.updateOne(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to modifyUser:', error);
      res.status(400).json({ message: `Failed to modifyUser, ${error}` });
    }
  },
  // TODO: fix bug: unable to delete goodPost, questions
  async modifyCurrentUser(req, res) {
    const rule = {
      isAdmin: {
        type: 'forbidden'
      },
      username: {
        type: 'forbidden'
      },
      password: {
        type: 'string',
        allowEmpty: false,
        min: 6
      },
      goodPost: { ...idRule, optional: true },
      questions: { ...idRule, optional: true }
    };

    try {
      validator.validate(req.body, rule);

      // goodPost
      if (req.body.goodPost) {
        const data = await service.user.findOne({ _id: req.user._id });
        // check if the post exist in PostSchema
        const foundPost = data.goodPost.some((x) => x.equals(req.body.goodPost));
        if (foundPost) throw new Error('goodPost already exist');

        // add the new posts to the params to be updated
        data.goodPost.push(req.body.goodPost);
        req.body.goodPost = data.goodPost;
      }

      // Question
      if (req.body.questions) {
        // console.log('question');
        const data = await service.user.findOne({ _id: req.user._id });
        // check if the question exist in QuestionSchema
        const foundQuestion = data.questions.some((x) => x.equals(req.body.questions));
        if (foundQuestion) throw new Error('question already exist');

        // add the new questions to the params to be updated
        data.questions.push(req.body.questions);
        req.body.questions = data.questions;
      }
      req.body._id = req.user._id;
      const user = await service.user.updateOne(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to modifyCurrentUser:', error);
      res.status(400).json({ message: `Failed to modifyCurrentUser, ${error}` });
    }
  },
  async removeUser(req, res) {
    const rule = {
      _id: idRule
    };
    try {
      validator.validate(req.body, rule);
      const admin = await service.user.findOne(req.body);
      if (admin) {
        throw new Error('cannot remove admin');
      }
      const user = await service.user.deleteOne(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to removeUser:', error);
      res.status(400).json({ message: `Failed to removeUser, ${error}` });
    }
  },
  async removeUsers(req, res) {
    const rule = {
      username: {
        type: 'string',
        optional: true
      }
    };
    try {
      validator.validate(req.body, rule);
      req.body.filter = { ...req.body, isAdmin: false };
      const user = await service.user.deleteMany(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to removeUsers:', error);
      res.status(400).json({ message: `Failed to removeUsers, ${error}` });
    }
  },
  async login(req, res) {
    const rule = {
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    };
    try {
      validator.validate(req.body, rule);
      const user = await service.user.login(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to login:', error);
      res.status(400).json({ message: `Failed to login, ${error}` });
    }
  },
  async getCurrentUser(req, res) {
    if (req.user) {
      const user = await service.user.findOne({ _id: req.user._id });
      res.json(user);
    } else {
      res.status(400).json({ message: 'Not signed in yet.' });
    }
  }
};

export default userController;
