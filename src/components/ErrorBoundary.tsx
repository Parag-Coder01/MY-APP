import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in KITE Robotics:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/10">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </div>

          <h1 className="text-xl md:text-2xl font-bold font-display text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
            The application encountered a temporary display issue. Tap reload to restart the KITE Robotics interface.
          </p>

          {this.state.error && (
            <div className="max-w-md w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-left mb-6 overflow-x-auto">
              <p className="text-xs font-mono-code text-rose-400 break-words">
                {this.state.error.message || String(this.state.error)}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
            <button
              onClick={this.handleReload}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload App</span>
            </button>
            <button
              onClick={this.handleReset}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm active:scale-95 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
