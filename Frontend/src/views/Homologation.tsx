import { FC } from "react";
import FactorsCompilation from "../components/homologation/factors";
const Homologations: FC = () => (
  <div className="container m-auto">
    <FactorsCompilation key="factors-compilation-view" />
    <button
      onClick={() => {
        if (window.confirm("Close")) window.opener = null;
        window.open("about:blank", "_self", "");
        window.close();
      }}
    >
      close
    </button>
  </div>
);
export default Homologations;
