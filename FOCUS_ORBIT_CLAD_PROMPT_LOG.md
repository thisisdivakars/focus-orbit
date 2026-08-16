# FOCUS ORBIT — CLAD PROMPT LOG & AI-ASSISTED WORKFLOW

**Project:** FOCUS ORBIT  
**Hackathon:** CLAD Summer Hackathon — Week 1: Organize  
**Platform:** Snapchat Spectacles / SPECS  
**Tagline:** *Put what matters within reach.*

---

## Purpose of this document

This is the submission-facing CLAD prompt log for FOCUS ORBIT.

It is intentionally **not** a raw terminal dump. The original development archive contains hundreds of pages of duplicated prompts, command output, tool approvals, LEAF logs, and intermediate reports.

For submission, this document keeps the material that demonstrates how CLAD was actually used:

- the major prompts that materially changed the product,
- the implementation outcome,
- what was tested in Lens Studio Preview / LEAF,
- what failed,
- what CLAD corrected,
- and how the project evolved into the final submission candidate.

Small follow-ups such as “continue”, duplicate prompt copies, raw PowerShell output, tool-approval boilerplate, and repetitive console noise are omitted.

---

# 1. Project Idea

FOCUS ORBIT is a spatial productivity system for Spectacles.

The central idea is simple:

> **A user can have many tasks, but only three can occupy their current attention space.**

That limit is called the **Attention Budget**.

The workspace uses spatial position as information:

- **INBOX** — captured but not yet organized
- **NEXT** — upcoming
- **FOCUS** — active priorities, maximum 3
- **WAITING / LATER** — deferred or blocked
- **DONE** — completed

The core experience became:

```text
CAPTURE
→ ORGANIZE
→ CHOOSE UP TO 3
→ PLAN
→ FOCUS
→ COMPLETE / DEFER
→ LEARN
→ ADAPT
```

---

# 2. How CLAD Was Used

CLAD was used throughout the Lens Studio workflow rather than only to generate code.

The development process repeatedly used CLAD for:

- Lens Studio scene inspection
- SPECS target / Preview verification
- TypeScript architecture
- UIKit layout
- SIK interaction
- task-state logic
- Focus Session logic
- audio/SFX
- Material Symbol icon selection
- typography and UI hierarchy
- onboarding
- direct spatial manipulation
- runtime inspection
- LEAF scenario authoring
- LEAF regression testing
- debugging
- visual review
- performance-aware refinement

The recurring workflow was:

```text
PROMPT
→ INSPECT EXISTING BUILD
→ IMPLEMENT
→ RECOMPILE
→ OPEN PREVIEW
→ TEST
→ FIND A PROBLEM
→ FIX THE PROBLEM
→ RETEST
→ POLISH
```

A recurring instruction was:

> **Do not stop at compile success. Inspect actual Preview behavior.**

---

# 3. Major Prompt Log

## P001 — Build the Core FOCUS ORBIT Experience

### Prompt

> Using SPECS Experience Builder, build a production-quality Spectacles spatial productivity application called **FOCUS ORBIT** for the CLAD Summer Hackathon Week 1 theme: **Organisation**.
>
> The weekly challenge is:
>
> **“Build a spatial experience that helps people organise, plan, or be more productive.”**
>
> Do not build this as a conventional floating to-do list.
>
> The key product idea is:
>
> **The user may have many tasks, but only three tasks may occupy their current attention space.**
>
> This limitation is called the **Attention Budget**.
>
> The application should turn task management into an intentional spatial system in which position communicates state and priorities become physically organized around the user.
>
> Tagline:
>
> **FOCUS ORBIT — Put what matters within reach.**

The prompt also established:

- Focus Core
- exactly 3 Focus positions
- Inbox / Next / Focus / Waiting / Later / Done
- Focus Session
- Pause / Complete
- restrained completion feedback
- real-world visibility
- modular TypeScript
- SIK/native interaction
- lightweight audio/VFX
- no cloud, login, external AI API, calendar, email, or forced voice dependency

### CLAD Result

CLAD created the initial task model, workspace, Focus Core, task cards, state transitions, Focus Session, audio feedback, and LEAF test structure.

