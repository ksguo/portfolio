# Personla Portfolio

Built using Next.js 15. The website features a blog powered by the Sanity, serving as the CMS. The design is inspired by Nev Flynn's Bento design, focusing on simplicity and user-friendly interfaces.


## Features
- **Responsive Design**: The website is fully responsive, ensuring a seamless experience across devices.
- **Dark Mode**: Users can toggle between light and dark themes for a personalized experience.
- **Blog**: A dedicated blog section powered by Sanity, allowing for easy content management and updates.

### Getting Started

To get started with the project, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/ksguo/portfolio.git
   ```
2. Navigate to the project directory:
   ```bash
    cd portfolio
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your browser and navigate to `http://localhost:3000` to view the website.
6. To build the project for production, run:
    ```bash
    npm run build
    ```
7.Set up environment variables: Create a .env.local file in the root directory and add the following variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
```

8. Deploy the project: You can deploy the project using platforms like Vercel or Netlify. Follow their documentation for deployment instructions.

## Technologies Used
- **Next.js**: A React framework for building server-rendered applications.
- **Sanity**: A headless CMS for managing content.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Mapbox**: A mapping and location data platform.
- **Supabase**: An open-source Firebase alternative for database and authentication.
- **Framer Motion**: A library for animations in React applications.
- **React Icons**: A library for using popular icons in React applications.
- **React Hook Form**: A library for managing form state and validation in React applications.
