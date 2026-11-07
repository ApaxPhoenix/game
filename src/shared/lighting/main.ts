// Modules

import { apply } from "./functions";
import afternoon from "./presets/afternoon";
import day from "./presets/day";
import morning from "./presets/morning";
import night from "./presets/night";
import sunrise from "./presets/sunrise";
import sunset from "./presets/sunset";
import twilight from "./presets/twilight";
import type { Phase, Preset } from "./types";

// Services

const lighting = game.GetService("Lighting");

// Variables

const presets: Record<Phase, Preset> = {
	sunrise,
	morning,
	day,
	afternoon,
	sunset,
	twilight,
	night,
};

let current: Phase | undefined;
let connection: RBXScriptConnection | undefined;

// Functions

export function choose(time: number): Phase {
	if (time >= 6 && time <= 8) return "sunrise";
	if (time > 8 && time <= 17) return "day";
	if (time > 17 && time <= 18.5) return "afternoon";
	if (time > 18.5 && time <= 20) return "sunset";
	if (time > 20 && time <= 23) return "twilight";

	return "night";
}

function update(): void {
	const phase = choose(lighting.ClockTime);

	if (current !== phase) {
		apply(presets[phase]);

		current = phase;
	}
}

export function start(): void {
	if (connection) return;

	connection = lighting.GetPropertyChangedSignal("ClockTime").Connect(update);

	update();
}
