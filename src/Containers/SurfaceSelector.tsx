import { Component, Fragment } from 'react';
import SidePanelPage from '../Pages/SidePanel';
import { withTeamsContext } from '../Contexts/TeamsContextProvider';
import Constants from '../Constants/AppConstants';
import { Context, registerOnThemeChangeHandler } from '@microsoft/teams-js';
import { Provider, teamsDarkV2Theme, teamsHighContrastTheme, ThemeInput} from '@fluentui/react-northstar'
interface SurfaceSelectorProps {
    teamsContext: Context
}

interface SurfaceSelectorState {
    theme?: ThemeInput<any>
}

class SurfaceSelector extends Component<SurfaceSelectorProps, SurfaceSelectorState> {
    constructor(props: SurfaceSelectorProps) {
        super(props)
        this.state = {
            theme: this.getTheme(this.props.teamsContext.theme)
        }
        registerOnThemeChangeHandler((theme) => {
            this.setState({theme: this.getTheme(theme)})
        })
    }

    private getTheme(theme?: string) {
        switch (theme) {
            case "dark":
                return teamsDarkV2Theme;
            case "contrast":
                return teamsHighContrastTheme;
        }
        return teamsDarkV2Theme;
    }

    render() {
        const { SidePanel } = Constants.Surfaces;
        const frameContext = this.props.teamsContext.frameContext;
        switch (frameContext) {
            case SidePanel:
                return (
                    <Fragment>
                        <Provider theme={this.state.theme}>
                            <SidePanelPage />
                        </Provider>
                    </Fragment>
                )
            default:
                return null;
        }
    }
}

export default withTeamsContext(SurfaceSelector);
