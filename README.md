
---
# Building Planner

Building Planner is a ReactJS project designed for creating building plans by drawing shapes such as rectangles, lines, and using tools like selection. This application provides a user-friendly interface for architects and designers to visualize and plan buildings efficiently.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Testing](#testing)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) - Package managers for JavaScript

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rjrobocoder/building-planner.git
   ```

2. Navigate to the project directory:

   ```bash
   cd building-planner/frontend
   ```

3. Install dependencies:

   ```bash
   npm install   # or use yarn if you prefer
   ```

## Usage

To start the development server, run:

```bash
npm start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the Building Planner application in action.

## Features

- **Drawing Shapes:** Use the drawing tools to create rectangles, lines, and other shapes.
- **Selection Tool:** Choose the selection tool to manipulate and modify existing elements.
- **User-Friendly Interface:** Intuitive UI for easy navigation and efficient building planning.

## Contributing

If you would like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and submit a pull request.

Please adhere to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

## Testing

### End-to-End (E2E) Tests Case

I have included Cypress E2E tests case to ensure the functionality of the Drawing Shapes and Tools. To run the tests, follow these steps:

1. Make sure the development server is running:

   ```bash
   npm start
   ```

2. Open a new terminal and run the Cypress tests:

   Navigate to the project directory:

   ```bash
   cd building-planner/frontend
   ```

   ```bash
   npx cypress open
   ```

   This will open the Cypress Test Runner. From there, you can select and run the `draw.cy.js` test file to execute the E2E tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
