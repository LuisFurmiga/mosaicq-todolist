// frontend/src/App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from "./context/TaskContext";
import Header from './components/Header';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
      <AuthProvider>
        <TaskProvider>
          <Header />
          <Routes>
            <Route path="/" element={
                <ProtectedRoute> <Home /> </ProtectedRoute>
            }/>
            <Route path="/login" element={
              <ProtectedRoute> <Login /> </ProtectedRoute>
            }/>
            <Route path="/register" element={
              <ProtectedRoute> <Register /> </ProtectedRoute>
            }/>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
  );
}

export default App;
