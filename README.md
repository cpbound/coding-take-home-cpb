# Actual Listings App

A React + TypeScript web application for displaying and filtering user listings by color, language, and country. This project was developed as a take-home assignment for Actual.

## Features

- Search listings by color or language
- Toggle grouped view by country
- Filter listings with missing (null) values in color, language, or country
- Responsive and accessible UI with loading states
- Type-safe with TypeScript

## Screenshots

![Screen1](/take-home/public/col-test.png)
![Screen1](/take-home/public/lang-test.png)
![Screen1](/take-home/public/col-void.png)
![Screen1](/take-home/public/order-test.png)
![Screen1](/take-home/public/order-test2.png)
![Screen1](/take-home/public/null-val1.png)
![Screen1](/take-home/public/null-val2.png)


## Tech Stack

- React + TypeScript
- Tailwind CSS for styling
- Functional components with hooks
- Modular middleware for data processing

## Setup

1. Clone the repo
2. Run `npm install` or `yarn`
3. Start the app with `npm start` or `yarn dev`
4. Visit `http://localhost:5173` in your browser

## Project Structure

- `src/middleware` — Data and business logic
- `src/components` — UI components
- `src/mock-data` — Sample JSON data
- `src/App.tsx` — Main application component

## Notes

- Mock data is used for demonstration purposes
- Search is case-insensitive and supports exact matches for color or language
- Grouping is by country with fallback for unknown values
