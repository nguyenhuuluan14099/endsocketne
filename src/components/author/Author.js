import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Author = ({ userId = "" }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setUser(docSnapshot.data());
      }
    }
    fetchData();
  }, [userId]);
  if (!userId) return null;
  return (
    <div className="flex items-center gap-x-12 h-[270px] rounded-3xl bg-[#F8F9FA] overflow-hidden">
      <img
        src={user?.avatar}
        alt=""
        className="w-[270px] h-full object-cover"
      />
      <div>
        <h3 className="author-name font-bold text-[22px] leading-7 tracking-wider mb-3">
          {user?.fullname}
        </h3>
        <p className="tracking-wider text-[18px] font-medium leading-6 text-[#232323]">
          {user?.description}
        </p>
      </div>
    </div>
  );
};

export default Author;
