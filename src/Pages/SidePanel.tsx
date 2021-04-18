import { Component, Fragment } from 'react';
import { SetMeetingBreak } from '../Components/SetMeetingBreak/SetMeetingBreak';
import { withTeamsContext } from '../Contexts/TeamsContextProvider';

class SidePanel extends Component {
    render() {
        return (
            <Fragment>
                <SetMeetingBreak/>
            </Fragment>
        );
    }
}

export default withTeamsContext(SidePanel);

