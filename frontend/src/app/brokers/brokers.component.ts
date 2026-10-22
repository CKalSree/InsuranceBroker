import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceApiService } from '../insurance-api.service';
import { Broker } from '../models';

@Component({
  selector: 'app-brokers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="panel">
      <h2>Manage brokers</h2>

      <form (ngSubmit)="submit()" class="form-grid">
        <label>
          Broker name
          <input [(ngModel)]="form.BrokerName" name="BrokerName" required />
        </label>
        <label>
          License number
          <input [(ngModel)]="form.LicenseNumber" name="LicenseNumber" required />
        </label>
        <label>
          Email
          <input type="email" [(ngModel)]="form.Email" name="Email" required />
        </label>
        <label>
          Phone
          <input [(ngModel)]="form.Phone" name="Phone" />
        </label>
        <button type="submit">Add broker</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>License</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let broker of brokers">
            <td>{{ broker.BrokerID }}</td>
            <td>{{ broker.BrokerName }}</td>
            <td>{{ broker.LicenseNumber }}</td>
            <td>{{ broker.Email }}</td>
            <td>{{ broker.Phone || '—' }}</td>
            <td>{{ broker.Status }}</td>
            <td>{{ broker.CreatedAt ? (broker.CreatedAt | date: 'mediumDate') : '—' }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [
    '.panel { background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08); }',
    '.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }',
    'label { display: flex; flex-direction: column; gap: 0.4rem; font-weight: 600; color: #334155; }',
    'input { border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.7rem; font-size: 1rem; }',
    'button { align-self: end; background: #2563eb; color: white; border: none; border-radius: 8px; padding: 0.8rem 1.2rem; font-weight: 600; }',
    'table { width: 100%; border-collapse: collapse; }',
    'th, td { border-bottom: 1px solid #e2e8f0; padding: 0.8rem; text-align: left; }'
  ]
})
export class BrokersComponent implements OnInit {
  brokers: Broker[] = [];
  form: Partial<Broker> = { Status: 'Active' };

  constructor(private readonly api: InsuranceApiService) {}

  ngOnInit(): void {
    this.api.getBrokers().subscribe((data) => {
      this.brokers = data;
    });
  }

  submit(): void {
    this.api.createBroker(this.form).subscribe((broker) => {
      this.brokers = [...this.brokers, broker];
      this.form = { Status: 'Active' };
    });
  }
}
