import { Button, Divider } from "@fluentui/react-northstar";
import { t } from "@lingui/macro";
import { Component, Fragment } from "react";
import { Duration } from "../../Types/Duration";
import { BreakCountdownTimer } from "../BreakCountdownTimer/BreakCountdownTimer";
import { BreakHeader } from "../BreakHeader/BreakHeader";
import './Break.scss';

interface BreakProps {
    breakDuration?: Duration,
    visible?: boolean
    onCancel: () => {}
}

class Break extends Component<BreakProps> {
    render() {
        const isVisible = this.props.visible ?? true;
        return (
            <div>
                {isVisible &&
                <Fragment>
                    <BreakHeader creator={{FirstName: "Meeting"}}/>
                    <Divider />
                    <BreakCountdownTimer duration={this.props.breakDuration}/>
                    <Button id="break-cancel-button" content={t`Break_Cancel`} onClick={this.props.onCancel}/>
                </Fragment>
                }
            </div>
        )
    }
}

export default Break
