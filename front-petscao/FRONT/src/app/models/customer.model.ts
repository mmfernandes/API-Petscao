import { Address } from './address.model';

export interface Customer {
    customerId?: number;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    createdAt?: string; 
    addressId: number; 
    address?: Address; 
}