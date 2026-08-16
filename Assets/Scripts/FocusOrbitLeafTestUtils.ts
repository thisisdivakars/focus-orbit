import {sleep} from 'Leaf.lspkg/Utils/common/Utils'
import {findInteractableByName} from 'Leaf.lspkg/Interactors/InteractableUtils'
import {DefaultLeafInteractor} from 'Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor'
function active(name:string){const i=findInteractableByName(name);return i&&i.getSceneObject().isEnabledInHierarchy?i:null}
export async function ensureWorkspace(){const interactor=new DefaultLeafInteractor();const getStarted=active('Action-GET STARTED');if(getStarted){await interactor.trigger(getStarted);await sleep(250)}const start=active('Action-ENTER WORKSPACE')||active('Action-START FOCUS ORBIT');if(start){await interactor.trigger(start);await sleep(250)}}
export async function tap(name:string){let i=active(name);if(!i&&name.indexOf('GET STARTED')<0&&name.indexOf('START FOCUS ORBIT')<0&&name.indexOf('BACK')<0){await ensureWorkspace();i=active(name)}if(!i)throw new Error('Missing enabled interactable '+name);await new DefaultLeafInteractor().trigger(i);await sleep(250)}
