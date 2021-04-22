import { Component, Fragment } from 'react';
import TeamsContextProvider from '../Contexts/TeamsContextProvider';
import SurfaceSelector from './SurfaceSelector';
import ApplicationInsightsContextProvider from '../Contexts/ApplicationInsightsContextProvider';
class MeetingBreakApp extends Component {

    render() {
      return (
        <Fragment>
            <ApplicationInsightsContextProvider>
                <TeamsContextProvider>
                    <SurfaceSelector/>
                </TeamsContextProvider>
            </ApplicationInsightsContextProvider>
        </Fragment>
      );
    }
}

export default MeetingBreakApp;
