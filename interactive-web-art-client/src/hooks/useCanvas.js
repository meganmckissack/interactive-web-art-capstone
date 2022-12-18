import React, { useState, useEffect, useRef } from "react";
import svgLeaf from '../leaf.svg';

// const circleSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
// const svgLeaf = "M112.65,31.38c3.64,0,7.28,0,10.92,0,4.59,.76,9.17,1.55,13.76,2.27,12.45,1.97,22.63,7.92,30.52,17.67,1.44,1.77,3.91,4.19,2.12,6.54-2.32,3.04-5.47,5.48-8.47,7.92-.76,.62-2.32,.3-3.51,.36-2.35,.11-4.71,.19-7.07,.28-3.18,.13-6.36,.35-9.55,.36-3.65,.01-7.3-.25-10.95-.18-.79,.02-1.57,.94-2.35,1.45,.8,.32,1.59,.88,2.41,.92,5.12,.27,10.25,.43,15.37,.6,.86,.03,1.72-.07,2.58-.07,3.55,0,7.09,0,10.81,0-3.63,4.81-7.24,9.55-10.81,14.32-3.42,4.58-7.86,8.75-9.94,13.88-3.8,9.36-11.5,13.65-19.61,17.63-4.99,2.45-10.4,4.06-15.64,5.99-1.73,.64-3.53,1.1-5.29,1.65l.21,.93c5.44-.33,10.7-1.84,15.75-3.81,5.12-1.99,9.99-4.63,14.99-7-.16,.42-.3,.98-.56,1.47-3.38,6.47-6.55,13.06-10.24,19.34-2.27,3.87-5.15,7.45-8.11,10.84-3.44,3.94-7.24,7.58-10.94,11.29-5.01,5.02-10.02,10.06-15.16,14.95-2.82,2.68-5.89,5.1-8.9,7.57-3,2.47-6.06,4.86-9.1,7.28-.86,.69-1.75,1.34-2.63,2.01,.13,.33,.26,.65,.39,.98,1.08-.3,2.38-.31,3.19-.95,4.9-3.84,9.85-7.64,14.49-11.79,8.65-7.73,17.1-15.69,25.63-23.56,1.62-1.5,3.2-3.04,4.7-4.47-1.78,4.71-3.7,9.51-5.42,14.38-1.99,5.64-3.85,11.33-5.7,17.02-.52,1.61-.47,3.49-1.28,4.91-4.21,7.41-8.65,14.7-12.95,22.06-1.52,2.6-2.87,5.3-4.32,7.93-.31,.56-.77,1.04-1.15,1.55-2.17,2.95-4.42,5.85-6.49,8.87-2.21,3.21-4,6.74-6.44,9.75-2.85,3.53-6.21,6.63-9.29,9.97-.37,.4-.32,1.17-.47,1.77,.28,.12,.55,.24,.83,.36,15.45-14.69,26.88-32.35,37.04-51.03,.05,1.54-.16,2.93-.47,4.3-1.18,5.1-2.61,10.14-3.53,15.29-1.22,6.85-2.13,13.77-3.02,20.68-1.02,7.89-2.08,15.79-2.71,23.72-.52,6.54-.51,13.13-.58,19.7-.03,2.36,.5,4.72,.56,7.09,.11,4.27-.21,8.56,.15,12.81,.31,3.64,1.32,7.22,2.02,10.82,.35-.01,.69-.02,1.04-.03,.16-1.71,.46-3.42,.45-5.12-.09-9.04-.39-18.08-.35-27.12,.02-5.12,.56-10.23,.85-15.35,.61-11.04,1.04-22.1,3.22-32.98,.02-.09,.01-.19,.03-.29,.96-6.35,1.89-12.71,2.89-19.06,.24-1.55,.71-3.06,1.23-5.22,4.59,10.99,8.2,21.7,13.43,31.56,5.28,9.95,12.15,19.06,18.33,28.53,.38-.24,.75-.48,1.13-.72-.85-1.39-1.72-2.76-2.53-4.17-2.48-4.34-4.95-8.69-7.41-13.04-2.9-5.13-6.05-10.15-8.63-15.44-2.98-6.15-5.36-12.58-8.18-18.81-2.73-6.02-4.95-12.04-2.73-18.74,.81-2.45,1.97-4.83,2.43-7.35,1.48-8.12,4.32-15.75,7.57-23.28,.92-2.14,1.61-4.38,2.4-6.57,3.36,12.11,9.79,22.37,16.42,32.56,7.1,10.9,20.47,25.59,23.82,27.23-2.89-3.68-5.8-7.27-8.59-10.97-2.11-2.8-4.04-5.72-6.05-8.59-4.22-5.99-9.04-11.67-12.53-18.06-4.13-7.56-7.2-15.71-10.51-23.7-.65-1.56-.61-3.6-.3-5.31,.51-2.84,4.06-4.65,2.94-8.15-.02-.05,.13-.13,.18-.21,2.34-4.29,4.64-8.61,7.02-12.88,3.73-6.7,7.51-13.37,11.29-20.04,.34-.59,.79-1.12,1.35-1.91,4.12,28.1,27.18,61.2,37.12,70.25-2.04-3.26-4.38-6.32-6.33-9.63-4.51-7.66-8.98-15.35-13.18-23.18-3.34-6.23-6.2-12.72-9.39-19.04-3-5.95-5.05-12.19-5.56-18.83-.14-1.86-.02-4.15,.94-5.63,3.32-5.1,7.1-9.9,10.61-14.89,.82-1.17,1.14-2.69,1.87-3.95,.7-1.21,1.57-2.35,2.49-3.42,.58-.67,1.47-1.08,2.09-1.73,2.56-2.64,5.06-5.33,7.22-7.6,4.41,7.47,8.2,15.45,13.43,22.34,5.18,6.83,10.31,14.07,18.17,18.43-.15-.92-.61-1.56-1.14-2.14-4.27-4.7-8.61-9.34-12.79-14.13-1.36-1.56-2.05-3.73-3.45-5.24-5.31-5.75-8.39-12.65-10.71-19.97-.95-2.99,1.09-8.32,3.75-9.72,.24-.12,.53-.14,.79-.23,1.24-.41,2.48-.81,3.72-1.23,1.39-.47,2.79-1.45,4.14-1.37,6.09,.37,11.4,2.57,16.5,6.16,8.49,5.98,17.05,11.74,24.09,19.54,6.9,7.64,12.1,16.29,16.16,25.66,1.4,3.23,1.83,6.92,3.4,10.04,2.23,4.45,3.77,9.03,4.46,13.92,.28,1.97,.62,3.95,.65,5.93,.08,6.14,1.32,12.63-.26,18.34-3.3,11.92-15.12,17.11-26.55,9.5-3.26-2.17-6.08-5-9.54-7.89,.37,1.05,.48,1.6,.73,2.06,2.31,4.15,4.79,8.2,6.95,12.43,5.09,9.94,9.17,20.21,8.61,31.68-.14,2.91-.35,5.9-1.08,8.7-1.6,6.08-5.74,10.17-11.21,13.06-5.21,2.76-10.42,3.53-15.81,.53-.68-.38-1.51-.5-2.56-.84,.12,1.13,.09,1.9,.28,2.6,2.65,9.86,3.71,19.9,3.36,30.08-.15,4.44-.56,8.8-2.81,12.96-3.83,7.07-15.82,13.54-24.42,5.01-5.06-5.02-9.54-10.62-14.26-15.97-1.02-1.15-1.96-2.37-2.93-3.56-.24,.12-.47,.25-.71,.37,.18,.87,.35,1.75,.54,2.62,1.07,4.81,2.25,9.61,3.18,14.45,.79,4.09,1.25,8.24,1.93,12.35,1.1,6.62-.27,12.67-4.08,18.17-2.47,3.57-5.74,5.56-10.24,5.88-6.32,.45-10.92-2.39-14.59-7-4.95-6.22-9.65-12.64-14.86-19.5,0,5.02,.31,9.77-.07,14.48-.73,9.02-1.47,18.07-2.97,26.98-.95,5.64-3.58,10.98-4.94,16.59-1.23,5.09-3.87,9.15-7,13.22-8.25,10.72-21.6,4.17-25.3-4.39-3.15-7.31-5.39-14.84-6.81-22.64-.79-4.31-1.56-8.62-2.24-12.95-.49-3.07-1.09-6.15-1.16-9.24-.18-7.79-.09-15.59-.11-23.39,0-4.41,0-8.82,0-12.73-3.24,3.31-6.7,7.11-10.44,10.59-7.17,6.68-14.15,13.84-25.01,13.95-.84,0-1.71,.19-2.52,.05-7.55-1.3-12.5-5.85-14.12-13.12-1.14-5.12-1.39-10.58-1.15-15.84,.32-7,2.17-13.71,6.4-19.57,1.78-2.46,3.29-5.11,4.93-7.68-5.53,1.22-10.21-.66-14.69-2.62-5.24-2.29-9.65-6.02-10.05-12.09-.49-7.5,1.14-14.8,5.06-21.34,3.18-5.31,6.78-10.36,9.94-15.67,4.11-6.93,9.54-12.78,14.81-18.77,.99-1.12,2.39-1.87,3.62-2.78,2.7-1.99,5.4-3.97,8.31-6.11-.63-.21-.88-.34-1.14-.38-10.81-1.28-19.15-6.02-23.25-16.65-1.97-5.1-2.24-10.29,1.31-14.68,3.65-4.51,7.41-9.25,12.05-12.59,7.27-5.23,15.23-9.56,23.1-13.9,3.91-2.16,8.28-3.49,12.04-5.04-4.38-2.02-8.93-3.85-13.2-6.19-2.35-1.29-4.78-3.09-6.21-5.28-1.99-3.06-3.64-6.58-4.44-10.12-1.45-6.47-1.06-12.91,4.53-17.62,7.96-6.71,16.17-13.03,26.11-16.72,12.03-4.46,24.49-6.39,37.23-6.97,.9-.04,1.79-.36,2.69-.55Z"
const SVG_PATH = new Path2D(svgLeaf);

const SCALE = 0.3;
const OFFSET = 80;
export const canvasWidth = 500;
export const canvasHeight = 500;

export function draw(ctx, location) {
  ctx.fillStyle = 'purple';
  ctx.save();
  ctx.scale(SCALE, SCALE);
  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  // ctx.rotate(225 * Math.PI / 180);
  ctx.fill(SVG_PATH);
  // .restore(): Canvas 2D API restores the most recently saved canvas state
  ctx.restore(); 
}


export function useCanvas() {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    //clear the canvas area before rendering coordnates held in state
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //draw coordinates held in state
    coordinates.forEach((coordinate) => {
      draw(ctx, coordinate)
    });
  });

  return [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight]
}