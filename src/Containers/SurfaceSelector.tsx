import { Component, Fragment } from 'react';
import SidePanelPage from '../Pages/SidePanel';
import { withTeamsContext } from '../Contexts/TeamsContextProvider';
import Constants from '../Constants/AppConstants';
import { Context, registerOnThemeChangeHandler } from '@microsoft/teams-js';
import { Provider, teamsDarkV2Theme, teamsHighContrastTheme, ThemeInput} from '@fluentui/react-northstar'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { defaultLocale, dynamicActivate } from '../i18n'

interface SurfaceSelectorProps {
    teamsContext: Context
}
interface SurfaceSelectorState {
    theme?: ThemeInput<any>,
    locale: string
}

class SurfaceSelector extends Component<SurfaceSelectorProps, SurfaceSelectorState> {
    constructor(props: SurfaceSelectorProps) {
        super(props)
        this.state = {
            theme: undefined,
            locale: defaultLocale
        }
        registerOnThemeChangeHandler((theme) => {
            this.setState({theme: this.getTheme(theme)})
        })
    }

    async componentDidMount() {
        await dynamicActivate(this.state.locale)
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
        if (this.props.teamsContext.locale !== undefined && this.state.locale !== this.props.teamsContext.locale){
            this.setState({locale: this.props.teamsContext.locale}, async () => {
                await dynamicActivate(this.state.locale)
            })
        }
        const { SidePanel } = Constants.Surfaces;
        const frameContext = this.props.teamsContext.frameContext;
        switch (frameContext) {
            case SidePanel:
                return (
                    <Fragment>
                        <I18nProvider i18n={i18n}>
                            <Provider theme={this.state.theme !== undefined ? this.state.theme : this.getTheme(this.props.teamsContext.theme)}>
                                <SidePanelPage />
                            </Provider>
                        </I18nProvider>
                    </Fragment>
                )
            default:
                return null;
        }
    }
}

export default withTeamsContext(SurfaceSelector);
