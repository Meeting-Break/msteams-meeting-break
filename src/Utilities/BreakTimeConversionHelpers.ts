import { Duration } from "../Types/Duration";

export function ToSeconds(minutes: number, seconds: number) {
	return (minutes * 60) + seconds
}

export function ToDuration(totalSeconds: number) {
	const seconds = totalSeconds % 60;
	const minutes = Math.floor(totalSeconds / 60);
	return new Duration(minutes, seconds);
}
