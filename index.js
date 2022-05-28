const app = require("./app");
const http = require("http");
const port = require("./utils/config").PORT;
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
