
import { ACCOUNT_TYPE } from "../utils/Constants";

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "FiShoppingCart",
  },
  {
    id: 7,
    name: "Instructor Approvals",
    path: "/dashboard/admin/instructorApprovals",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "FcApproval",
  },
  {
    id: 8,
    name: "Category Approvals",
    path: "/dashboard/admin/categoryApprovals",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "FcApproval",
  },
  {
    id: 9,
    name: "Add Category",
    path: "/dashboard/admin/addCategory",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd"
  },
  {
    id: 10,
    name: "Request Category",
    path: "/dashboard/add-category",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  
];
