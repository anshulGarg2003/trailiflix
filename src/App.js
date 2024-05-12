import { Route, Routes } from "react-router-dom";
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
import { Toaster } from "react-hot-toast";
import MovieSearchByGenes from "./pages/MovieSearchByGenes";
import TVShow from "./pages/TVShow";
import { UserAuth } from "./Context/AuthContext"; // Assuming UserAuth is your authentication function

function App() {
  const { user } = UserAuth() || {};

  return (
    <>
      <Toaster />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Outsider />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<Login />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:movieId"
            element={
              <ProtectedRoute>
                <Movie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tv/:showId"
            element={
              <ProtectedRoute>
                <TVShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search/:searchmovie"
            element={
              <ProtectedRoute>
                <MovieSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search/genes/:id"
            element={
              <ProtectedRoute>
                <MovieSearchByGenes />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
