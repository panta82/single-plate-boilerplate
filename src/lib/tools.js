/**
 * @return {Array<Boilerplate>}
 */
export const loadBoilerplates = () => {
  const boilerplates = [];
  const r = require.context('../boilerplates', false, /\.js$/);
  r.keys().forEach(path => {
    const boilerplate = r(path).default;
    boilerplate.id = path;
    boilerplates.push(boilerplate);
  });
  return boilerplates;
};

export function caster(Type) {
  return item => (item instanceof Type ? item : new Type(item));
}

export function functionize(val) {
  if (typeof val === 'function') {
    return val;
  }
  return () => val;
}

export function normalizeCode(code) {
  const lines = code.trim().split('\n');
  const resultLines = [];

  let prevEmpty = false;
  for (let line of lines) {
    line = line.trimRight();

    // Make empty lines at most 2 one after another
    if (!line.trim()) {
      if (prevEmpty) {
        continue;
      }
      prevEmpty = true;
    } else {
      prevEmpty = false;
    }

    resultLines.push(line);
  }

  return resultLines.join('\n');
}

/**
 * Microtemplating string expanderm uses *sh style format.
 * @example
 *   expandString("Hey $name", {name: "Jack"}); // --> Hey Jack
 *   expandString("Take \\$${amount}!", {amount: 100}); // --> Take $100!
 */
export function expandString(str, data, notFound = '') {
  if (!str) {
    return str;
  }

  if (typeof notFound !== 'function') {
    const notFoundValue = notFound;
    notFound = () => notFoundValue;
  }

  return str
    .replace(expandString.DIRECT_REGEX, directReplacer)
    .replace(expandString.CURLY_BRACE_REGEX, pathReplacer)
    .replace(expandString.ESCAPE_CLEANUP_REGEX, '$');

  function directReplacer(_, space, key) {
    var value = data[key];
    if (value === undefined) {
      value = notFound(key, data, str);
    }
    return (space || '') + value;
  }

  function pathReplacer(_, space, key) {
    var value = data[key];
    if (value === undefined) {
      value = notFound(key, data, str);
    }
    return (space || '') + value;
  }
}
expandString.DIRECT_REGEX = /([^\\]|^)\$([A-Za-z$_][A-Za-z$_0-9]*)/g;
expandString.CURLY_BRACE_REGEX = /([^\\]|^)\${([^}]+)}/g;
expandString.ESCAPE_CLEANUP_REGEX = /\\\$/g;
