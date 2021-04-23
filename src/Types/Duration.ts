import { ToSeconds } from "../Utilities/BreakTimeConversionHelpers";

export class Duration {
	public Minutes = 0;
	public Seconds = 0;

	constructor(minutes: number, seconds: number) {
		this.Minutes = minutes;
		this.Seconds = seconds;
	}

	get TotalSeconds() {
		return ToSeconds(this.Minutes, this.Seconds)
	}
}
