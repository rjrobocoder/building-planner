import React from "react";

const ToolBar = ({ tool, elementType, setTool, setElementType }) => {
  const tools = [
    {
      name: "S",
      value: "selection",
    },
    {
      name: "L",
      value: "line",
    },
    {
      name: "R",
      value: "rectangle",
    },
  ];
  return (
    <>
      <div className="p-[6px] bg-slate-500 w-fit rounded-lg mx-auto mt-3 fixed left-1/2 transform -translate-x-1/2 ">
        <div className="flex gap-1">
          {tools?.map((item) => (
            <label
              key={item.value}
              className={`relative flex items-center justify-center h-10 w-10 bg-${
                elementType === item.value || tool === item.value
                  ? "[#b7e4c7]"
                  : "[#ebf5ef]"
              } hover:bg-[#b7e4c7] rounded-lg cursor-pointer`}
              title={item.value}
            >
              <input
                type="radio"
                id={item.value}
                checked={elementType === item.value}
                onChange={() => {
                  setTool(item.value === "selection" ? "selection" : "none");
                  setElementType(
                    item.value === "selection" ? "none" : item.value
                  );
                }}
                style={{ display: "none" }}
              />
              {item.name}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default ToolBar;
