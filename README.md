# Markdown to HTML Converter

## Description
This is a simple console application that converts a subset of Markdown to HTML. It supports bold, italic, monospaced, and preformatted text, as well as paragraph separation.

## Build and Run
1. Clone the repository.
2. Ensure Node.js is installed.
3. Run the application:
    - To output to stdout:
      ```sh
      node src/app.js /path/to/markdown/file.md
      ```
    - To output to a file:
      ```sh
      node src/app.js /path/to/markdown/file.md --out /path/to/output/file.html
      ```

## Usage
- The application reads a Markdown file and converts it to HTML.
- If the Markdown is invalid, an error is printed to stderr.

## Revert Commit
- The repository contains a revert commit that demonstrates the rollback of changes. Check the commit history for details.
