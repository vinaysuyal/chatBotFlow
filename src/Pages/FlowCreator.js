import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import SideBar from "../Components/SideBar";

import "../Styles/Layout/FlowCreator.css";
import CustomNode from "../Components/CustomNode";
import Snackbar from "../Components/SnackBar";
import MessageSettingsPanel from "../Components/MessageSettingPanel";

const initialNodes = [
  // {
  //   id: "1",
  //   type: "messageNode",
  //   data: { label: "message node" },
  //   position: { x: 250, y: 5 },
  // },
  // {
  //   id: "2",
  //   type: "messageNode",
  //   data: { label: "message node" },
  //   position: { x: 270, y: 5 },
  // },
  // {
  //   id: "3",
  //   type: "messageNode",
  //   data: { label: "message node" },
  //   position: { x: 290, y: 5 },
  // },
];

let id = 0;
const getId = () => `dndnode_${id++}`;
const NodeTypes = { messageNode: CustomNode };

const FlowCreator = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState({});
  const [activeNodeSettingPanel, setActiveNodeSettingPanel] = useState({});
  const onConnect = (params) => {
    const existingEdgeWithCurrentSource = edges.find((e) => {
      return e.source == params.source;
    });
    if (!existingEdgeWithCurrentSource) setEdges((eds) => addEdge(params, eds));
    else {
      setSnackBarMessage({
        message: "Only one edge can originate from a node.",
        type: "failure",
      });
      setShowSnackBar(true);
    }
  };
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onSave = () => {
    const nodesWithNoEdge = nodes.filter((node) => {
      const hasOutgoingEdges = edges.some((edge) => edge.source === node.id);
      const hasIncomingEdges = edges.some((edge) => edge.target === node.id);
      return !hasOutgoingEdges && !hasIncomingEdges;
    });
    if (nodesWithNoEdge.length > 0) {
      setSnackBarMessage({
        message: "One or more nodes do not have edges.",
        type: "failure",
      });
      setShowSnackBar(true);
    } else {
      setSnackBarMessage({
        message: "Chatbot flow saved successfully.",
        type: "success",
      });
      setShowSnackBar(true);
    }
  };

  return (
    <>
      <button onClick={onSave} className="saveButton">
        Save
      </button>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodeClick={(e, nodeInfo) => {
                setActiveNodeSettingPanel(nodeInfo);
              }}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={NodeTypes}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
          <SideBar>
            {activeNodeSettingPanel.type === "messageNode" && (
              <MessageSettingsPanel
                message={
                  nodes.find((node) => node.id == activeNodeSettingPanel.id)
                    .data.text
                }
                onDelete={() => {
                  setNodes((prevNodes) => {
                    const newNodes = prevNodes.filter(
                      (node) => node.id != activeNodeSettingPanel.id
                    );
                    return newNodes;
                  });
                  setEdges((prevEdges) => {
                    const newEdges = prevEdges.filter(
                      (edge) =>
                        edge.source != activeNodeSettingPanel.id &&
                        edge.target != activeNodeSettingPanel.id
                    );
                    return newEdges;
                  });
                  setActiveNodeSettingPanel({});
                }}
                onClose={() => setActiveNodeSettingPanel({})}
                onTextChange={(newText) => {
                  setNodes((prevNodes) => {
                    const newNodes = prevNodes.map((node) => {
                      if (node.id === activeNodeSettingPanel.id) {
                        const modifiedNode = {
                          ...node,
                          data: {
                            ...node.data,
                            text: newText,
                          },
                        };
                        return modifiedNode;
                      }
                      return node;
                    });
                    return newNodes;
                  });
                }}
              />
            )}
          </SideBar>
        </ReactFlowProvider>
        {showSnackBar && (
          <Snackbar
            message={snackBarMessage.message}
            type={snackBarMessage.type}
            onSnackBarClose={() => setShowSnackBar(false)}
          />
        )}
      </div>
    </>
  );
};

export default FlowCreator;
