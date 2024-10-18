import { User } from '@prisma/client';

export const responseUserField = (user: User) => {
  const { id, email, firstName } = user;
  return {
    id,
    firstName,
    email,
  };
};

export type responseField<T = unknown> = {
  status: number;
  message: string;
  data?: T;
};
