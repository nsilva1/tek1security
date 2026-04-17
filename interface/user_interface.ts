export enum Role {
    GUARD = 'guard',
    CLIENT = 'client',
    ADMIN = 'admin',
    SUPERVISOR = 'supervisor',
    TEK1ADMIN = 'tek1admin',
}

export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    company: string;
    profileImage?: string;
    phoneNumber: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface INewUser {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    company: string;
    profileImage?: string;
    phoneNumber: string;
    password: string;
}

export interface IClient {
    id?: string;
    userId: string;
    contactPerson: IUser;
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
    companyLogo?: string;
    createdAt?: string;
    updatedAt?: string;
}