import {InteractableManipulation} from 'SpectaclesInteractionKit.lspkg/Components/Interaction/InteractableManipulation/InteractableManipulation'
import {Button} from 'SpectaclesUIKit.lspkg/Scripts/Components/Button/Button'
import {TaskState} from './FocusOrbitModel'

export interface SpatialTaskManipulationHost {
  getSpatialFocusCount():number
  beginSpatialTaskDrag(taskId:string):void
  endSpatialTaskDrag(taskId:string):void
  previewSpatialDestination(destination:TaskState|null,focusAvailable:boolean):void
  requestSpatialTaskDrop(taskId:string,destination:TaskState,releasePosition:vec3):void
  returnSpatialTaskToHome(root:SceneObject,home:vec3):void
}

type DragCard={id:string;state:TaskState;root:SceneObject;button:Button;home:vec3;start:vec3;manipulation:InteractableManipulation;moved:boolean}

/** One shared, event-driven manipulation coordinator. Idle cards have no UpdateEvent. */
export class SpatialTaskManipulationController {
  private cards:Record<string,DragCard>={}
  private active:DragCard|null=null
  private suppressTapId:string|null=null
  private suppressTapUntil=0
  private readonly dragThresholdCm=2.5

  constructor(private host:SpatialTaskManipulationHost){}

  clearCards(){if(this.active)this.host.endSpatialTaskDrag(this.active.id);this.active=null;this.cards={};this.host.previewSpatialDestination(null,true)}

  registerCard(id:string,state:TaskState,root:SceneObject,button:Button,home:vec3){
    const manipulation=root.createComponent(InteractableManipulation.getTypeName()) as InteractableManipulation
    manipulation.setCanTranslate(true);manipulation.setCanRotate(false);manipulation.setCanScale(false);manipulation.enableStretchZ=false
    const stableHome=new vec3(home.x,home.y,home.z);const card:DragCard={id,state,root,button,home:stableHome,start:new vec3(stableHome.x,stableHome.y,stableHome.z),manipulation,moved:false};this.cards[id]=card
    manipulation.onManipulationStart.add(()=>this.onStart(card))
    manipulation.onManipulationUpdate.add(()=>this.onUpdate(card))
    manipulation.onManipulationEnd.add(()=>this.onEnd(card))
  }
  updateCardState(id:string,state:TaskState,home:vec3){const card=this.cards[id];if(card){card.state=state;card.home=new vec3(home.x,home.y,home.z)}}

  shouldSuppressTap(id:string){return this.suppressTapId===id&&getTime()<this.suppressTapUntil}

  rejectActive(taskId:string){
    const card=this.cards[taskId];if(!card)return
    card.root.getTransform().setLocalScale(this.restScale(card.state));this.host.endSpatialTaskDrag(card.id);this.host.returnSpatialTaskToHome(card.root,card.home);this.active=null;this.host.previewSpatialDestination(null,true)
  }

  private onStart(card:DragCard){
    if(this.active&&this.active!==card){card.root.getTransform().setLocalPosition(card.home);return}
    this.active=card;const current=card.root.getTransform().getLocalPosition();card.start=new vec3(current.x,current.y,current.z);card.moved=false
    const held=this.restScale(card.state).uniformScale(1.07);card.root.getTransform().setLocalScale(held)
    const lifted=card.root.getTransform().getLocalPosition();card.root.getTransform().setLocalPosition(new vec3(lifted.x,lifted.y,Math.min(3,lifted.z+0.45)))
    this.host.beginSpatialTaskDrag(card.id)
  }

  private onUpdate(card:DragCard){
    if(this.active!==card)return
    const tr=card.root.getTransform();const raw=tr.getLocalPosition()
    const p=new vec3(Math.max(-20.5,Math.min(20.5,raw.x)),Math.max(-8.4,Math.min(4.2,raw.y)),Math.max(card.home.z+0.45,Math.min(3,raw.z)))
    tr.setLocalPosition(p);if(p.distance(card.start)>this.dragThresholdCm)card.moved=true
    const destination=this.destinationFor(p);const focusAvailable=card.state===TaskState.Focus||this.host.getSpatialFocusCount()<3
    this.host.previewSpatialDestination(destination,focusAvailable)
  }

  private onEnd(card:DragCard){
    if(this.active!==card)return
    card.root.getTransform().setLocalScale(this.restScale(card.state));this.host.endSpatialTaskDrag(card.id)
    if(!card.moved){this.host.returnSpatialTaskToHome(card.root,card.home);this.active=null;this.host.previewSpatialDestination(null,true);return}
    this.suppressTapId=card.id;this.suppressTapUntil=getTime()+0.35
    const position=card.root.getTransform().getLocalPosition();const destination=this.destinationFor(position)
    this.host.requestSpatialTaskDrop(card.id,destination,position)
    this.active=null
  }

  private destinationFor(p:vec3):TaskState{
    if(p.y<=-4.6)return TaskState.Inbox
    if(p.x<=-9)return TaskState.Next
    if(p.x>=9)return TaskState.Waiting
    return TaskState.Focus
  }

  private restScale(state:TaskState){const s=state===TaskState.Focus?1.06:1;return new vec3(s,s,s)}

}
