import API from "../api/axios";

// Get Notifications
export const getNotifications = async (token) => {
  const response = await API.get("/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Mark as Read
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
export const deleteNotification = async (id, token) => {
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