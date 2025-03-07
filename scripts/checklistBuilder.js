import fs from 'fs';
import { readdir } from 'fs/promises';
import path, { resolve } from 'path';
import { resolvePath } from './buildTools.js';
import YAML from 'yaml';

class checklistBuilder {
    static procedureDir = resolvePath('../data/checklists/');

    static getFiles = async (dir) => {
        const dirents = await readdir(dir, { withFileTypes: true });
        const files = await Promise.all(
            dirents.map((dirent) => {
                const res = resolve(dir, dirent.name);
                return dirent.isDirectory() ? this.getFiles(res) : res;
            })
        );
        return Array.prototype.concat(...files);
    };

    static getChecklists = async () => {
        const files = await this.getFiles(this.procedureDir);
        const checklists = [];

        files.forEach((file) => {
            const x = fs.readFileSync(file, 'utf-8');
            const parsed = YAML.parse(x);
            const fileExt = path.extname(file);
            const fileName = path.basename(file, fileExt);

            checklists.push({
                slug: fileName,
                title: parsed.title,
                icon: parsed.icon,
                description: parsed.description,
                explanation: parsed.explanation,
                fields: parsed.fields ?? [],
                checklist: parsed.checklist ?? []
            });
        });

        return checklists;
    };

    static build = async () => {
        console.log('[*] Reading raw data files and building checklist data');
        const checklists = await this.getChecklists();

        console.log(`[+] Writing ${checklists.length} checklists to checklists.json`);
        fs.writeFileSync(resolvePath('../src/data/checklists.json'), JSON.stringify(checklists, null, 2));
    };
}

export default checklistBuilder;
