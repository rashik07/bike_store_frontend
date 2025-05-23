import { createBrowserRouter } from 'react-router-dom';
// import App from '../App';
import Login from '../pages/Login';
import { routeGenerator } from '@/utils/routesGenerator';
import { adminPaths } from './admin.routes';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
// import Home from '@/pages/home/Home';
import MainLayout from '@/components/layout/MainLayout';
import { ecommercePath } from './ecommerce.routes';
import SignupForm from '@/pages/Signup';

// import Register from '../pages/Register';
// import { adminPaths } from './admin.routes';
// import { routeGenerator } from '../utils/routesGenerator';
// import { facultyPaths } from './faculty.routes';
// import { studentPaths } from './student.routes';
// import ProtectedRoute from '../components/layout/ProtectedRoute';
// import ChangePassword from '../pages/ChangePassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: routeGenerator(ecommercePath),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
//   {
//     path: '/admin',
//     element: (
//       <ProtectedRoute role="admin">
//         <App />
//       </ProtectedRoute>
//     ),
//     children: routeGenerator(adminPaths),
//   },
//   {
//     path: '/faculty',
//     element: (
//       <ProtectedRoute role="faculty">
//         <App />
//       </ProtectedRoute>
//     ),
//     children: routeGenerator(facultyPaths),
//   },
//   {
//     path: '/student',
//     element: (
//       <ProtectedRoute role="student">
//         <App />
//       </ProtectedRoute>
//     ),
//     children: routeGenerator(studentPaths),
//   },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignupForm />,
  },
//   {
//     path: '/change-password',
//     element: <ChangePassword />,
//   },
//   {
//     path: '/register',
//     element: <Register />,
//   },
]);

export default router;
