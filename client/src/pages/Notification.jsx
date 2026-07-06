import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";

import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from "../services/notificationService";

function Notifications() {

  const { token } = useAuth();

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

  loadNotifications();

  const interval = setInterval(() => {

    loadNotifications();

  }, 10000); // every 10 sec

  return () => clearInterval(interval);

}, []);

  const loadNotifications = async () => {

    try {

      const data =
        await getNotifications(token);

      setNotifications(

  data.notifications.sort((a, b) => {

    if (a.isRead === b.isRead) {

      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );

    }

    return a.isRead ? 1 : -1;

  })

);
    } catch {

      toast.error(
        "Unable to load notifications"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleRead = async (id) => {

    try {

      await markNotificationRead(
        id,
        token
      );

      toast.success("Marked as read");

      loadNotifications();

    } catch {

      toast.error("Failed");

    }

  };

  const handleDelete = async (id) => {

    try {

      await deleteNotification(
        id,
        token
      );

      toast.success("Deleted");

      loadNotifications();

    } catch {

      toast.error("Delete Failed");

    }

  };

  if (loading) {

    return (

      <DashboardLayout>

        <div className="text-center text-3xl text-white">

          Loading...

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <h1 className="mb-10 flex items-center gap-3 text-5xl font-bold text-white">

        <Bell className="text-emerald-400" />

        Notifications

      </h1>

      <div className="space-y-6">

        {notifications.length === 0 && (

          <div className="rounded-3xl bg-slate-900 p-10 text-center text-slate-400">

            No Notifications

          </div>

        )}

        {notifications.map((notification) => (

          <div
            key={notification._id}
            className={`rounded-3xl border p-6 transition duration-300 ${
              notification.isRead
? "border-slate-800 bg-slate-900"
: "border-emerald-500 bg-emerald-500/10"
            }`}
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-white">

                  {notification.title}

                </h2>

                <p className="mt-2 text-slate-400">

                  {notification.message}

                </p>

                <p className="mt-3 text-sm text-slate-500">

                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}

                </p>

              </div>

              <div className="flex gap-3">

                {!notification.isRead && (

                  <button
                    onClick={() =>
                      handleRead(
                        notification._id
                      )
                    }
                    className="rounded-xl bg-emerald-600 p-3 text-white hover:bg-emerald-700"
                  >

                    <CheckCircle />

                  </button>

                )}

                <button
                  onClick={() =>
                    handleDelete(
                      notification._id
                    )
                  }
                  className="rounded-xl bg-red-600 p-3 text-white hover:bg-red-700"
                >

                  <Trash2 />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>

  );

}

export default Notifications;