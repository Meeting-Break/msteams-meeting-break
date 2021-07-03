import { ToSeconds } from "../Utilities/BreakTimeConversionHelpers";

export class Duration {
	minutes = 0;
	seconds = 0;

	constructor(minutes: number, seconds: number) {
		this.minutes = minutes;
		this.seconds = seconds;
	}

	get TotalSeconds() {
		return ToSeconds(this.minutes, this.seconds)
	}
}
