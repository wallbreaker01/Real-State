import { BrowserRouter, Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import SingIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/about";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<SingIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile" element={<Profile />} />

  </Routes>
  </BrowserRouter>
  );
}
