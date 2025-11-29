import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Error Boundary Simplificado
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("React Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4 text-center font-mono">
          <h1 className="text-xl text-red-500 mb-4">CRITICAL SYSTEM FAILURE</h1>
          <p className="text-neutral-500 text-sm max-w-md">{this.state.error?.toString()}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors"
          >
            REBOOT SYSTEM
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}