import * as d3 from 'https://cdn.skypack.dev/d3@7';
import axios from 'https://cdn.skypack.dev/axios';

const dataSet = async function getData() {
  return axios.get('/coco-data');
};

async function drawChart() {
  const data = await dataSet();
  const width = 800;
  const height = 600;
  const margin = {
    top: 20, right: 20, bottom: 100, left: 100,
  };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const gXAxis = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`);

  const gYAxis = graph.append('g');

  const y = d3.scaleLinear()
    .domain([0, d3.max(data.data, (d) => d.sum)])
    .range([graphHeight, 0]);

  const x = d3.scaleBand()
    .domain(data.data.map((item) => item.type_name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const rects = graph.selectAll('rect')
    .data(data.data);

  rects.attr('width', x.bandwidth)
    .attr('class', 'bar-rect')
    .attr('height', (d) => graphHeight - y(d.sum))
    .attr('x', (d) => x(d.type_name))
    .attr('y', (d) => y(d.sum));

  rects.enter()
    .append('rect')
    .attr('class', 'bar-rect')
    .attr('width', x.bandwidth)
    .attr('height', (d) => graphHeight - y(d.sum))
    .attr('x', (d) => x(d.type_name))
    .attr('y', (d) => y(d.sum));

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y)
    .ticks(5)
    .tickFormat((d) => ` ${d} szt.`);

  gXAxis.call(xAxis);
  gYAxis.call(yAxis);

  gXAxis.selectAll('text')
    .style('font-size', 14);

  gYAxis.selectAll('text')
    .style('font-size', 14);
}

drawChart();
// setTimeout(function(){
//   window.location.reload(1);
// }, 10000);
