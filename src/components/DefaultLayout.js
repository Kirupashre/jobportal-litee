import { serverTimestamp } from "firebase/firestore";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserNotifications, getUserProfile } from "../apis/users";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { SetReloadNotifications } from "../redux/notifications";
import { Badge } from "antd";

function DefaultLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { reloadNotifications, unreadNotifications } = useSelector(
    (state) => state.notification
  );
  const [collapsed, setCollapsed] = React.useState(false);
  const [menuToRender, setMenuToRender] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <i class="ri-home-6-line"></i>,
      path: "/",
    },
    {
      title: "Applied Jobs",
      onClick: () => navigate("/applied-jobs"),
      icon: <i class="ri-file-list-3-line"></i>,
      path: "/applied-jobs",
    },
    {
      title: "Posted Jobs",
      onClick: () => navigate("/posted-jobs"),
      icon: <i class="ri-file-list-3-fill"></i>,
      path: "/posted-jobs",
    },
    {
      title: "Profile",
      onClick: () => navigate(`/profile/${user.id}`),
      icon: <i class="ri-user-line"></i>,
      path: "/profile",
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      icon: <i class="ri-logout-circle-line"></i>,
      path: "/login",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <i class="ri-home-6-line"></i>,
      path: "/",
    },
    {
      title: "Applications",
      onClick: () => navigate("/admin/applications"),
      icon: <i class="ri-file-list-3-line"></i>,
      path: "/admin/applications",
    },
    {
      title: "Jobs",
      onClick: () => navigate("/admin/jobs"),
      icon: <i class="ri-file-list-3-fill"></i>,
      path: "/admin/jobs",
    },
    {
      title: "Users",
      onClick: () => navigate("/admin/users"),
      icon: <i class="ri-user-line"></i>,
      path: "/admin/users",
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      icon: <i class="ri-logout-circle-line"></i>,
      path: "/login",
    },
  ];

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const response = await getUserProfile(userId);

      dispatch(HideLoading());
      if (response.data?.isAdmin === true) {
        setMenuToRender(adminMenu);
      } else {
        setMenuToRender(userMenu);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadNotifications = async () => {
    try {
      dispatch(ShowLoading());
      await getUserNotifications();
      dispatch(HideLoading());
      dispatch(SetReloadNotifications(false));
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (reloadNotifications) {
      loadNotifications();
    }
  }, [reloadNotifications]);

  return (
    <div className="layout">
      <div className="sidebar justify-content-between flex">
        <div
          className="menu"
          style={{
            width: collapsed ? "40px" : "150px",
          }}
        >
          {menuToRender.map((item, index) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                className={`menu-item ${isActive && "active-menu-item"}`}
                onClick={item.onClick}
                key={index}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content">
        <div className="header justify-content-between d-flex">
          <div className="d-flex items-center gap-2">
            {collapsed && (
              <i
                class="ri-menu-2-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            {!collapsed && (
              <i
                class="ri-close-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            <span className="logo">JOB PORTAL-LITE</span>
          </div>
          <div className="d-flex gap-1 align-items-center">
            <Badge
              count={unreadNotifications?.length || 0}
              className="mx-5"
              onClick={() => navigate("/notifications")}
            >
              <i class="ri-notification-line"></i>
            </Badge>

            <span>{user?.name}</span>
            <i class="ri-shield-user-line"></i>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
