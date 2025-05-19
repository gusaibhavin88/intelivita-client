import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/home/home";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/home";
import PageNotFound from "./components/pageNotFound";
import { PrivateRoute } from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import RedirectPage from "./pages/auth/redirectPage";
import LeaderBoard from "./components/leaderBoard/leaderBoard";

function App() {
  return (
    <div>
      <LeaderBoard />
    </div>
  );
}

export default App;
