import { Address } from './address.model';

export interface Supplier {
    supplierId?: number;
    corporateReason: string;
    fantasyName: string;
    cnpj: string;
    phone: string;
    email: string;
    createdAt?: string; 
    addressId: number; 
    address?: Address; 
}