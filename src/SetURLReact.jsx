import { Component } from "react";

import { SetUrlFunction } from "./components/SetUrlFunction";

export class SetURLReact extends Component {
    render() {
        return <SetUrlFunction url={this.props.url} append={this.props.append} />;
    }
}
