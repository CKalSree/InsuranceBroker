import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InsuranceApiService } from '../insurance-api.service';
import { DashboardSummary } from '../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="panel">
      <h2>Overview</h2>
      <div class="stats-grid">
        <article class="stat-card" *ngFor="let item of summary | keyvalue">
          <span class="label">{{ item.key | titlecase }}</span>
          <strong>{{ item.value }}</strong>
        </article>
      </div>
    </section>
  `,
  styles: [
    '.panel { background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08); }',
    '.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem; }',
    '.stat-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem; }',
    '.label { display: block; color: #475569; font-size: 0.8rem; text-transform: capitalize; }',
    'strong { display: block; font-size: 2rem; margin-top: 0.5rem; }'
  ]
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary = { brokers: 0, employees: 0, providers: 0, policies: 0, enrollments: 0 };

  constructor(private readonly api: InsuranceApiService) {}

  ngOnInit(): void {
    this.api.getDashboardSummary().subscribe((data) => {
      this.summary = data;
    });
  }
}
