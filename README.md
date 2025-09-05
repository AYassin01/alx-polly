# Polly - Interactive Polling Application

Polly is a modern, interactive polling application built with Next.js and Supabase. It allows users to create, share, and vote on polls with real-time results visualization.

## Features

- **User Authentication**: Secure login and registration system using Supabase Auth
- **Poll Creation**: Create custom polls with multiple options and optional expiration dates
- **Voting System**: Simple and intuitive voting interface
- **Real-time Results**: View poll results with percentage-based visualizations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4, shadcn/ui components
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API

## Project Structure

- `/app`: Next.js App Router pages and layouts
  - `/auth`: Authentication pages (login, register)
  - `/polls`: Poll-related pages (listing, details, creation)
- `/components`: Reusable UI components
- `/lib`: Utility functions and services
  - `/supabase`: Supabase client configuration
  - `/validations`: Zod validation schemas
- `/types`: TypeScript type definitions

## Database Schema

The application uses the following database tables:

- **polls**: Stores poll information (question, creator, timestamps)
- **poll_options**: Contains the options for each poll
- **votes**: Records user votes for specific poll options

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

The application can be deployed on Vercel or any other platform that supports Next.js applications.

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## License

This project is licensed under the MIT License.
