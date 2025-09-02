const createTokenUser = (user) => {
  return { fullName: user.fullName, userId: user._id, email: user.email, role: user.role };
};

module.exports = createTokenUser;
