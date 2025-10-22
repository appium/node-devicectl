module.exports = {
  require: ['ts-node/register'],
  timeout: 60000,
  exit: true,
  recursive: true,
  spec: [
    './test/unit/**/*-specs.ts',
    './test/e2e/**/*-specs.ts'
  ]
};
