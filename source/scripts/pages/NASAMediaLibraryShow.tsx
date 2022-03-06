import React from "react";
import ReactDOM from "react-dom";

import { Header } from "../elements/Header";
import { Button } from "../elements/Button";

type TypeProps = {
    handleChangePage:Function,
    showResult:TypeResult
}

type TypeState  = {
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
 * page for showing a single result's details
 */

class NASAMediaLibraryShow extends React.Component<TypeProps, TypeState> {

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
     * element to display a single currently selected result
     */

    getShowElement() {

        let changePage = this.changePage.bind(this);
        let imageElements:JSX.Element[] = this.getImageElements(this.props.showResult.images);
        let keywordElements:JSX.Element[] = this.getKeywordElements(this.props.showResult.keywords);

        return (

            <div className="showElementWrapper" data-testid="show_item">

                <Header h1="Startupz Challenge" h2="NASA Media Library"/>

                <div className="showElement">

                    <h3>{ this.props.showResult.title }</h3>

                    <div className="imagesWrapper">
                    <div className="images">

                        { this.map(imageElements) }

                    </div>
                    </div>

                    <div className="table">

                        <div className="row">
                            <div className="col">
                                <p>Location</p>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={ this.props.showResult.location }></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p>Photo By</p>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={ this.props.showResult.photographer }></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p>Description</p>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={ this.props.showResult.description }></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p>Date</p>
                            </div>
                            <div className="col">
                                <input type="text" readOnly value={ this.props.showResult.date }></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <p>Keywords</p>
                            </div>
                            <div className="col">
                                <div className="colMultiple">
                                    { this.map(keywordElements) }
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="buttons">
                        <div>
                            <Button
                                name="back"
                                icon="back"
                                text="Back"
                                method={ changePage }
                            />
                        </div>
                    </div>

                </div>

            </div>

        );

    }

    /**
     * create an array of elements from the href api data
     */

    getImageElements(images:string[]) {

        let self = this;

        let imageElements:JSX.Element[] = [];

        images.forEach(function(image:string, idx:number) {
            imageElements.push(self.getImageElement(idx, image));
        });

        return imageElements;

    }

    /**
     * single image element for image display
     */

    getImageElement(idx:number, image:string) {

        return (

            <div className="image" key={ "imageElement" + idx }>
                <img src={ image }/>
            </div>

        );

    }

    /**
     * create an array of keyword elements from the keywords api data
     */

    getKeywordElements(keywords:string[]) {

        let self = this;

        let keywordElements:JSX.Element[] = [];

        keywords.forEach(function(keyword:string, idx:number) {
            keywordElements.push(self.getKeywordElement(idx, keyword));
        });

        return keywordElements;

    }

    /**
     * single keyword element for keyword display
     */

    getKeywordElement(idx:number, keyword:string) {

        return (

            <div className="keyword" key={ "keywordElement" + idx }>
                <p>{ keyword }</p>
            </div>

        );

    }

    /**
     * change page back to the search results page
     */

    changePage() {

        this.props.handleChangePage("NASAMediaLibrary");

    }

    /**
     * render component
     */

    render() {

        return (
            <>
                { this.getShowElement() }
            </>
        );

    }

}

export {
    NASAMediaLibraryShow
}
