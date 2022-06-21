import { Component, createElement } from "react";

import { SetUrlFunction } from "./components/SetUrlFunction";

export class SetURLReact extends Component {
    render() {
        return <SetUrlFunction url={this.props.url} />;
    }
}
