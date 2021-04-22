import { Component, Fragment } from 'react';
import { SetMeetingBreak } from '../Components/SetMeetingBreak/SetMeetingBreak';
import { withTeamsContext } from '../Contexts/TeamsContextProvider';
import './SidePanel.scss'
class SidePanel extends Component {
    render() {
        return (
            <Fragment>
                <div id="side-panel">
                    <SetMeetingBreak/>
                </div>
            </Fragment>
        );
    }
}

export default withTeamsContext(SidePanel);

