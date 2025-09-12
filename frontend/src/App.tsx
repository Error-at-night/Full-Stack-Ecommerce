import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NavigateHandler } from "./components";

import { ProtectedRoute, Layout, LoadingSpinner, AppToaster } from "./ui"

const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));
const ResendVerificationCode = lazy(() => import("./pages/auth/ResendVerificationCode"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

import AdminLayout from "./pages/admin";
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const SingleProduct = lazy(() => import("./pages/admin/products/singleProduct"));
const EditProductForm = lazy(() => import("./pages/admin/products/EditProductForm"));
const Users = lazy(() => import("./pages/admin/users"));
const Orders = lazy(() => import("./pages/admin/orders"));

const Home = lazy(() => import("./pages/home"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavigateHandler/>
        <Suspense fallback={<LoadingSpinner/>}>
          <Routes>
            {/* protected routes (users and admin) */}
            <Route element={
              <ProtectedRoute>
                <Layout/>
              </ProtectedRoute>}
            >
              <Route index element={<Navigate replace to="home"/>} />
              <Route path="home" element={<Home/>} />
            </Route>

            {/* protected routes (admin only) */}
            <Route path="admin" element={
              <ProtectedRoute roles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>}
            >
              <Route index element={<Navigate replace to="dashboard"/>} />
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="products" element={<Products/>} />
              <Route path="products/:id" element={<SingleProduct/>}/>
              <Route path="products/:id/edit" element={<EditProductForm/>}/>
              <Route path="users" element={<Users/>} />
              <Route path="orders" element={<Orders/>} />
            </Route>

            {/* public routes */}
            <Route path="register" element={<Register/>} />
            <Route path="verify-email" element={<VerifyEmail/>} />
            <Route path="resend-verification-code" element={<ResendVerificationCode/>} />
            <Route path="login" element={<Login/>} />
            <Route path="forgot-password" element={<ForgotPassword/>} />
            <Route path="reset-password/:token" element={<ResetPassword/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <AppToaster/>
    </QueryClientProvider>
  )
}

export default App