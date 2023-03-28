/**
 * Преобразуем секунды в формат чч:мм:сс
 * @param sec - число секунд
 * @returns
 */

export default function timeFormat(sec: number) {
  const hours = (sec / 3600) % 24;
  const minutes = (sec / 60) % 60;
  const seconds = sec % 60;

  return num(hours) + ':' + num(minutes) + ':' + num(seconds);
}

function num(val: number) {
  val = Math.floor(val);
  return val < 10 ? '0' + val : val;
}
