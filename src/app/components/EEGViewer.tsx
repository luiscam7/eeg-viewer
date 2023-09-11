'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const channels = 19;
const channelLabels = ["Fz", "Cz", "Pz", "Fp1", "Fp2", "F7", "F3", "F4", "F8", "T7", "C3", "C4", "T8", "P7", "P3", "P4", "P8", "O1", "O2"];
const mockEEGData = Array.from({ length: channels }, () => ({
  values: Array.from({ length: 5000 }, () => Math.random() * 10 - 5),
}));

const EEGViewer: React.FC = () => {

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = { top: 5, right: 0, bottom: 5, left: 100 };
    const channelHeight = (height - margin.top - margin.bottom - (channels - 1) * margin.top) / channels;

    const container = svg.append('g');
    
    function dragstarted(event: d3.D3DragEvent<SVGSVGElement, unknown, unknown>) {
      event.sourceEvent.stopPropagation();
    }

    function dragged(event: d3.D3DragEvent<SVGSVGElement, unknown, unknown>) {
      const dx = event.dx;
      const currentTransform = d3.zoomTransform(svg.node()!);
      const newTransform = d3.zoomIdentity.translate(currentTransform.x + dx, 0);
      container.attr('transform', `translate(${newTransform.x},0)`);
    }

    const drag = d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged);

    svg.call(drag);

    mockEEGData.forEach((channel, i) => {
      const y = (channelHeight + margin.top) * i + margin.top;
      const xScale = d3.scaleLinear().domain([0, 5000]).range([margin.left, width * 5 - margin.right]);
      const yScale = d3.scaleLinear().domain([-5, 5]).range([y + channelHeight, y]);
      const lineGenerator = d3.line<number>().x((d, index) => xScale(index)).y(d => yScale(d));

      container.append('path')
        .datum(channel.values)
        .attr('fill', 'none')
        .attr('stroke', '#00FFFF')
        .attr('stroke-width', 1.5)
        .attr('d', lineGenerator);
    });

    // Cleanup
    return () => {
      svg.on('.drag', null);  // This will remove the drag behavior
    };

  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '800px', padding: '5px 0', marginRight: '5px' }}>
        {channelLabels.map(label => (
          <div key={label}>{label}</div>
        ))}
      </div>
      <svg ref={svgRef} width="1050" height="800"></svg>
    </div>
  );
};

export default EEGViewer;
