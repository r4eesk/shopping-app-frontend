import { CookiesProvider } from "react-cookie";
import "./App.css";

import MainComponent from "./components/MainComponent";
import AuthProvider from "./security/AuthProvider";

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <div className="App">
          <MainComponent />
        </div>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
