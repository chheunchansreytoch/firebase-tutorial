export interface IUser {
  key: string;
  createdAt: Date;
  createdBy: any;
  updatedAt: any;
  updatedBy: any;
  keywords: Array<any>;
  pageKey: number;
  dateKey: number;
  isDeleted: boolean;
  isPublished: boolean;
  firstname: string;
  lastname: string;
  email: string;
  address: any;
  password: string;
}
