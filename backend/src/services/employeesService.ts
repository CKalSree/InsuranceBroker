import { EmployeesRepository } from '../repositories/employeesRepository.js';
import type { Employee } from '../types/common.js';
import { employeeSchema } from '../utils/validation.js';

export class EmployeesService {
  constructor(private readonly repository = new EmployeesRepository()) {}

  async list(): Promise<Employee[]> {
    return this.repository.findAll();
  }

  async listByBroker(brokerId: number): Promise<Employee[]> {
    return this.repository.findByBroker(brokerId);
  }

  async getById(id: number): Promise<Employee> {
    const employee = await this.repository.findById(id);
    if (!employee) {
      const error = new Error('Employee not found') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    return employee;
  }

  async create(input: unknown): Promise<Employee> {
    const payload = employeeSchema.parse(input);

    const normalized = {
      ...payload,
      DateOfBirth: payload.DateOfBirth ? payload.DateOfBirth : null,
    };

    return this.repository.create(normalized);
  }

  async update(id: number, input: unknown): Promise<Employee> {
    const payload = employeeSchema.partial().parse(input);
    const updated = await this.repository.update(id, payload as Partial<Omit<Employee, 'EmployeeID' | 'CreatedAt'>>);

    if (!updated) {
      const error = new Error('Employee not found') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    return updated;
  }
}
