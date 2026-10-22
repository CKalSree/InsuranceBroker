import { Routes } from '@angular/router';
import { BrokersComponent } from './brokers/brokers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { PoliciesComponent } from './policies/policies.component';
import { ProvidersComponent } from './providers/providers.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'brokers', component: BrokersComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'providers', component: ProvidersComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'enrollments', component: EnrollmentsComponent }
];
