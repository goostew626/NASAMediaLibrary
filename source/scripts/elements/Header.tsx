import React from "react";
import ReactDOM from "react-dom";

type TypeProps = {
    h1?:string,
    h2?:string
}

type TypeState = {
}

class Header extends React.Component<TypeProps, TypeState> {

    constructor(props:TypeProps) {

        super(props);

        this.state = {
        };

    }

    /**
     * render component
     */

    render() {

        return (
            <header>
                {
                    this.props.h1 &&
                    <h1>{ this.props.h1 }</h1>
                }
                {
                    this.props.h2 &&
                    <h2>{ this.props.h2 }</h2>
                }
            </header>
        );

    }

}

export {
    Header
}
