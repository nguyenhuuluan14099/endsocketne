import { Button } from "components/button";
import { useAuth } from "contexts/Auth-context";
import DashboardHeading from "module/dashboard/DashboardHeading";
import NotAccessiblePage from "pages/NotAccessiblePage";
import React from "react";
import { userRole } from "utils/constants";
import UserTable from "./UserTable";

const UserManage = () => {
  const { userInfo } = useAuth();
  // if (userInfo.role !== userRole.ADMIN)
  //   return <NotAccessiblePage></NotAccessiblePage>;
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button type="button" kind="primary" WFull to="/manage/user-add">
          Add new user
        </Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
