import "./App.css";
import ApplicationRoutes from "./config/ApplicationRoutes";
import { AuthProvider } from "./AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ApplicationRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;