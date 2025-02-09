import "./App.css";
import Page1 from "./Components/Page1";
import Page2 from "./Components/Page2";
import Page3 from "./Components/Page3";
import Page4 from "./Components/Page4";
import Page5 from "./Components/Page5";
import Page6 from "./Components/Page6";
import Home from "./Components/Home";
import AuthProvider from "./Context/AuthContext";
import { SearchProvider } from "./Components/SearchContext";
const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <Home />
          <Page1 />
          <Page2 />
          <Page3 />
          <Page4 />
          <Page5 />
          <Page6 />
        </SearchProvider>
      </AuthProvider>
    </>
  );
};

export default App;
