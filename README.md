# AI Call Agent Frontend

A modern React-based frontend application for managing AI voice agents, calls, tools, and knowledge bases.

## Features

- **Dashboard**: Overview with statistics and recent activity
- **Agents Management**: Create, edit, and manage AI voice agents
- **Calls Management**: Initiate and monitor voice calls
- **Tools Management**: Configure and manage tools for agents
- **Knowledge Base**: Manage documents and FAQs
- **Phone Numbers**: Manage phone number assignments
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **Axios** for API communication
- **React Hook Form** for form management

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see main project README)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API URL:
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── Dashboard.tsx   # Dashboard overview
│   ├── Agents.tsx      # Agents management
│   └── Calls.tsx       # Calls management
├── services/           # API services
│   └── api.ts         # API client and types
├── App.tsx            # Main app component
├── index.tsx          # App entry point
└── index.css          # Global styles
```

## API Integration

The frontend communicates with the backend API through the `apiService` in `src/services/api.ts`. The service provides:

- **Agents**: CRUD operations for AI agents
- **Calls**: Initiate, monitor, and manage calls
- **Tools**: Manage tools and configurations
- **Knowledge Base**: Handle documents and FAQs
- **Phone Numbers**: Manage phone number assignments

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Development

### Adding New Components

1. Create a new component in `src/components/`
2. Add the route in `src/App.tsx`
3. Update the navigation in `src/components/Layout.tsx`

### Styling

The project uses Tailwind CSS with custom components defined in `src/index.css`. Common classes:

- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.btn-danger` - Danger button styling
- `.card` - Card container styling
- `.input-field` - Form input styling

### API Error Handling

The API service includes automatic error handling:
- 401 errors redirect to login
- Network errors are logged to console
- Form validation errors are displayed to users

## Deployment

### Production Build

1. Build the application:
   ```bash
   npm run build
   ```

2. The build files will be in the `build/` directory

3. Serve the static files with any web server (nginx, Apache, etc.)

### Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:8000)

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test your changes thoroughly
4. Update documentation as needed

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Ensure the backend is running and the API URL is correct
2. **Build Errors**: Check that all dependencies are installed
3. **Styling Issues**: Verify Tailwind CSS is properly configured

### Development Tips

- Use the browser's developer tools to debug API calls
- Check the browser console for error messages
- Use React Developer Tools for component debugging

## License

This project is part of the AI Call Agent platform. See the main project README for license information.
