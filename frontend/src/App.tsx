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
import ManageProducts from "./pages/admin/manageProducts";

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
        <Routes>
          {/* protected routes (users) */}
          <Route element={
            <ProtectedRoute>
              <Layout/>
            </ProtectedRoute>}
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Suspense fallback={<LoadingSpinner/>}><Home/></Suspense>} />
          </Route>
          {/* protected routes (admin) */}
          <Route path="admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>}
          >
            <Route index element={<Navigate replace to="manage-product"/>} />
            <Route path="manage-product" element={<Suspense fallback={<LoadingSpinner/>}><ManageProducts/></Suspense>}/>
          </Route>
          {/* public routes */}
          <Route path="register" element={<Suspense fallback={<LoadingSpinner/>}><Register/></Suspense>} />
          <Route path="verify-email" element={<Suspense fallback={<LoadingSpinner/>}><VerifyEmail/></Suspense>} />
          <Route path="resend-verification-code" element={<Suspense fallback={<LoadingSpinner/>}><ResendVerificationCode/></Suspense>} />
          <Route path="login" element={<Suspense fallback={<LoadingSpinner/>}><Login/></Suspense>} />
          <Route path="forgot-password" element={<Suspense fallback={<LoadingSpinner/>}><ForgotPassword/></Suspense>} />
          <Route path="reset-password/:token" element={<Suspense fallback={<LoadingSpinner/>}><ResetPassword/></Suspense>} />
        </Routes>
      </BrowserRouter>
      <AppToaster/>
    </QueryClientProvider>
  )
}

export default App