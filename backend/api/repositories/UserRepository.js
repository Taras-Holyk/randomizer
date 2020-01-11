module.exports.createUser = (userInfo) => {
  return User.create(userInfo).fetch();
};

module.exports.findByEmail = (email) => {
  return User.findOne({ email });
};

module.exports.findById = (id) => {
  return User.findOne({ id });
};
