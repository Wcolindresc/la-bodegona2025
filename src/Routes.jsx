 import React from "react";
 import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
-import ScrollToTop from "components/ScrollToTop";
-import ErrorBoundary from "components/ErrorBoundary";
-import NotFound from "pages/NotFound";
+import ScrollToTop from "./components/ScrollToTop.jsx";
+import ErrorBoundary from "./components/ErrorBoundary.jsx";
+import NotFound from "./pages/NotFound.jsx";
 import ShoppingCart from './pages/shopping-cart';
 import ProductCatalog from './pages/product-catalog';
 import AdminDashboard from './pages/admin-dashboard';
 import LoginPage from './pages/login';
 import OrderConfirmation from './pages/order-confirmation';
 import ProductDetails from './pages/product-details';
 import OrderHistory from './pages/order-history';
 import ProductManagement from './pages/product-management';
 import UserDashboard from './pages/user-dashboard';
 import Checkout from './pages/checkout';
 import Register from './pages/register';
+import AdminUploadImage from './pages/admin-upload-image';

 const Routes = () => {
   return (
     <BrowserRouter>
       <ErrorBoundary>
       <ScrollToTop />
       <RouterRoutes>
         {/* Define your route here */}
         <Route path="/" element={<ProductCatalog />} />
         <Route path="/shopping-cart" element={<ShoppingCart />} />
         <Route path="/product-catalog" element={<ProductCatalog />} />
         <Route path="/admin-dashboard" element={<AdminDashboard />} />
+        <Route path="/admin/upload-image" element={<AdminUploadImage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/order-confirmation" element={<OrderConfirmation />} />
         <Route path="/product-details" element={<ProductDetails />} />
         <Route path="/order-history" element={<OrderHistory />} />
         <Route path="/product-management" element={<ProductManagement />} />
         <Route path="/user-dashboard" element={<UserDashboard />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/register" element={<Register />} />
         <Route path="*" element={<NotFound />} />
       </RouterRoutes>
       </ErrorBoundary>
     </BrowserRouter>
   );
 };

 export default Routes;
