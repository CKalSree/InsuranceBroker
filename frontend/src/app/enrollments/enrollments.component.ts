import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceApiService } from '../insurance-api.service';
import { Enrollment } from '../models';

@Component({
  selector: 'app-enrollments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="panel">
      <h2>Enrollments</h2>
      <form (ngSubmit)="submit()" class="form-grid">
        <label>
          Employee ID
          <input type="number" [(ngModel)]="form.EmployeeID" name="EmployeeID" required />
        </label>
        <label>
          Policy ID
          <input type="number" [(ngModel)]="form.PolicyID" name="PolicyID" required />
        </label>
        <label>
          Broker ID
          <input type="number" [(ngModel)]="form.BrokerID" name="BrokerID" required />
        </label>
        <label>
          Status
          <select [(ngModel)]="form.Status" name="Status">
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
        <button type="submit">Enroll employee</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Policy</th>
            <th>Broker</th>
            <th>Enrollment Date</th>
            <th>Effective Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let enrollment of enrollments">
            <td>{{ enrollment.EnrollmentID }}</td>
            <td>{{ enrollment.EmployeeID }}</td>
            <td>{{ enrollment.PolicyID }}</td>
            <td>{{ enrollment.BrokerID }}</td>
            <td>{{ enrollment.EnrollmentDate | date: 'mediumDate' }}</td>
            <td>{{ enrollment.EffectiveDate ? (enrollment.EffectiveDate | date: 'mediumDate') : '—' }}</td>
            <td>{{ enrollment.EndDate ? (enrollment.EndDate | date: 'mediumDate') : '—' }}</td>
            <td>{{ enrollment.Status }}</td>
            <td>{{ enrollment.CreatedAt ? (enrollment.CreatedAt | date: 'mediumDate') : '—' }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [
    '.panel { background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08); }',
    '.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }',
    'label { display: flex; flex-direction: column; gap: 0.4rem; font-weight: 600; color: #334155; }',
    'input, select { border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.7rem; font-size: 1rem; }',
    'button { align-self: end; background: #2563eb; color: white; border: none; border-radius: 8px; padding: 0.8rem 1.2rem; font-weight: 600; }',
    'table { width: 100%; border-collapse: collapse; }',
    'th, td { border-bottom: 1px solid #e2e8f0; padding: 0.8rem; text-align: left; }'
  ]
})
export class EnrollmentsComponent implements OnInit {
  enrollments: Enrollment[] = [];
  form: Partial<Enrollment> = { EmployeeID: 1, PolicyID: 1, BrokerID: 1, Status: 'Pending' };

  constructor(private readonly api: InsuranceApiService) {}

  ngOnInit(): void {
    this.api.getEnrollments().subscribe((data) => {
      this.enrollments = data;
    });
  }

  submit(): void {
    this.api.createEnrollment(this.form).subscribe((enrollment) => {
      this.enrollments = [...this.enrollments, enrollment];
      this.form = { EmployeeID: 1, PolicyID: 1, BrokerID: 1, Status: 'Pending' };
    });
  }
}
