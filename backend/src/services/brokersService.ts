import { BrokersRepository } from '../repositories/brokersRepository.js';
import type { Broker } from '../types/common.js';
import { brokerSchema } from '../utils/validation.js';

export class BrokersService {
  constructor(private readonly repository = new BrokersRepository()) {}

  async list(): Promise<Broker[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<Broker> {
    const broker = await this.repository.findById(id);
    if (!broker) {
      const error = new Error('Broker not found') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    return broker;
  }

  async create(input: unknown): Promise<Broker> {
    const payload = brokerSchema.parse(input);
    const normalized = { ...payload, Phone: payload.Phone?.trim() || null };
    return this.repository.create(normalized);
  }

  async update(id: number, input: unknown): Promise<Broker> {
    const payload = brokerSchema.partial().parse(input);
    const updated = await this.repository.update(id, payload);
    if (!updated) {
      const error = new Error('Broker not found') as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }
    return updated;
  }
}
