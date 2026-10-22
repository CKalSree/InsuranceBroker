import { BaseRepository } from './baseRepository.js';
import type { Employee } from '../types/common.js';

export class EmployeesRepository extends BaseRepository {
  async findAll(): Promise<Employee[]> {
    return this.execute<Employee>(`SELECT * FROM Employees ORDER BY LastName, FirstName;`);
  }

  async findById(id: number): Promise<Employee | null> {
    return this.executeSingle<Employee>(`SELECT * FROM Employees WHERE EmployeeID = ?;`, [id]);
  }

  async findByBroker(brokerId: number): Promise<Employee[]> {
    return this.execute<Employee>(`SELECT * FROM Employees WHERE BrokerID = ? ORDER BY LastName, FirstName;`, [brokerId]);
  }

  async create(payload: Omit<Employee, 'EmployeeID' | 'CreatedAt'>): Promise<Employee> {
    const { BrokerID, FirstName, LastName, Email, DateOfBirth, EmploymentStatus } = payload;
    const result = await this.executeNonQuery(
      `INSERT INTO Employees (BrokerID, FirstName, LastName, Email, DateOfBirth, EmploymentStatus)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [BrokerID, FirstName, LastName, Email, DateOfBirth ?? null, EmploymentStatus],
    );

    const created = await this.findById(result.insertId);
    if (!created) {
      throw new Error('Failed to create employee');
    }

    return created;
  }

  async update(id: number, payload: Partial<Omit<Employee, 'EmployeeID' | 'CreatedAt'>>): Promise<Employee | null> {
    const entries = Object.entries(payload).filter(([key]) => key !== 'EmployeeID');
    const fields = entries.map(([key]) => `${key} = ?`).join(', ');

    if (!fields) {
      return this.findById(id);
    }

    const values = entries.map(([, value]) => value);
    await this.executeNonQuery(`UPDATE Employees SET ${fields} WHERE EmployeeID = ?;`, [...values, id]);

    return this.findById(id);
  }
}
