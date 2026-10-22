import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceApiService } from '../insurance-api.service';
import { Employee } from '../models';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="panel">
      <h2>Manage employees</h2>

      <form (ngSubmit)="submit()" class="form-grid">
        <label>
          First name
          <input [(ngModel)]="form.FirstName" name="FirstName" required />
        </label>
        <label>
          Last name
          <input [(ngModel)]="form.LastName" name="LastName" required />
        </label>
        <label>
          Email
          <input type="email" [(ngModel)]="form.Email" name="Email" required />
        </label>
        <label>
          Date of birth
          <input type="date" [(ngModel)]="form.DateOfBirth" name="DateOfBirth" />
        </label>
        <label>
          Employment status
          <select [(ngModel)]="form.EmploymentStatus" name="EmploymentStatus">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="OnLeave">On Leave</option>
          </select>
        </label>
        <button type="submit">Add employee</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Broker</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let employee of employees">
            <td>{{ employee.EmployeeID }}</td>
            <td>{{ employee.FirstName }} {{ employee.LastName }}</td>
            <td>{{ employee.BrokerID }}</td>
            <td>{{ employee.Email }}</td>
            <td>{{ employee.DateOfBirth ? (employee.DateOfBirth | date: 'mediumDate') : '—' }}</td>
            <td>{{ employee.EmploymentStatus }}</td>
            <td>{{ employee.CreatedAt ? (employee.CreatedAt | date: 'mediumDate') : '—' }}</td>
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
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  form: Partial<Employee> = { EmploymentStatus: 'Active', BrokerID: 1 };

  constructor(private readonly api: InsuranceApiService) {}

  ngOnInit(): void {
    this.api.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  submit(): void {
    this.api.createEmployee(this.form).subscribe((employee) => {
      this.employees = [...this.employees, employee];
      this.form = { EmploymentStatus: 'Active', BrokerID: 1 };
    });
  }
}
