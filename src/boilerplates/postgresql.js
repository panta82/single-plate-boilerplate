import { Boilerplate, FIELD_TYPES } from '../lib/types';

function generatePassword(length = 15) {
  let seed = '';
  while (seed.length < length) {
    seed += Number(
      Math.random()
        .toString()
        .slice(2)
    ).toString(36);
  }
  return seed.slice(0, length);
}

function createDatabaseCode({ superuser, database, user }) {
  return superuser
    ? `CREATE DATABASE ${database};`
    : `CREATE DATABASE ${database} OWNER ${user || database};`;
}

function createUserCode({ superuser, database, user, password }) {
  return `CREATE ROLE ${user || database} WITH LOGIN PASSWORD '${password || generatePassword()}'${
    superuser ? ' SUPERUSER' : ''
  };`;
}

function reassignOwnerCode({ database, user }) {
  return `
ALTER DATABASE ${database} OWNER TO ${user};

SELECT 'ALTER TABLE '|| schemaname || '."' || tablename ||'" OWNER TO ${user};'
FROM pg_tables WHERE NOT schemaname IN ('pg_catalog', 'information_schema')
ORDER BY schemaname, tablename;

SELECT 'ALTER SEQUENCE '|| sequence_schema || '."' || sequence_name ||'" OWNER TO my_new_owner;'
FROM information_schema.sequences WHERE NOT sequence_schema IN ('pg_catalog', 'information_schema')
ORDER BY sequence_schema, sequence_name;

SELECT 'ALTER VIEW '|| table_schema || '."' || table_name ||'" OWNER TO my_new_owner;'
FROM information_schema.views WHERE NOT table_schema IN ('pg_catalog', 'information_schema')
ORDER BY table_schema, table_name;

SELECT 'ALTER TABLE '|| oid::regclass::text ||' OWNER TO my_new_owner;'
FROM pg_class WHERE relkind = 'm'
ORDER BY oid;
`.trim();
}

function activeDBConnectionsCode() {
  return `
SELECT pid, age(query_start, clock_timestamp()), usename, query, state
FROM pg_stat_activity
WHERE query != '<IDLE>'
AND query NOT ILIKE '%pg_stat_activity%'
ORDER BY query_start desc;
`.trim();
}

function spaceUsageStatsCode() {
  return `
SELECT
  *,
  pg_size_pretty(total_bytes) AS total,
  pg_size_pretty(index_bytes) AS INDEX,
  pg_size_pretty(toast_bytes) AS toast,
  pg_size_pretty(table_bytes) AS TABLE
FROM (
  SELECT
    *,
    total_bytes - index_bytes - COALESCE(toast_bytes, 0) AS table_bytes
  FROM (
    SELECT
      c.oid,
      nspname AS table_schema,
      relname AS TABLE_NAME,
      c.reltuples AS row_estimate,
      pg_total_relation_size(c.oid) AS total_bytes,
      pg_indexes_size(c.oid) AS index_bytes,
      pg_total_relation_size(reltoastrelid) AS toast_bytes
    FROM pg_class c
    LEFT JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE relkind = 'r'
    ORDER BY total_bytes DESC
  ) a
) a;
`.trim();
}

function copyDatabaseCode({ dbServer, database, user }) {
  return `ssh ${dbServer ||
    database} 'sudo -u postgres pg_dump ${database} --format=custom' | sudo -u postgres pg_restore -d ${database} --no-owner --role=${user ||
    database}`;
}

function gutDatabaseCode({ superuser, user, database }) {
  return `sudo -u postgres psql ${database} -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public${
    superuser ? '' : ` AUTHORIZATION ${user || database}`
  };'`;
}

function dropDatabaseCode({ database }) {
  return `
sudo -u postgres psql -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '${database}' AND pid <> pg_backend_pid();"
sudo -u postgres psql -c 'DROP DATABASE IF EXISTS ${database};'
`.trim();
}

export default new Boilerplate({
  title: 'PostgreSQL snippets',
  description: `Some useful PostgreSQL snippets`,

  fields: [
    {
      key: 'superuser',
      label: 'Superuser',
      helpText: 'Is the target a human user or an app?',
      type: FIELD_TYPES.TOGGLE,
      defaultValue: true,
    },
    {
      key: 'database',
      label: 'Database',
      type: FIELD_TYPES.TEXT,
      defaultValue: 'my_database',
    },
    {
      key: 'user',
      label: 'User name',
      helpText: 'Defaults to database name',
      type: FIELD_TYPES.TEXT,
    },
    {
      key: 'password',
      label: 'Password',
      helpText: 'Leave empty to auto-generate',
      type: FIELD_TYPES.TEXT,
    },
    {
      key: 'dbServer',
      label: 'Database server',
      helpText: 'ssh user@hostname designation',
      type: FIELD_TYPES.TEXT,
      defaultValue: 'root@database',
    },
  ],

  blocks: [
    {
      language: 'sql',
      title: 'Create database',
      instructions: `Copy this snippet into psql console`,
      code: createDatabaseCode,
    },
    {
      language: 'sql',
      title: 'Create user',
      instructions: `Copy this snippet into psql console`,
      code: createUserCode,
    },
    {
      language: 'sql',
      title: 'Reassign owner',
      instructions: `Copy this snippet into psql console. Then copy generated code, and paste back in.`,
      code: reassignOwnerCode,
    },
    {
      language: 'sql',
      title: 'Show active DB connections',
      instructions: `Copy this snippet into psql console.`,
      code: activeDBConnectionsCode,
    },
    {
      language: 'sql',
      title: 'Show DB space usage stats',
      instructions: `Copy this snippet into psql console.`,
      code: spaceUsageStatsCode,
    },
    {
      language: 'bash',
      title: 'Copy database through SSH',
      instructions: `Paste this snippet into console`,
      code: copyDatabaseCode,
    },
    {
      language: 'bash',
      title: 'Gut database (public schema)',
      instructions: `Paste this snippet into console`,
      code: gutDatabaseCode,
    },
    {
      language: 'bash',
      title: 'Drop database (with connection clearing)',
      instructions: `Paste this snippet into console`,
      code: dropDatabaseCode,
    },
  ],
});
