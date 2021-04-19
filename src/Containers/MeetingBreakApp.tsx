import { Component, Fragment } from 'react';
import TeamsContextProvider from '../Contexts/TeamsContextProvider';
import SurfaceSelector from './SurfaceSelector';

class MeetingBreakApp extends Component {

    render() {
      return (
        <Fragment>
            <TeamsContextProvider>
                <SurfaceSelector/>
            </TeamsContextProvider>
        </Fragment>
      );
    }
}

export default MeetingBreakApp;
