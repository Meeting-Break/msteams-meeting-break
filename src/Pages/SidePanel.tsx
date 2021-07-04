import { Component, Fragment } from 'react';
import Break from '../Components/Break/Break';
import { SetMeetingBreak } from '../Components/SetMeetingBreak/SetMeetingBreak';
import { withTeamsContext } from '../Contexts/TeamsContextProvider';
import { MeetingBreakService } from '../Services/MeetingBreakService';
import { Duration } from '../Types/Duration';
import { ToDuration } from '../Utilities/BreakTimeConversionHelpers';
import './SidePanel.scss'
import { withMeetingBreakServiceContext } from '../Contexts/MeetingBreakContextProvider';
import { Context } from '@microsoft/teams-js';
import { MeetingDetails } from '../Types/MeetingDetails';
import { BreakDetails } from '../Types/BreakDetails';
import { MeetingID } from '../Types/MeetingID';

interface SidePanelProps {
    meetingBreakService: MeetingBreakService,
    teamsContext: Context
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

    async componentWillMount() {
        await this.isTimerVisible()
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    private onTimerComplete() {
        clearInterval(this.timer!)
    }

    private async onBreakStart(selectedBreakTime: Duration) {
        const meetingDetails: MeetingDetails = {
            id: {
                value: this.props.teamsContext.meetingId!
            }
        }
        const breakDetails: BreakDetails = {
            meeting: meetingDetails,
            start: new Date(),
            duration: selectedBreakTime,
            cancelled: false
        }
        await this.props.meetingBreakService.upload(breakDetails)
        this.setState({breakDuration: selectedBreakTime}, () => {
            this.timer = this.getTimer()
        })
    }

    private getTimer() {
        return setInterval(() => {
            const duration = ToDuration(this.state.breakDuration?.TotalSeconds! - 1)
            this.setState({ breakDuration: duration.TotalSeconds === 0 ? undefined : duration }, () => {
                if (duration.TotalSeconds === 0) {
                    this.onTimerComplete();
                }
            });
        }, 1000)
    }

    private async isTimerVisible() {
        const meetingId: MeetingID = {
            value: this.props.teamsContext.meetingId!
        }
        const breakDetails = await this.props.meetingBreakService.download(meetingId);
        if (!breakDetails || breakDetails.cancelled) {
            return false;
        }
        const currentTime = new Date()
        let remainingBreakDuration: Duration | undefined = undefined
        if (((breakDetails.start.getTime() / 1000) + breakDetails.duration.TotalSeconds) > (currentTime.getTime() / 1000)) {
            remainingBreakDuration = ToDuration(breakDetails.duration.TotalSeconds - ((currentTime.getTime() / 1000) - (breakDetails.start.getTime() / 1000)) )
        }
        this.setState({breakDuration: remainingBreakDuration},() => {
            if (remainingBreakDuration) {
                this.timer = this.getTimer()
            }
        })
    }

    render() {
        return (
            <Fragment>
                <div id="side-panel">
                    <SetMeetingBreak startBreak={(breakTime) => this.onBreakStart(breakTime) } visible={this.state.breakDuration === undefined}/>
                    <Break breakDuration={this.state.breakDuration} visible={this.state.breakDuration !== undefined } />
                </div>
            </Fragment>
        );
    }
}

export default withMeetingBreakServiceContext(withTeamsContext(SidePanel));
