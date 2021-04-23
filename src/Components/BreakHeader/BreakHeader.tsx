import { Fragment } from "react"
import { Participant } from "../../Types/Participant"
import { Avatar, Text } from '@fluentui/react-northstar'
import { t } from "@lingui/macro"
import './BreakHeader.scss'

interface BreakHeaderProps {
    creator: Participant
}

export const BreakHeader = ({ creator }: BreakHeaderProps) =>
<Fragment>
    <div id="break-header">
        <Avatar id="break-header-avatar" name={ creator.FirstName } />
        <div id="break-header-details">
            <Text id="break-header-application-name" content={t`BreakHeader_ApplicationName`} />
            <Text id="break-header-break-started" content={t`BreakHeader_BreakStarted`} />
        </div>
    </div>
</Fragment>
