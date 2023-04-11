import { MainLayout } from "./main/MainLayout";
import { MainRoutes } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <MainLayout>
          <MainRoutes />
        </MainLayout>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
