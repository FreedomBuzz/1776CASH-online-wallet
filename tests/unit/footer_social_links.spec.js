import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const indexTemplatePath = resolve(process.cwd(), 'index.template.html');
const iconAssetPath = resolve(process.cwd(), 'assets/images/footer/freedom-buzz-icon.jpg');

describe('footer social links', () => {
    it('keeps only X and freedom buzz links in the footer', () => {
        const html = readFileSync(indexTemplatePath, 'utf8');
        expect(html).toContain('https://x.com/1776CASH');
        expect(html).toContain('https://freedom.buzz/pages/1776cash');
        expect(html).not.toContain('https://github.com/FreedomBuzz/1776CASH');
        expect(html).not.toContain('https://discord.gg/zTScGaGtgv');
        expect(html).not.toContain('https://1776cash.com" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-medium"');
    });

    it('references a dedicated local freedom buzz footer asset', () => {
        const html = readFileSync(indexTemplatePath, 'utf8');
        expect(html).toContain('src="./freedom-buzz-icon.jpg"');
        expect(existsSync(iconAssetPath)).toBe(true);
    });
});
