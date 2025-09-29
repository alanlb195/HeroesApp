# HeroesApp - Frontend

Welcome to HeroesApp! This is a modern web application built with React and Vite, designed to explore a universe of heroes. It allows users to browse, search, and learn about their favorite heroes in a fast and interactive way.

This project serves as the frontend for the application and relies on a separate backend for all its data.

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Core Features

*   **Hero Gallery:** View a paginated list of all available heroes.
*   **Hero Search:** A page dedicated to searching for specific heroes.
*   **Detailed View:** Explore detailed information for each hero.
*   **Admin Panel:** A basic section for administrative tasks.
*   **Responsive Design:** A user interface that adapts to any screen size.

## Required Backend

**Important:** This application will not work without its corresponding backend, as it needs to consume its API to display hero information.

The backend is a separate NestJS project created by Fernando Herrera as part of his course.

*   **Backend Repository:** [https://github.com/Klerith/nest-heroes-backend.git](https://github.com/Klerith/nest-heroes-backend.git)

Please follow the instructions in that repository's `README` to get it up and running locally.

## Getting Started

Follow these steps to get a copy of the project up and running on your local machine.

### 1. Clone the Frontend Repository

```sh
git clone https://github.com/alanlb195/HeroesApp.git
cd HeroesApp
```

### 2. Install Dependencies

This project uses `npm` for package management.

```sh
npm install
```

### 3. Configure Environment Variables

For the frontend to communicate with the backend, you must set the API URL.

1.  Create a copy of the `.env.template` file and rename it to `.env`.
    ```sh
    cp .env.template .env
    ```
2.  Open the new `.env` file and modify the `VITE_API_URL` variable to point to the URL where your backend is running (by default, `http://localhost:3000` if you follow the backend instructions).

    ```env
    VITE_API_URL=http://localhost:3000/api
    ```

### 4. Run the Application

Once configured, you can start the Vite development server.

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run lint`: Lints the code using ESLint.
*   `npm run preview`: Serves the production build locally for preview.

## Acknowledgements

A special thanks to [Fernando Herrera](https://github.com/Klerith) for providing the backend and the educational material that made this project possible.