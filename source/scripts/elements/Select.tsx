import React from "react";
import ReactDOM from "react-dom";

type TypeProps = {
    name:string,
    field:string,
    options:{ val:string, name:string }[],
    handleChange:Function
}

type TypeState = {
}

class Select extends React.Component<TypeProps, TypeState> {

    constructor(props:TypeProps) {

        super(props);

        this.state = {
        };

    }

    /**
     * helper method to handle element mapping
     */

    map(items:any[]) {

        return items.map(function(item:string, idx:number) {
            return item;
        });

    }

    /**
     * single select option element
     */

    getOption(key:number, val:string, name:string) {

        return (
            <option
                key={ "option" + key }
                role="option"
                value={ val }
            >
                { name }
            </option>
        );

    }

    /**
     * render component
     */

    render() {

        let self = this;

        let handleChange = function(event:any) {
            self.props.handleChange(event);
        }

        let options:JSX.Element[] = [];
        this.props.options.forEach(function(option:{val:string, name:string}, idx:number) {
            options.push(self.getOption(idx, option.val, option.name));
        });

        return (
            <select
                data-testid={ "select_" + this.props.name }
                name={ self.props.name }
                value={ self.props.field }
                onChange={ handleChange }
            >
                { this.map(options) }
            </select>
        );

    }

}

export {
    Select
};
