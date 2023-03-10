import React, { ChangeEvent } from 'react'
import styles from "../styles/TrackProgress.module.scss";

interface ITrackProgressProps {
  left: number;
  right: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TrackProgress({left, right, onChange}: ITrackProgressProps) {
  return (
    <div className={styles.progress}>
      <input type="range" min={0} max={right} value={left} onChange={onChange}/>
      <div>{left} / {right}</div>
    </div>
  )
}
