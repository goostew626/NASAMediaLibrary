# NASAMediaLibrary

Startupz Challenge : NASA Media Library

## About

A Single Page Application written using Typescript, React and Axios with SASS for styling. This project is to meet the requirements as outlined by the challenge.

Mainly utilizing the API Endpoint https://images-api.nasa.gov/search to perform searches using the parameters Search, Year Start and Year End.

The results will be populated below the search input and each one can be opened in a more detailed show page from where the user can return to the search page.

## Project Structure

```
./public/ { latest project build }
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

## Latest Test Results

```
> jest

 PASS  source/scriptsTests/main/Main.test.tsx (33.28 s)
  ✓ Renders with Correct Elements (979 ms)
  ✓ Has Correct Defaults (444 ms)
  ✓ Successful Search : 01 (5532 ms)
  ✓ Successful Search : 02 (3469 ms)
  ✓ Successful Search and Show (3368 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        36.552 s
Ran all test suites.
```
