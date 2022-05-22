import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connectMongo from '../../../libs/connect_mongo';

describe('Test \'questions\' service', () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  });

  // gain token
  let token = null;
  // let newUser = null;

  describe('Test \'users.login\' action', () => {
    it('login, should return with a token', async () => {
      const res = await request(app).post('/user/login').send({
        username: 'testuser',
        password: 'rootroot'
      });
      expect(res.body).toEqual(expect.objectContaining({
        token: expect.anything()
      }));
      token = res.body.token;
    });
  });
  // get token

  let newQuestion = null;

  describe('Test \'questions.addQuestion\' action', () => {
    it('add an question, should return with the question', async () => {
      const res = await request(app).post('/question/addQuestion')
        .set('Authorization', `Bearer ${token}`)
        .send({
          question: 'testtest',
          tags: ['aaaa', 'bbbb'],
          answer: 'ansans',
          worthy: 7,
          createTime: '2020-5-2'
        });
      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        __v: expect.anything(),
        question: 'testtest',
        tags: ['aaaa', 'bbbb'],
        answer: 'ansans',
        worthy: 7,
        createTime: '2020-5-2'
      }));
      newQuestion = res.body;
    });
  });
  describe('Test \'questions.getQuestion\' action', () => {
    it('get an question, should return with the question', async () => {
      const res = await request(app).post('/question/getQuestion')
        .send({ _id: newQuestion._id });
      expect(res.body).toEqual(expect.objectContaining({
        _id: newQuestion._id,
        question: newQuestion.question
      }));
    });
  });

  describe('Test \'questions.getQuestions\'action', () => {
    it('get questions, should return with the question list', async () => {
      const res = await request(app).post('/question/getQuestions');
      expect(res.body.total).toBeGreaterThanOrEqual(1);
      expect(res.body).toHaveProperty('data');/// ///////////
    });
  });

  describe('Test \'questions.modifyQuestion\'action', () => {
    it('modify an question, should return with \'success message\'', async () => {
      const res = await request(app).post('/question/modifyQuestion')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: newQuestion._id,
          question: 'testmodify',
          tags: ['aaaa', 'bbbb', 'modify'],
          answer: 'ansansModify',
          worthy: 3
        });
      expect(res.body).toHaveProperty('success', true);
    });
  });
  describe('Test \'questions.removeQuestion\'action', () => {
    it('remove an question, should return with \'success message\'', async () => {
      const res = await request(app).post('/question/removeQuestion')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: newQuestion._id });
      expect(res.body).toHaveProperty('success', true);
    });
  });
});
