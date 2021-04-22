import {ai} from '../Services/ApplicationInsightsService';
import { Component, Fragment } from "react";
import { withAITracking } from '@microsoft/applicationinsights-react-js';

interface ApplicationInsightsContextProviderProps {
    after?: Function
}

interface ApplicationInsightsContextProviderState {
    initialized: boolean
}

class ApplicationInsightsContextProvider extends Component<ApplicationInsightsContextProviderProps, ApplicationInsightsContextProviderState> {
    state = {
        initialized: false
    }

    componentDidMount() {
        const {initialized} = this.state;
        const AppInsightsInstrumentationKey = 'd2ee3671-805e-48ff-832b-ba8cc5e76af5';
        if (!Boolean(initialized) && Boolean(AppInsightsInstrumentationKey)) {
            ai.initialize(AppInsightsInstrumentationKey);
            this.setState({initialized: true});
        }
        if (this.props.after) {
            this.props.after();
        }
    }

    render() {
        const {children} = this.props;
        return (
            <Fragment>
                {children}
            </Fragment>
        );
    }
}

export default withAITracking(ai.reactPlugin, ApplicationInsightsContextProvider);
