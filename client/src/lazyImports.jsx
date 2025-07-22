import { lazy, memo } from 'react';

//Routes page
export const AdminLayout = lazy(() => import('./layouts/AdminLayout/index'));
export const AuthGuard = lazy(() => import('./Components/Guards/authGaurd'));
export const Role_Gaurd = lazy(() => import('./Components/Guards/Role_Gaurd'));

//AdminLayout 
export const Navigation = lazy(() => import('./layouts/AdminLayout/Navigation/index'));
export const NavBar = lazy(() => import('./components/Navbar/Navbar'));
export const ProfileMenu = lazy(()=> import("./components/Navbar/ProfileMenu"))
export const Breadcrumb = lazy(() => import('./layouts/AdminLayout/Breadcrumb/index'));
export const Footer = lazy(()=>import('./layouts/AdminLayout/Footer/Footer'))

//Auth Routes
export const Signin = lazy(() => import('./views/auth/signin/SignIn1'));

// Dashboard
export const Dashboard = lazy(() => import('./views/dashboard/index'))

// Home

export const Home = lazy(()=> import ('./views/Home/Home'))
export const ChipSlider = lazy(()=> import('./views/Home/ClipSlider'))


//E_Applaud

export const E_Applaud_Index = lazy(()=> import('./views/Employee e-Applaud Card/index'))
export const GoodiesManager = lazy(()=> import('./views/Employee e-Applaud Card/GoodiesManager'))
export const DepartmentPointsManager = lazy(()=> import('./views/Employee e-Applaud Card/DepartmentPointsManager'))







