// Types

export type Properties<T extends Instance> = Partial<ExtractMembers<T, Tweenable>>;

export interface Preset {
	Lighting: Properties<Lighting>;
	Bloom: Properties<BloomEffect>;
	Blur: Properties<BlurEffect>;
	ColorCorrection: Properties<ColorCorrectionEffect>;
	DepthOfField: Properties<DepthOfFieldEffect>;
	SunRays: Properties<SunRaysEffect>;
	Atmosphere: Properties<Atmosphere>;
	Clouds: Properties<Clouds>;
}

export type Phase = "sunrise" | "morning" | "day" | "afternoon" | "sunset" | "twilight" | "night";
