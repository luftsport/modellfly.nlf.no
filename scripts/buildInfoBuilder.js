import fs from 'fs';
import { resolvePath } from './buildTools.js';
import Package from '../package.json' with {type: 'json'};

class buildInfoBuilder {
    static build = async () => {
        console.log('[*] Saving build info to file');

        const now = new Date().toString();

        const buildInfo = {
            build: now
        };

        console.log(`[+] Writing data to build.json`);
        fs.writeFileSync(resolvePath('../src/data/build.json'), JSON.stringify(buildInfo));

        const packageVersion = Package.version;
        console.log(`[+] Writing version to version.json`);
        fs.writeFileSync(resolvePath('../public/version.json'), JSON.stringify({ version: packageVersion }));
    };
}

export default buildInfoBuilder;
