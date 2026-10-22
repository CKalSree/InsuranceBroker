import { ProvidersRepository } from '../repositories/providersRepository.js';
import type { InsuranceProvider } from '../types/common.js';
import { providerSchema } from '../utils/validation.js';

export class ProvidersService {
  constructor(private readonly repository = new ProvidersRepository()) {}

  async list(): Promise<InsuranceProvider[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<InsuranceProvider> {
    const provider = await this.repository.findById(id);
    if (!provider) {
      const error = new Error('Insurance provider not found') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    return provider;
  }

  async create(input: unknown): Promise<InsuranceProvider> {
    const payload = providerSchema.parse(input);
    return this.repository.create({
      ...payload,
      ContactEmail: payload.ContactEmail?.trim() || null,
      Phone: payload.Phone?.trim() || null,
    });
  }

  async update(id: number, input: unknown): Promise<InsuranceProvider> {
    const payload = providerSchema.partial().parse(input);
    const updated = await this.repository.update(id, payload as Partial<Omit<InsuranceProvider, 'ProviderID' | 'CreatedAt'>>);

    if (!updated) {
      const error = new Error('Insurance provider not found') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    return updated;
  }
}
