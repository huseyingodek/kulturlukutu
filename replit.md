# Genel Kültür - Turkish General Knowledge Application

## Overview

This is a Turkish-language general knowledge web application built as a single-page application (SPA) that displays random facts across different categories. The application features a clean, responsive design with mobile-first considerations and provides an educational platform for users to discover interesting facts in Turkish. The system is designed to prevent showing duplicate facts within a session and supports category-based filtering with automatic fact rotation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with minimal bundle size
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessibility
- **State Management**: Custom React hooks with sessionStorage for fact history persistence
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server**: Express.js with TypeScript for API development
- **Development Setup**: Integrated Vite middleware for hot module replacement in development
- **Database Schema**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Storage Interface**: Abstract storage pattern with in-memory implementation for development

### Data Management
- **Fact Storage**: Static JSON data embedded in the application for categories: General, Art, Sports, Politics, History
- **Session Persistence**: Browser sessionStorage for tracking shown facts to prevent duplicates
- **Fact Rotation**: Custom algorithm to cycle through facts and reset when all facts in a category are exhausted
- **Category System**: Type-safe category definitions with Turkish labels

### UI/UX Design Patterns
- **Responsive Design**: Mobile-first approach with adaptive layouts for desktop and mobile
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation support
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with React
- **Touch-Friendly**: Optimized touch targets and gesture support for mobile devices
- **Error Handling**: Graceful error states with retry mechanisms for better user experience

### Development Tools
- **Type Safety**: Comprehensive TypeScript configuration with strict mode enabled
- **Code Quality**: ESLint and Prettier integration for consistent code formatting
- **Path Aliases**: Configured import aliases for cleaner import statements (@/, @shared/)
- **Build Optimization**: Separate client and server builds with appropriate bundling strategies

## External Dependencies

### Core Frontend Libraries
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer for modern CSS processing
- **State Management**: TanStack React Query for server state and caching
- **Form Handling**: React Hook Form with Hookform Resolvers for validation

### Backend Infrastructure
- **Server Framework**: Express.js with middleware support
- **Database**: Neon Database serverless PostgreSQL with connection pooling
- **ORM**: Drizzle ORM with Drizzle Kit for migrations and schema management
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for runtime type validation and schema parsing

### Development Tools
- **Build System**: Vite with React plugin and custom Replit integrations
- **TypeScript**: Full TypeScript support with strict configuration
- **Development Experience**: Replit-specific plugins for error handling and development workflow
- **Package Management**: NPM with lockfile for dependency consistency

### Utility Libraries
- **Date Handling**: date-fns for date manipulation and formatting
- **Styling Utilities**: clsx and class-variance-authority for conditional styling
- **Icons**: Lucide React for consistent iconography
- **Carousel**: Embla Carousel for touch-friendly image/content carousels