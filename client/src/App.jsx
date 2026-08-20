import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
// import Testimonials from "./components/layout/Testimonials";
import { CartProvider } from "./context/CartContext";
import { CustomerAuthProvider } from "./context/CustomerAuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
// import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
// import RefundPolicy from "./pages/policies/RefundPolicy";
// import ReturnPolicy from "./pages/policies/ReturnPolicy";
// import ShippingPolicy from "./pages/policies/ShippingPolicy";

export default function App() {
  return (
    <CartProvider>
      <CustomerAuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* <Route path="/reviews" element={<Testimonials />} /> */}
         <Route path="/login" element={<Login />} />          
            <Route path="/register" element={<Register />} />      
            <Route path="/checkout" element={<Checkout />} />      
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
             <Route path="/profile" element={<Profile />} />
             {/* <Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/refund_policy" element={<RefundPolicy />} />
<Route path="/returns" element={<ReturnPolicy />} />
<Route path="/shipping" element={<ShippingPolicy />} /> */}
      </Routes>
    </BrowserRouter>
    </CustomerAuthProvider>
    </CartProvider>
  );
}