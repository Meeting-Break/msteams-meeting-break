import React, { Component, useContext } from 'react';
import { MeetingBreakService } from '../Services/MeetingBreakService';
const MeetingBreakServiceContext = React.createContext({});

class MeetingBreakServiceContextProvider extends Component {
     service = new MeetingBreakService();

    render() {
        return (
            <MeetingBreakServiceContext.Provider value={this.service}>
                {this.props.children}
            </MeetingBreakServiceContext.Provider>
        );
    }
}

export default MeetingBreakServiceContextProvider;

export const withMeetingBreakServiceContext = (Component: any) => (props: any) => {
    const meetingBreakService = useContext(MeetingBreakServiceContext);
    return <Component {...props} meetingBreakService={meetingBreakService} />
}
