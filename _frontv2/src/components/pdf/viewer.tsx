import { FC, Fragment } from "react";
export const Viewer: FC<{
  dataSrc: string;
}> = (props) => (
  <Fragment>
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        title="PDF Viewer"
        className="embed-responsive-item"
        allowFullScreen={true}
        width={props.dataSrc ? "0%" : 300}
        height={props.dataSrc ? "0%" : 460}
        data-type="application/pdf"
        loading="lazy"
        src={props.dataSrc}
      />
    </div>
  </Fragment>
);
