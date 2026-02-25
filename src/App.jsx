import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login/Login";
import Feed from "./Feed/Feed";
import Profile from "./Profile/profile";
import Requests from "./Requests/Requests";
import Connections from "./Connections/Connections";
import SignUp from "./SignUp/SignUp";
function App() {
  return (
    <div>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/connections" element={<Connections />} />
            <Route
              path="*"
              element={<h1 className="text-2xl text-white">404 Not Found</h1>}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
