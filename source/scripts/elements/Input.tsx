import React from "react";
import ReactDOM from "react-dom";

type TypeProps = {
    name:string,
    field:string,
    handleChange:Function
}

type TypeState = {
}

class Input extends React.Component<TypeProps, TypeState> {

    constructor(props:TypeProps) {

        super(props);

        this.state = {
        };

    }

    /**
     * render component
     */

    render() {

        let self = this;

        let handleChange = function(event:any) {
            self.props.handleChange(event);
        }

        return (
            <input
                data-testid={ "input_" + this.props.name }
                name={ this.props.name }
                type="text"
                value={ this.props.field }
                onChange={ handleChange }
            ></input>
        );

    }

}

export {
    Input
};
