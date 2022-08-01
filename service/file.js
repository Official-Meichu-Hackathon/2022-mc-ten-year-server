import AWS from 'aws-sdk';
import { v4 as uuidV4 } from 'uuid';
import logger from '../libs/logger';
import models from '../models';

let s3;
const fileTypes = ['ten_year_slide', 'ten_year_thumbnail'];

const formatBucketName = (fileType) => {
  const { AWS_BUCKET_PREFIX } = process.env;
  return `${AWS_BUCKET_PREFIX}-${fileType.replace(/_/g, '-')}`;
};

const fileService = {
  async create(params) {
    const { file, fileName, fileType } = params;

    if (!fileName || !fileType) throw new Error('Insufficient header parameters');

    // Filter file type
    if (!fileTypes.includes(fileType)) throw new Error('Cannot upload file, invalid file type');

    // Prevent from same fileName
    let keyName = '';
    if (fileType === 'ten_year_thumbnail') {
      keyName = `${uuidV4()}_${fileName}.png`;
    } else if (fileType === 'ten_year_slide') {
      keyName = `${uuidV4()}_${fileName}.pdf`;
    }

    const bucketName = formatBucketName(fileType);

    const uploadPromise = (Bucket, Key, Body) => new Promise((resolve, reject) => {
      s3.upload({
        Bucket,
        Key,
        Body,
        ACL: 'public-read'
      }, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    try {
      const data = await uploadPromise(bucketName, keyName, file);
      const result = models.Files.create({
        fileName: data.Key, fileType, url: data.Location
      });
      logger.info(`Upload file successfully, stored at '${data.Location}'`);
      return result;
    } catch (error) {
      logger.error('[File Service]', error);
      throw new Error(`Failed to upload ${fileName} to ${bucketName} in S3, ${error}`);
    }
  },
  async remove(params) {
    const { fileType, fileName, _id } = params;
    const bucketName = formatBucketName(fileType);

    // Filter file type
    if (!fileTypes.includes(fileType)) throw new Error('Cannot remove file, invalid file type');

    const deleteObjectPromise = (Bucket, Key) => new Promise((resolve, reject) => {
      s3.deleteObject({
        Bucket,
        Key
      }, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    try {
      // S3 database
      await deleteObjectPromise(bucketName, fileName);
      // mongodb database
      const result = await models.Files.deleteOne({ _id }).lean();
      logger.info('Remove file successfully');
      return { deletedCount: result.deletedCount };
    } catch (error) {
      logger.error('[File Service]', error);
      throw new Error(1006, `Failed to remove ${fileName} from ${bucketName} in S3, ${error}.`);
    }
  },
  async findOne(filter) {
    try {
      const result = await models.Files.findOne(filter).lean();
      logger.info('[File Service] Find file successfully');
      return result;
    } catch (error) {
      logger.error('[File Service] Failed to find file in database', error);
      throw new Error(`Failed to find file in database, ${error}`);
    }
  },
  async findAll(filter) {
    try {
      const result = await models.Files.find(filter).lean();
      logger.info('[File Service] Find files successfully');
      return result;
    } catch (error) {
      logger.error('[File Service] Failed to find files in database', error);
      throw new Error(`Failed to find files in database, ${error}`);
    }
  },
  async S3Config() {
    const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
    s3 = new AWS.S3({
      region: AWS_REGION,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    });

    const listBucketsPromise = () => new Promise((resolve, reject) => {
      s3.listBuckets((err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
    const createBucketPromise = (Bucket, options) => new Promise((resolve, reject) => {
      s3.createBucket({ Bucket, ...options }, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    try {
      const listBuckets = await listBucketsPromise();
      const bucketNames = listBuckets.Buckets.map((bucket) => bucket.Name);

      const createBucketProcess = [];
      fileTypes.forEach((fileType) => {
        const bucketName = formatBucketName(fileType);
        if (!bucketNames.includes(bucketName)) {
          createBucketProcess.push(createBucketPromise(bucketName));
        }
      });

      await Promise.all(createBucketProcess);
    } catch (error) {
      logger.error(`Failed to create bucket(s), reason: ${error}`);
    }
  }
};

export default fileService;
