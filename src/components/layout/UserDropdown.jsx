import React, { useEffect, useRef, useState } from "react";
import AvatarIcon from "../icons/AvatarIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import { motion } from "framer-motion";
import { DROP_DOWN_ANIMATE } from "../../constants/constant";
import MemberIcon from "../icons/MemberIcon";
import LogoutIcon from "../icons/LogoutIcon";

function UserDropdown() {
  const userNode = useRef();
  const [isOpenUserDropdown, setIsOpenUserDropdown] = useState(false);
  const toggleOpenUserMenu = () => {
    setIsOpenUserDropdown(!isOpenUserDropdown);
  };
  // const { userData } = useGetMe()
  const userData = {
    firstName: "Anh",
    lastName: "Nguyen",
  };

  const handleClickOutsideUserNode = (e) => {
    // @ts-ignore
    if (userNode?.current?.contains(e.target)) {
      return;
    }
    setIsOpenUserDropdown(false);
  };

  useEffect(() => {
    if (isOpenUserDropdown) {
      document.addEventListener("mousedown", handleClickOutsideUserNode);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideUserNode);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideUserNode);
    };
  }, [isOpenUserDropdown]);
// cu de nguyen de t thao tac cho
  return (
    <div className="relative">
      <div
        onClick={toggleOpenUserMenu}
        className="flex items-center gap-1 cursor-pointer"
        ref={userNode}
      >
        <AvatarIcon />
        <p className="capitalize text-grayDark">
          {userData?.firstName || "First Name"}{" "}
          {userData?.lastName || "Last Name"}
        </p>
        <ArrowDownIcon color="#373737" />
      </div>

      <motion.div
        initial="exit"
        animate={isOpenUserDropdown ? "enter" : "exit"}
        variants={DROP_DOWN_ANIMATE}
        className={`absolute top-[70] right-0 w-auto`}
        style={{
          borderRadius: 5,
          backgroundColor: "#ECF1F4",
          transformOrigin: "50% -30px",
          zIndex: 1,
        }}
        onClick={toggleOpenUserMenu}
      >
        <div className="smooth-transform cursor-pointer z-50 flex w-full min-w-[170px] flex-col rounded-lg bg-[#fff] shadow-md">
          <a
            href="/profile"
            className="flex gap-3 px-4 py-3 rounded-b-lg hover:bg-sky-100"
          >
            <MemberIcon />
            <DropDownItem label="Profile" />
          </a>
          <div
            onClick={() => {
              // handle to signout
            }}
            className="flex gap-3 px-4 py-3 rounded-b-lg hover:bg-sky-100"
          >
            <LogoutIcon />
            <DropDownItem label="Logout" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UserDropdown;

function DropDownItem({ label }) {
  return (
    <p className="cursor-pointer smooth-animation whitespace-nowrap hover:text-primary">
      {label}
    </p>
  );
}
