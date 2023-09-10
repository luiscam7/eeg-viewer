// components/EEGViewer.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '../styles/EEGViewer.css';

const channelLabels = ["Fz", "Cz", "Pz", "Fp1", "Fp2", "F7", "F3", "F4", "F8", "T7", "C3", "C4", "T8", "P7", "P3", "P4", "P8", "O1", "O2"];

const EEGViewer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [startPoint, setStartPoint] = useState(0);

  // Mock EEG data
  const channels = 19;
  const mockEEGData = Array.from({ length: channels }, () => ({
    values: Array.from({ length: 5000 }, () => Math.random() * 10 - 5),
  }));

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width'); 
    const height = +svg.attr('height'); 
    const margin = { top: 5, right: 0, bottom: 5, left: 50 };
    const channelHeight = (height - margin.top - margin.bottom - (channels - 1) * margin.top) / channels;

    const container = svg.select('.eeg-container');
    if (container.empty()) {
      svg.append('g').attr('class', 'eeg-container');
    }

    function drawEEGData() {
      mockEEGData.forEach((channel, i) => {
        const y = (channelHeight + margin.top) * i + margin.top;
        const yScale = d3.scaleLinear().domain([-5, 5]).range([y + channelHeight, y]);
        const xScale = d3.scaleLinear().domain([startPoint, startPoint + 1000]).range([margin.left, width - margin.right]);
        
        const lineGenerator = d3.line<number>().x((d, index) => xScale(index + startPoint)).y(d => yScale(d));

        // Add EEG path
        svg.select(`.path-${i}`).remove();
        svg.append('path')
          .attr('class', `path-${i}`)
          .datum(channel.values)
          .attr('fill', 'none')
          .attr('stroke', '#3B82F6')
          .attr('stroke-width', 1.5)
          .attr('d', lineGenerator);
      });
    }

    drawEEGData();
  }, [startPoint, mockEEGData]);

  return (
    <div className="p-4 bg-base-100 shadow rounded-lg">
      <svg ref={svgRef} width="1050" height="800"></svg>
      <div className="mt-4">
        <input 
          type="range" 
          min="0" 
          max="4000" 
          value={startPoint} 
          onChange={(e) => setStartPoint(+e.target.value)} 
        />
      </div>
    </div>
  );
};

export default EEGViewer;
