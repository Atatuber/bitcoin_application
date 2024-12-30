import { Outlet, useLocation } from "react-router-dom";

import { useEffect } from "react";
import { getHeaderName } from "../../common/headername";
import Footer from "./Footer";
import Header from "./Header";

export default function Index() {
  const location = useLocation();

  useEffect(() => {
    const headerName = getHeaderName(location);
    document.title = "ChainVault ∙ " + headerName;
  }, [location]);

  return (
    <div className="flex bg-gray-50 flex-col justify-between min-h-screen">
      <Header location={location} />
      <Outlet />
      <Footer />
    </div>
  );
}
