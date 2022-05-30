import { Component, createElement } from "react";

export class SetUrlFunction extends Component {
    state = {
        IntervalId: null
    };

    setUrl = () => {
        const currentUrl = window.location.href;
        if (!currentUrl.endsWith(this.props.url)) {
            const state = history.state;
            console.log(this.title);
            history.replaceState(state, this.title, this.props.url);
        }
    };

    removeInterval = () => {
        clearInterval(this.state.IntervalId);
        this.setState({ IntervalId: null });
    };

    componentDidMount() {
        // remove spaces
        this.props.url = this.props.url.replace(/\s+/g, "");

        const IntervalId = setInterval(this.setUrl, 100);
        this.setState({ IntervalId });
        setTimeout(this.removeInterval, 500);
    }

    componentWillUnmount() {
        if (this.state.IntervalId) {
            this.removeInterval();
        }
    }

    render() {
        return null;
    }
}
