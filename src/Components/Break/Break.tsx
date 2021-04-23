import { Divider } from "@fluentui/react-northstar";
import { Component, Fragment } from "react";
import { Duration } from "../../Types/Duration";
import { BreakCountdownTimer } from "../BreakCountdownTimer/BreakCountdownTimer";
import { BreakHeader } from "../BreakHeader/BreakHeader";

interface BreakProps {
    breakDuration?: Duration,
    visible?: boolean
}

class Break extends Component<BreakProps> {
    render() {
        const isVisible = this.props.visible ?? true;
        return (
            <div>
                {isVisible &&
                <Fragment>
                    <BreakHeader creator={{FirstName: "Nitish"}}/>
                    <Divider />
                    <BreakCountdownTimer duration={this.props.breakDuration}/>
                </Fragment>
                }
            </div>
        )
    }
}

export default Break
