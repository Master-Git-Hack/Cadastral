import { FC, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "../components/navbar/navBar";
import Error418 from "../views/Error418";
import Homologations from "../views/Homologation";
export const WithNavigation: FC = () => (
  <Fragment>
    <NavBar key="navigation" />
    <Routes>
      <Route path="*" element={<Error418 key="Error418" />} />
    </Routes>
  </Fragment>
);

export const SinglePages: FC = () => (
  <Routes>
    <Route
      path="/homologaciones/"
      element={<Homologations key="single-page-homologations" />}
    />
    <Route path="*" element={<Error418 key="Error418" />} />
  </Routes>
);

export const RenderRoutes: FC = () => (
  <Fragment>
    {new URLSearchParams(window.location.search).get("key") !== null ? (
      <SinglePages />
    ) : (
      <WithNavigation />
    )}
  </Fragment>
);
