import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

