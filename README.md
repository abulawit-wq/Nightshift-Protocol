# Nightshift Protocol

An original browser-based 3D survival-horror game built with ES modules and Three.js. All geometry, textures, characters, sound synthesis, branding, systems and story are original and generated at runtime.

## Run

Because the project uses ES modules, serve the folder over HTTP:

```bash
python3 -m http.server 8080 --directory nightshift-protocol
```

Open `http://localhost:8080`. The first load needs internet access to fetch Three.js 0.169.0 from unpkg. A desktop Chromium/Firefox browser and headphones are recommended.

## Controls

- `A / D` or mouse: look left/right
- `Space`: raise/lower surveillance tablet
- `Q / E`: left/right security seal
- `Z / C`: left/right hall light
- `1—8`: select camera; `0`: return to last camera
- `Escape`: pause

## Architecture

- `src/engine`: rendering, update loop, procedural PBR texture cache
- `src/world`: office and facility construction
- `src/ai`: path graph, independent finite-state agents
- `src/entities`: original articulated animatronics
- `src/systems`: surveillance, power, audio, input
- `src/ui`: DOM HUD and state screens
- `src/game`: orchestration and progression
- `src/shaders`: post-processing fragment shader source

## Technical notes

The scene uses physically based materials with generated albedo, roughness, normal and AO textures; ACES tone mapping; soft PCF shadows; environment reflections via a room environment PMREM; fog; selective bloom; screen-space ambient occlusion; instancing; LOD; frustum culling; pooled transient audio; fixed-step AI; and lazy surveillance rendering. No external models, textures, music or physics engine are used.

Difficulty scales across five persistent nights. Progress is saved in `localStorage`.
