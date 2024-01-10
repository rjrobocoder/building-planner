import React from "react";

const ToolBar = () => {
  const tools = [
    {
      name: "A",
    },
    {
      name: "B",
    },
    {
      name: "C",
    },
    {
      name: "D",
    },
  ];
  return (
    <div className="p-[6px] bg-slate-500 w-fit rounded-lg mx-auto mt-3 fixed left-1/2 transform -translate-x-1/2 ">
      <div className="flex gap-1">
        {tools?.map((item, index) => (
          <button
            key={index}
            className="h-10 w-10 bg-[#ebf5ef] hover:bg-[#b7e4c7] rounded-lg"
          >
            {item?.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolBar;
