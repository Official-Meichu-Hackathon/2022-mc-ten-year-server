import logger from '../libs/logger';
import service from '../service';
import model from '../models';

const totalId = '62f83bc2b844dd2b523c05dc';
const googleFormController = {
  async readAllData(req, res) {
    const result = {};
    try {
      const form = await service.googleForm.readAllData();

      // 寫死
      // const totalId = await model.GoogleForms.create({
      //   total: form.dataSet
      // });

      // console.log(totalId);

      const before = await model.GoogleForms.findOne({
        _id: totalId
      });

      // the number of dataSets have been collected during last time
      const { total } = before;

      if (total === form.dataSet) {
        result.message = { message: 'no new dataSet to be read',
          dataSet: form.dataSet };
      } else {
      // avoid reading in repeated records
        for (let i = 0; i < total; i += 1) {
          form.data.shift();
        }

        // update the new record number
        await model.GoogleForms.updateOne({ _id: totalId }, { total: form.dataSet }).lean();

        form.data.forEach(async (x) => {
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

          // Post
          const postBody = await service.post.create({
            name: x[6],
            description: x[8],
            short_description: x[8].substring(0, 30),
            slide: x[9],
            link: x[10],
            thumbnail_path: x[7],
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
        });
      }

      // only shows the latest result
      res.json(result);
    } catch (error) {
      logger.error('[GoogleForm Controller] Failed to readAllData:', error);
      res.status(400).json({ message: `Failed to readAllData, ${error}` });
    }
  },
  async reset(req, res) {
    const result = await model.GoogleForms.updateOne({ _id: totalId }, { total: 0 }).lean();
    res.json(result);
  }
};

export default googleFormController;
