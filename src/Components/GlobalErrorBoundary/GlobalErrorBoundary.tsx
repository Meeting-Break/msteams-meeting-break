import { t } from "@lingui/macro";
import { Component } from "react";
import { Error } from "../Error/Error"; 

interface GlobalErrorBoundaryState {
    hasError: boolean
}

export class GlobalErrorBoundary extends Component<{}, GlobalErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { 
        hasError: false
     };
  }

  static getDerivedStateFromError(error: any) { 
    return { hasError: true };  
  }

  componentDidCatch(error: any, errorInfo: any) { 
     //TODO: add logging 
  }

  render() {
    if (this.state.hasError) { 
        return <Error message={t `GlobalErrorBoundary_Error_Message` } visible={true} />
    }
    return this.props.children; 
  }
}