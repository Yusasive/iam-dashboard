# Enterprise IAM Dashboard

A modern, responsive Identity and Access Management (IAM) dashboard built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing users, roles, and permissions in an enterprise environment.

## Features

### Core Functionality

- **User Management**: View, search, and filter users in a paginated table
- **User Details**: Click any user row to open a detailed side panel
- **Status Management**: Enable/disable user accounts with real-time updates
- **Password Reset**: Simulate password reset functionality with email notifications
- **Search & Filter**: Real-time search across names and emails, filter by user status

### User Experience

- **Responsive Design**: Fully responsive interface that works on mobile, tablet, and desktop
- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Loading States**: Smooth loading spinners and skeleton screens
- **Error Handling**: Comprehensive error messages with retry functionality
- **Professional UI**: Clean, modern design with Tailwind CSS

### Technical Features

- **Mock API**: Simulated backend with realistic latency (300-600ms) and random errors (10% rate)
- **TypeScript**: Full type safety throughout the application
- **Custom Hooks**: Reusable hooks for data fetching and state management
- **Component Architecture**: Well-structured, modular component hierarchy

## Installation & Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yusasive/iam-dashboard.git
   cd iam-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorMessage.tsx
│   ├── LoadingSpinner.tsx
│   ├── Pagination.tsx
│   ├── SearchInput.tsx
│   ├── StatusBadge.tsx
│   ├── UserDetailPanel.tsx
│   ├── UserFilters.tsx
│   └── UserTable.tsx
├── data/               # Mock data
│   └── mockUsers.ts
├── hooks/              # Custom React hooks
│   ├── useUserDetail.ts
│   └── useUsers.ts
├── services/           # API services
│   └── mockApi.ts
├── types/              # TypeScript type definitions
│   └── user.ts
├── App.tsx            # Main application component
├── index.css          # Global styles
└── main.tsx           # Application entry point
```

## Architecture Decisions

### State Management

- **Custom Hooks**: Used custom hooks (`useUsers`, `useUserDetail`) instead of external state management libraries for simplicity and better encapsulation
- **Local State**: Component-level state for UI interactions, with hooks managing data fetching and caching
- **Optimistic Updates**: Immediate UI updates for better user experience, with error handling for failed operations

### Styling Approach

- **Tailwind CSS**: Chosen for rapid development, consistent design system, and excellent responsive utilities
- **Component-based Styles**: Utility classes organized within components for maintainability
- **Custom CSS Classes**: Created reusable button and input styles in the global CSS file

### Error Handling Strategy

- **Graceful Degradation**: Application continues to function even when some requests fail
- **User Feedback**: Clear error messages with actionable retry buttons
- **Error Boundaries**: Comprehensive error catching at component and API levels
- **Simulated Failures**: 10% random error rate in mock API to test error handling

### Accessibility Implementation

- **Keyboard Navigation**: Full keyboard support with proper focus management
- **ARIA Labels**: Comprehensive ARIA attributes for screen readers
- **Semantic HTML**: Proper use of semantic elements (table, nav, button, etc.)
- **Focus Management**: Proper focus trapping in modals and logical tab order

### Mock API Design

- **Realistic Simulation**: Includes network latency, pagination, filtering, and error states
- **Server-side Logic**: Simulates backend filtering and pagination for realistic behavior
- **Error Simulation**: Random failures to test error handling and recovery
- **TypeScript Integration**: Fully typed API responses for development safety

## Usage Guide

### Basic Navigation

1. **View Users**: The main table displays all users with their basic information
2. **Search**: Use the search bar to find users by name or email
3. **Filter**: Use the status dropdown to filter by active/disabled users
4. **Pagination**: Navigate through pages using the pagination controls

### User Management

1. **View Details**: Click any user row to open the detail panel
2. **Reset Password**: Click "Reset Password" in the detail panel to simulate sending a reset email
3. **Toggle Status**: Use "Enable User" or "Disable User" to change account status
4. **Close Panel**: Click the X button or press Escape to close the detail panel

### Responsive Features

- **Mobile**: Simplified pagination and stacked layout on small screens
- **Tablet**: Optimized table layout with horizontal scrolling if needed
- **Desktop**: Full-featured interface with side panel and complete table view

## Development Notes

### Performance Considerations

- **Debounced Search**: Search input is debounced to prevent excessive API calls
- **Pagination**: Server-side pagination reduces initial load time and memory usage
- **Lazy Loading**: User details are loaded only when requested

### Testing Strategy

- **Error Simulation**: Built-in error simulation for testing error handling
- **Loading States**: All async operations include loading indicators
- **Edge Cases**: Handles empty states, network failures, and invalid data


## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.
