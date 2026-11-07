# lighting

Edit TypeScript sources in src. roblox-ts compiles them to Luau in out, which Rojo syncs into Roblox.

- shared/lighting contains typed presets, settings, and the controller.
- server/main.server.ts starts the controller when config.client is false.
- client/main.client.ts starts the controller for each player when config.client is true.

Set client and duration in config.ts. Client execution defaults to true and transitions default to one second. Restart play after changing execution mode.

The controller applies the initial preset, creates missing effects and clouds, and responds to Lighting.ClockTime. Repeated start calls do not add duplicate connections.

Schedule: sunrise 6–8, day after 8–17, afternoon after 17–18.5, sunset after 18.5–20, twilight after 20–23, and night after 23 or before 6. The morning preset remains available but unscheduled.

This system does not advance or synchronize ClockTime. Client mode observes the player's local clock; server mode observes the server clock.

Run npm run build to compile, npm run watch while editing, and rojo serve to sync.
