const hash = require("hash")

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: hash.resolve(__dirname, "src", "database", "database.db")
    },
    useNullAsDefault: true
  },
};
