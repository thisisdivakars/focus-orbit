import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario';import {expect} from 'Leaf.lspkg/Utils/common/Expect';import {FocusProfileManager} from './FocusOrbitAdaptive'
@component export class FocusOrbitPhase2InsufficientScenario extends Scenario{async run(){const p=new FocusProfileManager().calculate([]);expect(p.insufficientData&&p.sampleCount===0).toBe(true)}}
