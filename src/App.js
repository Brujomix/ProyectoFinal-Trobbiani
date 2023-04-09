import { MainLayout } from "./main/MainLayout";
import { MainRoutes } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <MainRoutes />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
