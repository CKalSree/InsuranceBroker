import { BaseRepository } from './baseRepository.js';
import type { Broker } from '../types/common.js';

export class BrokersRepository extends BaseRepository {
  async findAll(): Promise<Broker[]> {
    return this.execute<Broker>(`SELECT * FROM Brokers ORDER BY BrokerName;`);
  }

  async findById(id: number): Promise<Broker | null> {
    return this.executeSingle<Broker>(`SELECT * FROM Brokers WHERE BrokerID = ?;`, [id]);
  }

  async create(payload: Omit<Broker, 'BrokerID' | 'CreatedAt'>): Promise<Broker> {
    const { BrokerName, LicenseNumber, Email, Phone, Status } = payload;
    const result = await this.executeNonQuery(
      `INSERT INTO Brokers (BrokerName, LicenseNumber, Email, Phone, Status)
       VALUES (?, ?, ?, ?, ?);`,
      [BrokerName, LicenseNumber, Email, Phone ?? null, Status],
    );

    const created = await this.findById(result.insertId);
    if (!created) {
      throw new Error('Failed to create broker');
    }

    return created;
  }

  async update(id: number, payload: Partial<Omit<Broker, 'BrokerID' | 'CreatedAt'>>): Promise<Broker | null> {
    const fields = Object.keys(payload)
      .filter((key) => key !== 'BrokerID')
      .map((key) => `${key} = ?`)
      .join(', ');

    if (!fields) {
      return this.findById(id);
    }

    const values = Object.values(payload).filter((_, index) => Object.keys(payload)[index] !== 'BrokerID');
    await this.executeNonQuery(`UPDATE Brokers SET ${fields} WHERE BrokerID = ?;`, [...values, id]);

    return this.findById(id);
  }
}
