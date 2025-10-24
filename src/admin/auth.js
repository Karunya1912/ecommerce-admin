import { User } from '../models/index.js';

const authenticate = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (user && user.isActive) {
    const isPasswordValid = await user.comparePassword(password);
    if (isPasswordValid) {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      };
    }
  }
  return null;
};

export { authenticate };