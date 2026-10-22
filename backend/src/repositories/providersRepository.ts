import { BaseRepository } from './baseRepository.js';
import type { InsuranceProvider } from '../types/common.js';

export class ProvidersRepository extends BaseRepository {
  async findAll(): Promise<InsuranceProvider[]> {
    return this.execute<InsuranceProvider>(`SELECT * FROM InsuranceProviders ORDER BY ProviderName;`);
  }

  async findById(id: number): Promise<InsuranceProvider | null> {
    return this.executeSingle<InsuranceProvider>(`SELECT * FROM InsuranceProviders WHERE ProviderID = ?;`, [id]);
  }

  async create(payload: Omit<InsuranceProvider, 'ProviderID' | 'CreatedAt'>): Promise<InsuranceProvider> {
    const { ProviderName, ProviderType, ContactEmail, Phone, Status } = payload;
    const result = await this.executeNonQuery(
      `INSERT INTO InsuranceProviders (ProviderName, ProviderType, ContactEmail, Phone, Status)
       VALUES (?, ?, ?, ?, ?);`,
      [ProviderName, ProviderType, ContactEmail ?? null, Phone ?? null, Status],
    );

    const created = await this.findById(result.insertId);
    if (!created) {
      throw new Error('Failed to create insurance provider');
    }

    return created;
  }

  async update(id: number, payload: Partial<Omit<InsuranceProvider, 'ProviderID' | 'CreatedAt'>>): Promise<InsuranceProvider | null> {
    const entries = Object.entries(payload).filter(([key]) => key !== 'ProviderID');
    const fields = entries.map(([key]) => `${key} = ?`).join(', ');

    if (!fields) {
      return this.findById(id);
    }

    const values = entries.map(([, value]) => value);
    await this.executeNonQuery(`UPDATE InsuranceProviders SET ${fields} WHERE ProviderID = ?;`, [...values, id]);

    return this.findById(id);
  }
}
