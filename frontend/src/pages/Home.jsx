import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ToolBar from "../components/ToolBar";
import rough from "roughjs";

const generator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2-x1, y2-y1);
  return { id, x1, y1, x2, y2, type, roughElement };
}

const isWithinElement = ({x, y, element}) => {
    const { type, x1, y1, x2, y2 } = element;
    if(type === "rectangle") {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    } else {
        const a = { x: x1, y: y1};
        const b = { x: x2, y: y2};
        const c = { x, y};
        const offset = distance(a, b) - (distance(a, c) + distance(b,c));
        
        return Math.abs(offset) < 1;
    }
}

const distance = (a, b) => {
    const deltaX = b.x - a.x;
    const deltaY = b.y - a.y;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    return distance;
}

const getElementAtPosition = (x, y, elements) => {
    return elements.find(element => isWithinElement({x, y, element}))
}

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
  }



  const handleMouseDown = (event) => {
      const { clientX, clientY } = event;
    if(tool === "selection") {
        const element = getElementAtPosition(clientX, clientY, elements)
        if(element){
            const offsetX = clientX - element.x1;
            const offsetY = clientY - element.y1;

            setSelectedElement({...element, offsetX, offsetY})
            setAction("moving")
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

    if(tool === "selection"){
        event.target.style.cursor = getElementAtPosition(clientX, clientY, elements) ? "move" : "default";
    }

    if(action === "drawing") {
        const index = elements.length - 1;
        const { x1, y1 } = elements[index];

        updateElement(index, x1, y1, clientX, clientY, elementType);
    
        
    
        console.log(clientX, clientY);
    } else if(action === "moving"){
        const {id, x1, x2, y1, y2, type, offsetX, offsetY} = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newxX1 = clientX - offsetX;
        const newyY1 = clientY - offsetY;

        updateElement(id, newxX1, newyY1, newxX1 + width, newyY1 + height, type);
    }

  };

  const handleMouseUp = () => {
    setAction("none");
    setSelectedElement(null)
  };

  return (
    <>
      <ToolBar />
      <div className="fixed">
        <input
          type="radio"
          id="selection"
          checked={(tool === "selection")}
          onChange={() => {
            setTool("selection");
            setElementType("none")
            }}
        />
        <label htmlFor="selection">Selection</label>
        <input
          type="radio"
          id="line"
          checked={(elementType === "line")}
          onChange={() => {
            setElementType("line");
            setTool("none")
            }}
        />
        <label htmlFor="line">Line</label>
        <input
          type="radio"
          id="rectangle"
          checked={(elementType === "rectangle")}
          onChange={() => {
            setElementType("rectangle");
            setTool("none")
            }}
        />
        <label htmlFor="rectangle">rectangle</label>
      </div>
      <canvas
        id="canvas"
        className="bg-green-200"
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
