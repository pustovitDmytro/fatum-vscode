/* eslint-disable promise/prefer-await-to-callbacks */
import path from 'path';
import Mocha from 'mocha';
import { glob } from 'glob';

export async function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui    : 'tdd',
        color : true
    });

    const testsRoot = path.resolve(__dirname, '..');

    const files = await glob('**/**.test.js', { cwd: testsRoot });

    console.log('files:', files);

    return new Promise((c, e) => {
        // Add files to the test suite
        files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

        try {
            // Run the mocha test
            mocha.run(failures => {
                if (failures > 0) {
                    e(new Error(`${failures} tests failed.`));
                } else {
                    c();
                }
            });
        } catch (error) {
            console.error(error);
            e(error);
        }
    });
}
