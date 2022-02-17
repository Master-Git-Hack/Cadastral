export default function Viewer(props: { data: string }) {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        title={"Viewer"}
        data-type={"application/pdf"}
        width={props.data !== "" ? 300 : "0%"}
        height={props.data !== "" ? 460 : "0%"}
        className="embed-responsive-item"
        src={props.data}
      />
    </div>
  );
}
