import { Component, createElement } from "react";

export class SetUrlFunction extends Component {
    state = {
        IntervalId: null,
        Initialized: false
    };

    createInterval = () => {
        // remove spaces
        this.props.url.value = this.props.url.value.replace(/\s+/g, "");

        const IntervalId = setInterval(this.setUrl, 10);
        this.setState({ IntervalId, Initialized: true });
        setTimeout(this.removeInterval, 5000);
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

    componentDidMount() {
        // If the url status is already available here then there is only static text in the url so the componentdidupdate will never be called so we need to create the interval here.
        if (this.props.url && this.props.url.status === "available") {
            this.createInterval();
        }
    }

    componentDidUpdate(prevProps) {
        // Check if widget has loaded the url data
        if (
            this.props.url &&
            prevProps &&
            prevProps.url.status === "loading" &&
            this.props.url.status === "available"
        ) {
            this.createInterval();
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
