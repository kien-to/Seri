// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, CartProduct, OrderProduct, Order, Message, ChatRoom, User, ChatRoomUser } = initSchema(schema);

export {
  Product,
  CartProduct,
  OrderProduct,
  Order,
  Message,
  ChatRoom,
  User,
  ChatRoomUser
};