import { Routes } from '@angular/router';
import { DashboardPage } from './modules/dashboard/dashboard';
import { LoansPage } from './modules/loans/loans';
import { UsersPage } from './modules/users/users';

export const routes: Routes = [
    {
        path: 'users',
        component: UsersPage,
        title: 'Usuários',
    },
    {
        path: 'loans',
        component: LoansPage,
        title: 'Empréstimos',
    },
    {
        path: '**',
        component: DashboardPage,
        title: 'Dashboard',
    },
];
