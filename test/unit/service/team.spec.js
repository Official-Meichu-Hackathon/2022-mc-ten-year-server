import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connectMongo from '../../../libs/connect_mongo';

describe('Test \'teams\' service', () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  });

  let newTeam = null;

  describe('Test \'teams.addTeam\' action', () => {
    it('add a team, should return with the team', async () => {
      const res = await request(app).post('/team/addTeam')
        .send({
          teamname: 'team2',
          category: 'first',
          tag: ['2022', '555'],
          description: '1',
          year: 0,
          ctr: 0,
          upvote: 0,
          award: ['1', '2']
        });
      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        teamname: 'team2'
      }));
      newTeam = res.body;
    });
  });

  describe('Test \'teams.getTeam\' action', () => {
    it('get a team, should return with the team', async () => {
      const res = await request(app).post('/team/getTeam')
        .send({ _id: newTeam._id });
      expect(res.body).toEqual(expect.objectContaining({
        _id: newTeam._id,
        teamname: newTeam.teamname
      }));
    });
  });

  describe('Test \'teams.getTeams\' action', () => {
    it('get teams, should return with the team list', async () => {
      const res = await request(app).post('/team/getTeams');
      expect(res.body.total).toBeGreaterThanOrEqual(1);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Test \'teams.modifyTeam\' action', () => {
    it('modify a team, should return with \'success message\'', async () => {
      const res = await request(app).post('/team/modifyTeam')
        .send({ _id: newTeam._id, ctr: 1, upvote: 1 });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'teams.removeTeam\' action', () => {
    it('remove a team, should return with \'success message\'', async () => {
      const res = await request(app).post('/team/removeTeam')
        .send({ _id: newTeam._id });
      expect(res.body).toHaveProperty('success', true);
    });
  });
});
