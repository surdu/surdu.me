import styles from "./Layout.module.scss";

import Header from "./Header";
import Footer from "./Footer/Footer";
import Meta from "./Meta";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(function bindOnScroll() {
    function handleScroll() {
      if (window.scrollY > 130) {
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
      <a id="top" />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
