import { object, string } from "zod";

export const createOneSchema = object({
  body: object({
    user: string().nonempty(),
    email: string().nonempty(),
  }),
});

export const updateOneSchema = object({
  body: object({
    user: string().nonempty().optional(),
    email: string().nonempty().optional(),
  }),
});
