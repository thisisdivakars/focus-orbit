import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario'
import {expect} from 'Leaf.lspkg/Utils/common/Expect'
import {findSceneObjectByName,sleep} from 'Leaf.lspkg/Utils/common/Utils'
import {findInteractableByName} from 'Leaf.lspkg/Interactors/InteractableUtils'
import {createIKInteractor} from 'Leaf.lspkg/Interactors/interactor/ik/visualizer/BitmojiAvatar'
import {ensureWorkspace} from './FocusOrbitLeafTestUtils'

@component export class FocusOrbitSpatialReachabilityScenario extends Scenario{
 private ik=createIKInteractor()
 async run(){await sleep(1500);await ensureWorkspace();await this.ik.drag(findInteractableByName('Task-description')!,new vec3(18.4,0,0));await sleep(350);const task=findSceneObjectByName('Task-description')!;expect(Math.abs(task.getTransform().getLocalPosition().x)).toBeLessThan(8);await this.ik.trigger(findInteractableByName('Task-description')!);expect(findSceneObjectByName('TaskContextPanel')!.isEnabledInHierarchy).toBe(true)}
}
