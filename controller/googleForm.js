/* eslint-disable no-await-in-loop */
import logger from '../libs/logger';
import service from '../service';
import model from '../models';
import googleInit from '../libs/googleFormTotalInit';

const googleFormController = {
  async readAllData(req, res) {
    const result = {};
    try {
      for (let { index } = res; index <= res.total; index += 1) {
        const form = await service.googleForm.readAllData(index);

        const x = form.data[0];
        // Team
        const teamBody = await service.team.create({
          teamname: x[4],
          email_address: x[11],
          phone_number: x[14],
          category: x[2],
          year: x[1],
          tag: x[12],
          description: x[5],
          ctr: 0,
          upvote: 0,
          award: x[3]
        });
        result.team = teamBody;

        // google drive service (pdf)
        const slideTemp = x[9].substring(x[9].indexOf('=') + 1);
        const slide = await service.googleDrive.uploadFile(slideTemp, 'application/pdf');
        const pdfResult = await service.file.create({ file: slide.data, fileName: x[6], fileType: 'ten_year_slide' });

        // google drive service (png)
        let imageResult = {};
        if (x[7].length === 0) {
          imageResult.url = '';
        } else {
          const thumbTemp = x[7].substring(x[7].indexOf('=') + 1);
          const thumbnail = await service.googleDrive.uploadFile(thumbTemp, 'image/png');
          imageResult = await service.file.create({
            file: thumbnail.data, fileName: x[6], fileType: 'ten_year_thumbnail' });
        }

        // Post
        const postBody = await service.post.create({
          name: x[6],
          description: x[8],
          short_description: x[8].substring(0, 30),
          slide: pdfResult.url,
          link: x[10],
          thumbnail_path: imageResult.url,
          team_id: teamBody._id
        });

        result.post = postBody;

        // Competitor
        let num = 13;
        for (let i = 0; i < 6; i += 1) {
          let competitorNum = 0;
          if (x[num].length === 0) {
            num += 5;
            i += 1;
          } else {
          // eslint-disable-next-line no-await-in-loop
            const temp = await service.competitor.create({
              name: x[num],
              is_leader: (num === 13),
              phone_number: x[num += 1],
              email_address: x[num += 1],
              feedback: x[num += 1],
              team_id: teamBody._id
            });

            const newProp = `competitor-${competitorNum + 1}`;
            result[newProp] = temp;
            competitorNum += 1;
            num += 2;
          }
        }
      }

      // only shows the latest result
      res.json(result);
    } catch (error) {
      logger.error('[GoogleForm Controller] Failed to readAllData:', error);
      res.status(400).json({ message: `Failed to readAllData, ${error}` });
    }
  },
  async reset(req, res) {
    const totalId = await googleInit.count();
    const result = await model.GoogleForms.updateOne({ _id: totalId }, { total: 0 }).lean();
    res.json(result);
  }
};

export default googleFormController;
