import React from "react";
import ReactDOM from "react-dom";

class FormHandlers extends React.Component<any, any> {

    constructor(props:any) {

        super(props);

    }

    /**
     * map all field input data based on the changed target to the fields in state
     */

    handleChange(event:any, callback?:Function) {

        let field = event.target.name;
        let value = event.target.value;

        if(event.target.type == "checkbox") { value = event.target.checked; }

        let fields:{[index:string]:any} = Object.assign({}, this.state.fields);
        fields[field] = value;

        this.setState ({
            fields:fields
        } as Pick<any, keyof any>, function() {
            if(callback !== undefined) { callback(); }
        });

    }

}

export {
    FormHandlers
};
