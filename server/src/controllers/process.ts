import { Request, Response } from 'express';
import path from 'path';
import os from 'os';
import { randomNumbers } from '../utils/randoms';

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
		});
	}

	randoms(req: Request, res: Response) {
		const { cant } = req.query;
		res.json({ result: randomNumbers(Number(cant) || 10000) });
	}
}

export const processController = new ProcessController();
