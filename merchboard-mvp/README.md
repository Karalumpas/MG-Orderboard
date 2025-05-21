# MerchBoard MVP v0.1

## Overview
MerchBoard is a web application prototype designed to demonstrate a drag-and-drop order flow for sports apparel. The application allows users to place product nodes on a central canvas, customize their selections, and view a summary of their orders.

## Features
- **Canvas/Board**: A central area where users can freely place product nodes. Supports pan, zoom, and basic selection/movement/deletion of nodes.
- **Sidebar**: A dockable sidebar that lists mock products loaded from `products.json`. Includes search and filter functionalities by category and color.
- **Product Nodes**: Each product node displays an image, name, and price. Clicking on a node opens a side panel for quantity, size, and customization options.
- **Order Summary Bar**: Displays the total number of items and total price, with a "Download cart" button to export the current board state as JSON.

## Tech Stack
- **Frontend**: Vite, React, TypeScript, TailwindCSS, React Flow, Zustand
- **Linting/Formatting**: ESLint, Prettier, Husky
- **Testing**: Vitest

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd merchboard-mvp
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

## Next Steps
- Integrate backend services for product data management.
- Implement user authentication and order processing features.

## Contribution
Feel free to submit issues or pull requests for improvements and bug fixes.