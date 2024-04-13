import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

const MessageSettingsPanel = ({ onClose, onTextChange, onDelete, message }) => {
  return (
    <div className="message-settings-panel">
      <div className="panel-header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IoMdArrowRoundBack size={20} onClick={onClose} />
          <RiDeleteBin6Line size={20} color="red" onClick={onDelete} />
        </div>
        <h2 style={{ textAlign: "center" }}>Message</h2>
      </div>
      <div className="panel-body">
        <label htmlFor="message-input">text </label>
        <br />
        <textarea
          onChange={(e) => onTextChange(e.target.value)}
          style={{ width: "90%" }}
          cols={20}
          value={message || ""}
          type="text"
          id="message-input"
        />
      </div>
    </div>
  );
};

export default MessageSettingsPanel;
