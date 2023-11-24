import { Customer } from 'src/app/models/customer.model';

export interface Animal {
    
    animalId?: number;
    name: string;
    breed: string;
    createdAt?: string; 
    customerId: number; 
    customer?: Customer; 
}