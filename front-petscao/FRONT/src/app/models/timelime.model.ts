import { Customer } from './customer.model';
import { Animal } from './animal.model';
import { Service } from './service.model';
import { Address } from './address.model';

export interface TimeLine {
    timelineId?: number;
    customerId: number; 
    customer?: Customer;
    animalId: number;
    animal?: Animal;
    serviceId: number;
    service?: Service;
    employeeId: number;
    // employee: Employee;
    startDate?: string;
    endDate?: string;
    createdAt?: string;
}