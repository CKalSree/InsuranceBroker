import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Broker, DashboardSummary, Employee, Enrollment, InsurancePolicy, InsuranceProvider } from './models';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class InsuranceApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:4000/api';

  getDashboardSummary(): Observable<DashboardSummary> {
    return forkJoin({
      brokers: this.getBrokers(),
      employees: this.getEmployees(),
      providers: this.getProviders(),
      policies: this.getPolicies(),
      enrollments: this.getEnrollments(),
    }).pipe(
      map(({ brokers, employees, providers, policies, enrollments }) => ({
        brokers: brokers.length,
        employees: employees.length,
        providers: providers.length,
        policies: policies.length,
        enrollments: enrollments.length,
      })),
    );
  }

  getBrokers(): Observable<Broker[]> {
    return this.http.get<ApiEnvelope<Broker[]>>(`${this.baseUrl}/brokers`).pipe(map((response) => response.data ?? []));
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<ApiEnvelope<Employee[]>>(`${this.baseUrl}/employees`).pipe(map((response) => response.data ?? []));
  }

  getProviders(): Observable<InsuranceProvider[]> {
    return this.http.get<ApiEnvelope<InsuranceProvider[]>>(`${this.baseUrl}/providers`).pipe(map((response) => response.data ?? []));
  }

  getPolicies(): Observable<InsurancePolicy[]> {
    return this.http.get<ApiEnvelope<InsurancePolicy[]>>(`${this.baseUrl}/policies`).pipe(map((response) => response.data ?? []));
  }

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<ApiEnvelope<Enrollment[]>>(`${this.baseUrl}/enrollments`).pipe(map((response) => response.data ?? []));
  }

  createBroker(payload: Partial<Broker>): Observable<Broker> {
    return this.http.post<ApiEnvelope<Broker>>(`${this.baseUrl}/brokers`, payload).pipe(map((response) => response.data));
  }

  createEmployee(payload: Partial<Employee>): Observable<Employee> {
    return this.http.post<ApiEnvelope<Employee>>(`${this.baseUrl}/employees`, payload).pipe(map((response) => response.data));
  }

  createProvider(payload: Partial<InsuranceProvider>): Observable<InsuranceProvider> {
    return this.http.post<ApiEnvelope<InsuranceProvider>>(`${this.baseUrl}/providers`, payload).pipe(map((response) => response.data));
  }

  createPolicy(payload: Partial<InsurancePolicy>): Observable<InsurancePolicy> {
    return this.http.post<ApiEnvelope<InsurancePolicy>>(`${this.baseUrl}/policies`, payload).pipe(map((response) => response.data));
  }

  createEnrollment(payload: Partial<Enrollment>): Observable<Enrollment> {
    return this.http.post<ApiEnvelope<Enrollment>>(`${this.baseUrl}/enrollments`, payload).pipe(map((response) => response.data));
  }
}
