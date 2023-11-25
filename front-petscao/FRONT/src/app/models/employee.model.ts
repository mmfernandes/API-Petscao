import { Address } from './address.model';

export interface Employee {
    EmployeeId?: number
    Name: string
    CPF: string
    Phone: string
    Email: string
    Address?: Address
    AddressId: number
    createdAt?: string; 

}