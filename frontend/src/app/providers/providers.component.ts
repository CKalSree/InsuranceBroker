import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceApiService } from '../insurance-api.service';
import { InsuranceProvider } from '../models';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="panel">
      <h2>Insurance providers</h2>
      <form (ngSubmit)="submit()" class="form-grid">
        <label>
          Provider name
          <input [(ngModel)]="form.ProviderName" name="ProviderName" required />
        </label>
        <label>
          Provider type
          <input [(ngModel)]="form.ProviderType" name="ProviderType" required />
        </label>
        <label>
          Contact email
          <input type="email" [(ngModel)]="form.ContactEmail" name="ContactEmail" />
        </label>
        <label>
          Phone
          <input [(ngModel)]="form.Phone" name="Phone" />
        </label>
        <button type="submit">Add provider</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Contact Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let provider of providers">
            <td>{{ provider.ProviderID }}</td>
            <td>{{ provider.ProviderName }}</td>
            <td>{{ provider.ProviderType }}</td>
            <td>{{ provider.ContactEmail || '—' }}</td>
            <td>{{ provider.Phone || '—' }}</td>
            <td>{{ provider.Status }}</td>
            <td>{{ provider.CreatedAt ? (provider.CreatedAt | date: 'mediumDate') : '—' }}</td>
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
export class ProvidersComponent implements OnInit {
  providers: InsuranceProvider[] = [];
  form: Partial<InsuranceProvider> = { Status: 'Active' };

  constructor(private readonly api: InsuranceApiService) {}

  ngOnInit(): void {
    this.api.getProviders().subscribe((data) => {
      this.providers = data;
    });
  }

  submit(): void {
    this.api.createProvider(this.form).subscribe((provider) => {
      this.providers = [...this.providers, provider];
      this.form = { Status: 'Active' };
    });
  }
}
