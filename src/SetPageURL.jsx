import { Component } from "react";

import { SetUrlFunction } from "./components/SetUrlFunction";

export class SetPageURL extends Component {
    render() {
        return <SetUrlFunction url={this.props.url} append={this.props.append} />;
    }
}
