import logger from '../libs/logger';
import service from '../service';

const googleFormController = {
  async readAllData(req, res) {
    try {
      const form = await service.googleForm.readAllData();
      const result = {};

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
        for (let i = 0; i < 6; i += 1) {
          let num = 13;
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
          }
        }

        res.json(result);
      });
    } catch (error) {
      logger.error('[GoogleForm Controller] Failed to readAllData:', error);
      res.status(400).json({ message: `Failed to readAllData, ${error}` });
    }
  }
};

export default googleFormController;
