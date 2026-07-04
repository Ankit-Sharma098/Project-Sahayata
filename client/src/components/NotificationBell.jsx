import API from "../api/axios";

import { Bell } from "lucide-react";

function NotificationBell() {
  return (
    <button className="rounded-xl bg-slate-900 p-3 text-white">
      <Bell size={22} />
    </button>
  );
}

export default NotificationBell;

// Get Notifications
export const getNotifications = async (token) => {
  const response = await API.get("/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Mark Notification as Read
export const markAsRead = async (id, token) => {
  const response = await API.put(
    `/notifications/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Delete Notification
export const deleteNotification = async (
  id,
  token
) => {
  const response = await API.delete(
    `/notifications/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};