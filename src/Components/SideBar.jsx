import React from "react";
import { MdMessage } from "react-icons/md";
import MessageSettingsPanel from "./MessageSettingPanel";

export default (props) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ position: "relative" }}>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "messageNode")}
        draggable
      >
        <MdMessage size={30} color="#0041d0" />
        <div>Message</div>
      </div>
      {props.children && (
        <div
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            width: "calc(100% - 20px)",
            opacity: "1",
            backgroundColor: "white",
          }}
        >
          {props.children}
        </div>
      )}
    </aside>
  );
};
