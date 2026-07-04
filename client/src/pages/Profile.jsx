import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../services/profileService";
import toast from "react-hot-toast";

function Profile() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile(token);

      setProfile({
        fullName: data.user.fullName || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        location: data.user.location || "",
      });
    } catch (err) {
      toast.error("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(profile, token);

      toast.success("Profile Updated");
    } catch {
      toast.error("Update Failed");
    }
  };

  const handlePassword = async () => {
    if (
      password.newPassword !==
      password.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {
      await changePassword(
        {
          currentPassword:
            password.currentPassword,
          newPassword:
            password.newPassword,
        },
        token
      );

      toast.success("Password Changed");

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch {
      toast.error("Password Change Failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center text-2xl text-white">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="mb-10 text-4xl font-bold text-white">
        My Profile
      </h1>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

        <div className="grid gap-6 md:grid-cols-2">

          <input
            value={profile.fullName}
            onChange={(e) =>
              setProfile({
                ...profile,
                fullName: e.target.value,
              })
            }
            placeholder="Full Name"
            className="rounded-xl bg-slate-800 p-4 text-white outline-none"
          />

          <input
            value={profile.email}
            disabled
            className="rounded-xl bg-slate-700 p-4 text-slate-400"
          />

          <input
            value={profile.phone}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value,
              })
            }
            placeholder="Phone"
            className="rounded-xl bg-slate-800 p-4 text-white outline-none"
          />

          <input
            value={profile.location}
            onChange={(e) =>
              setProfile({
                ...profile,
                location: e.target.value,
              })
            }
            placeholder="Location"
            className="rounded-xl bg-slate-800 p-4 text-white outline-none"
          />

        </div>

        <button
          onClick={handleUpdate}
          className="mt-8 rounded-xl bg-emerald-600 px-8 py-3 text-white"
        >
          Save Profile
        </button>

      </div>

      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Change Password
        </h2>

        <div className="space-y-5">

          <input
            type="password"
            placeholder="Current Password"
            value={password.currentPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                currentPassword: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
          />

          <input
            type="password"
            placeholder="New Password"
            value={password.newPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                newPassword: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                confirmPassword: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
          />

          <button
            onClick={handlePassword}
            className="rounded-xl bg-red-600 px-8 py-3 text-white"
          >
            Change Password
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Profile;