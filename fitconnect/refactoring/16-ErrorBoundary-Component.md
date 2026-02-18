# Refactoring Task 16: ErrorBoundary Component

**Priority:** LOW ⭐⭐⭐ MEDIUM  
**Effort:** 30 minutes  
**Difficulty:** ⭐⭐⭐ Medium  
**Impact:** Better error handling, improved UX

---

## 📋 Problem

The app has **NO error handling** for runtime errors!

**Current behavior:**
- If a component crashes, entire app crashes
- Users see blank white screen
- No error messages
- No recovery options
- Poor user experience

**Missing:**
- Error boundaries
- Fallback UI
- Error reporting
- Recovery mechanisms

---

## 🎯 Solution

Create an `ErrorBoundary` component in `src/components/ErrorBoundary/`

### Interface

```tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}
```

---

## 📋 IMPLEMENTATION PROMPT

```
I'm working on a React TypeScript fitness application called FitConnect. I need to create an ErrorBoundary component to catch runtime errors and show a friendly fallback UI instead of crashing the entire app.

CURRENT STATE:
The app has no error handling. If any component crashes, the entire app shows a blank screen.

TASK:
1. Create an ErrorBoundary component in src/components/ErrorBoundary/
2. The component should:
   - Catch JavaScript errors in child components
   - Show a friendly fallback UI
   - Log errors (can be extended for error reporting services)
   - Provide a "Try Again" button to recover
   - Accept custom fallback UI

ERROR BOUNDARY IMPLEMENTATION:
```tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h1>Oops! Something went wrong</h1>
            <p>We're sorry for the inconvenience. Please try again.</p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error details</summary>
                <pre>{this.state.error.message}</pre>
                <pre>{this.state.error.stack}</pre>
              </details>
            )}
            <div className="error-actions">
              <button onClick={this.handleReset} className="retry-button">
                Try Again
              </button>
              <button onClick={() => window.location.href = '/'} className="home-button">
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

USAGE IN APP:
```tsx
// Wrap entire app
<ErrorBoundary>
  <AuthProvider>
    <App />
  </AuthProvider>
</ErrorBoundary>

// Wrap specific sections
<ErrorBoundary fallback={<div>Failed to load bookings</div>}>
  <BookingsList />
</ErrorBoundary>

// With custom error handler
<ErrorBoundary 
  onError={(error, info) => {
    // Send to error tracking service
    console.log('Error:', error, info);
  }}
>
  <MyComponent />
</ErrorBoundary>
```

STYLING:
```css
.error-boundary {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--color-background, #f9fafb);
}

.error-boundary__content {
  max-width: 600px;
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-boundary__content h1 {
  color: var(--color-error, #dc2626);
  margin-bottom: 1rem;
}

.error-details {
  text-align: left;
  margin: 2rem 0;
  padding: 1rem;
  background: #f3f4f6;
  border-radius: 0.5rem;
}

.error-details pre {
  font-size: 0.75rem;
  overflow-x: auto;
  white-space: pre-wrap;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}
```

REQUIREMENTS:
- Class component (Error Boundaries must be class components)
- Catch errors in child components
- Show friendly fallback UI
- Provide recovery options
- Log errors for debugging
- Optional custom fallback
- Optional error callback

Please create:
1. src/components/ErrorBoundary/ErrorBoundary.tsx
2. src/components/ErrorBoundary/ErrorBoundary.css
3. Show me how to wrap the entire app in App.tsx
4. Show me how to use for specific sections

Follow React best practices and TypeScript strict typing.
```

---

## ✅ Expected Result

### Files Created:
1. `src/components/ErrorBoundary/ErrorBoundary.tsx`
2. `src/components/ErrorBoundary/ErrorBoundary.css`

### Files Modified:
1. `index.tsx` - Wrap entire app
2. Can add to specific pages/sections

### Usage Example:
```tsx
// Entire app
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Specific section
<ErrorBoundary fallback={<div>Error loading data</div>}>
  <ComplexComponent />
</ErrorBoundary>
```

---

## 📊 Impact

- **Stability:** App doesn't crash entirely
- **UX:** Users see friendly error messages
- **Recovery:** "Try Again" button
- **Debugging:** Error logging for developers
- **Professional:** Polished error handling

---

## 🔗 Next Steps

1. Create ErrorBoundary component
2. Wrap entire app in index.tsx
3. Add to critical sections
4. Test error scenarios
5. Add error tracking (optional)
6. Commit changes

**Status:** ⬜ Not Started
