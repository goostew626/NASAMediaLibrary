import React from "react";
import ReactDOM from "react-dom";

import { NASAMediaLibrary } from "../pages/NASAMediaLibrary";
import { NASAMediaLibraryShow } from "../pages/NASAMediaLibraryShow";

type TypeProps = {
}

type TypeState = {
    currentPage:JSX.Element|null,
    fieldsMemory:{
        search:string,
        yearStart:string,
        yearEnd:string
    },
    resultElements:JSX.Element[],
    showResult:TypeResult
}

type TypeResult = {
    title:string,
    location:string,
    photographer:string,
    description:string,
    keywords:string[],
    date:string,
    images:string[]
}

/**
 * main application entry point
 */

class Main extends React.Component<TypeProps, TypeState> {

    constructor(props:TypeProps) {

        super(props);

        this.state = {
            currentPage:null,
            fieldsMemory:{
                search:"",
                yearStart:"",
                yearEnd:""
            },
            resultElements:[],
            showResult:{
                title:"",
                location:"",
                photographer:"",
                description:"",
                keywords:[],
                date:"",
                images:[]
            }
        };

    }

    /**
     * get page element by name and configure its parameters
     */

    getPage(pageName:string) {

        let handleUpdateFieldsMemory = this.handleUpdateFieldsMemory.bind(this);
        let handleUpdateResultElements = this.handleUpdateResultElements.bind(this);
        let handleUpdateShowResult = this.handleUpdateShowResult.bind(this);
        let handleChangePage = this.handleChangePage.bind(this);

        let page:JSX.Element|null = null;
        switch(pageName) {
            case "NASAMediaLibrary":
                page = (
                    <NASAMediaLibrary
                        handleUpdateFieldsMemory={ handleUpdateFieldsMemory }
                        handleUpdateResultElements={ handleUpdateResultElements }
                        handleUpdateShowResult={ handleUpdateShowResult }
                        handleChangePage={ handleChangePage }
                        fieldsMemory={ this.state.fieldsMemory }
                        resultElements={ this.state.resultElements }
                    />
                );
                break;
            case "NASAMediaLibraryShow":
                page = (
                    <NASAMediaLibraryShow
                        handleChangePage={ handleChangePage }
                        showResult={ this.state.showResult }
                    />
                );
                break;
            default:
                page = null; /* TODO : add error page */
                break;
        }

        return page;

    }

    /**
     * update state of field inputs as memory for recovering user input
     */

    handleUpdateFieldsMemory(fieldsMemory:{[prop:string]:string}, callback?:Function) {

        let self = this;

        this.setState ({
            fieldsMemory:fieldsMemory
        } as Pick<TypeState, keyof TypeState>, function() {
            if(callback !== undefined) { callback(); }
        });

    }

    /**
     * update state of all result elements to use for population of the main results section
     */

    handleUpdateResultElements(resultElements:JSX.Element[], callback?:Function) {

        let self = this;

        this.setState ({
            resultElements:resultElements
        } as Pick<TypeState, keyof TypeState>, function() {
            if(callback !== undefined) { callback(); }
        });

    }

    /**
     * update state of show result data to use for the current selected result details to show
     */

    handleUpdateShowResult(showResult:TypeResult, callback?:Function) {

        this.setState ({
            showResult:showResult
        } as Pick<TypeState, keyof TypeState>, function() {
            if(callback !== undefined) { callback(); }
        });

    }

    /**
     * update state of current page to handle page switching
     */

    handleChangePage(pageName:string) {

        let self = this;

        this.setState ({
            currentPage:this.getPage(pageName)
        });

    }

    /**
     * render component
     */

    render() {

        return (
            <>
                { this.state.currentPage }
            </>
        );

    }

    /**
     * component has been rendered
     */

    componentDidMount() {

        // set the default page

        this.setState ({
            currentPage:this.getPage("NASAMediaLibrary")
        } as Pick<TypeState, keyof TypeState>);

    }

}

export {
    Main
}
