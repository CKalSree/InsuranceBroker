import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Insurance Broker Management System';

  navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Brokers', path: '/brokers' },
    { label: 'Employees', path: '/employees' },
    { label: 'Providers', path: '/providers' },
    { label: 'Policies', path: '/policies' },
    { label: 'Enrollments', path: '/enrollments' }
  ];
}
