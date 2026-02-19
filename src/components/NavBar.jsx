import React from 'react'

export function NavBar() {
  return (
    <div className="navbar shadow-sm shadow-[#818cf8]" style={{backgroundColor:"var(--color-navbar)"}}>
  <div className="flex-1">
    <a className="font-['Space_Grotesk'] btn btn-ghost text-2xl text-white">Dev Tinder</a>
  </div>
  <div className="font-['Poppins'] flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto text-white placeholder-white bg-[#818CF8]" />
    <div className="dropdown dropdown-end mx-2">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default NavBar
