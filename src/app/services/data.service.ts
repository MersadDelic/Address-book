/**
 *          NE MIJENJATI!!!
 */

import {Injectable} from '@angular/core';

const LOCAL_STORAGE_DATA_KEY = 'addressBook';
const MIN_DELAY_MS = 100;
const MAX_DELAY_MS = 1500;
const ERROR_CHANCE = 0.1;

@Injectable({ providedIn: 'root' })
export class DataService {

    async readData<T>(initialSeedFn: () => GenericData<T>): Promise<GenericData<T>> {
        const data = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);

        await this.randomDelay();
       // this.throwErrorRandomly();

        if (!data) {
            return initialSeedFn();
        }

        return JSON.parse(data);
    }

    async writeData<T>(data: GenericData<T>): Promise<void> {
        await this.randomDelay();
        // this.throwErrorRandomly();
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
    }

    private randomDelay(): Promise<void> {
        const delayTime = MIN_DELAY_MS + Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS));
        return new Promise(resolve => setTimeout(resolve, delayTime));
    }

    throwErrorRandomly(): void {
        const randomNumber = Math.random();

        if (randomNumber < ERROR_CHANCE) {
            throw new Error('This is API error simulation.');
        }
    }

}

export interface GenericData<T> {
    idCounter: number;
    data: T[];
}
