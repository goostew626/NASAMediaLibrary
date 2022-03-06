import React from "react";
import ReactDOM from "react-dom";

type TypeProps = {
    name:string,
    icon?:string,
    text?:string,
    method?:React.MouseEventHandler
}

type TypeState = {
}

class Button extends React.Component<TypeProps, TypeState> {

    constructor(props:TypeProps) {

        super(props);

        this.state = {
        };

    }

    /**
     * create fontawesome icon element based on an icon name
     */

    getIcon(iconName:string) {

        let icon:JSX.Element|null = null;
        switch(iconName) {
            case "search":
                icon = <i className="fa-solid fa-magnifying-glass"></i>
                break;
            case "view":
                icon = <i className="fa-solid fa-eye"></i>
                break;
            case "back":
                icon = <i className="fa-solid fa-backward"></i>
                break;
            default:
                icon = null; /* TODO : add error icon */
                break;
        }

        return icon;

    }

    /**
     * render component
     */

    render() {

        return (
            <button
                data-testid={ "button_" + this.props.name }
                onClick={ this.props.method }
            >
                {
                    this.props.icon &&
                    <div>
                        { this.getIcon(this.props.icon) }
                    </div>
                }
                {
                    (this.props.icon && this.props.text) &&
                    <div className="buttonDivider"></div>
		}
                {
                    this.props.text &&
                    <div>
                        <span>{ this.props.text }</span>
                    </div>
                }
            </button>
        );

    }

}

export {
    Button
}
