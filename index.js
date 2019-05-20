'use strict';

const CodeMirror = require('codemirror');
const jsonlint = require('jsonlint-mod');

const position = CodeMirror.Pos;

CodeMirror.registerHelper('lint', 'json', (text) => {
  const found = [];

  jsonlint.parser.parseError = function (str, hash) {
    const loc = hash.loc;
    found.push({
      from: position(loc.first_line - 1, loc.first_column),
      to: position(loc.last_line - 1, loc.last_column),
      message: str
    });
  };

  try {
    jsonlint.parse(text);
  } catch (e) {
    // No error, issues populated by parseError
  }

  return found;
});
