import { Component } from 'react';
import SidePanelPage from '../Pages/SidePanel';
import { withTeamsContext } from '../Contexts/TeamsContextProvider';
import Constants from '../Constants/AppConstants';
import { Context } from '@microsoft/teams-js';

interface SurfaceSelectorProps {
    teamsContext: Context
}

class SurfaceSelector extends Component<SurfaceSelectorProps> {
    constructor(props: SurfaceSelectorProps) {
        super(props);
    }

    render() {
        const { SidePanel } = Constants.Surfaces;
        const frameContext = this.props.teamsContext.frameContext;
        switch (frameContext) {
            case SidePanel:
                return <SidePanelPage />
            default:
                return null;
        }
    }
}

export default withTeamsContext(SurfaceSelector);
