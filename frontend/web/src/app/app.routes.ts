import { Routes } from '@angular/router';
import { DashboardPage } from './modules/dashboard/dashboard';
import { LoansPage } from './modules/loans/loans';
import { UsersPage } from './modules/users/users';
import { SystemLayoutTemplate } from './shared/components/templates/system-layout/system-layout';

export const routes: Routes = [
    {
        path: '',
        component: SystemLayoutTemplate,
        title: 'Good Agiota',
        children: [
            {
                path: 'users',
                component: UsersPage,
            },
            {
                path: 'loans',
                component: LoansPage,
            },
            {
                path: '',
                component: DashboardPage,
            },
        ]
    },

];
