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

  let newTeam = null;

  describe('Test \'teams.addTeam\' action', () => {
    it('add a team, should return with the team', async () => {
      const res = await request(app).post('/team/addTeam')
        .set('Authorization', `Bearer ${token}`)
        .send({
          teamname: 'team',
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
        teamname: 'team'
      }));
      newTeam = res.body;
    });
  });

  describe('Test \'teams.getTeam\' action', () => {
    it('get a team, should return with the team', async () => {
      const res = await request(app).post('/team/getTeam')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: newTeam._id });
      expect(res.body).toEqual(expect.objectContaining({
        _id: newTeam._id,
        teamname: newTeam.teamname
      }));
    });
  });

  describe('Test \'teams.getTeams\' action', () => {
    it('get teams, should return with the team list', async () => {
      const res = await request(app).post('/team/getTeams')
        .set('Authorization', `Bearer ${token}`);
      expect(res.body.total).toBeGreaterThanOrEqual(1);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Test \'teams.modifyTeam\' action', () => {
    it('modify a team, should return with \'success message\'', async () => {
      const res = await request(app).post('/team/modifyTeam')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: newTeam._id, ctr: 1, upvote: 1 });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'teams.removeTeam\' action', () => {
    it('remove a team, should return with \'success message\'', async () => {
      const res = await request(app).post('/team/removeTeam')
        .set('Authorization', `Bearer ${token}`)
        .send({ _id: newTeam._id });
      expect(res.body).toHaveProperty('success', true);
    });
  });
});
