const routes = {
  auth: {
    path: "/",

    login: {
      path: "/login",
    },
    register: {
      path: "/register",
    },
    forgotPassword: {
      path: "/forgot-password",
      otp: {
        path: "forgot-password/otp",
      },
    },
    updatePassword: {
      path: "/update-password",
    },
  },

  dashboard: {
    entry: {
      path: "/dashboard",
    },
    attendance: {
      path: "/dashboard/attendance",
    },
    employees: {
      path: "/dashboard/employees",
    },
    payroll: {
      path: "/dashboard/payroll",
    },
    leaves: {
      path: "/dashboard/leaves",
    },
    holidays: {
      path: "/dashboard/holidays",
    },
    settings: {
      path: "/dashboard/settings",
    },
  },
};

export default routes;
