import { PoliciesRepository } from '../repositories/policiesRepository.js';
import type { InsurancePolicy } from '../types/common.js';
import { policySchema } from '../utils/validation.js';

export class PoliciesService {
  constructor(private readonly repository = new PoliciesRepository()) {}

  async list(): Promise<InsurancePolicy[]> {
    return this.repository.findAll();
  }

  async listByProvider(providerId: number): Promise<InsurancePolicy[]> {
    return this.repository.findByProvider(providerId);
  }

  async getById(id: number): Promise<InsurancePolicy> {
    const policy = await this.repository.findById(id);
    if (!policy) {
      const error = new Error('Insurance policy not found') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    return policy;
  }

  async create(input: unknown): Promise<InsurancePolicy> {
    const payload = policySchema.parse(input);
    return this.repository.create(payload);
  }

  async update(id: number, input: unknown): Promise<InsurancePolicy> {
    const payload = policySchema.partial().parse(input);
    const updated = await this.repository.update(id, payload as Partial<Omit<InsurancePolicy, 'PolicyID' | 'CreatedAt'>>);

    if (!updated) {
      const error = new Error('Insurance policy not found') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    return updated;
  }
}
