/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';

// Customer Pages
import CustomerProjects from './pages/customer/Projects';
import CustomerCart from './pages/customer/Cart';
import CustomerInvestments from './pages/customer/Investments';
import CustomerWallet from './pages/customer/Wallet';
import CustomerProfile from './pages/customer/Profile';
import CustomerSupport from './pages/customer/Support';

// Owner Pages
import OwnerProjects from './pages/owner/Projects';
import OwnerWallet from './pages/owner/Wallet';
import OwnerProfile from './pages/owner/Profile';
import OwnerSupport from './pages/owner/Support';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminCustomers from './pages/admin/Customers';
import AdminOwners from './pages/admin/Owners';
import AdminProfileUpdates from './pages/admin/ProfileUpdates';
import AdminValidations from './pages/admin/Validations';
import AdminTracking from './pages/admin/Tracking';
import AdminSupport from './pages/admin/Support';
import AdminWithdrawals from './pages/admin/Withdrawals';
import AdminStaffList from './pages/admin/StaffList';
import AdminStaffDetails from './pages/admin/StaffDetails';
import AdminProfile from './pages/admin/Profile';
import RestrictedAccounts from './pages/admin/RestrictedAccounts';
import RestrictedAccess from './pages/RestrictedAccess';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/customer" element={<Layout />}>
              <Route path="projects" element={<CustomerProjects />} />
              <Route path="cart" element={<CustomerCart />} />
              <Route path="investments" element={<CustomerInvestments />} />
              <Route path="wallet" element={<CustomerWallet />} />
              <Route path="profile" element={<CustomerProfile />} />
              <Route path="support" element={<CustomerSupport />} />
            </Route>

            <Route path="/owner" element={<Layout />}>
              <Route path="projects" element={<OwnerProjects />} />
              <Route path="wallet" element={<OwnerWallet />} />
              <Route path="profile" element={<OwnerProfile />} />
              <Route path="support" element={<OwnerSupport />} />
            </Route>

            <Route path="/admin" element={<Layout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="owners" element={<AdminOwners />} />
              <Route path="profile-updates" element={<AdminProfileUpdates />} />
              <Route path="validations" element={<AdminValidations />} />
              <Route path="tracking" element={<AdminTracking />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="withdrawals" element={<AdminWithdrawals />} />
              <Route path="staff/:role" element={<AdminStaffList />} />
              <Route path="staff-details/:userId" element={<AdminStaffDetails />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="restricted-accounts" element={<RestrictedAccounts />} />
            </Route>

            <Route path="/restricted-access" element={<RestrictedAccess />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
