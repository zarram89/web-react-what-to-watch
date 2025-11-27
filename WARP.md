# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
This repository is for the HTML Academy "What to Watch" React course.
Currently, it contains the static markup in the `markup/` directory. The React application initialization is expected in subsequent steps.

## Directory Structure
- `markup/`: Contains static HTML templates and assets (CSS, img) which serve as the design reference.
    - `markup/index.html`: Container page.
    - `markup/main.html`: Main page.
    - `markup/movie-page.html` & related: Movie details pages.
    - `markup/player.html`: Video player page.
    - `markup/sign-in.html`: Authentication page.
    - `markup/my-list.html`: "My List" page.
- Root directory: Intended for the React application source code.

## Development Workflow
The development follows a specific Git workflow as defined in `Contributing.md`.

### Branching
- **Master branch**: `master` (Synced with `academy` remote). Do not commit directly to master.
- **Feature branches**: Create branches named `moduleN-taskM` (e.g., `module2-task1`) for each task.

### Syncing with Upstream
To update the local repository with new tasks or fixes from the Academy:
1. `git checkout master`
2. `git pull academy master` (Ensure `academy` remote is configured)
3. `git push` (Update your fork)
4. `git checkout -b moduleN-taskM` (Start new task)

## Commands
Since the project dependencies (`package.json`) are not yet initialized, there are no build or test commands available.
Common operations currently involve inspecting the markup:
- `open markup/main.html`: Preview the main page design.
