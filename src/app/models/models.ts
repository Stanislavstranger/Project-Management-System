import { ObjectId } from "bson";

export interface User {
  readonly _id: string;
  name: string;
  login: string;
  password: string;
}

export interface Board {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
}

export interface Column {
  _id?: string;
  title: string;
  order: number;
  boardId?: string;
}

export interface Task {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
}

export interface File {
  readonly _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

export interface Point {
  readonly _id: string;
  title: string;
  taskId: number;
  boardId: string;
  done: boolean;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
}

export interface NewColumnData {
  id: string;
}

export interface NewTaskData {
  board: Board;
  columnId: string;
}

export interface CreateNewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface EditTask {
  title: string;
  order: number;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
}

export interface EditUserData {
  name: string;
  login: string;
  password: any;
}
