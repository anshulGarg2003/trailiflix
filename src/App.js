import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthContextProvider } from "./Context/AuthContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ProtectedRoute from "./pages/ProtectedRoute";
import Outsider from "./pages/Outsider";
import Movie from "./pages/Movie";
import MovieSearch from "./pages/MovieSearch";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          
          <Route path="/" element={<Outsider />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/movie/:movieId"
            element={
              <ProtectedRoute>
                <Movie /> 
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/logIn" element={<Login />}></Route>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/search/:searchmovie" element={<MovieSearch/>}></Route>
          <Route path="*" element={<ErrorPage/>}></Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
