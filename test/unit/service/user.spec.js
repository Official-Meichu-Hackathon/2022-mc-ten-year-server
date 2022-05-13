import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connectMongo from '../../../libs/connect_mongo';

// To UserController removeUsers() and "delete "isAdmin" in filter"
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
  let notAdmin = null;
  let token = null;
  let notAdminToken = null;

  describe('Test \'users.register\' action', () => {
    it('add an user, should return with the user', async () => {
      const res = await request(app).post('/user/register')
        .send({
          isAdmin: true,
          username: 'testuser',
          password: 'rootroot'
        });
      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        username: 'testuser',
        isAdmin: true
      }));
      newUser = res.body;
    });
  });

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

  describe('Test \'users.register(notAdmin)\' action', () => {
    it('add an user, should return with the user', async () => {
      const res = await request(app).post('/user/register')
        .send({
          isAdmin: false,
          username: 'notAdmin',
          password: 'rootroot'
        });
      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        username: 'notAdmin',
        isAdmin: false
      }));
      notAdmin = res.body;
    });
  });

  describe('Test \'users.login(notAdmin)\' action', () => {
    it('login, should return with a token', async () => {
      const res = await request(app).post('/user/login').send({
        username: 'notAdmin',
        password: 'rootroot'
      });
      expect(res.body).toEqual(expect.objectContaining({
        token: expect.anything()
      }));
      notAdminToken = res.body.token;
    });
  });

  describe('Test \'users.getUser\' action', () => {
    it('get an user, should return with the user', async () => {
      const res = await request(app).post('/user/getUser')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: notAdmin._id });
      expect(res.body).toEqual(expect.objectContaining({
        _id: notAdmin._id,
        username: notAdmin.username,
        __v: notAdmin.__v,
        goodPost: notAdmin.goodPost,
        password: notAdmin.password
      }));
    });
  });

  describe('Test \'users.getUsers\' action', () => {
    it('get users, should return with the user list', async () => {
      const res = await request(app).post('/user/getUsers')
        .set('Authorization', `Bearer ${token}`);
      expect(res.body.total).toBeGreaterThanOrEqual(1);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Test \'users.modifyUser\' action', () => {
    it('modify an user, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/modifyUser')
        .set('Authorization', `Bearer ${token}`)
        .send({ password: '654321', goodPost: null, deletePost: null });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'users.modifyCurrentUser\' action', () => {
    it('modify an user, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/modifyCurrentUser')
        .set('Authorization', `Bearer ${notAdminToken}`)
        .send({ password: '654321' });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'users.getCurrentUser\' action', () => {
    it('get current user, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/getCurrentUser')
        .set('Authorization', `Bearer ${token}`);
      expect(res.body).toEqual(expect.objectContaining({
        _id: newUser._id,
        __v: newUser.__v,
        goodPost: newUser.goodPost,
        isAdmin: newUser.isAdmin,
        password: newUser.password,
        username: newUser.username
      }));
    });
  });

  describe('Test \'users.removeUser\' action', () => {
    it('remove an user, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/removeUser')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: notAdmin._id });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'users.removeUsers\' action', () => {
    it('remove users, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/removeUsers')
        .set('Authorization', `Bearer ${token}`);
      expect(res.body.deletedCount).toBeGreaterThanOrEqual(0);
    });
  });
});
