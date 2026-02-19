import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./body";
import Login from "./Login/Login";
import Feed from "./Feed/Feed";
function App() {

  return (
    <div>
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </Router>
    </div>
  )
}

export default App
