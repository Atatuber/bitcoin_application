import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Index from "./features/Index/Index";
import LoginPage from "./features/Login/LoginPage";
import ProtectedRoute from "./features/Auth/ProtectedRoute";

const HomePage = lazy(() => import("./features/Home/HomePage"));
const AddWalletPage = lazy(() => import("./features/AddWallet/AddWalletPage"));
const AddTransactionPage = lazy(() =>
  import("./features/AddTransaction/AddTransactionPage")
);
const TransactionsPage = lazy(() =>
  import("./features/TransactionsPage/TransactionsPage")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Index />}>
        <Route
          element={<ProtectedRoute />}
          loader={async () => {
            const { loader: ProtectedRouteLoader } = await import(
              "./features/Auth/ProtectedRoute"
            );
            return ProtectedRouteLoader();
          }}
        >
          <Route
            index
            element={<HomePage />}
            loader={async () => {
              const { loader: HomeLoader } = await import(
                "./features/Home/HomePage"
              );
              return HomeLoader();
            }}
          />
          <Route
            path="wallets/add"
            element={<AddWalletPage />}
            loader={async () => {
              const { loader: UserLoader } = await import(
                "./features/AddWallet/AddWalletPage"
              );
              return UserLoader();
            }}
          />
          <Route
            path="transactions/add"
            element={<AddTransactionPage />}
            loader={async () => {
              const { loader: WalletLoader } = await import(
                "./features/AddTransaction/AddTransactionPage"
              );
              return WalletLoader();
            }}
          />
          <Route
            path="transactions"
            element={<TransactionsPage />}
            loader={async () => {
              const { loader: WalletsAndTransactionsLoader } = await import(
                "./features/TransactionsPage/TransactionsPage"
              );
              return WalletsAndTransactionsLoader();
            }}
          />
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
