# Data Query Dashboard Prototype

A modern, responsive web application built with React, Vite, and Material-UI that provides an intuitive interface for executing and managing data queries. The application features AI-powered query suggestions, query history management, and a beautiful, responsive design that works seamlessly across all devices.

## 🌟 Features

### Core Functionality
- **Query Input Interface**: A user-friendly interface for entering and executing data queries
- **Results Display**: Clear visualization of query results with proper formatting
- **Query History**: Track and manage previously executed queries
- **AI-Powered Suggestions**: Get intelligent query suggestions based on context
- **Query Mode Selection**: Choose between different query modes for various data operations

### Technical Features
- **Responsive Design**: Fully responsive layout that adapts to mobile, tablet, and desktop screens
- **Modern UI/UX**: Clean, intuitive interface with Material-UI components
- **State Management**: Efficient state handling with Redux
- **Dynamic Typography**: Responsive font scaling for better readability
- **Smooth Animations**: Elegant transitions and hover effects
- **Accessibility**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI)
- **State Management**: Redux
- **Routing**: React Router
- **Styling**: Emotion (via MUI)
- **Icons**: Material Icons

## 📦 Project Structure

```
src/
├── components/           # React components
│   ├── HomePage.jsx     # Landing page component
│   ├── QueryInput.jsx   # Query input interface
│   ├── ResultsDisplay.jsx # Query results display
│   ├── QueryHistory.jsx # Query history management
│   ├── AISuggestions.jsx # AI-powered suggestions
│   ├── Sidebar.jsx      # Navigation sidebar
│   └── QueryModeSelector.jsx # Query mode selection
├── store/               # Redux store configuration
│   └── store.js        # Store setup and reducers
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/data-query-dashboard-prototype.git
cd data-query-dashboard-prototype
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎨 UI Components

### HomePage
- Welcoming hero section with clear call-to-action
- Feature highlights with modern card design
- Quick start guide for new users
- Responsive layout with smooth animations

### Query Interface
- Clean, intuitive query input area
- Real-time syntax highlighting
- Execute button with loading state
- Results display with proper formatting

### Sidebar Navigation
- Collapsible sidebar for better space management
- Quick access to different sections
- Mobile-friendly drawer navigation
- Smooth transitions and animations

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (portrait and landscape)
- Tablets
- Desktop screens
- Different aspect ratios

Key responsive features:
- Dynamic font scaling
- Adaptive layouts
- Touch-friendly interfaces
- Optimized spacing and padding
- Mobile-first navigation

## 🔧 Configuration

The application uses a custom Material-UI theme with:
- Responsive typography
- Custom color palette
- Consistent spacing
- Custom component styles
- Dark/light mode support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- React team for the amazing framework
- Vite team for the fast build tool
