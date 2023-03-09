import { Component, createElement } from "react";

export class SetUrlFunction extends Component {
    state = {
        intervalId: null,
        initialized: false
    };

    createInterval = () => {
        // remove spaces
        this.props.url.value = this.props.url.value.replace(/\s+/g, "");

        const intervalId = setInterval(this.setUrl, 10);
        this.setState({ intervalId, initialized: true });
        setTimeout(this.removeInterval, 5000);
    };

    setUrl = () => {
        const { url, append } = this.props;
        const currentUrl = window.location.href;
        if (!currentUrl.endsWith(url.value)) {
            const state = history.state;
            if (append) {
                history.replaceState(state, document.title, currentUrl + url.value);
            } else {
                history.replaceState(state, document.title, url.value);
            }
        }
    };

    removeInterval = () => {
        clearInterval(this.state.intervalId);
        this.setState({ intervalId: null });
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
        if (this.state.intervalId) {
            this.removeInterval();
        }
        if (this.props.append) {
            const { url } = this.props;
            const currentUrl = window.location.href;
            if (currentUrl.endsWith(url.value)) {
                const state = history.state;
                const lengthToCut = url.value.length * -1;
                const oldUrl = currentUrl.slice(0, lengthToCut);
                history.replaceState(state, document.title, oldUrl);
            }
        }
    }

    render() {
        return null;
    }
}
