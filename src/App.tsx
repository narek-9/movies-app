import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import { routes } from "./routes";

import Header from "./components/ui/Header/Header";

import bg from "./assets/bg.jpg";

import styles from "./App.module.scss";

const App: FC = () => {
  return (
    <div className={styles.App} style={{ backgroundImage: `url(${bg})` }}>
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
