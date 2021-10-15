import { Request, Response } from 'express';
import path from 'path';
import { fork } from 'child_process';
import { randomNumbers } from '../utils/randoms';

const scriptPath = path.resolve(__dirname, '../utils/randoms.js');

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
		});
	}

	randoms(req: Request, res: Response) {
		const { cant } = req.query;
		const computo = fork(scriptPath);
		computo.send(Number(cant) || 100000000);
		computo.on('message', (result) => {
			res.json(result);
		});
	}
}

export const processController = new ProcessController();
