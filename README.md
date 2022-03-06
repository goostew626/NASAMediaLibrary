# NASAMediaLibrary

Startupz Challenge : NASA Media Library

## About

A Single Page Application written using Typescript, React and Axios with SASS for styling. This project is to meet the requirements as outlined by the challenge.

Mainly utilizing the API Endpoint https://images-api.nasa.gov/search to perform searches using the parameters Search, Year Start and Year End.

The results will be populated below the search input and each one can be opened in a more detailed show page from where the user can return to the search page.

## Project Structure

```
./source/
|-- scripts
|   |-- elements
|   |   |-- Button.tsx
|   |   |-- Header.tsx
|   |   |-- Input.tsx
|   |   `-- Select.tsx
|   |-- main
|   |   |-- EntryPoint.tsx
|   |   `-- Main.tsx
|   |-- pages
|   |   |-- NASAMediaLibrary.tsx
|   |   `-- NASAMediaLibraryShow.tsx
|   `-- util
|       `-- FormHandlers.tsx
|-- scriptsTests
|   |-- main
|   |   `-- Main.test.tsx
|   `-- util
|       `-- GetElements.tsx
`-- styles
    |-- controls
    |   |-- Buttons.scss
    |   |-- Forms.scss
    |   `-- Inputs.scss
    |-- elements
    |   |-- Headers.scss
    |   |-- ResultsElement.scss
    |   |-- ResultsElementItems.scss
    |   |-- SearchElement.scss
    |   `-- ShowElement.scss
    |-- main
    |   `-- Main.scss
    `-- util
        |-- Fancy.scss
        |-- Tables.scss
        `-- Themes.scss
```
