import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connectMongo from '../../../libs/connect_mongo';

describe('Test \'users\' service', () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  });

  let newUser = null;

  describe('Test \'users.register\' action', () => {
    it('add an user, should return with the user', async () => {
      const res = await request(app).post('/user/register')
        .send({
          isAdmin: false,
          username: 'test1',
          password: 'rootroot'
        });
      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        username: 'test1'
      }));
      newUser = res.body;
    });
  });

  describe('Test \'users.getUser\' action', () => {
    it('get an user, should return with the user', async () => {
      const res = await request(app).post('/user/getUser')
        .send({ _id: newUser._id });
      expect(res.body).toEqual(expect.objectContaining({
        _id: newUser._id,
        username: newUser.username
      }));
    });
  });

  describe('Test \'users.getUsers\' action', () => {
    it('get users, should return with the user list', async () => {
      const res = await request(app).post('/user/getUsers');
      expect(res.body.total).toBeGreaterThanOrEqual(1);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Test \'users.login\' action', () => {
    it('login, should return with a token', async () => {
      const res = await request(app).post('/user/login').send({
        username: 'test1',
        password: 'rootroot'
      });
      expect(res.body).toEqual(expect.objectContaining({
        token: expect.anything()
      }));
    });
  });

  describe('Test \'users.modifyUser\' action', () => {
    it('modify an user, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/modifyUser')
        .send({ _id: newUser._id, password: 'test-modify' });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'users.removeUser\' action', () => {
    it('remove an user, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/removeUser')
        .send({ _id: newUser._id });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'users.removeUsers\' action', () => {
    it('remove users, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/removeUsers')
        .send({ username: newUser.username });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'users.getCurrentUser\' action', () => {
    it('get current user, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/getCurrentUser')
        .send({ _id: newUser._id });
      expect(res.body).toEqual({ message: 'Not signed in yet.' });
    });
  });
});
