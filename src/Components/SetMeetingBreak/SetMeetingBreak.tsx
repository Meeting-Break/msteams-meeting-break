import { Component } from "react";
import { Duration } from "../../Types/Duration";
import { SetBreakTime } from "../SetBreakTime/SetBreakTime";

interface SetMeetingBreakProps {
    startBreak: (breakTime: Duration) => void,
    visible?: boolean
}


export class SetMeetingBreak extends Component<SetMeetingBreakProps> {
    private SetMeetingBreakTime(breakTime: Duration) {
        this.props.startBreak(breakTime)
    }

    render() {
        const setBreakTimeVisible = this.props.visible ?? true;

        return(
            <div>
            {setBreakTimeVisible &&
                <SetBreakTime setMeetingTime={(selectedBreakTime) => {this.SetMeetingBreakTime(selectedBreakTime)}}/>
            }
            </div>
        )
    }
}