### Validation / Iteration

Preview verified that tasks could enter Focus, the third task was accepted, and the fourth was rejected without silently replacing an existing priority.

Early visual and interaction issues were then handled in a separate polish pass rather than being hidden.

**Status: PASS**

---

## P002 — Phase 1 UX Polish

### Prompt

> Do not stop when functionality first works.
>
> Perform at least one deliberate polish pass after runtime testing.
>
> Review:
>
> - spatial spacing
> - typography
> - hierarchy
> - animation timing
> - SFX timing
> - VFX intensity
> - task-state readability
> - Focus Mode distraction level
> - completion feel
> - Attention Budget feedback
>
> Keep polish subtle.
>
> Do not introduce new product features during the polish pass.

### CLAD Result

The workspace was reorganized into clearer spatial zones.

Changes included:

- shallow three-position Focus arc
- live `FOCUS n / 3`
- dedicated Inbox area
- reduced card information density
- improved title wrapping
- stronger real-world contrast
- more spacing between cards
- removal of duplicate state labels
- removal of duplicate interaction targets from visual backplates

### Testing

All nine Phase 1 LEAF scenarios passed:

- Launch
- Enter Focus
- Attention Budget
- Open Task
- Start Focus
- Pause
- Complete
- UI Reachability
- Restart

**Status: PASS**

---

## P003 — Adaptive Planning + Focus Profile

### Prompt

> Using the existing validated FOCUS ORBIT Phase 1 implementation, build Phase 2:
> **Adaptive Planning and Focus Profile.**
>
> Do not rebuild Phase 1.
>
> Do not redesign the existing spatial workspace.
>
> Do not change the validated Attention Budget behavior.
>
> Do not introduce cloud services, external APIs, machine learning services, login, calendar integration, or voice dependency.
>
> Focus Orbit should learn lightweight productivity patterns from the user's actual Focus Sessions and use those patterns to generate understandable planning recommendations.
>
> This is not a clinical or psychological diagnosis.
>
> Use transparent deterministic calculations.
>
> Avoid fake AI scoring.
>
> Each score must be explainable from recorded behavior.

The prompt asked CLAD to track:

- active focus duration
- pauses
- completion
- deferral
- estimates vs actual duration
- task switching

And derive product-facing concepts such as:

- Focus Persistence
- Completion Reliability
- Planning Accuracy
- Switching Pattern
- Preferred Focus Window

### CLAD Result

CLAD added:

- Focus Profile
- deterministic metrics
- insufficient-data state
- Plan/recommendation engine
- recommendation confirmation
- maximum-3 safety
- Profile and Plan UIKit panels

### Important Product Rule

Recommendations could suggest priorities, but they could **never silently rearrange the Focus Orbit**.

### Testing

The expanded Phase 1 + Phase 2 test suite covered metrics, profile updates, planning accuracy, recommendation generation, recommendation confirmation, budget safety, Profile UI, and Plan UI.

**Status: PASS**

---

## P004 — Context Panel Fix

### Prompt Intent

The selected-task contextual controls had become visually mixed into the main workspace.

The instruction was to correct this without rebuilding the workspace or changing task logic.

### CLAD Result

CLAD moved task-context controls into a dedicated foreground panel so that the workspace could recede behind it.

This became the reference spatial pattern for temporary panels such as:

- Profile
- Plan
- Capture
- Focus Session

### Testing

Open Task, reachability, Attention Budget, Focus start, Pause, Complete, Profile and Plan paths passed after the correction.

**Status: PASS**

---

## P005 — Real-World Task Capture

### Prompt

> Using the existing validated FOCUS ORBIT Phase 1 + Phase 2 implementation, perform Phase 3:
> **Real-World Usability, Task Capture, Spatial Interaction Polish, and Presentation Quality.**
>
> Treat the existing project as a stable validated baseline.
>
> Do NOT rebuild the workspace.
>
> Do NOT redesign the Attention Budget.
>
> Do NOT replace the existing adaptive profile/recommendation architecture.
>
> Before creating anything new:
>
> - inspect the current scene hierarchy
> - inspect runtime Preview
> - inspect the task-state architecture
> - inspect Focus Session
> - inspect Profile
> - inspect Plan
> - inspect installed Spectacles/SPECS input packages
>
> Do not assume a speech, keyboard, dictation, or text-entry API exists.

