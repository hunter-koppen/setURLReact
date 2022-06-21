import { Component, createElement } from "react";

export class SetUrlFunction extends Component {
    state = {
        IntervalId: null,
        Initialized: false
    };

    setUrl = () => {
        const currentUrl = window.location.href;
        if (!currentUrl.endsWith(this.props.url.value)) {
            const state = history.state;
            history.replaceState(state, document.title, this.props.url.value);
        }
    };

    removeInterval = () => {
        clearInterval(this.state.IntervalId);
        this.setState({ IntervalId: null });
    };

    componentDidUpdate() {
        if (this.state.Initialized === false) {
            // Check if widget has loaded the url data
            if (this.props.url.value) {
                // remove spaces
                this.props.url.value = this.props.url.value.replace(/\s+/g, "");

                const IntervalId = setInterval(this.setUrl, 100);
                this.setState({ IntervalId, Initialized: true });
                setTimeout(this.removeInterval, 2000);
            }
        }
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
