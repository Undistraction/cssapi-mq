import camelcase from 'camelcase';

// eslint-disable-next-line
export const toPascalCase = name =>
  name[0].toUpperCase() + camelcase(name.slice(1));

export const prefixedCamelCase = (prefix, name) => prefix + toPascalCase(name);
