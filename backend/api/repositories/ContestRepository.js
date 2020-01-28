exports.createContest = (contestInfo) => {
  return Contest.create(contestInfo).fetch();
};

exports.updateContest = (contestId, contestInfo) => {
  return Contest.updateOne({ id: contestId }).set(contestInfo);
};

exports.deleteContest = (contestId) => {
  return Contest.destroyOne({ id: contestId });
};

exports.findById = (id) => {
  return Contest.findOne({ id });
};

exports.findByPermalink = (permalink) => {
  return Contest.findOne({ permalink });
};

exports.getPaginatedContests = (skip, first) => {
  return Contest.find().skip(skip).limit(first);
};

exports.getAllContestsCount = () => {
  return Contest.count();
};
