import { Component, Fragment } from 'react';
import TeamsContextProvider from '../Contexts/TeamsContextProvider';
import SurfaceSelector from './SurfaceSelector';
import { Provider, teamsTheme } from '@fluentui/react-northstar'
class MeetingBreakApp extends Component {
    render() {
      return (
        <Fragment>
            <Provider theme={teamsTheme}>
                <TeamsContextProvider>
                    <SurfaceSelector/>
                </TeamsContextProvider>
            </Provider>
        </Fragment>
      );
    }
}

export default MeetingBreakApp;
