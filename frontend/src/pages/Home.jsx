import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ToolBar from "../components/ToolBar";
import rough from "roughjs";
import {
    createElement,
    isWithinElement,
    distance,
    getElementAtPosition
  } from "../utils/helperFunctions";

const Home = () => {
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("none");
  const [elementType, setElementType] = useState("line");
  const [tool, setTool] = useState("none");
  const [selectedElement, setSelectedElement] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = "red"
    const roughCanvas = rough.canvas(canvas);
    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const updateElement = (id, x1, y1, x2, y2, type) => {
    const updatedElement = createElement(id, x1, y1, x2, y2, type);

    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy);
  };

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    if (tool === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;

        setSelectedElement({ ...element, offsetX, offsetY });
        setAction("moving");
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
      setAction("drawing");
    }
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    if (tool === "selection") {
      event.target.style.cursor = getElementAtPosition(
        clientX,
        clientY,
        elements
      )
        ? "move"
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];

      updateElement(index, x1, y1, clientX, clientY, elementType);

      console.log(clientX, clientY);
    } else if (action === "moving") {
      const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newxX1 = clientX - offsetX;
      const newyY1 = clientY - offsetY;

      updateElement(id, newxX1, newyY1, newxX1 + width, newyY1 + height, type);
    }
  };

  const handleMouseUp = () => {
    setAction("none");
    setSelectedElement(null);
  };

  return (
    <>
      <ToolBar
        tool={tool}
        elementType={elementType}
        setTool={setTool}
        setElementType={setElementType}
       />
      {/* <div className="fixed">
        <input
          type="radio"
          id="selection"
          checked={tool === "selection"}
          onChange={() => {
            setTool("selection");
            setElementType("none");
          }}
        />
        <label htmlFor="selection">Selection</label>
        <input
          type="radio"
          id="line"
          checked={elementType === "line"}
          onChange={() => {
            setElementType("line");
            setTool("none");
          }}
        />
        <label htmlFor="line">Line</label>
        <input
          type="radio"
          id="rectangle"
          checked={elementType === "rectangle"}
          onChange={() => {
            setElementType("rectangle");
            setTool("none");
          }}
        />
        <label htmlFor="rectangle">rectangle</label>
      </div> */}
      <canvas
        id="canvas"
        className="bg-white"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Canvas
      </canvas>
    </>
  );
};

export default Home;
