import { Component, Fragment } from 'react';
import Break from '../Components/Break/Break';
import { SetMeetingBreak } from '../Components/SetMeetingBreak/SetMeetingBreak';
import { withTeamsContext } from '../Contexts/TeamsContextProvider';
import { MeetingBreakService } from '../Services/MeetingBreakService';
import { Duration } from '../Types/Duration';
import { ToDuration } from '../Utilities/BreakTimeConversionHelpers';
import { withMeetingBreakServiceContext } from '../Contexts/MeetingBreakContextProvider';
import { Context } from '@microsoft/teams-js';
import { MeetingID } from '../Types/MeetingID';

import './SidePanel.scss'
import { MeetingDetails } from '../Types/MeetingDetails';
import { BreakDetails } from '../Types/BreakDetails';
import { Role } from '../Types/Role';
import { Alert, Loader } from '@fluentui/react-northstar';
import { t } from '@lingui/macro';
import { Participant } from '../Types/Participant';
interface SidePanelProps {
    meetingBreakService: MeetingBreakService,
    teamsContext: Context
}

interface SidePanelState {
    breakDuration?: Duration;
    isStartingBreak: boolean;
    isCancelling: boolean;
    isAllowedToStartBreak: boolean;
    isLoading: boolean;
    currentUser?: Participant;
    breakDetails?: BreakDetails;
}

class SidePanel extends Component<SidePanelProps, SidePanelState> {
    private timer?: NodeJS.Timer;

    constructor(props: SidePanelProps) {
        super(props);
        this.state = {
            breakDuration: undefined,
            isStartingBreak: false,
            isCancelling: false,
            isAllowedToStartBreak: false,
            isLoading: true,
            currentUser: undefined,
            breakDetails: undefined
        }
    }

    async componentWillMount() {
        const participant = await this.props.meetingBreakService.getParticipantDetails({value: this.props.teamsContext.meetingId!}, {value: this.props.teamsContext.userObjectId!}, {value: this.props.teamsContext.tid!})
        this.setState({isAllowedToStartBreak: participant.role === Role.Organizer, currentUser: participant}, async () => {
            await this.isTimerVisible()
        })
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    private async onTimerComplete() {
        clearInterval(this.timer!)
    }

    private async onBreakStart(selectedBreakTime: Duration) {
        this.setState({isStartingBreak: true}, async () => {
            const meetingDetails: MeetingDetails = {
                id: {
                    value: this.props.teamsContext.meetingId!
                }
            }
            const breakDetails: BreakDetails = {
                meeting: meetingDetails,
                start: new Date(),
                duration: selectedBreakTime,
                cancelled: false,
                createdBy: this.state.currentUser!
            }
            await this.props.meetingBreakService.setBreak(breakDetails)
            this.setState({breakDuration: selectedBreakTime, isStartingBreak: false, breakDetails: breakDetails}, () => {
                this.timer = this.getTimer()
            })
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
        const breakDetails = await this.props.meetingBreakService.getBreak(meetingId);
        this.setState({isLoading: false}, async () => {
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
        })
    }

    private async onCancel() {
        this.setState({isCancelling: true}, async () => {
            const meetingId: MeetingID = {
                value: this.props.teamsContext.meetingId!
            }
            const existingBreakDetails = await this.props.meetingBreakService.getBreak(meetingId)
            if (!existingBreakDetails) {
                return;
            }
            existingBreakDetails.cancelled = true
            await this.props.meetingBreakService.setBreak(existingBreakDetails)
            this.setState({breakDuration: undefined, isCancelling: false}, () => {
                if (this.timer) {
                    clearInterval(this.timer)
                }
            })
        })
    }

    render() {
        return (
            <div id="side-panel">
                { this.state.isLoading ?
                    <Loader label={t `SidePanel_Loading_Message`}/>
                    :
                    this.state.isAllowedToStartBreak ? 
                        <Fragment>
                            <SetMeetingBreak startBreak={(breakTime) => this.onBreakStart(breakTime) } visible={this.state.isAllowedToStartBreak && this.state.breakDuration === undefined} isStartingBreak={this.state.isStartingBreak}/>
                            <Break 
                                breakDuration={this.state.breakDuration} 
                                visible={this.state.breakDuration !== undefined } 
                                onCancel={() => this.onCancel()} 
                                loading={this.state.isCancelling} 
                                breakDetails={this.state.breakDetails!}
                                />    
                        </Fragment>
                        :
                        <Alert 
                            content={t `SidePanel_SetMeetingBreak_Error_Message`}
                            danger
                            visible
                        />
                }
                
            </div>
        );
    }
}

export default withMeetingBreakServiceContext(withTeamsContext(SidePanel));
