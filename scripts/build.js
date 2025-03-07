import buildInfoBuilder from './buildInfoBuilder.js';
import checklistBuilder from './checklistBuilder.js';

const build = async () => {
    console.info('[*] Starting data build process');

    await checklistBuilder.build();
    await buildInfoBuilder.build();

    console.info('[*] Data build process completed');
};

build();
