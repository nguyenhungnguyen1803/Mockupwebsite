import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { LoginPage } from "./pages/LoginPage";
import { CartPage } from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { Toaster } from "./components/ui/sonner";

// Admin imports
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import PaymentManagement from "./pages/admin/PaymentManagement";
import UserManagement from "./pages/admin/UserManagement";
import AdminAddProduct from "./pages/admin/AdminAddProduct";

// Placeholder pages - to be implemented


// Admin pages have been implemented in separate files

// Component to conditionally render footer
function LayoutWithFooter({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/admin/*" element={<AdminAppContent />} />
      </Routes>
    </div>
  );
}

function AdminAppContent() {
  return (
    <Routes>
      <Route path="" element={<AdminDashboard />} />
      <Route path="products" element={<ProductManagement />} />
      <Route path="products/add" element={<AdminAddProduct />} />
      <Route path="orders" element={<OrderManagement />} />
      <Route path="payments" element={<PaymentManagement />} />
      <Route path="users" element={<UserManagement />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppWrapper />
      </StoreProvider>
    </BrowserRouter>
  );
}

function AppWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AppContent />
      {!isAdminRoute && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
