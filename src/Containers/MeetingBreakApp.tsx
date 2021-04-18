import { Component, Fragment } from 'react';
import TeamsContextProvider from '../Contexts/TeamsContextProvider';
import SurfaceSelector from './SurfaceSelector';

class MeetingBreakApp extends Component {
    constructor(props: any) {
        super(props);
    }

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
