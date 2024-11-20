import { User } from '@prisma/client';

export const responseUserField = (user: User) => {
  const { id, email, firstName, isCompany } = user;
  return {
    id,
    firstName,
    email,
    isCompany,
  };
};

export type responseField<T = unknown> = {
  status: number;
  message: string;
  data?: T;
  total?: number;
  page?: number;
  limit?: number;
};
