import User from '../schemas/userSchema.js';

export const getAllUsersService = async () => {
  return await User.find().select('-password').sort({ createdAt: -1 });
};

export const getUserByIdService = async (id) => {
  return await User.findById(id).select('-password');
};

export const deleteUserService = async (id) => {
  return await User.findByIdAndDelete(id);
};
