import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario'
import {expect} from 'Leaf.lspkg/Utils/common/Expect'
import {findSceneObjectByName,sleep} from 'Leaf.lspkg/Utils/common/Utils'
import {DefaultLeafInteractor} from 'Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor'
import {findInteractableByName} from 'Leaf.lspkg/Interactors/InteractableUtils'
import {ensureWorkspace} from './FocusOrbitLeafTestUtils'

@component export class FocusOrbitSpatialBudgetScenario extends Scenario{
 async run(){await sleep(1500);await ensureWorkspace();const i=new DefaultLeafInteractor();await i.drag(findInteractableByName('Task-description')!,new vec3(1.5,0,0),650);await sleep(800);const original=findSceneObjectByName('Task-assets')!.getTransform().getLocalPosition();await i.drag(findInteractableByName('Task-assets')!,new vec3(0.5,1,0),650);await sleep(800);const returned=findSceneObjectByName('Task-assets')!.getTransform().getLocalPosition();expect(returned.distance(original)).toBeLessThan(0.6);expect(findSceneObjectByName('AttentionBudgetMessage')!.enabled).toBe(true);expect((findSceneObjectByName('Content')!.getChild(2).getComponent('Component.Text') as Text).text.includes('3 / 3')).toBe(true)}
}
