import { User } from '@prisma/client';

export const responseUserField = (user: User) => {
  const { id, email, firstName } = user;
  return {
    id,
    firstName,
    email,
  };
};
