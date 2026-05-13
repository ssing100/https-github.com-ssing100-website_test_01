import { Timestamp } from 'firebase/firestore';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CarFormData = Omit<Car, 'id' | 'createdAt' | 'updatedAt'>;
