import { BaseRepository } from './baseRepository.js';
import type { Enrollment } from '../types/common.js';

export class EnrollmentsRepository extends BaseRepository {
  async findAll(): Promise<Enrollment[]> {
    return this.execute<Enrollment>(`SELECT * FROM Enrollments ORDER BY EnrollmentDate DESC;`);
  }

  async findById(id: number): Promise<Enrollment | null> {
    return this.executeSingle<Enrollment>(`SELECT * FROM Enrollments WHERE EnrollmentID = ?;`, [id]);
  }

  async findByEmployee(employeeId: number): Promise<Enrollment[]> {
    return this.execute<Enrollment>(`SELECT * FROM Enrollments WHERE EmployeeID = ? ORDER BY EnrollmentDate DESC;`, [employeeId]);
  }

  async findByBroker(brokerId: number): Promise<Enrollment[]> {
    return this.execute<Enrollment>(`SELECT * FROM Enrollments WHERE BrokerID = ? ORDER BY EnrollmentDate DESC;`, [brokerId]);
  }

  async create(payload: Omit<Enrollment, 'EnrollmentID' | 'CreatedAt'>): Promise<Enrollment> {
    const { EmployeeID, PolicyID, BrokerID, EnrollmentDate, EffectiveDate, EndDate, Status } = payload;
    const result = await this.executeNonQuery(
      `INSERT INTO Enrollments (EmployeeID, PolicyID, BrokerID, EnrollmentDate, EffectiveDate, EndDate, Status)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [EmployeeID, PolicyID, BrokerID, EnrollmentDate, EffectiveDate ?? null, EndDate ?? null, Status],
    );

    const created = await this.findById(result.insertId);
    if (!created) {
      throw new Error('Failed to create enrollment');
    }

    return created;
  }

  async update(id: number, payload: Partial<Omit<Enrollment, 'EnrollmentID' | 'CreatedAt'>>): Promise<Enrollment | null> {
    const entries = Object.entries(payload).filter(([key]) => key !== 'EnrollmentID');
    const fields = entries.map(([key]) => `${key} = ?`).join(', ');

    if (!fields) {
      return this.findById(id);
    }

    const values = entries.map(([, value]) => value);
    await this.executeNonQuery(`UPDATE Enrollments SET ${fields} WHERE EnrollmentID = ?;`, [...values, id]);

    return this.findById(id);
  }
}
