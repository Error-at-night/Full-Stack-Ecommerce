import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { NavigateHandler } from "./components";

import { ProtectedRoute, Layout } from "./ui"

import { Register, Login, VerifyEmail, ResendVerificationCode, ForgotPassword, ResetPassword } from "./pages/auth"

import Home from "./pages/home";

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
          <Route element={
              <ProtectedRoute>
                <Layout/>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home/>} />
          </Route>
          <Route path="register" element={<Register/>} />
          <Route path="verify-email" element={<VerifyEmail/>} />
          <Route path="resend-verification-code" element={<ResendVerificationCode/>} />
          <Route path="login" element={<Login/>} />
          <Route path="forgot-password" element={<ForgotPassword/>} />
          <Route path="reset-password/:token" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "350px",
            padding: "16px 15px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App