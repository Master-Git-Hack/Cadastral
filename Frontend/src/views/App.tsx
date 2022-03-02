import { Fragment } from "react";
import "../assets/css/bootstrap.min.css";
//import { Homologations } from "./Homologation";
import { RenderRoutes } from "../routes/routes";
function App() {
  return (
    <Fragment>
      <RenderRoutes key="routes" />
    </Fragment>
  );
}

export default App;
