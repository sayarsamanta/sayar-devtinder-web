import React from "react";
import useUpdateUser from "../hook/updateUser";
import ForgetPassword from "../Profile/ForgetPassword";

const UserCard = ({ user }) => {
  const [showEdit, setShowEdit] = React.useState(false);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");

  const { updateUser, loading } = useUpdateUser();

  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSubmit = async () => {
    const updatedData = {
      firstName,
      lastName,
      age,
      gender,
      photoURL,
      about,
    };
    await updateUser(updatedData);
  };

  return (
    <div className="flex justify-center px-4 py-8 font-['Poppins']">
      <div
        className="
          max-w-5xl 
          rounded-3xl 
          
          flex 
          flex-col md:flex-row 
          overflow-hidden 
          
          bg-white
           md:h-[75vh]
           sm:h-[80vh]
           sm:w-2/3
           w-full
           h-full
           sm:fixed
           md:fixed
           lg:fixed
           
        "
      >
        {/* LEFT PROFILE SECTION */}
        <div
          className="
            md:w-1/3 
            w-full 
            bg-linear-to-br 
            from-(--color-navbar) 
            to-(--color-primary) 
            flex-col 
            items-center 
            justify-center 
            p-6 
            text-white
            hidden sm:hidden md:flex
          "
        >
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white shadow-xl"
          />

          <h3 className="mt-6 text-lg font-semibold text-center">
            {firstName} {lastName}
          </h3>
          <p className="text-sm opacity-90 text-center">{email}</p>
        </div>

        {/* RIGHT SECTION */}
        {!showEdit ? (
          <div className="md:w-2/3 w-full flex flex-col bg-white text-black min-h-0 sm:mb-1 md:mb-5">
            {/* Header */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#453ed3]">
                Edit Profile
              </h2>
            </div>

            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto px-6 py-0 min-h-0 scrollbar-hide">
              {/* First Name */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full text-sm mt-1 px-4 py-2 border border-(--color-body) rounded-xl focus:outline-none focus:ring-1 focus:ring-(--color-footer)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full text-sm mt-1 px-4 py-2 border border-(--color-body) rounded-xl focus:outline-none focus:ring-1 focus:ring-(--color-footer)"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* Age */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">Age</label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-(--color-body) rounded-xl focus:outline-none focus:ring-1 focus:ring-(--color-footer)"
                >
                  <option value="" disabled>
                    Select age
                  </option>
                  {[...Array(83)].map((_, i) => (
                    <option key={i} value={i + 18}>
                      {i + 18}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-(--color-body) rounded-xl focus:outline-none focus:ring-1 focus:ring-(--color-footer)"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>

              {/* About */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-600">
                  About
                </label>
                <textarea
                  className="w-full text-sm mt-1 px-4 py-3 border border-(--color-body) rounded-xl h-28 resize-none focus:outline-none focus:ring-1 focus:ring-(--color-footer)"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              {/* Photo URL */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-600">
                  Photo URL
                </label>
                <input
                  type="text"
                  className="w-full text-sm mt-1 px-4 py-2 border border-(--color-body) rounded-xl focus:outline-none focus:ring-1 focus:ring-(--color-footer)"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>
              <div
                className="
  flex 
  flex-col 
  xs:flex-col 
  sm:flex-row 
  gap-3 
  p-4 
  sm:p-4 
  bg-white
  items-end justify-end
"
              >
                <button
                  onClick={() => setShowEdit(true)}
                  className="
      w-full sm:w-auto
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
      whitespace-nowrap
    "
                >
                  Update Password
                </button>

                <button
                  onClick={handleSubmit}
                  className="
      w-full sm:w-auto
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
      whitespace-nowrap
    "
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Bottom Buttons */}
          </div>
        ) : (
          <div className="md:w-2/3 min-h-0">
            <ForgetPassword setShowEdit={setShowEdit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
