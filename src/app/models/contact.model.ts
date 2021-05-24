/**
 *          NE MIJENJATI!!!
 */

export interface ContactModel {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress?: string;
    address?: string;
    phoneNumber?: string;
}

export interface ContactWriteModel {
    firstName: string;
    lastName: string;
    emailAddress?: string;
    address?: string;
    phoneNumber?: string;
}
