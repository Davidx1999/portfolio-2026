import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px', background: '#fff', color: '#000', height: '100vh', overflow: 'auto' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Oops, an error occurred in React!</h1>
          <p style={{ marginTop: '20px', fontWeight: 'bold', color: 'red' }}>
            {this.state.error && this.state.error.toString()}
          </p>
          <pre style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
