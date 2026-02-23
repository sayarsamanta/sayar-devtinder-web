import React from "react";
import useUpdateUser from "../hook/updateUser";

const UserCard = (user) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const { updateUser, error, loading } = useUpdateUser();
  React.useEffect(() => {
    if (user?.user) {
      setFirstName(user.user.firstName || "");
      setLastName(user.user.lastName || "");
      setEmail(user.user.email || "");
      setAge(user.user.age || "");
      setGender(user.user.gender || "");
      setAbout(user.user.about || "");
      setPhotoURL(user.user.photoURL || "");
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
    <div className="flex font-['Poppins'] justify-center px-4 my-8 sm:pb-20">
      <div
        className="
      w-full 
      max-w-5xl 
      rounded-3xl 
      shadow-2xl 
      flex 
      flex-col md:flex-row 
      overflow-hidden 
      border border-(--color-body)
      bg-white
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
        flex 
        flex-col 
        items-center 
        justify-center 
        p-6 
        text-white
      "
        >
          <div className="relative">
            <img
              src={photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white shadow-xl"
            />
          </div>

          <h3 className="mt-6 text-lg font-semibold">
            {firstName + " " + lastName}
          </h3>
          <p className="text-sm opacity-90">{email}</p>
        </div>

        {/* RIGHT EDIT SECTION */}
        <div className="md:w-2/3 w-full p-6 md:p-8 bg-white text-black">
          <h2 className="text-xl md:text-2xl font-bold text-(--color-primary) mb-6">
            Edit Profile
          </h2>

          {/* First Name */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              //value={firstName}
              className="w-full text-(--color-primary)  text-sm mt-1 px-4 py-2 border border-(--color-body) rounded-xl focus:outline-none focus:ring-1 focus:ring-(--color-footer)"
              placeholder="John"
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
              value={lastName}
              className="w-full text-(--color-primary) text-sm mt-1 px-4 py-2 border border-(--color-body) rounded-xl focus:outline-none focus:ring-1 focus:ring-(--color-footer)"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">Age</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`
    w-full mt-1 px-4 py-2
    border border-(--color-body)
    rounded-xl
    focus:outline-none focus:ring-1
    focus:ring-(--color-footer)
    ${!age ? "opacity-60" : "opacity-100"}
  `}
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
            <label className="text-sm font-medium text-gray-600">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`
    w-full mt-1 px-4 py-2 
    border border-(--color-body)
    rounded-xl
    bg-white
    focus:outline-none focus:ring-1 
    focus:ring-(--color-footer)
    transition
    ${
      !gender
        ? "text-(--color-primary) opacity-60"
        : "text-(--color-primary) opacity-100"
    }
  `}
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
            <label className="text-sm font-medium text-gray-600">About</label>
            <textarea
              className="w-full text-sm mt-1 px-4 py-3 border border-(--color-body) rounded-xl h-28 md:h-32 resize-none focus:outline-none focus:ring-1 focus:ring-(--color-footer) transition"
              placeholder="Write something attractive about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>

          {/* Photo */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">Photo</label>
            <input
              type="text"
              className="w-full text-sm text-(--color-primary)  mt-1 px-4 py-2 border border-(--color-body) rounded-xl focus:outline-none focus:ring-1 focus:ring-(--color-footer)"
              placeholder="https://picsum.photos/200"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6" onClick={handleSubmit}>
            <button className="bg-(--color-primary) hover:bg-(--color-navbar) text-white px-6 md:px-8 py-2 rounded-full shadow-lg transition">
              {loading && (
                <span className="w-4 h-4 border-2 border-[#4f46e5] border-t-transparent rounded-full animate-spin"></span>
              )}

              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
