export type StatusValue = 'Active' | 'Inactive' | 'Pending' | 'Suspended' | 'OnLeave' | 'Rejected' | 'Cancelled' | 'Expired' | 'Withdrawn';

export interface Broker {
  BrokerID: number;
  BrokerName: string;
  LicenseNumber: string;
  Email: string;
  Phone?: string | null;
  Status: StatusValue;
  CreatedAt: string;
}

export interface Employee {
  EmployeeID: number;
  BrokerID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  DateOfBirth?: string | null;
  EmploymentStatus: 'Active' | 'Inactive' | 'OnLeave';
  CreatedAt: string;
}

export interface InsuranceProvider {
  ProviderID: number;
  ProviderName: string;
  ProviderType: string;
  ContactEmail?: string | null;
  Phone?: string | null;
  Status: 'Active' | 'Inactive';
  CreatedAt: string;
}

export interface InsurancePolicy {
  PolicyID: number;
  ProviderID: number;
  PolicyName: string;
  PolicyType: string;
  PremiumAmount: number;
  CoverageAmount: number;
  CurrencyCode: string;
  Status: 'Active' | 'Inactive' | 'Withdrawn';
  CreatedAt: string;
}

export interface Enrollment {
  EnrollmentID: number;
  EmployeeID: number;
  PolicyID: number;
  BrokerID: number;
  EnrollmentDate: string;
  EffectiveDate?: string | null;
  EndDate?: string | null;
  Status: 'Pending' | 'Active' | 'Rejected' | 'Cancelled' | 'Expired';
  CreatedAt: string;
}
