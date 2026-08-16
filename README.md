# FOCUS ORBIT

**Put what matters within reach.**

FOCUS ORBIT is a spatial productivity experience for **Snapchat Spectacles** built for the **CLAD Summer Hackathon — Week 1: Organize**.

Instead of showing users an endless task list, FOCUS ORBIT turns attention into a limited spatial resource. Users can capture many tasks, but only **three priorities** can enter the Focus Orbit at a time.

> **Your attention budget is 3.**

---

## Why FOCUS ORBIT?

Most productivity tools are good at capturing tasks, but they often make every task feel equally important.

FOCUS ORBIT is designed around a different question:

> **What deserves my attention right now?**

The experience uses spatial organization to help users separate work into:

- **Inbox** — captured but not yet organized
- **Next** — upcoming work
- **Focus** — current priorities
- **Waiting / Later** — deferred or blocked work
- **Done** — completed work

The user can physically grab tasks and move them through the workspace.

Moving a task toward the **Focus Core** makes prioritization a spatial action instead of a menu action.

---

## Core Mechanic — Attention Budget

FOCUS ORBIT allows a maximum of **3 active Focus tasks**.

The Focus Core shows three live slots:

```text
0 / 3   ○ ○ ○
1 / 3   ● ○ ○
2 / 3   ● ● ○
3 / 3   ● ● ●
```

If the user tries to add a fourth task, the app rejects the action and asks the user to complete, defer, or replace an existing priority.

The system never silently removes a Focus task.

---

## Spatial Interaction

Tasks support direct spatial manipulation using Spectacles interaction primitives.

Users can:

- grab a task
- move it toward a destination
- see destination feedback
- release
- snap the task into its new spatial state

Current spatial meaning:

- **Center / closer** → Focus
- **Left** → Next
- **Right** → Waiting / Later
- **Lower** → Inbox

Focus cards are visually stronger and arranged around the Focus Core.

The interaction is intentionally constrained for comfort and reliability:
- translation only
- no free physics
- no arbitrary rotation
- no unrestricted room-scale placement

---

## Main User Flow

```text
Capture
  ↓
Organize
  ↓
Choose up to 3 priorities
  ↓
Plan
  ↓
Focus
  ↓
Complete / Defer
  ↓
Recover
  ↓
Learn & Adapt
```

---

## Capture

Users can quickly add a task with:

- title
- estimated duration
- Inbox placement by default
- optional Next placement
- 10 / 20 / 30 minute duration choices

The build uses native Spectacles text input where supported, with a deterministic fallback for Preview/demo reliability.

---

## Plan

FOCUS ORBIT includes a lightweight deterministic planning layer.

It uses behavior collected from Focus Sessions to generate explainable recommendations.

Signals include:

- focus duration
- completed sessions
- pauses / interruptions
- deferrals
- estimated vs actual duration
- switching behavior

Recommendations always require user confirmation.

The system does not silently reorganize the user's priorities.

---

## Focus Profile

The Profile view summarizes how the user tends to work.

Examples include:

- **Focus Persistence**
- **Planning Accuracy**
- **Switching Pattern**
- **Best Focus Window**
- **Completion Reliability**

If there is not enough history, the product reports:

> **Learning your focus pattern**

rather than presenting fabricated confidence.

---

## Focus Mode

When a user starts a Focus Session, the workspace collapses into a compact **Focus Capsule**.

The capsule contains only what is necessary:

- current task
- timer
- progress
- Pause / Resume
- Complete

> **When organizing, information expands. When focusing, information collapses.**

---

## Recovery Orbit

After a meaningful Focus Session, the capsule can transition into a lightweight Recovery state.

Recovery Orbit is intentionally minimal and optional.

It is not a health or wellness assessment.

It simply provides a short transition before the next priority.

---

## Clear All Tasks

FOCUS ORBIT includes a safe **Clear all tasks** utility inside Profile.

It:

- requires confirmation
- clears current task inventory
- resets Focus to `0 / 3`
- removes task-card and interaction references
- preserves onboarding state
- preserves Focus metrics and adaptive history

Clear All is blocked during an active Focus Session.

---

## Onboarding

The onboarding flow is intentionally short:

```text
GET STARTED
   ↓
HOW IT WORKS
   ↓
WORKSPACE
```

The user learns three concepts:

1. **Capture** — add what you need to do
2. **Organize** — move tasks through the spatial workspace
3. **Focus** — keep only three priorities in the Focus Orbit

