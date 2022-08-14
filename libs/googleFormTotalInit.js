import model from '../models';

const init = {
  // eslint-disable-next-line consistent-return
  async count() {
    const total = await model.GoogleForms.countDocuments().lean();
    if (total === 0) {
      const totalId = await model.GoogleForms.create({
        total: form.dataSet
      });
      return totalId;
    }
    const temp = await model.GoogleForms.find().lean();
    const totalId = temp[0]._id;
    return totalId;
  }
};

export default init;
