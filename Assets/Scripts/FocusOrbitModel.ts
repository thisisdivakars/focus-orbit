export enum TaskState { Inbox='INBOX', Focus='FOCUS', Next='NEXT', Waiting='WAITING', Later='LATER', Done='DONE' }

export type OrbitTask = {
  id: string; title: string; estimatedMinutes: number; state: TaskState;
  createdAtMs: number; focusTimeMs: number; interruptionCount: number;
  deferCount: number; priority: number;
}

export class FocusOrbitModel {
  static readonly MAX_FOCUS = 3
  private captureSequence = 0
  readonly tasks: OrbitTask[] = [
    {id:'prototype', title:'Finish hackathon prototype', estimatedMinutes:30, state:TaskState.Focus, createdAtMs:Date.now(), focusTimeMs:0, interruptionCount:0, deferCount:0, priority:5},
    {id:'video', title:'Record demo video', estimatedMinutes:20, state:TaskState.Focus, createdAtMs:Date.now(), focusTimeMs:0, interruptionCount:0, deferCount:0, priority:4},
    {id:'description', title:'Write project description', estimatedMinutes:15, state:TaskState.Next, createdAtMs:Date.now(), focusTimeMs:0, interruptionCount:0, deferCount:0, priority:4},
    {id:'assets', title:'Prepare submission assets', estimatedMinutes:20, state:TaskState.Inbox, createdAtMs:Date.now(), focusTimeMs:0, interruptionCount:0, deferCount:0, priority:3},
    {id:'performance', title:'Review performance', estimatedMinutes:10, state:TaskState.Next, createdAtMs:Date.now(), focusTimeMs:0, interruptionCount:0, deferCount:0, priority:3},
  ]
  selectedId: string | null = null
  activeId: string | null = null
  sessionRunning = false
  sessionRemainingMs = 0

  get selected(): OrbitTask | null { return this.tasks.find(t => t.id === this.selectedId) || null }
  get active(): OrbitTask | null { return this.tasks.find(t => t.id === this.activeId) || null }
  get focusCount(): number { return this.tasks.filter(t => t.state === TaskState.Focus).length }
  createTask(title:string,estimatedMinutes:number,state:TaskState=TaskState.Inbox):OrbitTask|null {
    const cleanTitle=title.trim();if(!cleanTitle)return null
    const duration=[10,20,30,45].indexOf(estimatedMinutes)>=0?estimatedMinutes:20
    const destination=state===TaskState.Next?TaskState.Next:TaskState.Inbox
    const task:OrbitTask={id:`captured-${Date.now()}-${this.captureSequence++}`,title:cleanTitle,estimatedMinutes:duration,state:destination,createdAtMs:Date.now(),focusTimeMs:0,interruptionCount:0,deferCount:0,priority:3}
    this.tasks.push(task);return task
  }
  select(id: string): OrbitTask | null { const t=this.tasks.find(x=>x.id===id&&x.state!==TaskState.Done)||null; this.selectedId=t?.id||null; return t }
  moveSelected(to: TaskState): 'ok'|'full'|'none' {
    const task=this.selected; if(!task) return 'none'
    if(to===TaskState.Focus && task.state!==TaskState.Focus && this.focusCount>=FocusOrbitModel.MAX_FOCUS) return 'full'
    if(to===TaskState.Later || to===TaskState.Waiting) task.deferCount++
    task.state=to; return 'ok'
  }
  start(): boolean { const t=this.selected; if(!t || t.state!==TaskState.Focus) return false; this.activeId=t.id; this.sessionRunning=true; this.sessionRemainingMs=t.estimatedMinutes*60000; return true }
  pause(): boolean { if(!this.active) return false; this.sessionRunning=!this.sessionRunning; if(!this.sessionRunning) this.active!.interruptionCount++; return this.sessionRunning }
  tick(dtMs:number): void { if(!this.sessionRunning||!this.active) return; this.sessionRemainingMs=Math.max(0,this.sessionRemainingMs-dtMs); this.active.focusTimeMs+=dtMs; if(this.sessionRemainingMs===0)this.sessionRunning=false }
  complete(): OrbitTask|null { const t=this.active; if(!t)return null; t.state=TaskState.Done; this.activeId=null; this.selectedId=null; this.sessionRunning=false; return t }
  exitActive(): OrbitTask|null { const t=this.active;if(!t)return null;t.state=TaskState.Later;t.deferCount++;this.activeId=null;this.selectedId=null;this.sessionRunning=false;this.sessionRemainingMs=0;return t }
  clearAllTasks(): boolean { if(this.activeId)return false;this.tasks.splice(0,this.tasks.length);this.selectedId=null;this.activeId=null;this.sessionRunning=false;this.sessionRemainingMs=0;return true }
  reset(): void { if(this.tasks.length>5)this.tasks.splice(5);this.captureSequence=0;this.tasks[0].state=TaskState.Focus; this.tasks[1].state=TaskState.Focus; this.tasks[2].state=TaskState.Next; this.tasks[3].state=TaskState.Inbox; this.tasks[4].state=TaskState.Next; for(const t of this.tasks){t.focusTimeMs=0;t.interruptionCount=0;t.deferCount=0}; this.selectedId=null;this.activeId=null;this.sessionRunning=false;this.sessionRemainingMs=0 }
}
