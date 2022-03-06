import { screen } from "@testing-library/react";

class GetElements {

    searchElement(container:any) {
        return container.querySelector("div.searchElement");
    }

    inputSearch() {
        return screen.getByTestId("input_search");
    }

    selectYearStart() {
        return screen.getByTestId("select_yearStart");
    }

    selectYearEnd() {
        return screen.getByTestId("select_yearEnd");
    }

    buttonSearch() {
        return screen.getByTestId("button_search");
    }

    resultsElement(container:any) {
        return container.querySelector("div.resultsWrapper .results");
    }

    resultsElementItems() {
        return screen.getAllByTestId("result_item");
    }

}

export {
    GetElements
}
