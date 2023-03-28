import timeFormat from '@/utils/timeFormat';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from '../styles/TrackProgress.module.scss';

interface ITrackProgressProps {
  left: number;
  right: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isTimeFormat?: boolean;
}

export default function TrackProgress({
  left,
  right,
  onChange,
  isTimeFormat = false,
}: ITrackProgressProps) {
  const [current, setCurrent] = useState('0');
  const [max, setMax] = useState('0');

  useEffect(() => {
    setCurrent(String(left));
    setMax(String(right));

    if (isTimeFormat) {
      setCurrent(timeFormat(left));
      setMax(timeFormat(right));
    }
  }, [isTimeFormat, left, right]);

  return (
    <div className={styles.progress}>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>
        {current} / {max}
      </div>
    </div>
  );
}
