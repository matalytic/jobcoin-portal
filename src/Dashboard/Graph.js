import React from 'react';
import {
  HorizontalGridLines,
  LineMarkSeries,
  FlexibleXYPlot,
  XAxis,
  YAxis,
} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';

const Graph = ({balanceHistory}) => (
  <div id="graph">
    <h3>Jobcoin History Graph</h3>
    <div id="graph-plot">
      <FlexibleXYPlot
        xType={'time-utc'}>
        <XAxis/>
        <YAxis/>
        <HorizontalGridLines />
        <LineMarkSeries 
          data={balanceHistory} 
          color={'#60BACA'}
          size={3}
          curve={'curveMonotoneX'}
          />
      </FlexibleXYPlot>
    </div>
  </div>
);

export default Graph;