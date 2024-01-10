describe("Shape and Tools Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.wait(2000);
  });

  it("should create a rectangle", () => {
    cy.get('label[title*="rectangle"]').wait(500).click();
    cy.wait(1000);

    cy.get("#canvas").then(($area) => {
      // Get the initial position for starting the rectangle
      const startX = 318;
      const startY = 136;

      // Simulate mouse down to start drawing
      cy.wrap($area).trigger("mousedown", startX, startY);
      // Get the end position for completing the rectangle
      const endX = 683;
      const endY = 373;

      // Simulate mouse move to draw the rectangle
      cy.wrap($area).trigger("mousemove", endX, endY);
      cy.wait(1000);

      // Simulate mouse up to finish drawing
      cy.wrap($area).trigger("mouseup");
    });
  });

  it("should create a line", () => {
    cy.get('label[title*="line"]').wait(500).click();
    cy.wait(1000);

    cy.get("#canvas").then(($area) => {
      // Get the initial position for starting the rectangle
      const startX = 318;
      const startY = 136;

      // Simulate mouse down to start drawing
      cy.wrap($area).trigger("mousedown", startX, startY);
      // Get the end position for completing the rectangle
      const endX = 683;
      const endY = 373;

      // Simulate mouse move to draw the rectangle
      cy.wrap($area).trigger("mousemove", endX, endY);
      cy.wait(1000);

      // Simulate mouse up to finish drawing
      cy.wrap($area).trigger("mouseup");
    });
  });

  it("should create a rectangle and move the element", () => {
    cy.get('label[title*="rectangle"]').wait(500).click();
    cy.wait(1000);

    cy.get("#canvas").then(($area) => {
      const startX = 414;
      const startY = 215;

      // Simulate mouse down to start drawing
      cy.wrap($area).trigger("mousedown", startX, startY);
      // Get the end position for completing the rectangle
      const endX = 562;
      const endY = 333;

      // Simulate mouse move to draw the rectangle
      cy.wrap($area).trigger("mousemove", endX, endY);
      cy.wait(1000);

      // Simulate mouse up to finish drawing
      cy.wrap($area).trigger("mouseup");
    });
    cy.wait(1000);
    cy.log("Select the selection tool");

    cy.get('label[title*="selection"]').wait(500).click();
    cy.wait(1000);

    cy.get("#canvas").then(($element) => {
      const $x = 485;
      const $y = 274;
      simulateDraggingAnimation($x, $y, $element);
    });
  });

  it("should create a line and move the element", () => {
    cy.get('label[title*="line"]').wait(500).click();
    cy.wait(1000);

    cy.get("#canvas").then(($area) => {
      const startX = 409;
      const startY = 191;

      // Simulate mouse down to start drawing
      cy.wrap($area).trigger("mousedown", startX, startY);
      // Get the end position for completing the rectangle
      const endX = 627;
      const endY = 373;

      // Simulate mouse move to draw the rectangle
      cy.wrap($area).trigger("mousemove", endX, endY);
      cy.wait(1000);

      // Simulate mouse up to finish drawing
      cy.wrap($area).trigger("mouseup");
    });
    cy.wait(1000);
    cy.log("Select the selection tool");

    cy.get('label[title*="selection"]').wait(500).click();
    cy.wait(1000);

    cy.get("#canvas").then(($element) => {
      const $x = 514;
      const $y = 276;
      simulateDraggingAnimation($x, $y, $element);
    });
  });

  // Helper function to simulate dragging animation
  function simulateDraggingAnimation($x, $y, $element) {
    const startX = $x;
    const startY = $y;
    const offsetX = 100;
    const offsetY = 200;
    const endOffsetX = 362;
    const endOffsetY = 260;

    cy.wrap($element).trigger("mousedown", startX, startY);
    cy.wait(500); // Delay for the start of the animation
    cy.wrap($element).trigger("mousemove", startX + offsetX, startY + offsetY);
    cy.wait(1000); // Delay for the animation

    cy.wrap($element).trigger(
      "mousemove",
      startX + endOffsetX,
      startY + endOffsetY
    );
    cy.wrap($element).trigger("mouseup");
  }
});
