import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Index from "./features/Index/Index";

import HomePage, { loader as WalletsLoader } from "./features/Home/HomePage";
import LoginPage from "./features/Login/LoginPage";
import ProtectedRoute from "./features/Auth/ProtectedRoute";
import AddWalletPage, { loader as UserLoader} from "./features/AddWallet/AddWalletPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Index />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} loader={WalletsLoader} />
          <Route path="/wallets/add" element={<AddWalletPage />} loader={UserLoader} />
        </Route>
      </Route>
    </>,
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
