import { Component, Fragment } from 'react';
import Break from '../Components/Break/Break';
import { SetMeetingBreak } from '../Components/SetMeetingBreak/SetMeetingBreak';
import { withTeamsContext } from '../Contexts/TeamsContextProvider';
import { Duration } from '../Types/Duration';
import { ToDuration } from '../Utilities/BreakTimeConversionHelpers';
import './SidePanel.scss'

interface SidePanelProps {

}

interface SidePanelState {
    breakDuration?: Duration
}

class SidePanel extends Component<SidePanelProps, SidePanelState> {
    private timer?: NodeJS.Timer;

    constructor(props: SidePanelProps) {
        super(props);
        this.state = {
            breakDuration: undefined,
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    private onTimerComplete() {
        clearInterval(this.timer!)
    }

    private onBreakStart(selectedBreakTime: Duration) {
        this.setState({breakDuration: selectedBreakTime})
        this.timer = setInterval(() => {
            const duration = ToDuration(this.state.breakDuration?.TotalSeconds! - 1)
            this.setState({ breakDuration: duration.TotalSeconds === 0 ? undefined : duration }, () => {
                if (duration.TotalSeconds === 0) {
                    this.onTimerComplete();
                }
            });
        }, 1000)
    }

    render() {
        return (
            <Fragment>
                <div id="side-panel">
                    <SetMeetingBreak visible={this.state.breakDuration === undefined} startBreak={(breakTime) => this.onBreakStart(breakTime) }/>
                    <Break breakDuration={this.state.breakDuration} visible={this.state.breakDuration !== undefined} />
                </div>
            </Fragment>
        );
    }
}

export default withTeamsContext(SidePanel);

