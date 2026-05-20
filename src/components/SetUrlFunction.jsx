import { Component } from "react";

export class SetUrlFunction extends Component {
    state = {
        intervalId: null,
        initialized: false
    };
    timeoutId = null;
    stableCount = 0;

    getSanitizedValue = val => {
        if (typeof val === "string") {
            return val.replace(/\s+/g, "");
        }
        return "";
    };

    createInterval = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.stableCount = 0;

        // Run setUrl once immediately so the change is quick
        this.setUrl();

        const intervalId = setInterval(this.setUrl, 20);
        this.setState({ intervalId, initialized: true });
        this.timeoutId = setTimeout(this.removeInterval, 5000);
    };

    setUrl = () => {
        const { url, append } = this.props;
        if (!url || url.status !== "available" || !url.value) {
            return;
        }

        const sanitizedValue = this.getSanitizedValue(url.value);
        const currentUrl = window.location.href;

        if (!currentUrl.endsWith(sanitizedValue)) {
            this.stableCount = 0;
            const state = history.state;
            if (append) {
                history.replaceState(state, document.title, currentUrl + sanitizedValue);
            } else {
                history.replaceState(state, document.title, sanitizedValue);
            }
        } else {
            this.stableCount += 1;
            if (this.stableCount >= 10) {
                // If the URL remains correct for 10 consecutive ticks (200ms),
                // we have stabilized and can clean up the interval early.
                this.removeInterval();
            }
        }
    };

    revertAppend = valueToRevert => {
        const sanitizedRevert = this.getSanitizedValue(valueToRevert);
        if (!sanitizedRevert) {
            return;
        }
        const currentUrl = window.location.href;
        if (currentUrl.endsWith(sanitizedRevert)) {
            const state = history.state;
            const lengthToCut = sanitizedRevert.length * -1;
            const oldUrl = currentUrl.slice(0, lengthToCut);
            history.replaceState(state, document.title, oldUrl);
        }
    };

    removeInterval = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
        this.setState({ intervalId: null });
        this.timeoutId = null;
    };

    componentDidMount() {
        if (this.props.url && this.props.url.status === "available") {
            this.createInterval();
        }
    }

    componentDidUpdate(prevProps) {
        const currentUrlVal = this.props.url ? this.props.url.value : undefined;
        const prevUrlVal = prevProps && prevProps.url ? prevProps.url.value : undefined;
        const currentUrlStatus = this.props.url ? this.props.url.status : undefined;
        const prevUrlStatus = prevProps && prevProps.url ? prevProps.url.status : undefined;

        if (currentUrlStatus === "available" && prevUrlStatus === "loading") {
            this.createInterval();
        } else if (currentUrlVal !== prevUrlVal && this.state.initialized) {
            if (this.props.append) {
                this.revertAppend(prevUrlVal);
            }
            this.createInterval();
        }
    }

    componentWillUnmount() {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        if (this.props.append && this.props.url) {
            this.revertAppend(this.props.url.value);
        }
    }

    render() {
        return null;
    }
}
