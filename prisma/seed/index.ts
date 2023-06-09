import { createLearner } from './learner';
import { createInfo } from './info';
import { createPoint } from './point';
import { createChunk } from './chunk';
import { createTree } from './tree';
import { createExplain } from './explain';
import { createExercise } from './exercise';
import { createExerciseSet } from './exerciseSet';
import { createDiscuss } from './discuss';

const run = async () => {
    await createLearner(10);
    await createInfo(20);
    await createPoint(20);
    await createChunk(20);
    await createTree(20);
    await createExplain(20);
    await createDiscuss(20);
    await createExercise(20);
    await createExerciseSet(20);
};
run();
