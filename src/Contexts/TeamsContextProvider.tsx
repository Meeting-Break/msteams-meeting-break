import React, { Component, useContext } from 'react';
import { appInitialization, Context } from "@microsoft/teams-js";
import TeamsContextService from '../Services/TeamsContextService';
import Constants from '../Constants/AppConstants';

const TeamsContext = React.createContext({});

interface Error {
    status: boolean,
    message: appInitialization.IFailedRequest
}

type TeamsContextProviderState = {
    teamsContext : any,
    error?: Error
}

class TeamsContextProvider extends Component<{}, TeamsContextProviderState> {
    getContext: Function
    state: TeamsContextProviderState = {
        teamsContext: {},
        error: undefined
    }

    constructor(props: any) {
        super(props);
        this.getContext = TeamsContextService();
    }

    componentDidMount() {
        this.getContext()
            .then((context: Context) => {
                const frameContext = context.frameContext || "";
                if (frameContext === Constants.Surfaces.SidePanel) {
                    this.setState({
                        teamsContext: context,
                    })
                    microsoftTeams.appInitialization.notifySuccess();
                    return;
                }
                return Promise.reject("Error: Please make sure to run the app within teams as a tab app");
            })
            .catch((msg: appInitialization.IFailedRequest) => {
                microsoftTeams.appInitialization.notifyFailure(msg);
                this.setState({
                    error: {
                        status: true,
                        message: msg,
                    }
                })
            });
    }

    render() {
        return (
            <TeamsContext.Provider value={this.state.teamsContext}>
                {this.props.children}
            </TeamsContext.Provider>
        );
    }
}

export default TeamsContextProvider;

export const withTeamsContext = (Component: any) => (props: any) => {
    const teamsContext = useContext(TeamsContext);
    return <Component {...props} teamsContext={teamsContext} />
}
