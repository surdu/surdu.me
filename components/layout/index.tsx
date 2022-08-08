import styles from "./Layout.module.scss";

import Header from "./Header/Header";
import Footer from "./Footer";
import Meta from "./Meta";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(function bindOnScroll() {
    function handleScroll() {
      if (window.scrollY > 70) {
        document.body.setAttribute("data-scrolled", "");
      } else {
        document.body.removeAttribute("data-scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Meta />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
