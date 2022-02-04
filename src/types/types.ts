export type User = {
  id: number | string;
  email: string;
  password: string;
  role: string;
};

export type Book = {
  author: string;
  country: string;
  language: string;
  pages: number;
  title: string;
  year: number;
};

export type RefreshToken = string;

export type Schema = {
  users: User[];
  books: Book[];
  refreshTokens: RefreshToken[];
};