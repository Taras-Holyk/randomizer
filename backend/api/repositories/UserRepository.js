module.exports.createUser = (userInfo) => {
  return User.create(userInfo).fetch();
};

module.exports.findByEmail = (email) => {
  return User.findOne({ email });
};
