import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet
} from "react-router-dom";

import Index from "./features/Index/Index";
import LoginPage from "./features/Login/LoginPage";
import ProtectedRoute from "./features/Auth/ProtectedRoute";
import LoadingSpinner from "./features/Context/LoadingSpinner";

import { walletsAndTransactionsLoader, protectedRouteLoader, userDataLoader } from "./api/loader";

const HomePage = lazy(() => import("./features/Home/HomePage"));
const AddWalletPage = lazy(() => import("./features/AddWallet/AddWalletPage"));
const AddTransactionPage = lazy(() =>
  import("./features/AddTransaction/AddTransactionPage")
);
const TransactionsPage = lazy(() =>
  import("./features/TransactionsPage/TransactionsPage")
);

const SuspenseLayout = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Index />}>
      <Route element={<SuspenseLayout />}>
        <Route
          element={<ProtectedRoute />}
          loader={protectedRouteLoader}
        >
          <Route
            index
            element={<HomePage />}
            loader={walletsAndTransactionsLoader}
          />
          <Route
            path="wallets/add"
            element={<AddWalletPage />}
            loader={userDataLoader}
          />
          <Route
            path="transactions/add"
            element={<AddTransactionPage />}
            loader={walletsAndTransactionsLoader}
          />
          <Route
            path="transactions"
            element={<TransactionsPage />}
            loader={walletsAndTransactionsLoader}
          />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
