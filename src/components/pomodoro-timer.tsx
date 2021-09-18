import React, { useEffect, useState } from 'react';
import useInterval from '../hooks/use-interval';
import { Button } from '../components/button';
import { Timer } from '../components/timer';
import { secondsToTime } from '../utils/seconds-to-time';

interface Props {
  PomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.PomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cycle, setCycle] = useState(props.cycles);
  const [pomodorosCount, setPomodorosCount] = useState(0);
  const [cyclesCount, setCyclesCount] = useState(0);
  const [workedTime, setWorkedTime] = useState(0);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
    if (mainTime === 0 && working) {
      setPomodorosCount(pomodorosCount + 1);
      configureResting();
    }
    if (mainTime === 0 && resting) {
      configureWorking();
    }
  }, [working, resting, mainTime, cyclesCount, pomodorosCount]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setWorkedTime(workedTime + 1);
    },
    timeCounting ? 1000 : null,
  );
  const configureWorking = () => {
    setTimeCounting(true);
    setMainTime(props.PomodoroTime);
    setResting(false);
    setWorking(true);
    setCycle(cycle - 1);
  };
  const configureResting = () => {
    setTimeCounting(true);
    cycle === 0
      ? (setMainTime(props.longRestTime),
        setCycle(4),
        setCyclesCount(cyclesCount + 1))
      : setMainTime(props.shortRestTime);
    setWorking(false);
    setResting(true);
  };
  return (
    <div className="pomodoro">
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'} </h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text="Work"
          onClick={() => {
            configureWorking();
          }}
        />
        <Button text="Rest" onClick={() => configureResting()} />
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>
      <div className="details">
        <p>Pomodoros concluidos: {pomodorosCount}</p>
        <p>Ciclos concluídos: {cyclesCount}</p>
        <p>Horas trabalhadas: {secondsToTime(workedTime)}</p>
      </div>
    </div>
  );
}
