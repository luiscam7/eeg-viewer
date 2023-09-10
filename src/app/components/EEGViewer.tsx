// components/EEGViewer.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../styles/EEGViewer.css';

const EEGViewer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Mock EEG data
  const channels = 19;
  const channelLabels = ["Fz", "Cz", "Pz", "Fp1", "Fp2", "F7", "F3", "F4", "F8", "T7", "C3", "C4", "T8", "P7", "P3", "P4", "P8", "O1", "O2"];
  const mockEEGData = Array.from({ length: channels }, () => ({
    values: Array.from({ length: 5000 }, () => Math.random() * 10 - 5),
  }));

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width'); 
    const height = +svg.attr('height'); 
    const margin = { top: 5, right: 0, bottom: 5, left: 50 };
    const channelHeight = (height - margin.top - margin.bottom - (channels - 1) * margin.top) / channels;

    function drawEEGData() {
      // Remove existing paths
      svg.selectAll("path").remove();

    // Remove previous paths and text
    svg.selectAll("*").remove();

    mockEEGData.forEach((channel, i) => {
      const y = (channelHeight + margin.top) * i + margin.top;

      const xScale = d3.scaleLinear().domain([0, 1000]).range([margin.left, width - margin.right]);
      const yScale = d3
        .scaleLinear()
        .domain([-5, 5])
        .range([y + channelHeight, y]);

      const lineGenerator = d3
        .line<number>()
        .x((d, index) => xScale(index))
        .y(d => yScale(d));
    
      // Add EEG path
      svg
        .append('path')
        .datum(channel.values)
        .attr('fill', 'none')
        .attr('stroke', '#3B82F6')  // Color for blue-500 from daisyUI
        .attr('stroke-width', 1.5)
        .attr('d', lineGenerator);

    // Add channel label
    svg.append('text')
        .attr('x', margin.left - 10) 
        .attr('y', y + channelHeight / 2)
        .attr('dy', '.35em')
        .attr('text-anchor', 'end')
        .attr('class', 'font-sans text-blue-500')
        .text(channelLabels[i]);
    });
  }
    drawEEGData();

  }, [mockEEGData]);

  return (
    <div className="p-4 bg-base-100 shadow rounded-lg">
      <svg ref={svgRef} width="1050" height="800"></svg>
    </div>
  );
};

export default EEGViewer;
