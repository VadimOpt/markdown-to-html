const { parseMarkdownToHTML, parseMarkdownToANSI } = require('../src/app');

// Simple assert function
const assert = (condition, message) => {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
};

// Function to clean up extra tags for testing purposes
const cleanHTML = (html) => {
    return html.replace(/<\/?p>/g, '').trim();
};

// Test for HTML conversion
const testHTMLConversion = () => {
    const input = '**bold**';
    const expectedOutput = '<b>bold</b>';
    const output = cleanHTML(parseMarkdownToHTML(input));
    assert(output === expectedOutput, `Expected "${expectedOutput}", but got "${output}"`);
    console.log("HTML conversion test passed.");
};

const testItalicConversion = () => {
    const input = '_italic_';
    const expectedOutput = '<i>italic</i>';
    const output = cleanHTML(parseMarkdownToHTML(input));
    assert(output === expectedOutput, `Expected "${expectedOutput}", but got "${output}"`);
    console.log("Italic conversion test passed.");
};

const testPreformattedConversion = () => {
    const input = '```\npreformatted\n```';
    const expectedOutput = '<pre>preformatted\n</pre>';
    const output = cleanHTML(parseMarkdownToHTML(input));
    assert(output === expectedOutput, `Expected "${expectedOutput}", but got "${output}"`);
    console.log("Preformatted conversion test passed.");
};

// Test for ANSI conversion
const testANSIConversion = () => {
    const input = '**bold**';
    const expectedOutput = '\x1b[1mbold\x1b[0m';
    const output = parseMarkdownToANSI(input);
    assert(output === expectedOutput, `Expected "${expectedOutput}", but got "${output}"`);
    console.log("ANSI conversion test passed.");
};

const testItalicANSIConversion = () => {
    const input = '_italic_';
    const expectedOutput = '\x1b[3mitalic\x1b[0m';
    const output = parseMarkdownToANSI(input);
    assert(output === expectedOutput, `Expected "${expectedOutput}", but got "${output}"`);
    console.log("Italic ANSI conversion test passed.");
};

const testPreformattedANSIConversion = () => {
    const input = '```\npreformatted\n```';
    const expectedOutput = '\x1b[7mpreformatted\n\x1b[0m';
    const output = parseMarkdownToANSI(input);
    assert(output === expectedOutput, `Expected "${expectedOutput}", but got "${output}"`);
    console.log("Preformatted ANSI conversion test passed.");
};

// Run tests
try {
    testHTMLConversion();
    testItalicConversion();
    testPreformattedConversion();
    testANSIConversion();
    testItalicANSIConversion();
    testPreformattedANSIConversion();
    console.log("All tests passed.");
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
