// Modules

import { config } from "./config";
import type { Preset, Properties } from "./types";

// Services

const lighting = game.GetService("Lighting");
const tweens = game.GetService("TweenService");
const world = game.GetService("Workspace");

// Variables

const tween = new TweenInfo(config.duration);

// Functions

function resolve<C extends keyof CreatableInstances>(parent: Instance, name: string, kind: C): CreatableInstances[C] {
	const existing = parent.FindFirstChild(name) ?? parent.FindFirstChildOfClass(kind);

	if (existing) {
		assert(existing.IsA(kind), `Invalid lighting object: ${name}`);

		return existing as CreatableInstances[C];
	}

	const instance = new Instance(kind);
	instance.Name = name;
	instance.Parent = parent;

	return instance;
}

function animate<T extends Instance>(instance: T, properties: Properties<T>): void {
	const animation = tweens.Create(instance, tween, properties);

	animation.Completed.Once(() => {
		animation.Destroy();
	});

	animation.Play();
}

export function apply(preset: Preset): void {
	animate(lighting, preset.Lighting);
	animate(resolve(lighting, "Bloom", "BloomEffect"), preset.Bloom);
	animate(resolve(lighting, "Blur", "BlurEffect"), preset.Blur);
	animate(resolve(lighting, "ColorCorrection", "ColorCorrectionEffect"), preset.ColorCorrection);
	animate(resolve(lighting, "DepthOfField", "DepthOfFieldEffect"), preset.DepthOfField);
	animate(resolve(lighting, "SunRays", "SunRaysEffect"), preset.SunRays);
	animate(resolve(lighting, "Atmosphere", "Atmosphere"), preset.Atmosphere);
	animate(resolve(world.Terrain, "Clouds", "Clouds"), preset.Clouds);
}
