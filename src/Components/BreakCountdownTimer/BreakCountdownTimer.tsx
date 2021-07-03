import { Fragment } from "react";
import { Text } from '@fluentui/react-northstar';
import { t } from "@lingui/macro";
import { Duration } from "../../Types/Duration";
import './BreakCountdownTimer.scss'

interface BreakCountdownTimerProps {
    duration?: Duration
}

export const BreakCountdownTimer = ({duration}: BreakCountdownTimerProps) =>
<Fragment>
    <div id="break-countdown-timer">
        <Text id="break-countdown-timer-remaining-time-text"content={t`BreakCountDownTimer_RemainingTimeText`}/>
        <Text id="break-countdown-timer-remaining-time" content={duration?.minutes.toString() + ":" + duration?.seconds.toString().padStart(2, "0")}/>
    </div>
</Fragment>
