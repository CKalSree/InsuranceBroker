import { EnrollmentsRepository } from '../repositories/enrollmentsRepository.js';
import type { Enrollment } from '../types/common.js';
import { enrollmentSchema } from '../utils/validation.js';

export class EnrollmentsService {
  constructor(private readonly repository = new EnrollmentsRepository()) {}

  async list(): Promise<Enrollment[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<Enrollment> {
    const enrollment = await this.repository.findById(id);
    if (!enrollment) {
      const error = new Error('Enrollment not found') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    return enrollment;
  }

  async listByEmployee(employeeId: number): Promise<Enrollment[]> {
    return this.repository.findByEmployee(employeeId);
  }

  async create(input: unknown): Promise<Enrollment> {
    const payload = enrollmentSchema.parse(input);
    const effectiveDate = payload.EffectiveDate ? payload.EffectiveDate : null;
    const endDate = payload.EndDate ? payload.EndDate : null;

    return this.repository.create({
      ...payload,
      EnrollmentDate: new Date().toISOString().slice(0, 10),
      EffectiveDate: effectiveDate,
      EndDate: endDate,
    });
  }

  async update(id: number, input: unknown): Promise<Enrollment> {
    const payload = enrollmentSchema.partial().parse(input);
    const updated = await this.repository.update(id, payload as Partial<Omit<Enrollment, 'EnrollmentID' | 'CreatedAt'>>);

    if (!updated) {
      const error = new Error('Enrollment not found') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    return updated;
  }
}