---

## Visual Design

FOCUS ORBIT uses a restrained spatial UI system designed to keep the real world visible.

Design principles:

- translucent neutral surfaces
- minimal accent color
- clear typography hierarchy
- compact spatial grouping
- consistent Material Symbol iconography
- no heavy dashboard shell
- no cyberpunk / game HUD styling
- no unnecessary particles or effects

The Home experience is grouped into two translucent spatial surfaces:

1. **Header / action surface**
2. **Task workspace surface**

Both are visual-only and do not intercept hand interaction.

---

## Technical Architecture

The project uses modular Lens Studio TypeScript.

Main responsibilities include:

- application/state coordination
- task model and task lifecycle
- spatial layout
- Attention Budget
- spatial task manipulation
- Focus Sessions
- adaptive metrics
- planning/recommendations
- UI
- audio/feedback
- onboarding
- local persistence
- LEAF testing

Important implementation principles:

- authoritative task state lives in the task model
- spatial manipulation routes through existing state transitions
- no second task-state system
- event-driven UI updates
- no per-task idle UpdateEvent
- no physics simulation for task organization

---

## Performance

FOCUS ORBIT is intentionally lightweight for Spectacles.

The final build avoids:

- physics simulation
- expensive shaders
- realtime blur
- heavy particle systems
- idle per-task update loops
- continuous layout polling
- large decorative effects

Per-frame work is limited mainly to active spatial manipulation and short self-disabling UI animations.

---

## CLAD Workflow

FOCUS ORBIT was developed iteratively using CLAD and Lens Studio tools.

```text
Prompt
  ↓
Build
  ↓
Preview
  ↓
Test
  ↓
Inspect
  ↓
Fix
  ↓
Retest
  ↓
Polish
```

CLAD was used for more than code generation, including:

- Lens Studio scene construction
- UIKit layout
- TypeScript
- Spectacles interaction
- Material Symbol icon selection
- animation/tweening
- Preview inspection
- runtime log analysis
- LEAF scenario authoring
- regression testing
- performance-aware iteration

---

## Testing

The project includes LEAF and manual Preview coverage for:

- launch
- onboarding
- Help
- Capture
- Profile
- Plan
- task context
- spatial manipulation
- Next / Focus / Waiting-Later transitions
- Attention Budget
- fourth-task rejection
- Focus Session
- Pause / Resume
- Complete
- Recovery
- Clear All
- Capture-after-clear
- task reachability

Final submission-candidate status:

- **TypeScript:** PASS
- **Runtime:** PASS
- **Clear All Tasks:** PASS
- **Data cleanup:** PASS
- **Interaction regression:** PASS
- **Functional freeze:** PASS
- **Submission candidate:** YES

Some synthetic Preview position assertions may behave differently from supported SIK interaction because of Preview/tooling limitations. The actual supported spatial interaction path was validated independently.

---

## Research Inspiration

The adaptive planning concept was inspired in part by research on persistence, mastery motivation, and executive functions.

FOCUS ORBIT does **not** claim to be:

- a clinical assessment
- a psychological diagnostic tool
- a validated psychometric instrument

The research-inspired concepts are used only as a productivity behavior layer.

---

## Demo

**Demo video:** Coming soon

Recommended demo flow:

```text
Get Started
→ How It Works
→ Capture
→ Spatial drag into Focus
→ Slot fills
→ Reach 3 / 3
→ Attempt a fourth task
→ Attention Budget blocks it
→ Start Focus
→ Focus Capsule
→ Complete
→ Recovery Orbit
→ Brief Profile / Plan insight
```

The key interaction is:

> **Grab → Move toward Focus → Slot preview → Snap**

---

## Built With

- **Lens Studio**
- **Snapchat Spectacles / SPECS**
- **TypeScript**
- **Spectacles Interaction Kit**
- **UIKit**
- **Material Symbols**
- **CLAD**
- **LEAF testing**

---

## Hackathon

Built for the **CLAD Summer Hackathon — Week 1: Organize**.

Prompt:

> **Build a spatial experience that helps people organize, plan, or be more productive.**

---

## Current Status

**Submission Candidate — Feature Frozen**

The current build has completed functional and visual validation.

No new product features are planned before submission.

---

## Author

**Divakar Sarika**

XR / Game Developer, Full-Stack & AI Developer

---

## License

This project was created for the CLAD Summer Hackathon.

Add the final repository license here before publishing if required.
