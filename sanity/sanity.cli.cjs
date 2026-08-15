const { defineCliConfig } = require('sanity/cli');

module.exports = defineCliConfig({
  api: {
    projectId: 'pjq90dr2',
    dataset: 'production',
  },
  autoUpdates: true,
});
