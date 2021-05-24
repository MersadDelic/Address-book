/**
 *          NE MIJENJATI!!!
 */

import {Injectable} from '@angular/core';
import {contactsData} from '../data/contacts.data';
import {ContactModel, ContactWriteModel} from '../models/contact.model';
import {PageModel} from '../models/page.model';
import {DataService, GenericData} from './data.service';

@Injectable({providedIn: 'root'})
export class ContactsService {

    constructor(
        private readonly dataService: DataService,
    ) {
    }

    async getContacts(query?: GetContactsQuery): Promise<PageModel<ContactModel>> {
        const data = await this.dataService.readData(() => this.getInitialSeed());
        const contacts = data.data;
        const page = query?.page || 1;
        const perPage = query?.perPage || 20;
        const searchString = query?.searchString?.toLowerCase() || '';
        const foundContacts = searchString ?
            contacts.filter(c =>
                c.firstName.toLowerCase().includes(searchString) ||
                c.lastName.toLowerCase().includes(searchString) ||
                c.emailAddress?.toLowerCase().includes(searchString)) :
            contacts;

        const thisPageFirstIndex = (page - 1) * perPage;
        const nextPageFirstIndex = thisPageFirstIndex + perPage;

        const totalItems = foundContacts.length;
        const totalPages = Math.ceil(totalItems / perPage);

        return {
            page,
            perPage,
            totalItems,
            totalPages,
            data: foundContacts
                .filter((_, i) => i >= thisPageFirstIndex && i < nextPageFirstIndex)
                .map(c => ({ ...c })),
        };
    }

    async getContactById(id: number): Promise<ContactModel> {
        const foundContact = await this.findById(id);
        return { ...foundContact };
    }

    async createContact(contact: ContactWriteModel): Promise<ContactModel> {
        const data = await this.dataService.readData(() => this.getInitialSeed());
        const contacts = data.data;

        const newContact = {
            ...contact,
            id: data.idCounter + 1,
        } as ContactModel;

        const newContacts = [
            ...contacts,
            newContact,
        ];

        await this.dataService.writeData({
            idCounter: data.idCounter + 1,
            data: newContacts,
        });

        return {
            ...newContact,
        };
    }

    async updateContact(id: number, contact: ContactWriteModel): Promise<void> {
        const data = await this.dataService.readData(() => this.getInitialSeed());
        const contacts = data.data;
        const foundContact = contacts.find(c => c.id === id);

        if (!foundContact) {
            throw new Error('Contact not found');
        }

        foundContact.firstName = contact.firstName;
        foundContact.lastName = contact.lastName;
        foundContact.emailAddress = contact.emailAddress;
        foundContact.address = contact.address;
        foundContact.phoneNumber = contact.phoneNumber;

        this.dataService.writeData({
            data: contacts,
            idCounter: data.idCounter,
        });
    }

    async deleteContact(id: number): Promise<void> {
        const data = await this.dataService.readData(() => this.getInitialSeed());
        const contacts = data.data;
        const index = contacts.findIndex(c => c.id === id);

        if (index === -1) {
            throw new Error('Contact not found');
        }

        contacts.splice(index, 1);

        this.dataService.writeData({
            data: contacts,
            idCounter: data.idCounter,
        });
    }

    //#region Private
    private async findById(id: number): Promise<ContactModel> {
        const data = await this.dataService.readData(() => this.getInitialSeed());
        const contacts = data.data;
        const foundContact = contacts.find(c => c.id === id);

        if (!foundContact) {
            throw new Error('Contact not found');
        }

        return foundContact;
    }

    private getInitialSeed(): GenericData<ContactModel> {
        return {
            idCounter: contactsData.length,
            data: contactsData,
        };
    }
    //#endregion

}

export interface GetContactsQuery {
    page?: number;
    perPage?: number;
    searchString?: string;
}
