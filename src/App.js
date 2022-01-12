import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home/Home/Home";

import SeeAllEmployee from "./Pages/Home/SeeAllEmployee/SeeAllEmployee";
import AddEmployee from "./Pages/Home/AddEmployee/AddEmployee/AddEmployee";
import WithForm from "./Pages/Home/AddEmployee/WithForm/WithForm";
import WithCSV from "./Pages/Home/AddEmployee/WithCSV/WithCSV";
import HomeDash from "./Pages/Home/HomeDash/HomeDash";
import SignIn from "./Share/SignIn/SignIn";
import SignUp from "./Share/SignUp/SignUp";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./Share/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<HomeDash />} />
              <Route
                path="addemployee"
                element={
                  <PrivateRoute>
                    <AddEmployee />
                  </PrivateRoute>
                }
              >
                <Route path="" element={<WithForm />} />
                <Route path="withcsv" element={<WithCSV />} />
              </Route>
              <Route
                path="employeelist"
                element={
                  <PrivateRoute>
                    <SeeAllEmployee />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
