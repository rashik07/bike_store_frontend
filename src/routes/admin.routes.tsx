import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import OrderTable from "@/pages/dashboard/Orders/OrderTable";
import Add_Products from "@/pages/dashboard/Products/Add_Products";
import Product_table from "@/pages/dashboard/Products/Product_table";

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'AddProduct',
    path: 'addProduct',
    element: <Add_Products />,
  },
  {
    name: 'ProductTable',
    path: 'productTable',
    element: <Product_table />,
  },
  {
    name: 'OrderTable',
    path: 'orderTable',
    element: <OrderTable />,
  },
  // {
  //   name: 'Academic Management',
  //   children: [
  //     {
  //       name: 'Create A. Semester',
  //       path: 'create-academic-semester',
  //       element: <CreateAcademicSemester />,
  //     },
  //     {
  //       name: 'Academic Semester',
  //       path: 'academic-semester',
  //       element: <AcademicSemester />,
  //     },
  //     {
  //       name: 'Create A. Faculty',
  //       path: 'create-academic-faculty',
  //       element: <CreateAcademicFaculty />,
  //     },
  //     {
  //       name: 'Academic Faculty',
  //       path: 'academic-faculty',
  //       element: <AcademicFaculty />,
  //     },
  //     {
  //       name: 'Create A. Department',
  //       path: 'create-academic-department',
  //       element: <CreateAcademicDepartment />,
  //     },
  //     {
  //       name: 'Academic Department',
  //       path: 'academic-department',
  //       element: <AcademicDepartment />,
  //     },
  //   ],
  // },
  // {
  //   name: 'User Management',
  //   children: [
  //     {
  //       name: 'Create Student',
  //       path: 'create-student',
  //       element: <CreateStudent />,
  //     },
  //     {
  //       name: 'Students',
  //       path: 'students-data',
  //       element: <StudentData />,
  //     },
  //     {
  //       path: 'student-data/:studentId',
  //       element: <StudentDetails />,
  //     },
  //     {
  //       name: 'Create Admin',
  //       path: 'create-admin',
  //       element: <CreateAdmin />,
  //     },
  //     {
  //       name: 'Create Faculty',
  //       path: 'create-faculty',
  //       element: <CreateFaculty />,
  //     },

  //     {
  //       name: 'Create Member',
  //       path: 'create-member',
  //       element: <CreateStudent />,
  //     },
  //   ],
  // },
  // {
  //   name: 'Course Management',
  //   children: [
  //     {
  //       name: 'Semester Registration',
  //       path: 'semester-registration',
  //       element: <SemesterRegistration />,
  //     },
  //     {
  //       name: 'Registered Semesters',
  //       path: 'registered-semesters',
  //       element: <RegisteredSemesters />,
  //     },
  //     {
  //       name: 'Create Course',
  //       path: 'create-course',
  //       element: <CreateCourse />,
  //     },
  //     {
  //       name: 'Courses',
  //       path: 'courses',
  //       element: <Courses />,
  //     },
  //     {
  //       name: 'Offer Course',
  //       path: 'offer-course',
  //       element: <OfferCourse />,
  //     },
  //     {
  //       name: 'Offered Courses',
  //       path: 'offered-courses',
  //       element: <OfferedCourses />,
  //     },
  //   ],
  // },
];

// export const adminSidebarItems = adminPaths.reduce(
//   (acc: TSidebarItem[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }

//     return acc;
//   },
//   []
// );

//* Programatical way

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }

//   return acc;
// }, []);

//! Hard coded way

// export const adminPaths = [
//   {
//     path: 'dashboard',
//     element: <AdminDashboard />,
//   },
//   {
//     path: 'create-student',
//     element: <CreateStudent />,
//   },
//   {
//     path: 'create-admin',
//     element: <CreateAdmin />,
//   },
//   {
//     path: 'create-faculty',
//     element: <CreateFaculty />,
//   },
// ];
