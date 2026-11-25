import { Component, ErrorInfo, ReactNode } from 'react';
import { STORAGE_KEY } from '../data/defaultStore';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Store render error:', error, info);
  }

  handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          className="min-h-screen bg-creamBase text-inkDark flex items-center justify-center p-6"
        >
          <div className="max-w-md w-full bg-white rounded-3xl border border-emeraldDeep/15 p-8 text-center space-y-4 shadow-luxury">
            <h1 className="font-display text-2xl font-bold text-emeraldDeep">
              مناحل آمنة عبد الكريم
            </h1>
            <p className="text-sm text-inkMuted leading-relaxed">
              حدث خطأ غير متوقع أثناء عرض الصفحة. اضغط على الزر أدناه لإعادة التحميل
              بشكل سليم.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="px-6 py-2.5 rounded-lg bg-emeraldDeep text-white font-bold text-sm cursor-pointer hover:bg-emeraldSoft transition"
            >
              إعادة تحميل المتجر
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
