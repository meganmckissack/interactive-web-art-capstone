import React, { useState, useEffect, useRef } from "react";

const circleSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
const SVG_PATH = new Path2D(circleSVG);

const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = 500;
export const canvasHeight = 500;

export function draw(ctx, location) {
  ctx.fillStyle = 'purple';
  ctx.save();
  ctx.scale(SCALE, SCALE);
  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  ctx.rotate(225 * Math.PI / 180);
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