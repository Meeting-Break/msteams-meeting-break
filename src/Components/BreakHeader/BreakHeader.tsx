import { Fragment } from "react"
import { Participant } from "../../Types/Participant"
import { Avatar, Text } from '@fluentui/react-northstar'
import { t } from "@lingui/macro"
import './BreakHeader.scss'

interface BreakHeaderProps {
    creator: Participant
}

function getBreakStartedContent(name: string) {
    const endPart = t `BreakHeader_BreakStarted`
    return `${name} ${endPart}`
}

export const BreakHeader = ({ creator }: BreakHeaderProps) =>
<Fragment>
    <div id="break-header">
        <Avatar id="break-header-avatar" name={ creator.name } />
        <div id="break-header-details">
            <Text id="break-header-application-name" content={t`BreakHeader_ApplicationName`} />
            <Text id="break-header-break-started" content={getBreakStartedContent(creator.name)} />
        </div>
    </div>
</Fragment>
