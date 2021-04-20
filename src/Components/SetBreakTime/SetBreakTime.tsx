import { Form, FormButton, FormInput, Flex, Text } from "@fluentui/react-northstar"
import { Component, Fragment } from "react"
import { t } from '@lingui/macro'
import { ToSeconds } from "../../Utilities/BreakTimeConversionHelpers"
import './SetBreakTime.scss'

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
                <Flex id="break-container-flex" gap="gap.medium" column>
                    <Text id="break-instructions-text" content={t`SetBreakTime_Instructions`} />
                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <Flex id="break-form-input-container-flex" gap="gap.medium"  space="evenly">
                            <FormInput id="break-minutes-form-input"
                                    required
                                    label={t`SetBreakTime_Minutes`}
                                    type="number"
                                    min={0}
                                    max={59}
                                    maxLength={2}
                                    onChange={(e) => {
                                        this.setState({ minutes: Number((e.currentTarget as HTMLInputElement).value)});
                                    }}/>
                            <FormInput id="break-seconds-form-input"
                                    required
                                    label={t`SetBreakTime_Seconds`}
                                    type="number"
                                    min={0}
                                    max={59}
                                    maxLength={2}
                                    onChange={(e) => {
                                        this.setState({ seconds: Number((e.currentTarget as HTMLInputElement).value)});
                                    }} />
                        </Flex>
                        <FormButton id="break-start-button"content={t`SetBreakTime_Start`}/>
                    </Form>
                </Flex>
            </Fragment>
        )
    }
}
