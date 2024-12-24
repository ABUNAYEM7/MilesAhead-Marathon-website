import { format } from "date-fns";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 80,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const CountdownTimer = ({ endDate }) => {
  const [isExpired, setIsExpired] = useState(false);
  const formateEndDate = format(new Date(endDate),"yyyy-MM-dd")
  const start = Math.floor(Date.now() / 1000); 
  const endTime = Math.floor(new Date(formateEndDate).getTime() / 1000); 

  const remainingTime = endTime - start;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;


  const handleComplete = () => {
    const currentRemaining = endTime - Math.floor(new Date() / 1000)
    // time-validation
    if(currentRemaining <= 0){
        setIsExpired(true); 
    return { shouldRepeat: false };
    }
    return{shouldRepeat : true}
  };

  if (isExpired) {
    return (
      <div className="expired-message">
        <h1 className="text-pinkShade text-2xl text-center font-bold">Expired</h1>
      </div>
    );
  }

  return (
    <div className="App grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center my-3">
      {/* Days Timer */}
      <div>
        <CountdownCircleTimer
          {...timerProps}
          colors="#7E2E84"
          duration={daysDuration}
          initialRemainingTime={Math.max(remainingTime,0)}
          onComplete={handleComplete}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
      {/* Hours Timer */}
      <div>
        <CountdownCircleTimer
          {...timerProps}
          colors="#D14081"
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={handleComplete}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
      {/* Minutes Timer */}
      <div>
        <CountdownCircleTimer
          {...timerProps}
          colors="#EF798A"
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={handleComplete}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
      {/* Seconds Timer */}
      <div>
        <CountdownCircleTimer
          {...timerProps}
          colors="#218380"
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={handleComplete}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("seconds", getTimeSeconds(elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default CountdownTimer;
