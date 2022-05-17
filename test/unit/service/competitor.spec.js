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

  describe('Test \'competitor.addCompetitor\' action', () => {
    it('add a competitor, should return with the competitor', async () => {
      const res = await request(app).post('/competitor/addCompetitor')
        .send({
          name: 'alen',
          phone_number: '0961554133',
          email_address: 'bosyuanhou@gmila.com',
          feedback: 'arbaernetanadfb'
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
        .send({ _id: newCompetitor._id });
      expect(res.body).toEqual(expect.objectContaining({
        __v: 0,
        _id: newCompetitor._id,
        email_address: newCompetitor.email_address,
        feedback: newCompetitor.feedback,
        name: newCompetitor.name,
        phone_number: newCompetitor.phone_number,
      }));
    });
  });

  describe('Test \'competitor.getCompetitors\' action', () => {
    it('get competitors, should return with the competitor list', async () => {
      const res = await request(app).post('/competitor/getCompetitors');
      expect(res.body.total).toBeGreaterThanOrEqual(1);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Test \'competitor.modifyCompetitor\' action', () => {
    it('modify a competitor, should return with \'success message\'', async () => {
      const res = await request(app).post('/competitor/modifyCompetitor')
        // eslint-disable-next-line max-len
        .send({ _id: newCompetitor._id, phone_number: '0000000000', email_address: newCompetitor.email_address, feedback: newCompetitor.feedback });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'competitor.removeCompetitor\' action', () => {
    it('remove a competitor, should return with \'success message\'', async () => {
      const res = await request(app).post('/competitor/removeCompetitor')
        .send({ _id: newCompetitor._id });
      expect(res.body).toHaveProperty('success', true);
    });
  });
});
