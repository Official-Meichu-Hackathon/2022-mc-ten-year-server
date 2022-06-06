import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connectMongo from '../../../libs/connect_mongo';

describe('Test \'staff\' service', () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  });

  let newStaff = null;
  let token = null;

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

  describe('Test \'staff.addStaff\' action', () => {
    it('add a staff, should return with the staff', async () => {
      const res = await request(app).post('/staff/addStaff')
        .send({
          name: 'staff0',
          dept: 'cs',
          content: '1231567890abc',
          memory: ''
        });
      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        name: 'staff0'
      }));
      newStaff = res.body;
    });
  });

  describe('Test \'staff.getStaff\' action', () => {
    it('get a staff, should return with the staff', async () => {
      const res = await request(app).post('/staff/getstaff')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: newStaff._id });
      expect(res.body).toEqual(expect.objectContaining({
        _id: newStaff._id,
        name: newStaff.name
      }));
    });
  });

  describe('Test \'staff.getStaffs\' action', () => {
    it('get staffs, should return with the staff list', async () => {
      const res = await request(app).post('/staff/getstaffs')
        .set('Authorization', `Bearer ${token}`);
      expect(res.body.total).toBeGreaterThanOrEqual(1);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Test \'staff.modifyStaff\' action', () => {
    it('modify a staff, should return with \'success message\'', async () => {
      const res = await request(app).post('/staff/modifyStaff')
        .set('Authorization', `Bearer ${token}`)
        .send({ memory: 'hello world', dept: 'mg', content: 'mechu hackathon is the best event ever!!!', name: 'lin' });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'users.removeStaff\' action', () => {
    it('remove a staff, should return with \'success message\'', async () => {
      const res = await request(app).post('/staff/removeStaff')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: newStaff._id });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'staff.removeStaffs\' action', () => {
    it('remove staffs, should return with \'success message\'', async () => {
      const res = await request(app).post('/staff/removeStaffs')
        .set('Authorization', `Bearer ${token}`);
      expect(res.body.deletedCount).toBeGreaterThanOrEqual(0);
    });
  });
});
