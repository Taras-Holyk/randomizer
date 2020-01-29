exports.addPrize = (prizeInfo) => {
  return Prize.create(prizeInfo).fetch();
};

exports.updatePrize = (prizeId, prizeInfo) => {
  return Prize.updateOne({ id: prizeId }).set(prizeInfo);
};

exports.deletePrize = (prizeId) => {
  return Prize.destroyOne({ id: prizeId });
};

exports.findById = (id) => {
  return Prize.findOne({ id });
};

exports.deleteContestPrizes = (contestId) => {
  return Prize.destroy({ contest: contestId });
};
