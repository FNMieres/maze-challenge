import { ReactNode } from "react";
import styles from "./Layout.module.css";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav>Maze challenge</nav>
      </header>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>
        <div>Developed by Federico Mieres</div>
      </footer>
    </div>
  );
}

export default Layout;
