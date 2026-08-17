# Kinetrex Modern Shopping

Kinetrex is a modern React storefront built with Vite. It includes product browsing, category filtering, product details, cart, wishlist, checkout flow, search, and responsive styling.

## Tech Stack

- React
- Vite
- React Router
- CSS
- npm

## Project Structure

src/
  components/       Reusable UI components
  context/          Cart, wishlist, and search state
  data/             Product and category data
  pages/            App pages
  App.jsx           Route setup
  main.jsx          React entry file
  index.css         Main styles
public/             Static public assets
index.html          HTML entry file
package.json        npm scripts and dependencies

## Requirements

Install these before running the project:

- Node.js
- npm

## Installation

Run this command from the project root:

npm install

## Run Development Server

npm run dev

Then open the local URL shown in the terminal. Vite usually runs at:

http://localhost:5173/

## Build For Production

npm run build

The production build will be created in:

dist/

## Preview Production Build

npm run preview

## Available Scripts

npm run dev
Starts the Vite development server.

npm run build
Builds the app for production.

npm run preview
Previews the production build locally.

## Notes

This project does not use Python dependencies. JavaScript dependencies are managed through package.json and package-lock.json.
