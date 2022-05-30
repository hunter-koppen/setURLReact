import { Component, createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/SetURLReact.css";

export class SetURLReact extends Component {
    render() {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}
