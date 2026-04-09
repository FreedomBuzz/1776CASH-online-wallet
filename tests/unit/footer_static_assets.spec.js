import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const webpackCommonPath = resolve(process.cwd(), 'webpack.common.js');

describe('footer static assets', () => {
    it('copies the freedom buzz footer image into the built site', () => {
        const webpackCommon = readFileSync(webpackCommonPath, 'utf8');
        expect(webpackCommon).toContain("{ from: 'assets/images/footer' }");
    });
});
