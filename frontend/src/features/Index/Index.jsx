import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { getHeaderName } from "../../common/headername";

import SkeletonSection from "./SkeletonSection";
import Footer from "./Footer";
import Header from "./Header";

export default function Index() {
  const location = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    const headerName = getHeaderName(location);
    document.title = "ChainVault ∙ " + headerName;
  }, [location]);

  const skeletonScreens = () => {
    return (
      <div className="flex justify-center items-center w-full gap-4">
        <SkeletonSection />
        <SkeletonSection />
        <SkeletonSection />
        <SkeletonSection />
      </div>
    );
  };

  return (
    <div className="flex bg-gray-50 flex-col justify-between min-h-screen">
      <Header location={location} />
      {navigation.state !== "loading" ? <Outlet /> : skeletonScreens()}
      <Footer />
    </div>
  );
}
