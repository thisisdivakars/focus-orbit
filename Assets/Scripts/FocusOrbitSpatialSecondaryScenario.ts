import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario'
import {expect} from 'Leaf.lspkg/Utils/common/Expect'
import {findSceneObjectByName,sleep} from 'Leaf.lspkg/Utils/common/Utils'
import {DefaultLeafInteractor} from 'Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor'
import {findInteractableByName} from 'Leaf.lspkg/Interactors/InteractableUtils'
import {ensureWorkspace} from './FocusOrbitLeafTestUtils'

@component export class FocusOrbitSpatialSecondaryScenario extends Scenario{
 async run(){await sleep(1500);await ensureWorkspace();const i=new DefaultLeafInteractor();await i.drag(findInteractableByName('Task-description')!,new vec3(4,0,0),650);await sleep(800);expect(findSceneObjectByName('Task-description')!.getTransform().getLocalPosition().x).toBeGreaterThan(9);await i.drag(findInteractableByName('Task-description')!,new vec3(-4,0,0),650);await sleep(800);expect(findSceneObjectByName('Task-description')!.getTransform().getLocalPosition().x).toBeLessThan(-9);await i.drag(findInteractableByName('Task-description')!,new vec3(1.3,-1,0),650);await sleep(800);expect(findSceneObjectByName('Task-description')!.getTransform().getLocalPosition().y).toBeLessThan(-4);await i.drag(findInteractableByName('Task-prototype')!,new vec3(-4,0,0),650);await sleep(800);expect(findSceneObjectByName('Task-prototype')!.getTransform().getLocalPosition().x).toBeLessThan(-9);await i.drag(findInteractableByName('Task-prototype')!,new vec3(4,0,0),650);await sleep(800);expect(findSceneObjectByName('Task-prototype')!.getTransform().getLocalPosition().x).toBeGreaterThan(9);await i.drag(findInteractableByName('Task-prototype')!,new vec3(-1.5,0,0),650);await sleep(800);expect(Math.abs(findSceneObjectByName('Task-prototype')!.getTransform().getLocalPosition().x)).toBeLessThan(8)}
}
