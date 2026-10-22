import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceApiService } from '../insurance-api.service';
import { InsurancePolicy } from '../models';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="panel">
      <h2>Policy catalogue</h2>
      <form (ngSubmit)="submit()" class="form-grid">
        <label>
          Policy name
          <input [(ngModel)]="form.PolicyName" name="PolicyName" required />
        </label>
        <label>
          Policy type
          <input [(ngModel)]="form.PolicyType" name="PolicyType" required />
        </label>
        <label>
          Premium amount
          <input type="number" [(ngModel)]="form.PremiumAmount" name="PremiumAmount" required />
        </label>
        <label>
          Coverage amount
          <input type="number" [(ngModel)]="form.CoverageAmount" name="CoverageAmount" required />
        </label>
        <label>
          Currency
          <input [(ngModel)]="form.CurrencyCode" name="CurrencyCode" />
        </label>
        <button type="submit">Add policy</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Provider ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Premium</th>
            <th>Coverage</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let policy of policies">
            <td>{{ policy.PolicyID }}</td>
            <td>{{ policy.ProviderID }}</td>
            <td>{{ policy.PolicyName }}</td>
            <td>{{ policy.PolicyType }}</td>
            <td>{{ policy.PremiumAmount | currency: policy.CurrencyCode }}</td>
            <td>{{ policy.CoverageAmount | currency: policy.CurrencyCode }}</td>
            <td>{{ policy.CurrencyCode }}</td>
            <td>{{ policy.Status }}</td>
            <td>{{ policy.CreatedAt ? (policy.CreatedAt | date: 'mediumDate') : '—' }}</td>
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
export class PoliciesComponent implements OnInit {
  policies: InsurancePolicy[] = [];
  form: Partial<InsurancePolicy> = { ProviderID: 1, CurrencyCode: 'INR', Status: 'Active' };

  constructor(private readonly api: InsuranceApiService) {}

  ngOnInit(): void {
    this.api.getPolicies().subscribe((data) => {
      this.policies = data;
    });
  }

  submit(): void {
    this.api.createPolicy(this.form).subscribe((policy) => {
      this.policies = [...this.policies, policy];
      this.form = { ProviderID: 1, CurrencyCode: 'INR', Status: 'Active' };
    });
  }
}
