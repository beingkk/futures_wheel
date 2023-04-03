import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Bubbles = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr('width', 600)
      .attr('height', 300);

    const data = [
      { x: 100, y: 150, text: 'Bubble 1' },
      { x: 300, y: 150, text: 'Bubble 2' },
    ];

    const pathData = (data) =>
      `M${data[0].x},${data[0].y} L${data[1].x},${data[1].y}`;

    const path = svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('d', pathData(data));

    const bubbles = svg
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
      .call(
        d3
          .drag()
          .on('drag', function (event, d) {
            d.x = event.x;
            d.y = event.y;
            d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`);
            path.attr('d', pathData(data));
          })
      );

    bubbles
      .append('circle')
      .attr('r', 30)
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5);

    const foreignObject = bubbles
      .append('foreignObject')
      .attr('x', -25)
      .attr('y', -15)
      .attr('width', 50)
      .attr('height', 30);

    foreignObject
      .append('xhtml:div')
      .attr('contentEditable', 'true')
      .style('width', '100%')
      .style('height', '100%')
      .style('text-align', 'center')
      .style('font-family', 'Helvetica')
      .text((d) => d.text);
  }, []);

  return <svg ref={ref} />;
};

export default Bubbles;