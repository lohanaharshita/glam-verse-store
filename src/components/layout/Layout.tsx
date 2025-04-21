
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "../cart/Cart";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Cart />
      <Footer />
    </div>
  );
};

export default Layout;
