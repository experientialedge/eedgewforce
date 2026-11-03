import { mysqlSchema } from '../config/mysqlSchema.js';

// Shared database contract, independent of the selected production backend.
export function schemaPatch(table, input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('An update object is required.');
  const columns = mysqlSchema[table]?.columns;
  if (!columns) throw new Error('Unknown application resource.');
  if (Object.hasOwn(input, 'id') || Object.hasOwn(input, 'company_id')) throw new Error('Record identifiers and company ownership cannot be changed.');
  const unsupported = Object.keys(input).filter(key => !Object.hasOwn(columns, key));
  if (unsupported.length) throw new Error(`Unsupported ${table} fields: ${unsupported.join(', ')}.`);
  return { ...input };
}
