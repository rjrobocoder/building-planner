import rough from "roughjs";

const generator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  return { id, x1, y1, x2, y2, type, roughElement };
}

const isWithinElement = ({ x, y, element }) => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));

    return Math.abs(offset) < 1;
  }
};

const distance = (a, b) => {
  const deltaX = b.x - a.x;
  const deltaY = b.y - a.y;

  // Using the Pythagorean theorem to calculate the distance
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  return distance;
};

const getElementAtPosition = (x, y, elements) => {
  return elements.find((element) => isWithinElement({ x, y, element }));
};

export { createElement, isWithinElement, distance, getElementAtPosition };
