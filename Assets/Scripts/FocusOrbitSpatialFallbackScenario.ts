import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario'
import {expect} from 'Leaf.lspkg/Utils/common/Expect'
import {findSceneObjectByName,sleep} from 'Leaf.lspkg/Utils/common/Utils'
import {InteractableManipulation} from 'SpectaclesInteractionKit.lspkg/Components/Interaction/InteractableManipulation/InteractableManipulation'
import {ensureWorkspace,tap} from './FocusOrbitLeafTestUtils'

@component export class FocusOrbitSpatialFallbackScenario extends Scenario{
 async run(){await sleep(1500);await ensureWorkspace();const task=findSceneObjectByName('Task-description')!;expect(task.getComponent(InteractableManipulation.getTypeName())).not.toBeNull();await tap('Task-description');expect(findSceneObjectByName('TaskContextPanel')!.isEnabledInHierarchy).toBe(true);await tap('Action-FOCUS');await sleep(250);expect(Math.abs(findSceneObjectByName('Task-description')!.getTransform().getLocalPosition().x)).toBeLessThan(8)}
}
