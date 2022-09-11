import styles from "./Layout.module.scss";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useEffect } from "react";
import SkipToContent from "~/components/SkipToContent/SkipToContent";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(function bindOnScroll() {
    function handleScroll() {
      if (window.scrollY > 110) {
        document.body.setAttribute("header-scrolled", "");
      } else {
        document.body.removeAttribute("header-scrolled");
      }

      if (window.scrollY > vh(90)) {
        document.body.setAttribute("data-page-scrolled", "");
      } else {
        document.body.removeAttribute("data-page-scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <SkipToContent />
      <Header />
      <main className={styles.main} id="mainContent" aria-label="Main content">
        {children}
      </main>
      <Footer />
    </>
  );
}

function vh(value: number) {
  const height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (value * height) / 100;
}