For Capture:

> Add a lightweight CAPTURE entry point.
>
> A captured task should minimally require:
> - title
> - estimated duration
>
> Newly captured tasks should default to INBOX unless the user explicitly chooses otherwise.
>
> Do not allow CAPTURE to bypass the Attention Budget.

### CLAD Input Decision

After inspecting available capabilities:

- native `TextInputSystem` was used as the primary title-entry path
- a deterministic local quick-title fallback was retained for Preview/demo
- ASR was intentionally not added because it required network streaming

### Result

Capture supports:

- task title
- 10 / 20 / 30 minute duration
- Inbox default
- optional Next
- confirmation feedback
- full integration with Plan and Attention Budget

CLAD also generated a small capture-confirmation SFX.

### Testing

At this stage the report recorded all 25 Phase 1–3 LEAF scenarios passing, successful TypeScript compilation, and no runtime errors.

**Status: PASS**

---

## P006 — Get Started + How It Works + Help

### Prompt

> Treat the current Phase 3 build as stable.
>
> This is a surgical UX addition only.
>
> The goal is to make the product immediately understandable to a first-time Spectacles user without slowing down repeat use.
>
> Use this flow:
>
> **GET STARTED**
> ↓
> **HOW IT WORKS**
> ↓
> **WORKSPACE**

The How It Works screen was limited to exactly three concepts:

> **CAPTURE**  
> Add tasks to your Inbox.
>
> **ORGANIZE**  
> Move tasks into Focus, Next, or Later.
>
> **FOCUS**  
> Choose up to 3 priorities and start a Focus Session.

The Help action had to reopen How It Works and restore the existing workspace without changing task state.

### CLAD Result

CLAD added:

- Get Started
- How It Works
- Help
- Back behavior
- first-launch completion flag
- workspace interaction isolation behind onboarding/help

### Preview Iteration

Actual Preview inspection exposed two visual problems:

- an onboarding action clipped the panel
- Help was too close to the right interaction edge

CLAD corrected both.

### Testing

Dedicated onboarding tests passed for:

- first launch
- instructions
- workspace restoration
- Help
- Back
- interaction isolation
- reachability
- persistence

A later broad regression hit a LEAF/MCP transport stall; Lens behavior was not incorrectly labeled as a product failure.

**Status: PASS**

---

## P007 — Focus Capsule + Recovery Orbit

### Prompt

> Using the existing validated FOCUS ORBIT implementation, perform one final UX enhancement before feature freeze:
>
> 1. Replace the current Focus Session presentation with a compact floating **Focus Capsule**.
> 2. Add a lightweight post-focus **Recovery Orbit** break suggestion system.
>
> The purpose is to make Focus Orbit more useful during actual work while reducing visual clutter.
>
> Design principle:
>
> **When organizing, spatial information expands.  
> When focusing, information collapses.**
>
> Once a Focus Session starts, the application should get out of the user's way.

The Focus Capsule was instructed to show only:

- task
- remaining time / progress
- Pause / Resume
- Complete

The prompt explicitly prohibited:

- weather
- coffee-specific reminders
- external APIs
- voice dependency
- health claims
- streaks
- XP
- achievements

### Result

The workspace recedes during Focus Mode and a compact near-field Focus Capsule becomes primary.

Recovery Orbit gives a lightweight optional reset after meaningful focus sessions.

### Testing

Focus start, Pause/Resume, Complete, Recovery and workspace restoration were validated through later regressions.

**Status: PASS**

---

## P008 — Header + Focus Core + Live Attention Slots

### Prompt

> Perform a focused visual/UX polish pass on the top header, navigation controls, tagline alignment, and Focus Core/orbit indicator.
>
> This is a surgical UI polish pass only.
>
> Treat all current application logic as stable.

The requested hierarchy was:

```text
FOCUS ORBIT
↓
short product tagline
↓
Attention Budget status
↓
primary actions
↓
secondary actions
↓
task workspace
```

The prompt also required the decorative orbit to become functional:

