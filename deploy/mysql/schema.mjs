import {mysqlSchema,mysqlCreateTable} from '../../server/src/config/mysqlSchema.js';
export {MYSQL_SCHEMA_VERSION} from '../../server/src/config/mysqlSchema.js';
export const mysqlSchemaStatements=[
  'SET FOREIGN_KEY_CHECKS=0;',
  ...Object.keys(mysqlSchema).map(mysqlCreateTable),
  'CREATE TABLE IF NOT EXISTS edgewforce_files (name VARCHAR(255) PRIMARY KEY, content_type VARCHAR(100) NOT NULL, payload MEDIUMBLOB NOT NULL, sha256 CHAR(64) NOT NULL) ENGINE=InnoDB;',
  'CREATE TABLE IF NOT EXISTS edgewforce_copy_manifest (id INT PRIMARY KEY, schema_version VARCHAR(100) NOT NULL, state VARCHAR(30) NOT NULL, expected JSON NOT NULL, captured_at VARCHAR(40) NOT NULL) ENGINE=InnoDB;',
  'SET FOREIGN_KEY_CHECKS=1;'
];
