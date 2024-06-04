const fs = require('fs');
const path = require('path');

const parseMarkdown = (markdown) => {
    const lines = markdown.split('\n');
    let html = '';
    let preformatted = false;
    let stack = [];

    const error = (message) => {
        throw new Error(`Error: ${message}`);
    };

    const checkLine = (line, index) => {
        const boldMatches = line.match(/\*\*/g);
        const italicMatches = line.match(/_/g);
        const monoMatches = line.match(/`/g);

        if (boldMatches && boldMatches.length % 2 !== 0) {
            error(`Invalid bold formatting on line ${index + 1}`);
        }
        if (italicMatches && italicMatches.length % 2 !== 0) {
            error(`Invalid italic formatting on line ${index + 1}`);
        }
        if (monoMatches && monoMatches.length % 2 !== 0) {
            error(`Invalid monospaced formatting on line ${index + 1}`);
        }
    };

    lines.forEach((line, index) => {
        checkLine(line, index);

        if (preformatted) {
            if (line.trim() === '```') {
                preformatted = false;
                html += '</pre>';
                stack.pop();
            } else {
                html += line + '\n';
            }
        } else if (line.trim() === '```') {
            preformatted = true;
            html += '<pre>';
            stack.push('```');
        } else if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
            html += `<b>${line.trim().slice(2, -2)}</b>`;
        } else if (line.trim().startsWith('_') && line.trim().endsWith('_')) {
            html += `<i>${line.trim().slice(1, -1)}</i>`;
        } else if (line.trim().startsWith('`') && line.trim().endsWith('`')) {
            html += `<tt>${line.trim().slice(1, -1)}</tt>`;
        } else if (line.trim() === '') {
            html += '</p><p>';
        } else {
            if (index === 0 || lines[index - 1].trim() === '') {
                html += '<p>';
            }
            html += line + ' ';
        }
    });

    if (stack.length > 0) {
        error("Unclosed preformatted block");
    }

    if (html.endsWith('<p>')) {
        html = html.slice(0, -3);
    } else {
        html += '</p>';
    }

    return html;
};

const main = () => {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error('Usage: node app.js <input-markdown-file> [--out <output-html-file>]');
        process.exit(1);
    }

    const inputFile = args[0];
    const outputFile = args.includes('--out') ? args[args.indexOf('--out') + 1] : null;

    try {
        const markdown = fs.readFileSync(inputFile, 'utf8');
        const html = parseMarkdown(markdown);

        if (outputFile) {
            fs.writeFileSync(outputFile, html);
        } else {
            console.log(html);
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

main();// Add a comment
