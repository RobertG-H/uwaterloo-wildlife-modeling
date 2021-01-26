import "./App.css";
import ApplicationRoutes from "./config/ApplicationRoutes";
import { AuthProvider } from "./AuthProvider";
import '@arcgis/core/assets/esri/themes/dark/main.css';

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