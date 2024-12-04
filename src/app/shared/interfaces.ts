export interface IUser {
    name: string;
    nickName: string;
    email: string;
    isAdmin?: boolean;
}

export interface IUserBase {
    name: string;
    nickName: string;
    email: string;
    isAdmin?: boolean;
    created: Date;
    recipesCount: number;
}