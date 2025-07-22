import {E_Applaud_Index, Role_Gaurd } from '../../lazyImports';

export const Employee_Applaud_Card_Routes = [
      {
        path: '/index',
        exact: 'true',
        guard: Role_Gaurd,
        element: E_Applaud_Index
      },
    ];