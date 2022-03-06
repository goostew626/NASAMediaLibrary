import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { within } from "@testing-library/dom";

import { GetElements } from "../util/GetElements";

import { Main } from "../../scripts/main/Main";

jest.setTimeout(30000);
let getElements = new GetElements();

test("Renders with Correct Elements", function() {

    const { container } = render(<Main />);

    // header

    expect(screen.getByText("Startupz Challenge")).toBeInTheDocument();
    expect(screen.getByText("NASA Media Library")).toBeInTheDocument();

    // search element

    expect(getElements.searchElement(container)).toBeInTheDocument();

    // search inputs

    expect(getElements.inputSearch()).toBeInTheDocument();
    expect(getElements.selectYearStart()).toBeInTheDocument();
    expect(getElements.selectYearEnd()).toBeInTheDocument();
    expect(getElements.buttonSearch()).toBeInTheDocument();

    // results element

    expect(getElements.resultsElement(container)).toBeInTheDocument();

});


test("Has Correct Defaults", function() {

    let { container } = render(<Main />);

    // search inputs should be empty

    expect(getElements.inputSearch()).toHaveValue("");
    expect(getElements.selectYearStart()).toHaveValue("");
    expect(getElements.selectYearEnd()).toHaveValue("");

    // results element should be empty

    expect(getElements.resultsElement(container)).toBeEmptyDOMElement();

});

test("Successful Search : 01", async function() {

    let { container } = render(<Main />);

    /**
     * valid search example 01
     * --- Search : "Uranus"
     * --- YearRange "2020" to ""
     * Will return 1 item(s)
     */

    user.type(getElements.inputSearch(), "Uranus");
    user.selectOptions(getElements.selectYearStart(), within(getElements.selectYearStart()).getByRole("option", { name:"2020" }));
    user.selectOptions(getElements.selectYearEnd(), within(getElements.selectYearEnd()).getByRole("option", { name:"" }));
    user.click(getElements.buttonSearch());

    let awaitResult = await screen.findAllByTestId("result_item");
    let resultTotal = getElements.resultsElementItems().length;
    expect(resultTotal).toBe(1);

});

test("Successful Search : 02", async function() {

    let { container } = render(<Main />);

    /**
     * valid search example 02
     * --- Search : "Trent"
     * --- YearRange "2019" to "2022"
     * Will return 6 item(s)
     */

    user.type(getElements.inputSearch(), "Trent");
    user.selectOptions(getElements.selectYearStart(), within(getElements.selectYearStart()).getByRole("option", { name:"2019" }));
    user.selectOptions(getElements.selectYearEnd(), within(getElements.selectYearEnd()).getByRole("option", { name:"2022" }));
    user.click(getElements.buttonSearch());

    let awaitResult = await screen.findAllByTestId("result_item");
    let resultTotal = getElements.resultsElementItems().length;
    expect(resultTotal).toBe(6);

});

test("Successful Search and Show", async function() {

    let { container } = render(<Main />);

    /**
     * valid search for show
     * --- Search : "Saturn"
     * --- YearRange "2021" to "2021"
     * Will return 1 item(s)
     */

    user.type(getElements.inputSearch(), "Saturn");
    user.selectOptions(getElements.selectYearStart(), within(getElements.selectYearStart()).getByRole("option", { name:"2021" }));
    user.selectOptions(getElements.selectYearEnd(), within(getElements.selectYearEnd()).getByRole("option", { name:"2021" }));
    user.click(getElements.buttonSearch());

    let awaitResult = await screen.findAllByTestId("result_item");

    /**
     * show the first (and only) result
     */

    user.click(screen.getAllByTestId("button_show")[0]);
    let awaitShow = await screen.findByTestId("show_item");
    expect(screen.getByRole('heading', { name: /flattening of brown dwarf/i })).toBeInTheDocument();

});

/**
 * helper general methods
 */

function enableDebug() {
    screen.debug(undefined, 1000000);
}

/**
 * helper get methods
 */

//function getSearchElement(container:any) {
//    return container.querySelector("div.searchElement");
//}

//function getInputSearch() {
//    return screen.getByTestId("input_search");
//}

//function getSelectYearStart() {
//    return screen.getByTestId("select_yearStart");
//}

//function getSelectYearEnd() {
//    return screen.getByTestId("select_yearEnd");
//}

//function getButtonSearch() {
//    return screen.getByTestId("button_search");
//}

//function getResultsElement(container:any) {
//    return container.querySelector("div.resultsWrapper .results");
//}

//function getResultsElementItems() {
//    return screen.getAllByTestId("result_item");
//}
