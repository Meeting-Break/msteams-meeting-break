import { Alert } from "@fluentui/react-northstar";
import { Fragment } from "react";

interface ErrorProps {
    message: string;
    visible: boolean;
}

export const Error = ({ message, visible }: ErrorProps) =>
<Fragment>
    <div id="error">
        <Alert content={message} 
               visible={visible}
               danger
        />
    </div>
</Fragment>