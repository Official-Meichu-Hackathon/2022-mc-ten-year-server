import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connectMongo from '../../../libs/connect_mongo';

// To UserController removeUsers() and "delete "isAdmin" in filter"
describe('Test \'memory\' service', () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  });

  let newMemory = null;
  let token = null;

  // describe('Test \'users.register\' action', () => {
  //   it('add an user, should return with the user', async () => {
  //     const res = await request(app).post('/user/register')
  //       .send({
  //         isAdmin: true,
  //         username: 'testuser',
  //         password: 'rootroot'
  //       });
  //     expect(res.body).toEqual(expect.objectContaining({
  //       _id: expect.anything(),
  //       username: 'testuser',
  //       isAdmin: true
  //     }));
  //     // newUser = res.body;
  //   });
  // });

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

  describe('Test \'memory.addMemory\' action', () => {
    it('add a memory, should return with the memory', async () => {
      const res = await request(app).post('/memory/addMemory')
        .set('Authorization', `Bearer ${token}`)
        .send({
          year: 2077,
          theme: 'code description',
          design_thought: 'Cyberpunk style',
          innovation: 'Add some groups',
          convenor: 'People',
          dept: ['Financial', 'Develop', 'Design'],
          participant: 500,
          system: ['Software', 'Hardware'],
          place: 'Place'
        });
      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        year: 2077
      }));
      newMemory = res.body;
    });
  });

  describe('Test \'memory.getMemory\' action', () => {
    it('get a memory, should return with the memory', async () => {
      const res = await request(app).post('/memory/getMemory')
        .send({ year: newMemory.year });
      expect(res.body).toEqual(expect.objectContaining({
        _id: newMemory._id,
        year: newMemory.year,
        theme: newMemory.theme,
        design_thought: newMemory.design_thought,
        innovation: newMemory.innovation,
        convenor: newMemory.convenor,
        dept: newMemory.dept,
        participant: newMemory.participant,
        system: newMemory.system,
        place: newMemory.place
      }));
    });
  });

  describe('Test \'memory.getMemories\' action', () => {
    it('get memories, should return with the memory list', async () => {
      const res = await request(app).post('/memory/getMemories');
      expect(res.body.total).toBeGreaterThanOrEqual(1);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Test \'memory.modifyMemory\' action', () => {
    it('modify a memory, should return with \'success message\'', async () => {
      const res = await request(app).post('/memory/modifyMemory')
        .set('Authorization', `Bearer ${token}`)
        .send({ innovation: 'AAAAAAAA', participant: 777 });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'memory.removeMemory\' action', () => {
    it('remove a memory, should return with \'success message\'', async () => {
      const res = await request(app).post('/memory/removeMemory')
        .set('Authorization', `Bearer ${token}`)
        .send({ year: newMemory.year });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  // describe('Test \'users.removeUsers\' action', () => {
  //   it('remove users, should return with \'success message\'', async () => {
  //     const res = await request(app).post('/user/removeUsers')
  //       .set('Authorization', `Bearer ${token}`);
  //     expect(res.body.deletedCount).toBeGreaterThanOrEqual(0);
  //   });
  // });
});
