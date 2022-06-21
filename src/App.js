import React, { Suspense, useMemo } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { routes } from "./configs/routes";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { UserContext } from "./context/UserContext";
import PageBase from "./components/layout/PageBase";

const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Admin = React.lazy(() => import("./pages/Admin"));
const Login = React.lazy(() => import("./pages/Login"));
const AddBudaya = React.lazy(() => import("./pages/AddBudaya"));

function App() {
  const [user, setUser] = useLocalStorage("user");
  const userProvider = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <UserContext.Provider value={userProvider}>
      <Suspense fallback={<div>Loading..</div>}>
        <Router>
          <Routes>
            <Route element={<LandingPage />} exact path={routes.LANDING_PAGE()}/>
            <Route element={<Login />} exact path={routes.LOGIN()} />
            <Route 
              element={
                <ProtectedRoute user={user}>
                  <PageBase />
                </ProtectedRoute>
            }
              exact path={routes.ADMIN()}
            >
              <Route element={<Admin />} exact path={routes.ADMIN()}/>
              <Route element={<AddBudaya />} exact path={routes.ADD_BUDAYA()} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </UserContext.Provider>
  );
}

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to={routes.LOGIN()} replace />;
  }

  return children ? children : <Outlet />;
};

export default App;
