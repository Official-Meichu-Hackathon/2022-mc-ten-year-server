import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connectMongo from '../../../libs/connect_mongo';

describe('Test \'post\' service', () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  });

  let newPost = null;

  describe('Test \'post.addPost\' action', () => {
    it('add a post, should return with the post', async () => {
      const res = await request(app).post('/post/addPost')
        .send({
          name: 'postName',
          description: 'This is a long description.',
          short_description: 'A short description',
          slide: 'slide link',
          link: ['linkA', 'linkB'],
          thumbnail_path: 'path',
          team_id: '61d634706a98a61111111111'
        });
      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        name: 'postName',
        description: 'This is a long description.',
        short_description: 'A short description',
        slide: 'slide link',
        link: ['linkA', 'linkB'],
        thumbnail_path: 'path',
        team_id: '61d634706a98a61111111111'
      }));
      newPost = res.body;
    });
  });

  describe('Test \'post.addPost\' action', () => {
    it('add a post, should return with the post', async () => {
      const res = await request(app).post('/post/addPost')
        .send({
          name: 'postName',
          description: 'This is a long description.',
          short_description: 'A short description',
          slide: 'slide link',
          link: ['linkA', 'linkB'],
          team_id: '61d634706a98a61111111111'
        });
      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        name: 'postName',
        description: 'This is a long description.',
        short_description: 'A short description',
        slide: 'slide link',
        link: ['linkA', 'linkB'],
        thumbnail_path: 'placeHolder',
        team_id: '61d634706a98a61111111111'
      }));
    });
  });

  describe('Test \'post.getPost\' action', () => {
    it('get a post, should return with the post', async () => {
      const res = await request(app).post('/post/getPost')
        .send({ _id: newPost._id });
      expect(res.body).toEqual(expect.objectContaining({
        _id: newPost._id,
        name: 'postName',
        description: 'This is a long description.',
        short_description: 'A short description',
        slide: 'slide link',
        link: ['linkA', 'linkB'],
        thumbnail_path: 'path',
        team_id: '61d634706a98a61111111111'
      }));
    });
  });

  describe('Test \'post.getPosts\' action', () => {
    it('get posts, should return with the post list', async () => {
      const res = await request(app).post('/post/getPosts')
        .send({ filter: { name: 'postName' } });
      expect(res.body).toHaveProperty('total');
      expect(res.body.total).toBeGreaterThanOrEqual(2);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data[0]).toEqual(expect.objectContaining({
        team_id: '61d634706a98a61111111111'
      }));
    });
  });

  describe('Test \'post.modifyPost\' action', () => {
    it('modify a post, should return with \'success message\'', async () => {
      const res = await request(app).post('/post/modifyPost')
        .send({ _id: newPost._id, description: 'This is a new long description.' });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'post.removePost\' action', () => {
    it('remove a post, should return with \'success message\'', async () => {
      const res = await request(app).post('/post/removePost')
        .send({ _id: newPost._id });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'post.removePosts\' action', () => {
    it('remove posts, should return with \'success message\'', async () => {
      const res = await request(app).post('/post/removePosts')
        .send({ team_id: '61d634706a98a61111111111' });
      expect(res.body.deletedCount).toBeGreaterThanOrEqual(0);
    });
  });
});
