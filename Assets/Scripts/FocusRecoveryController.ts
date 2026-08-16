export type RecoveryDecision={meaningful:boolean;strong:boolean;activeFocusMs:number;recentAccumulatedFocusMs:number}
export class FocusRecoveryController {
  static readonly MEANINGFUL_SESSION_MS=600000
  static readonly STRONG_AFTER_SESSIONS=2
  static readonly BREAK_DURATION_MS=120000
  consecutiveMeaningfulFocusSessions=0;lastBreakTakenAtMs=0;breaksTaken=0;breaksSkipped=0;currentBreakDurationMs=0;recentAccumulatedFocusMs=0
  private breakRemainingMs=0
  recordCompleted(activeFocusMs:number):RecoveryDecision{const meaningful=activeFocusMs>=FocusRecoveryController.MEANINGFUL_SESSION_MS;if(meaningful){this.consecutiveMeaningfulFocusSessions++;this.recentAccumulatedFocusMs+=activeFocusMs}else this.consecutiveMeaningfulFocusSessions=0;return{meaningful,strong:meaningful&&this.consecutiveMeaningfulFocusSessions>=FocusRecoveryController.STRONG_AFTER_SESSIONS,activeFocusMs,recentAccumulatedFocusMs:this.recentAccumulatedFocusMs}}
  skip(){this.breaksSkipped++}
  startBreak(nowMs:number){this.breaksTaken++;this.lastBreakTakenAtMs=nowMs;this.currentBreakDurationMs=FocusRecoveryController.BREAK_DURATION_MS;this.breakRemainingMs=this.currentBreakDurationMs}
  tick(deltaMs:number){this.breakRemainingMs=Math.max(0,this.breakRemainingMs-deltaMs);return this.breakRemainingMs}
  endBreak(){this.breakRemainingMs=0;this.consecutiveMeaningfulFocusSessions=0;this.recentAccumulatedFocusMs=0}
  get remainingMs(){return this.breakRemainingMs}
}
