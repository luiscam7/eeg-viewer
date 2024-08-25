'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const channels = 19;
const channelLabels = ["Fz", "Cz", "Pz", "Fp1", "Fp2", "F7", "F3", "F4", "F8", "T7", "C3", "C4", "T8", "P7", "P3", "P4", "P8", "O1", "O2"];

const EEGViewer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [eegData, setEegData] = useState<number[][]>([]);

  useEffect(() => {
    // Fetch EEG data from the endpoint
    const fetchEEGData = async () => {
      try {
        const response = await fetch('http://synth-data-1989392102.us-west-2.elb.amazonaws.com:8000/eeg');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEegData(data);  // Assuming the endpoint returns an array of channel data
      } catch (error) {
        console.error('Error fetching EEG data:', error);
      }
    };

    fetchEEGData();
  }, []);

  useEffect(() => {
    if (eegData.length === 0) return; // Wait until the data is fetched

    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = { top: 5, right: 0, bottom: 5, left: 100 };
    const channelHeight = (height - margin.top - margin.bottom - (channels - 1) * margin.top) / channels;

    let lastTime = Date.now();
    let velocity = 100;
    const friction = 0.001;
    let isDecelerating = false;

    svg.on('wheel', function(event) {
      const currentTime = Date.now();
      const elapsed = currentTime - lastTime;
      velocity = event.deltaX / elapsed;

      const initialPan = event.deltaY;
      let remainingPan = velocity * 100;

      const move = function(panAmount: number) {
        const currentTransform = d3.zoomTransform(svg.node()!);
        let proposedTranslationX = currentTransform.x + panAmount;

        const minXTranslation = -width * 4;
        const maxXTranslation = 0;

        if (proposedTranslationX < minXTranslation) {
          proposedTranslationX = minXTranslation;
        } else if (proposedTranslationX > maxXTranslation) {
          proposedTranslationX = maxXTranslation;
        }

        const newTransform = d3.zoomIdentity.translate(proposedTranslationX, currentTransform.y);
        svg.call(zoom.transform as any, newTransform);
      };

      if (isDecelerating) {
        remainingPan += initialPan;
      } else {
        move(initialPan);
      }

      const decelerate = function() {
        if (Math.abs(remainingPan) < 0.1) {
          isDecelerating = false;
          return;
        }

        move(remainingPan);
        remainingPan *= friction;

        requestAnimationFrame(decelerate);
      };

      if (!isDecelerating) {
        isDecelerating = true;
        requestAnimationFrame(decelerate);
      }

      lastTime = currentTime;
    });

    svg.on('mouseover', function() {
      svg.dispatch('start');
      if (!svgRef.current) return;

      d3.select(window).on('keydown', function(event) {
        const currentTransform = d3.zoomTransform(svg.node()!);
        let proposedTranslationX;

        if (event.key === 'ArrowRight') {
          proposedTranslationX = currentTransform.x - 330;
        } else if (event.key === 'ArrowLeft') {
          proposedTranslationX = currentTransform.x + 330;
        } else {
          return;
        }

        const minXTranslation = -width * 4;
        const maxXTranslation = 0;

        if (proposedTranslationX < minXTranslation) {
          proposedTranslationX = minXTranslation;
        } else if (proposedTranslationX > maxXTranslation) {
          proposedTranslationX = maxXTranslation;
        }

        const newTransform = d3.zoomIdentity.translate(proposedTranslationX, currentTransform.y);
        svg.transition().duration(250).call(zoom.transform as any, newTransform);
      });
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

    eegData.forEach((channel, i) => {
      const y = (channelHeight + margin.top) * i + margin.top;
      const xScale = d3.scaleLinear().domain([0, channel.length]).range([margin.left, width * 5 - margin.right]);
      const yScale = d3.scaleLinear().domain([-5, 5]).range([y + channelHeight, y]);
      const lineGenerator = d3.line<number>().x((d, index) => xScale(index)).y(d => yScale(d));

      container.append('path')
        .datum(channel)
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
  }, [eegData]); // Re-run effect when eegData changes

  return (
    <div className="eeg-scrolling-container" style={{ display: 'flex' }}>
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
