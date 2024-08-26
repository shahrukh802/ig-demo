import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./routes/ProtectedRoute";
import PublicRoutes from "./routes/PublicRoutes";
import Login from "./components/Auth/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Dashboard/Home";
import Reports from "./components/Dashboard/Reports";
import Settings from "./components/Dashboard/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path={"/"} element={<Login />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path={"/home"} element={<Home />} />
          <Route path={"/reports"} element={<Reports />} />
          <Route path={"/settings"} element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