> Use:
> - one central Focus Core
> - exactly three orbit/slot indicators
> - filled/active state for occupied Focus slots
> - unfilled/subtle state for available slots
>
> The Focus slot indicator must read directly from the existing authoritative Focus task state.
>
> Do not create a second Attention Budget counter.

### Result

The Focus Core and three slots became a live visual representation of Focus occupancy.

**Status: PASS**

---

## P009 — Transparent Spectacles UI Restyle

### Prompt

> Using the current validated FOCUS ORBIT build, perform a **visual restyle only** of the main workspace and related workspace panels.
>
> This is a UI/visual design translation, not a product rebuild.
>
> Use the mockup as reference for:
> - structure
> - icon usage
> - information hierarchy
> - card organization
> - section naming
> - polish level
>
> But do NOT recreate the mockup literally as a flat glowing dark dashboard.
>
> Instead, reinterpret it for Spectacles with:
> - transparent or semi-transparent UI surfaces
> - light glass-like panels
> - subtle borders
> - real-world visibility preserved
> - minimal color usage
> - only small accent colors where meaning is useful
>
> The interface should feel like a **premium spatial productivity system**, not a desktop screen pasted into AR.

### Important Iteration

A temporary section-backplate attempt produced a generated collider that obstructed interaction.

CLAD removed the problematic surface instead of compromising the interaction model.

### Result

The workspace became lighter, more transparent, and more spatial while retaining the established product hierarchy.

**Status: PASS**

---

## P010 — Direct Spatial Task Manipulation

### Prompt Intent

The next major step was to make task prioritization genuinely spatial.

The target interaction became:

```text
GRAB
→ MOVE
→ DESTINATION PREVIEW
→ RELEASE
→ SNAP
```

The direct manipulation system had to:

- use SIK
- translate only
- avoid physics
- avoid free rotation
- avoid unrestricted room placement
- preserve task-context fallback
- use the authoritative task-state model
- preserve Attention Budget enforcement

Destination meaning:

- center / upper → Focus
- left → Next
- right → Waiting / Later
- lower → Inbox

### Result

CLAD added a dedicated spatial manipulation controller.

Users could physically drag tasks among the spatial zones.

Dragging toward Focus previews the next available Focus slot.

If Focus is full, the existing fourth-task rejection path is used.

### Testing

Supported SIK paths later passed for:

- Next → Focus
- Focus → Next
- Next → Waiting/Later
- Waiting/Later → Focus
- additional secondary-zone movement

**Status: PASS**

---

## P011 — Spatial Drag Visual Polish

### Prompt Intent

Make the grab interaction visibly understandable in a short hackathon video.

### CLAD Result

The final drag treatment recorded in the development report included:

**Held task**
- 107% scale
- stronger contrast
- accent edge
- 0.45 cm forward lift

**Focus task**
- 106% scale
- slightly wider
- full opacity
- stronger text contrast
- thin cool top accent

**Focus slots**
- available: scale 0.78
- occupied: scale 1.08
- preview: scale 1.40

The header was also compressed to give the workspace more breathing room.

### Validation

Preview states were inspected for:

- normal workspace
- held card
- Focus destination preview
- successful Focus snap
- full 3/3
- fourth-task rejection

The report concluded that the drag state was legible in a paused frame and that Focus cards were identifiable even before reading the section heading.

**Status: PASS**

---

## P012 — Submission Blocker Triage

### Prompt

> Do NOT perform another general QA pass.
>
> Do NOT redesign visuals.
>
> Do NOT add features.
>
> Do NOT refactor stable architecture.
>
> This pass has one purpose:
>
> **Resolve or conclusively classify the remaining submission blockers, then retry freeze.**
>
> For every remaining failure classify it as exactly one of:
>
> A. PRODUCT BUG  
> B. TEST BUG  
> C. TOOL/PREVIEW LIMITATION  
> D. UNRESOLVED
>
> Do not modify product code for B or C.
>
> Only modify product code for a reproducible A.

### Why This Prompt Mattered

The final QA had exposed:

- a fourth-task restoration position mismatch
- generic Preview collider obstruction
- stale Help selector
- stale Start Focus selector
- onboarding selector timing issues

