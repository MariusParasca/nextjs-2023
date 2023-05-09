import { Document, Types } from 'mongoose';

export type MongooseDocument<T> = Document<unknown, {}, T> &
  Omit<
    T & {
      _id: Types.ObjectId;
    },
    never
  >;

export type RequestParams<T> = {
  params: T;
};
