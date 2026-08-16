import {OrbitTask,TaskState} from './FocusOrbitModel'

export type FocusSessionMetric={taskId:string;sessionStartTimeMs:number;sessionEndTimeMs:number;activeFocusTimeMs:number;pausedTimeMs:number;pauseCount:number;completed:boolean;deferredOrExited:boolean;estimatedMinutes:number;actualMinutes:number;switchCount:number}
export type FocusProfile={sampleCount:number;insufficientData:boolean;persistenceScore:number;completionReliability:number;planningAccuracy:number;switchingCost:number;preferredFocusMinutes:number;recommendedTaskLoad:number}

export class FocusMetricsTracker{
  readonly sessions:FocusSessionMetric[]=[]
  private current:FocusSessionMetric|null=null
  private activeSinceMs=0;private pausedSinceMs=0
  start(task:OrbitTask,now=Date.now()){
    if(this.current)this.finish(false,true,now,1)
    this.current={taskId:task.id,sessionStartTimeMs:now,sessionEndTimeMs:0,activeFocusTimeMs:0,pausedTimeMs:0,pauseCount:0,completed:false,deferredOrExited:false,estimatedMinutes:task.estimatedMinutes,actualMinutes:0,switchCount:0};this.activeSinceMs=now;this.pausedSinceMs=0
  }
  pause(now=Date.now()){if(!this.current||this.pausedSinceMs)return;this.current.activeFocusTimeMs+=Math.max(0,now-this.activeSinceMs);this.current.pauseCount++;this.pausedSinceMs=now}
  resume(now=Date.now()){if(!this.current||!this.pausedSinceMs)return;this.current.pausedTimeMs+=Math.max(0,now-this.pausedSinceMs);this.pausedSinceMs=0;this.activeSinceMs=now}
  complete(now=Date.now()){return this.finish(true,false,now,0)}
  defer(now=Date.now()){return this.finish(false,true,now,1)}
  private finish(completed:boolean,deferred:boolean,now:number,switches:number){if(!this.current)return null;if(this.pausedSinceMs)this.current.pausedTimeMs+=Math.max(0,now-this.pausedSinceMs);else this.current.activeFocusTimeMs+=Math.max(0,now-this.activeSinceMs);this.current.sessionEndTimeMs=now;this.current.completed=completed;this.current.deferredOrExited=deferred;this.current.switchCount=switches;this.current.actualMinutes=this.current.activeFocusTimeMs/60000;const result=this.current;this.sessions.push(result);this.current=null;this.activeSinceMs=0;this.pausedSinceMs=0;return result}
  get active(){return this.current}
  reset(){this.sessions.length=0;this.current=null;this.activeSinceMs=0;this.pausedSinceMs=0}
}

const clamp=(v:number,min=0,max=100)=>Math.max(min,Math.min(max,v))
const average=(values:number[])=>values.length?values.reduce((a,b)=>a+b,0)/values.length:0

export class FocusProfileManager{
  calculate(sessions:FocusSessionMetric[]):FocusProfile{
    const count=sessions.length;const completed=sessions.filter(s=>s.completed&&s.activeFocusTimeMs>0)
    const persistence=average(sessions.map(s=>clamp(s.activeFocusTimeMs/Math.max(1,s.estimatedMinutes*60000)*100)))
    const reliability=count?completed.length/count*100:0
    const accuracy=average(completed.map(s=>clamp((1-Math.abs(s.actualMinutes-s.estimatedMinutes)/Math.max(1,s.estimatedMinutes))*100)))
    const switching=count?clamp(average(sessions.map(s=>s.pauseCount+s.switchCount+(s.deferredOrExited?2:0)))/3*100):0
    const preferred=completed.length?Math.max(5,Math.round(average(completed.map(s=>s.actualMinutes))/5)*5):25
    const load=count<2?2:reliability>=75&&switching<35?3:reliability>=45?2:1
    return{sampleCount:count,insufficientData:count<2,persistenceScore:Math.round(persistence),completionReliability:Math.round(reliability),planningAccuracy:Math.round(accuracy),switchingCost:Math.round(switching),preferredFocusMinutes:preferred,recommendedTaskLoad:load}
  }
  persistenceLabel(p:FocusProfile){return p.persistenceScore>=75?'STRONG':p.persistenceScore>=45?'STEADY':'BUILDING'}
  switchingLabel(p:FocusProfile){return p.switchingCost<25?'LOW':p.switchingCost<60?'MODERATE':'FREQUENT'}
}

export class PlanningEngine{
  recommend(tasks:OrbitTask[],profile:FocusProfile):OrbitTask[]{
    const target=profile.preferredFocusMinutes||25
    return tasks.filter(t=>t.state!==TaskState.Done&&t.state!==TaskState.Waiting).slice().sort((a,b)=>this.score(b,target)-this.score(a,target)||a.createdAtMs-b.createdAtMs).slice(0,Math.min(3,profile.recommendedTaskLoad||2))
  }
  private score(t:OrbitTask,target:number){const state=t.state===TaskState.Focus?25:t.state===TaskState.Next?15:t.state===TaskState.Inbox?5:0;return t.priority*20+state+Math.max(0,30-Math.abs(t.estimatedMinutes-target))-t.deferCount*10}
  explain(profile:FocusProfile,tasks:OrbitTask[]){if(!tasks.length)return'No active tasks need planning.';if(profile.insufficientData)return'Based on priority and duration while Focus Orbit learns your pattern.';return`Matched to a ${profile.preferredFocusMinutes} min focus window and recent completion behavior.`}
}