### CLAD Result

CLAD found that the fourth-task issue contained a real post-release transform overwrite and fixed it with a small deferred home-position restoration.

The remaining issues were classified correctly:

- generic Preview targeting obstruction → tool limitation
- Help lookup → stale test selector
- Start Focus undefined lookup → test bug
- onboarding selectors → test bug

### Validation

After fixes:

- fourth-task spatial-budget scenario passed
- supported SIK drag worked
- Help worked
- onboarding worked
- Focus Capsule / Pause / Resume / Complete / Recovery worked
- targeted LEAF retry had no remaining product/test failures

**Status: PASS**

---

## P013 — Section Backgrounds + Navigation Icons

### Prompt

> This is a targeted visual polish pass only.
>
> This pass has exactly TWO goals:
>
> 1. Add two clean translucent grouping backgrounds.
> 2. Replace prototype-style bracket glyph navigation with a consistent polished icon system.
>
> Do not make unrelated changes.

The two groups were:

1. Header / action panel
2. Task workspace panel

The prompt required both panels to be **visual only** and explicitly warned against generated colliders interfering with hand interaction.

Navigation icons were requested for:

- Capture → Add
- Plan → Checklist
- Profile → Person
- Help → Help-circle

CLAD was instructed to prefer existing Lens Studio/UIKit resources and a consistent icon family.

### Result

CLAD used:

- neutral translucent BackPlates
- Material Symbols / local icon textures
- consistent icon sizing
- unchanged button hit targets
- static background surfaces
- no new update loop

The decorative panel collider / Interactable / InteractionPlane components were removed after initialization.

### Validation

Passed:

- spatial drag
- Capture
- Plan
- Profile
- Help
- Attention Budget
- fourth-task rejection
- TypeScript
- runtime

A small later micro-fix introduced a clean visible gap between the two surfaces.

**Status: PASS**

---

## P014 — Final Onboarding + Typography + UI/UX Polish

### Prompt

> We are at the final visual-polish stage of FOCUS ORBIT.
>
> This pass has exactly three visual goals:
>
> 1. Redesign/polish GET STARTED so the first impression feels premium and spatial.
> 2. Redesign/polish HOW IT WORKS so onboarding is extremely clear and visually consistent.
> 3. Create one professional typography/UI system and apply it consistently to onboarding + the main Home/workspace.
>
> IMPORTANT:
>
> Use Lens Studio's actual UI/UX capabilities and installed CLAD skills wherever they improve quality.
>
> Do not limit yourself to basic text-position changes in TypeScript.

The prompt specifically encouraged appropriate use of:

- UIKit
- Flex
- BackPlates
- font/style controls
- Material Symbols
- tweening
- interaction states
- spatial depth
- opacity
- layout hierarchy
- Preview inspection

### Result

CLAD reported use of:

- UIKit BackPlates
- Flex layout
- native text styling
- Material Symbols
- short self-disabling reveal tweens
- existing interaction states
- spatial depth

Get Started and How It Works were visually unified with Home.

A consistent typography hierarchy was established for:

- product title
- major headings
- zone labels
- task titles
- buttons
- body copy
- metadata

The onboarding reveal was approximately 520 ms and non-looping.

### Validation

Passed:

- Get Started UX
- How It Works UX
- typography
- Home UI polish
- onboarding
- Help
- Capture / Plan / Profile
- spatial drag
- Attention Budget
- TypeScript
- runtime

**Visual Design Freeze: PASS**

---

## P015 — Clear All Tasks

### Prompt

> This is the final functional addition before submission freeze.
>
> Do NOT redesign the UI.
>
> Implement exactly one utility:
>
> **CLEAR ALL TASKS**
>
> Never clear tasks immediately from the first click.
>
> Selecting Clear all tasks must open a confirmation surface.
>
> CLEAR ALL TASKS should remove current tasks, but it must NOT erase:
> - onboarding completion
> - Profile/adaptive history
> - Focus metrics
> - planning history
> - preferences
> - app configuration
>
> This is:
>
> **CLEAR ALL TASKS**
>
> not:
>
> **RESET FOCUS ORBIT**

The prompt also required:

