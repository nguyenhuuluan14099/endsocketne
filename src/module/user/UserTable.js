import userEvent from "@testing-library/user-event";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActionDelete, ActionEdit } from "components/action";
import { Navigate, useNavigate } from "react-router-dom";
import { LabelStatus } from "components/label";
import { userRole, userStatus } from "utils/constants";
import Swal from "sweetalert2";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    });
  }, []);
  const handleStatusUser = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">ACTIVE</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">PENDING</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">BAN</LabelStatus>;
      default:
        break;
    }
  };
  const handleStatusRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "ADMIN";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "USER";
      default:
        break;
    }
  };
  const handleDeleteUser = (user) => {
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>UserName</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
                <td className="flex gap-x-2 items-center">
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{user.fullname}</h3>
                    <p className="text-slate-500">
                      {new Date(
                        user?.createdAt?.seconds * 1000
                      ).toLocaleDateString("vi-VI")}
                    </p>
                  </div>
                </td>
                <td>{user.fullname}</td>
                <td>{user.email.slice(0, 10) + "..."}</td>
                <td>{handleStatusUser(Number(user.status))}</td>
                <td>{handleStatusRole(Number(user.role))}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-user?id=${user.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(user)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
