import { createLearner } from './learner';
import { createInfo } from './info';

const run = async () => {
    await createLearner(10);
    await createInfo(20);
};
run();
