import styles from "./Layout.module.scss";

import Header from "./Header/Header";
import Footer from "./Footer";
import Meta from "./Meta";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Meta />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
