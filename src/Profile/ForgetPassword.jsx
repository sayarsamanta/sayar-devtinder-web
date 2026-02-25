import { useState } from "react";
import useUpdatePassword from "../hook/updatePassword";

export default function ForgetPassword({ setShowEdit }) {
  const { updatePassword, loading } = useUpdatePassword();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    updatePassword(formData.oldPassword, formData.newPassword);
  };

  return (
    <div className="flex w-full font-['Poppins'] flex-col h-full bg-white">
      {/* Scrollable Content */}
      <div className="grow overflow-y-auto p-5">
        <h2 className="text-2xl font-semibold text-[#453ed3] mb-6">
          Change Password
        </h2>

        <form
          id="changePasswordForm"
          onSubmit={handleSubmit}
          className="space-y-4 "
        >
          {/* Old Password */}
          <div className="flex-1 overflow-y-auto px-6 py-0 min-h-0 scrollbar-hide"></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              className="w-full text-sm mt-1 px-4 py-2 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#453ed3]
              focus:border-[#453ed3] transition"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full text-sm mt-1 px-4 py-2 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#453ed3]
              focus:border-[#453ed3] transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full text-sm mt-1 px-4 py-2 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#453ed3]
              focus:border-[#453ed3] transition"
            />
          </div>
        </form>
      </div>

      {/* Bottom Button Section (Pinned to Bottom of Card) */}
      <div className="p-6 bg-white rounded-b-2xl flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setShowEdit(false)}
          className="w-full sm:w-auto
          px-3 sm:px-6 md:px-3 lg:px-6
          py-2 sm:py-2.5 md:py-1 lg:py-2
          text-xs sm:text-sm md:text-sm lg:text-base
          rounded-full
          border border-[#453ed3]
          text-[#453ed3]
          hover:bg-[#453ed3]
          hover:text-white
          transition
          flex items-center justify-center
          whitespace-nowrap"
        >
          Back to Profile
        </button>

        <button
          type="submit"
          form="changePasswordForm"
          disabled={loading}
          className="w-full sm:w-auto
          px-3 sm:px-6 md:px-3 lg:px-6
          py-2 sm:py-2.5 md:py-1 lg:py-2
          text-xs sm:text-sm md:text-sm lg:text-base
          bg-(--color-primary)
          hover:bg-(--color-navbar)
          text-white
          rounded-full
          shadow-lg
          transition
          flex items-center justify-center
          whitespace-nowrap"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
