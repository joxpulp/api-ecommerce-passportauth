import { Request, Response } from 'express';
import os from 'os';

class ProcessController {
	info(req: Request, res: Response) {
		return res.json({
			arguments: process.argv,
			platformSO: process.platform,
			nodeVersion: process.version,
			memoryUsage: process.memoryUsage(),
			execPath: process.execPath,
			processId: process.pid,
			currentDirectory: process.cwd(),
			processorsNum: os.cpus().length,
			argumentss: process.argv,
			platformSOs: process.platform,
			nodeVersions: process.version,
			memoryUsages: process.memoryUsage(),
			execPaths: process.execPath,
			processIds: process.pid,
			currentDirectorys: process.cwd(),
			processorsNums: os.cpus().length,
		});
	}

}

export const processController = new ProcessController();
