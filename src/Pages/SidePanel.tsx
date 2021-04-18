import { Component, Fragment } from 'react';
import { withTeamsContext } from '../Contexts/TeamsContextProvider';

class SidePanel extends Component {
    render() {
        return (
            <Fragment>
                <div>
                    hello world
                </div>
            </Fragment>
        );
    }
}

export default withTeamsContext(SidePanel);

