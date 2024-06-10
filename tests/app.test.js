const { parseMarkdownToHTML, parseMarkdownToANSI } = require('../src/app');
const assert = require('assert');

describe('Markdown to HTML', () => {
    it('should convert bold text correctly', () => {
        const input = '**bold**';
        const output = parseMarkdownToHTML(input);
        assert.strictEqual(output, '<b>bold</b>');
    });

    it('should convert italic text correctly', () => {
        const input = '_italic_';
        const output = parseMarkdownToHTML(input);
        assert.strictEqual(output, '<i>italic</i>');
    });

    it('should convert monospaced text correctly', () => {
        const input = '`monospaced`';
        const output = parseMarkdownToHTML(input);
        assert.strictEqual(output, '<tt>monospaced</tt>');
    });

    it('should handle invalid bold text', () => {
        const input = '**bold';
        assert.throws(() => parseMarkdownToHTML(input), /Invalid bold formatting/);
    });

    // Additional tests for ANSI formatting
    it('should convert bold text to ANSI correctly', () => {
        const input = '**bold**';
        const output = parseMarkdownToANSI(input);
        assert.strictEqual(output, '\x1b[1mbold\x1b[0m');
    });

    it('should convert italic text to ANSI correctly', () => {
        const input = '_italic_';
        const output = parseMarkdownToANSI(input);
        assert.strictEqual(output, '\x1b[3mitalic\x1b[0m');
    });

    it('should convert monospaced text to ANSI correctly', () => {
        const input = '`monospaced`';
        const output = parseMarkdownToANSI(input);
        assert.strictEqual(output, '\x1b[7mmonospaced\x1b[0m');
    });
});