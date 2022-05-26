import React from 'react';
import CountdownTimer from './CountdownTimer';
import './Timer.css';

export default function Timer() {

  const dateTimeAfterThreeDays = new Date("2022-08-26");

  return (
    <div class='timer-todo'>
      <h1 className="tittle">We will graduate after</h1>
      <CountdownTimer targetDate={dateTimeAfterThreeDays} />
    </div>
  );
}