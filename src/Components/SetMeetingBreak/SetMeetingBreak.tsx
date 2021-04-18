import { Component } from "react";
import { SetBreakTime } from "../SetBreakTime/SetBreakTime";

interface SetMeetingBreakState {
    selectedMeetingBreakTime: number
}

export class SetMeetingBreak extends Component<{}, SetMeetingBreakState> {

    private SetMeetingBreakTime(breakTime: number) {
        this.setState({ selectedMeetingBreakTime: breakTime })
    }

    render() {
        return(
            <SetBreakTime setMeetingTime={(selectedBreakTime) => {this.SetMeetingBreakTime(selectedBreakTime)}}/>
        )
    }
}
