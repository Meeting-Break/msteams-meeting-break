import { Form, FormButton, FormInput, Flex, Text, FlexItem } from "@fluentui/react-northstar";
import { Component, Fragment } from "react";
import { ToSeconds } from "../../Utilities/BreakTimeConversionHelpers"

interface SetBreakTimeProps {
    setMeetingTime: (selectedTime: number) => void
}

interface SetBreakTimeState {
    minutes: number,
    seconds: number
}

export class SetBreakTime extends Component<SetBreakTimeProps, SetBreakTimeState> {
    constructor(props: SetBreakTimeProps) {
        super(props);
        this.state = {
            minutes: 0,
            seconds: 0
        }
    }

    private onSubmit() {
        var seconds = ToSeconds(this.state.minutes, this.state.seconds)
        this.props.setMeetingTime(seconds)
    }

    render() {
        return(
            <Fragment>
                <Flex gap="gap.medium" column>
                    <Text content="How long is the break?"/>
                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <Flex gap="gap.medium">
                            <FormInput id="break-minutes"
                                    required
                                    label="Minutes"
                                    type="number"
                                    min={0}
                                    max={59}
                                    maxLength={2}
                                    onChange={(e) => {
                                        this.setState({ minutes: Number((e.currentTarget as HTMLInputElement).value)});
                                    }}/>
                            <FormInput id="break-seconds"
                                    required
                                    label="Seconds"
                                    type="number"
                                    min={0}
                                    max={59}
                                    maxLength={2}
                                    onChange={(e) => {
                                        this.setState({ seconds: Number((e.currentTarget as HTMLInputElement).value)});
                                    }} />
                        </Flex>
                        <FormButton content="Start"/>
                    </Form>
                </Flex>
            </Fragment>
        )
    }
}
