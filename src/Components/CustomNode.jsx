import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { Handle, Position } from "reactflow";

const CustomNode = (props) => {
  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div
        className="customNode"
        style={{
          boxShadow: "5px 5px 5px 5px #e1e1e1",
          display: "flex",
          flexDirection: "column",
          width: "180px",
          borderRadius: "10px 10px 10px 10px",
          paddingBottom: "10px",
          // border: "5px solid red",
        }}
        // onClick={() => {
        //   console.log("Logging");
        // }}
      >
        <div
          style={{
            height: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2px 5px",
            borderRadius: "10px 10px 0px 0px",
            backgroundColor: "#b4ede4",
          }}
          className="upperHalf"
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <BiMessageRoundedDetail />{" "}
            <span>
              <b style={{ marginLeft: "5px" }}>Send Message</b>
            </span>
          </div>
          <FaWhatsapp color="green" />
        </div>
        <div
          className="lowerHalf"
          style={{
            textAlign: "center",
            minHeight: "30px",
          }}
        >
          {props.data.text}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={true}
      />
    </>
  );
};

export default CustomNode;
