import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { FormHandlers } from "../util/FormHandlers";

import { Header } from "../elements/Header";
import { Input } from "../elements/Input";
import { Select } from "../elements/Select";
import { Button } from "../elements/Button";

type TypeProps = {
    handleUpdateFieldsMemory:Function,
    handleUpdateResultElements:Function,
    handleUpdateShowResult:Function,
    handleChangePage:Function,
    fieldsMemory:{[prop:string]:string},
    resultElements:JSX.Element[]
}

type TypeState = {
    fields:{
        search:string,
        yearStart:string,
        yearEnd:string
    }
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
 * page for search and all results
 */

class NASAMediaLibrary extends React.Component<TypeProps, TypeState> {

    constructor(props:TypeProps) {

        super(props);

        this.state = {
            fields:{
                search:"",
                yearStart:"",
                yearEnd:""
            }
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
     * helper method to determine if a value or array exists
     */

    isNull(value:any) {

        if(value === undefined) { return true; }

        if(value.length == 0) { return true; }

        if(!Array.isArray(value)) {
            if(value.trim() == "") { return true; }
        }

        return false;

    }

    /**
     * user form element to handle search input and execution
     */

    getSearchElement() {

        let handleChange = new FormHandlers({}).handleChange.bind(this);
        let yearOptions = this.getYearOptions();
        let handleSearch = this.handleSearch.bind(this);

        return (

            <div className="searchElement">

                <form id="searchForm" action="searchForm">

                    <div className="inputs table">

                        <div className="row">
                            <div className="col">
                                <label>Search</label>
                            </div>
                            <div className="col">
                                <Input
                                    name={ "search" }
                                    field={ this.state.fields.search }
                                    handleChange={ handleChange }
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>Year Range</label>
                            </div>
                            <div className="col">
                                <div className="colMultiple">
                                    <div>
                                        <Select
                                            name={ "yearStart" }
                                            field={ this.state.fields.yearStart }
                                            options={ yearOptions }
                                            handleChange={ handleChange }
                                        />
                                    </div>
                                    <div>
                                        <label>To</label>
                                    </div>
                                    <div>
                                        <Select
                                            name={ "yearEnd" }
                                            field={ this.state.fields.yearEnd }
                                            options={ yearOptions }
                                            handleChange={ handleChange }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="buttons">
                        <div>
                            <Button
                                name="search"
                                icon="search"
                                text="Search"
                                method={ handleSearch }
                            />
                        </div>
                    </div>

                </form>

            </div>

        );

    }

    /**
     * results element to map and display all results
     */

    getResultsElement() {

        return (

            <div className="resultsElement">

                <Header h1="Results"/>

                <div className="resultsWrapper">
                <div className="results">

                    { this.map(this.props.resultElements) }

                </div>
                </div>

            </div>

        );

    }

    /**
     * item element to be displayed as a single result to the results section
     */

    getItemElement(idx:number, result:TypeResult) {

        let self = this;

        let urlImage:string = "url(" + result.images[0] + ")";
        let updateShowResult = function(event:any) { self.updateShowResult(event, idx, result); }

        return (

            <div className="itemWrapper" key={ "resultsElementItem" + idx } data-testid="result_item">
            <div className="item">

                <div className="main">

                    <div className="buttons">
                        <Button
                            name="show"
                            icon="view"
                            method={ updateShowResult }
                        />
                    </div>

                    <div className="image">
                        <div style={{ backgroundImage:urlImage }}></div>
                    </div>

                </div>

                <div className="text">

                    <div className="table">

                        <div className="row">
                            <div className="col">
                                <p>Title</p>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={ result.title }></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p>Location</p>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={ result.location }></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p>Photo By</p>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={ result.photographer }></input>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            </div>

        );

    }

    /**
     * get data for all possible years from when nasa was founded until the current year
     */

    getYearOptions() {

        let yearOptions:{ val:string, name:string }[] = [];

        yearOptions.push({ val:"", "name":"" });

        let nasaFoundingYear:number = 1958;
        let currentYear:number = new Date().getFullYear();

        for(var idx:number = nasaFoundingYear; idx <= currentYear; idx ++) {
            yearOptions.push({ val:idx.toString(), "name":idx.toString() });
        }

        return yearOptions;

    }

    /**
     * perform the api get request
     */

    handleSearch(event:any) {

        let self = this;
        event.preventDefault(); // override default form submission

        // ensure input is valid

        let errorMessage:string = this.isValidInput();
        if(errorMessage != "") {
            alert(errorMessage);
            return;
        }

        // configure and execute api get request

        let nasaMediaApi:string = "https://images-api.nasa.gov/search?media_type=image";
        let params:{[prop:string]:string} = this.getParams();

        axios.get (nasaMediaApi, { params:params })
        .then(function(res) {
            self.populateResults(res.data.collection.items);
        }).catch(function(error) {
            alert("Request Has Failed");
            /* TODO : add error logging */
        });

    }

    /**
     * ensure user input is valid and if not then return reason why
     */

    isValidInput() {

        if(this.state.fields.search.length == 0 || this.state.fields.search.trim() == "") {
            return "Search Is Required";
        }

        if(parseInt(this.state.fields.yearStart) > parseInt(this.state.fields.yearEnd)) {
            return "Starting Year Cannot Be Greater Than Ending Year";
        }

        return "";

    }

    /**
     * get parameters object with conditional properties
     */

    getParams() {

        let params:{ [prop:string]:string } = {};

        if(!this.isNull(this.state.fields.search)) { params.q = this.state.fields.search; }
        if(!this.isNull(this.state.fields.yearStart)) { params.year_start = this.state.fields.yearStart; }
        if(!this.isNull(this.state.fields.yearEnd)) { params.year_end = this.state.fields.yearEnd; }

        return params;

    }

    /**
     * create and store all of the result elements into state and rerender with change page
     */

    populateResults(items:{ [prop:string]:any }[]) {

        let self = this;

        let result:TypeResult;

        let resultElements:JSX.Element[] = [];

        items.forEach(function(item:{ [prop:string]:any }, idx:number) {

            // initialize result data for each item

            result = {
                title:"None",
                location:"None",
                photographer:"None",
                description:"None",
                keywords:[],
                date:"None",
                images:[]
            }

            // if each property contains data then update the result data

            if(!self.isNull(item.data[0].title)) { result.title = item.data[0].title; }
            if(!self.isNull(item.data[0].location)) { result.location = item.data[0].location; }
            if(!self.isNull(item.data[0].photographer)) { result.photographer = item.data[0].photographer; }
            if(!self.isNull(item.data[0].description)) { result.description = item.data[0].description; }
            if(!self.isNull(item.data[0].keywords)) { result.keywords = item.data[0].keywords; }
            if(!self.isNull(item.data[0].date_created)) { result.date = item.data[0].date_created; }
            result.images = self.getUniqueImages(item.links);

            // create the element and store it

            resultElements.push(self.getItemElement(idx, result));

        });

        // apply result elements to state and rerender page

        this.props.handleUpdateResultElements(resultElements, function() {
            self.props.handleChangePage("NASAMediaLibrary");
        });

    }

    /**
     * get only unique image urls from api result
     */

    getUniqueImages(links:{ [prop:string]:any }[]) {

        let uniqueImages:string[] = [];

        links.forEach(function(link:{ [prop:string]:any }, idx:number) {

            if(!uniqueImages.includes(link.href)) {
                uniqueImages.push(link.href);
            }

        });

        return uniqueImages;

    }

    /**
     * set the current show result data and set the current field input memory
     * before changing to the show page
     */

    updateShowResult(event:any, idx:number, result:TypeResult) {

        let self = this;

        this.props.handleUpdateShowResult(result, function() {
            self.props.handleUpdateFieldsMemory(self.state.fields);
            self.props.handleChangePage("NASAMediaLibraryShow");
        });

    }

    /**
     * render component
     */

    render() {

        return (
            <>
                <Header h1="Startupz Challenge" h2="NASA Media Library"/>
                { this.getSearchElement() }
                { this.getResultsElement() }
            </>
        );

    }

    /**
     * component has been rendered
     */

    componentDidMount() {

        // set the default input to the fields input memory

        this.setState ({
            fields:this.props.fieldsMemory
        } as Pick<TypeState, keyof TypeState>);

    }

}

export {
    NASAMediaLibrary
}