- block clearing during an active Focus Session
- reset Focus to 0 / 3 from authoritative state
- remove task interaction references
- clear recommendation IDs
- allow Capture to work immediately afterward
- verify drag into Focus after clearing

### CLAD Result

`clearAllTasks()` was added to the authoritative model.

The utility was placed at the bottom of Profile and required confirmation.

It preserved Profile/adaptive history.

### Validation

Passed:

- Cancel
- Confirm
- task data cleanup
- Focus 0/3 reset
- Capture after clear
- drag after clear
- active-session safety
- Profile
- Plan
- Attention Budget
- Start Focus
- Pause
- Complete
- onboarding
- Help

Final reported status:

```text
CLEAR ALL TASKS: PASS
DATA CLEANUP: PASS
INTERACTION REGRESSION: PASS
FUNCTIONAL FREEZE: PASS

SUBMISSION CANDIDATE: YES
APPLICATION FEATURES: FROZEN
```

**Status: PASS**

---

# 4. Final Product Validation

At final functional freeze, the core submission path was working:

```text
GET STARTED
→ HOW IT WORKS
→ WORKSPACE
→ CAPTURE
→ ORGANIZE
→ DRAG TASK INTO FOCUS
→ SLOT PREVIEW
→ SNAP
→ FILL 3 / 3
→ ATTEMPT FOURTH TASK
→ REJECTION
→ START FOCUS
→ FOCUS CAPSULE
→ PAUSE / RESUME
→ COMPLETE
→ RECOVERY
→ PROFILE / PLAN
```

The final build also included **Clear All Tasks** as a reset utility.

---

# 5. What CLAD Actually Contributed

The project demonstrates CLAD across more than one category.

### Product architecture
CLAD helped establish and extend the modular task/state/session architecture.

### Spatial interaction
CLAD moved the product from button-driven state changes to direct grab → move → preview → snap manipulation.

### Lens Studio UI
CLAD used UIKit, BackPlates, Flex, typography, iconography, depth, interaction states, and short tweens.

### Audio
CLAD generated or integrated lightweight productivity-oriented feedback, including Capture confirmation.

### Testing
CLAD authored and ran LEAF scenarios for the core product, adaptive layer, Capture, onboarding, spatial interaction, and regressions.

### Debugging
CLAD identified and fixed issues such as:

- duplicate interaction targets
- panel overlap
- onboarding clipping
- Help reachability
- generated collider obstruction
- fourth-task post-release restoration
- stale LEAF selectors
- test coordinate assumptions

### QA discipline
Tool failures were separated from product failures. Working Lens behavior was not changed just to satisfy stale or flaky test infrastructure.

### Performance
The build remained event-driven and avoided:

- one UpdateEvent per task
- physics simulation
- heavy shaders
- dense particles
- continuous analytics
- unnecessary network dependencies

---

# 6. Known Tool / Preview Limitations

The final workflow documented a few tooling limitations:

- most validation was performed in Lens Studio Spectacles Preview rather than physical Spectacles
- generic Preview synthetic targeting could report a collider obstruction even while supported SIK interaction worked
- some LEAF/MCP calls experienced transport delays/timeouts
- a small number of older LEAF selectors/assertions became stale as the UI evolved

These were explicitly distinguished from Lens runtime/product failures.

---

# 7. Final Status

The final project report recorded:

```text
VISUAL DESIGN FREEZE: PASS

CLEAR ALL TASKS: PASS
DATA CLEANUP: PASS
INTERACTION REGRESSION: PASS
FUNCTIONAL FREEZE: PASS

SUBMISSION CANDIDATE: YES
APPLICATION FEATURES: FROZEN
```

A submission-candidate project backup was also created before moving to presentation/submission work.

---

# 8. Submission Note

This document is a curated CLAD prompt log.

It preserves the prompts and AI-assisted workflow that materially shaped the submitted product while intentionally removing:

- duplicated prompts
- raw terminal noise
- repeated tool-approval text
- redundant logs
- low-value conversational fragments

The complete raw development archive is retained separately.

For judging, this document is intended to show **how the product evolved through CLAD-assisted prompting, implementation, Preview inspection, testing, debugging, correction, and polish**.
