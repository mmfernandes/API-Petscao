import { Address } from './address.model';

export interface Employee {
    employeeId?: number
    name: string
    cpf: string
    phone: string
    email: string
    address?: Address
    addressId: number
    createdAt?: string; 

}