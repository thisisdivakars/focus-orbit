import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario'
import {expect} from 'Leaf.lspkg/Utils/common/Expect'
import {findSceneObjectByName,sleep} from 'Leaf.lspkg/Utils/common/Utils'
import {DefaultLeafInteractor} from 'Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor'
import {findInteractableByName} from 'Leaf.lspkg/Interactors/InteractableUtils'
import {ensureWorkspace,tap} from './FocusOrbitLeafTestUtils'

@component export class FocusOrbitSpatialFocusScenario extends Scenario{
 async run(){await sleep(1500);await ensureWorkspace();const task=findInteractableByName('Task-description')!;expect(task).not.toBeNull();await new DefaultLeafInteractor().drag(task,new vec3(1.5,0,0),650);await sleep(800);const moved=findSceneObjectByName('Task-description')!;expect(Math.abs(moved.getTransform().getLocalPosition().x)).toBeLessThan(8);const budget=findSceneObjectByName('Content')!.getChild(2).getComponent('Component.Text') as Text;expect(budget.text.includes('3 / 3')).toBe(true);await tap('Task-description');await tap('Action-START');expect(findSceneObjectByName('FocusCapsule')!.isEnabledInHierarchy).toBe(true)}
}
