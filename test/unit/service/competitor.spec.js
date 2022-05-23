import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connectMongo from '../../../libs/connect_mongo';

describe('Test \'competitor\' service', () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  });

  let newCompetitor = null;
  let token = null;

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

  describe('Test \'competitor.addCompetitor\' action', () => {
    it('add a competitor, should return with the competitor', async () => {
      const res = await request(app).post('/competitor/addCompetitor')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'alen',
          phone_number: '0961554133',
          email_address: 'bosyuanhou@gmila.com',
          feedback: 'arbaernetanadfb',
          team_id: '507f191e810c19729de860ea'
        });
      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        name: 'alen'
      }));
      newCompetitor = res.body;
    });
  });

  describe('Test \'competitor.getCompetitor\' action', () => {
    it('get a competitor, should return with the competitor', async () => {
      const res = await request(app).post('/competitor/getCompetitor')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: newCompetitor._id });
      expect(res.body).toEqual(expect.objectContaining({
        __v: 0,
        _id: newCompetitor._id,
        email_address: newCompetitor.email_address,
        feedback: newCompetitor.feedback,
        name: newCompetitor.name,
        phone_number: newCompetitor.phone_number,
        team_id: newCompetitor.team_id
      }));
    });
  });

  describe('Test \'competitor.getCompetitors\' action', () => {
    it('get competitors, should return with the competitor list', async () => {
      const res = await request(app).post('/competitor/getCompetitors')
        .set('Authorization', `Bearer ${token}`);
      expect(res.body.total).toBeGreaterThanOrEqual(1);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Test \'competitor.modifyCompetitor\' action', () => {
    it('modify a competitor, should return with \'success message\'', async () => {
      const res = await request(app).post('/competitor/modifyCompetitor')
        .set('Authorization', `Bearer ${token}`)
        // eslint-disable-next-line max-len
        .send({ _id: newCompetitor._id, phone_number: '0000000000', email_address: newCompetitor.email_address, feedback: newCompetitor.feedback });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'competitor.removeCompetitor\' action', () => {
    it('remove a competitor, should return with \'success message\'', async () => {
      const res = await request(app).post('/competitor/removeCompetitor')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: newCompetitor._id });
      expect(res.body).toHaveProperty('success', true);
    });
  });
});
