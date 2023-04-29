import { createLearner } from './learner';
import { createInfo } from './info';
import { createPoint } from './point';

const run = async () => {
    await createLearner(10);
    await createInfo(20);
    await createPoint(20);
};
run();
