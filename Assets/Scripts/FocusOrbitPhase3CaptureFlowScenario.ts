import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario'
import {expect} from 'Leaf.lspkg/Utils/common/Expect'
import {findSceneObject,findSceneObjectByName,sleep} from 'Leaf.lspkg/Utils/common/Utils'
import {tap} from './FocusOrbitLeafTestUtils'
import {FocusOrbitMain} from './FocusOrbitMain'
import {FocusOrbitWorkspaceUI} from './FocusOrbitWorkspaceUI'

@component
export class FocusOrbitPhase3CaptureFlowScenario extends Scenario {
  async run(){
    await sleep(1500)
    await tap('Action-CAPTURE');await tap('Action-30 MIN');await tap('Action-ADD');await sleep(3000)
    expect(findSceneObjectByName('FocusCapturePanel')!.isEnabledInHierarchy).toBe(false)
    let task=findSceneObject(o=>o.name.indexOf('Task-captured-')===0?o:undefined)
    expect(task).not.toBeNull();await tap(task!.name)
    expect(findSceneObjectByName('TaskContextPanel')!.isEnabledInHierarchy).toBe(true)
    await tap('Action-NEXT');await tap('Action-×')
    const main=findSceneObjectByName('FocusOrbit')!.getComponent(FocusOrbitMain.getTypeName()) as FocusOrbitMain
    const before=main.getTaskCountForTest()
    await tap('Action-PROFILE');await tap('Action-Clear all tasks')
    expect(findSceneObjectByName('ClearAllTasksConfirmation')!.isEnabledInHierarchy).toBe(true)
    await tap('Action-CANCEL')
    expect(main.getTaskCountForTest()).toBe(before)
    expect(findSceneObjectByName('FocusProfilePanel')!.isEnabledInHierarchy).toBe(true)
    await tap('Action-Clear all tasks');await tap('Action-CLEAR ALL')
    expect(main.getTaskCountForTest()).toBe(0);expect(main.getFocusCountForTest()).toBe(0)
    expect(findSceneObject(o=>o.name.indexOf('Task-')===0?o:undefined)).toBeNull()
    await tap('Action-PLAN')
    expect(findSceneObjectByName('FocusRecommendationPanel')!.isEnabledInHierarchy).toBe(true)
    const ui=findSceneObjectByName('Focus Orbit Workspace')!.getComponent(FocusOrbitWorkspaceUI.getTypeName()) as FocusOrbitWorkspaceUI
    ui.closeOverlays();await tap('Action-CAPTURE');await tap('Action-ADD');await sleep(1500)
    task=findSceneObject(o=>o.name.indexOf('Task-captured-')===0?o:undefined)
    expect(task).not.toBeNull();expect(main.getTaskCountForTest()).toBe(1)
    await tap(task!.name);await tap('Action-FOCUS')
    expect(main.getFocusCountForTest()).toBe(1)
    expect(findSceneObjectByName('TaskContextPanel')!.isEnabledInHierarchy).toBe(true)
  }
}
