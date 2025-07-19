import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import { Provider, useSelector } from "react-redux";
import Login from "./app/login";
import Register from "./app/register";
import Dashboard from "./app/dashboard";
import { store } from "./state/store";
import { Notification } from "./components/notification/notification";
import { Toaster } from "sonner";

// Protected Route component
function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Provider store={store}>
      {/* <AuthProvider> */}

      <Notification />
      <Toaster position="top-center" richColors />

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
      {/* </AuthProvider> */}
    </Provider>
  );
}

export default App;
