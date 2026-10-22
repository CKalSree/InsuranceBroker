import { BaseRepository } from './baseRepository.js';
import type { InsurancePolicy } from '../types/common.js';

export class PoliciesRepository extends BaseRepository {
  async findAll(): Promise<InsurancePolicy[]> {
    return this.execute<InsurancePolicy>(`SELECT * FROM InsurancePolicies ORDER BY PolicyName;`);
  }

  async findById(id: number): Promise<InsurancePolicy | null> {
    return this.executeSingle<InsurancePolicy>(`SELECT * FROM InsurancePolicies WHERE PolicyID = ?;`, [id]);
  }

  async findByProvider(providerId: number): Promise<InsurancePolicy[]> {
    return this.execute<InsurancePolicy>(`SELECT * FROM InsurancePolicies WHERE ProviderID = ? ORDER BY PolicyName;`, [providerId]);
  }

  async create(payload: Omit<InsurancePolicy, 'PolicyID' | 'CreatedAt'>): Promise<InsurancePolicy> {
    const { ProviderID, PolicyName, PolicyType, PremiumAmount, CoverageAmount, CurrencyCode, Status } = payload;
    const result = await this.executeNonQuery(
      `INSERT INTO InsurancePolicies (ProviderID, PolicyName, PolicyType, PremiumAmount, CoverageAmount, CurrencyCode, Status)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [ProviderID, PolicyName, PolicyType, PremiumAmount, CoverageAmount, CurrencyCode, Status],
    );

    const created = await this.findById(result.insertId);
    if (!created) {
      throw new Error('Failed to create insurance policy');
    }

    return created;
  }

  async update(id: number, payload: Partial<Omit<InsurancePolicy, 'PolicyID' | 'CreatedAt'>>): Promise<InsurancePolicy | null> {
    const entries = Object.entries(payload).filter(([key]) => key !== 'PolicyID');
    const fields = entries.map(([key]) => `${key} = ?`).join(', ');

    if (!fields) {
      return this.findById(id);
    }

    const values = entries.map(([, value]) => value);
    await this.executeNonQuery(`UPDATE InsurancePolicies SET ${fields} WHERE PolicyID = ?;`, [...values, id]);

    return this.findById(id);
  }
}
