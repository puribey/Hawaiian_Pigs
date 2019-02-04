# Hawaiian Pig Visualization Assignment

## Assignment overview
**Main Goal:** create an animated bar chart
that shows the data over time with the information provided in wild-pig-data.json.

**To do List:**  
- [x] Animation that steps through the data, displaying each year for 2 seconds
      before proceeding to the next year.

- [x] A progress bar that shows the currently displayed year's relationship to
      the other years in the dataset.

- [x] A play/pause button which enables and disables the animation, pausing on
      whichever year is currently being shown

- [x] Year and play/paused state are persisted as query parameters in the URL.  
For example, `http://localhost:3000/?paused=true&year=2002`

**Extra:**  
- [x] New button to reset years.

- [x] Buttons to select years by hand and also used as markers to know which year is being showed in the chart.

**Further improvements:**
- [ ] Make *BarChart* component more reusable: now this is too custom made.

---

## Project overview
To run this project: 
```
yarn install
yarn start
```
Main dependencies: 
* [D3js](https://d3js.org/)
* [Material UI](https://material-ui.com/)
* [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* [Query String](https://www.npmjs.com/package/query-string)
* [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

---

## Some things about D3js
> There are two main features to take into account when using D3 to build barcharts

**scaleBand:** have a discrete domain and output range which is continuous and numeric. Discrete output values are automatically computed by the scale by dividing the continuous range into uniform bands. Band scales are typically used for bar charts with an ordinal or categorical dimension.  

```
// BarChart.js

const xScale = this.xScale
  .padding(0.6)
  .domain(this.data.map(d => d.island))
  .range([margins.left, svgDimensions.width - margins.right])
```

* *Domain:* If domain is specified, sets the domain to the specified array of values. The first element in domain will be mapped to the first element in the range, the second domain value to the second range value, and so on. 

* *Range:* If range is specified, sets the scale’s range to the specified two-element array of numbers. If the elements in the given array are not numbers, they will be coerced to numbers. If range is not specified, returns the scale’s current range, which defaults to [0, 1].

* *Padding:* A convenience method for setting the inner and outer padding to the same padding value. If padding is not specified, returns the inner padding.

**scaleLinear:** constructs a new continuous scale with the specified domain and range, the default interpolator and clamping disabled. If either domain or range are not specified, each defaults to [0, 1]. Linear scales are a good default choice for continuous quantitative data because they preserve proportional differences. Each range value y can be expressed as a function of the domain value x: y = mx + b.

```
// BarChart.js

const yScale = this.yScale
  .domain([0, maxValue])
  .range([svgDimensions.height - margins.bottom, margins.top])
```
