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

    let lastTime = Date.now();
    let velocity = 100;
    const friction = 0.2; // adjust as needed for more or less "slide"

    svg.on('wheel', function(event) {
      const currentTime = Date.now();
      const elapsed = currentTime - lastTime;
      velocity = event.deltaY / elapsed;

      // Apply the initial move
      const initialPan = event.deltaY;
      let remainingPan = velocity * 1000; // This determines how far the momentum will carry the pan

      const move = function(panAmount: number) {
        const newTransform = createZoomEvent(-panAmount, 0);
        svg.call(zoom.transform as any, newTransform);
      };
      

      move(initialPan);
      const decelerate = function() {
        if (Math.abs(remainingPan) < 0.1) return; // Stop the animation if remaining pan is negligible

        move(remainingPan);
        remainingPan *= friction; // Slowly reduce the remaining pan

        // Continue the animation
        requestAnimationFrame(decelerate);
      };

      requestAnimationFrame(decelerate);

      lastTime = currentTime;
    });

    function createZoomEvent(tx: number, ty: number) {
      const currentTransform = d3.zoomTransform(svg.node()!);
      return d3.zoomIdentity.translate(currentTransform.x + tx, currentTransform.y + ty);
    }

    svg.on('mouseover', function() {
      svg.dispatch('start');
      if (!svgRef.current) return; 

      d3.select(window).on('keydown', function(event) {
        if (event.key === 'ArrowRight') {
          const newTransform = createZoomEvent(-120, 0);
          svg.transition().duration(250).call(zoom.transform as any, newTransform);
        } else if (event.key === 'ArrowLeft') {
          const newTransform = createZoomEvent(120, 0);
          svg.transition().duration(250).call(zoom.transform as any, newTransform);
        }
      });
    });

    svg.on('wheel', function(event) {
        const amountToPan = event.deltaY * 3;
        const newTransform = createZoomEvent(-amountToPan, 0);
        svg.transition().duration(250).call(zoom.transform as any, newTransform);
    });

    svg.on('mouseout', function() {
      svg.dispatch('end');
      d3.select(window).on('keydown', null);
    });

    const container = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([1, 1])
      .translateExtent([[0, 0], [width * 5, height]])
      .on('zoom', zoomed);

    svg.call(zoom as any);

    function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
      container.attr('transform', `translate(${event.transform.x},0)`);
    }

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
      d3.select(window).on('keydown', null);
      svg.on('wheel', null);
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
