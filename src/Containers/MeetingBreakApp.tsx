import { Component, Fragment } from 'react';
import TeamsContextProvider from '../Contexts/TeamsContextProvider';
import SurfaceSelector from './SurfaceSelector';
import ApplicationInsightsContextProvider from '../Contexts/ApplicationInsightsContextProvider';
import MeetingBreakServiceContextProvider from '../Contexts/MeetingBreakContextProvider';
import './MeetingBreakApp.scss'
class MeetingBreakApp extends Component {
    render() {
  
      return (
        <Fragment>
          <MeetingBreakServiceContextProvider>
              <ApplicationInsightsContextProvider>
                  <TeamsContextProvider>
                      <SurfaceSelector/>
                  </TeamsContextProvider>
              </ApplicationInsightsContextProvider>
            </MeetingBreakServiceContextProvider>
        </Fragment>
      );
    }
}

export default MeetingBreakApp;
