<<<<<<< HEAD
exports.createError = (status, message) => {
	const err = new Error();
	err.status = status;
	err.message = message;
	return err;
};
=======
import pino from "pino";
import prettyLogs from "pino-pretty";
import { tmpdir } from "os";
import { join } from "path";

const file = join(tmpdir(), `${process.pid}-audit-logs`);

const transport = {
  targets: [
    {
      level: "warn",
      target: "pino/file",
      options: {
        destination: file,
      },
    },
    {
      level: "info",
      target: "pino-pretty",
    },
  ],
};

export const logger = pino(prettyLogs(transport));

export function createError(status, message) {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
}
>>>>>>> 3d115e4 (Updates commit)
