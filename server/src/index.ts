import Server from './services/server';
import { ioServer } from './services/socket';
import { CONFIG, flags } from './config/config';
import cluster from 'cluster';
import os from 'os';

const CPUs = os.cpus().length;
ioServer(Server);

if (flags.M === 'CLUSTER' && cluster.isMaster) {
	console.log(`NUMERO DE CPUS ===> ${CPUs}`);
	console.log(`PID MASTER ${CONFIG.PROCESS_ID}`);

	for (let i = 0; i < CPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		console.log(`Worker ${worker.process.pid} died at ${Date()}`);
		cluster.fork();
	});
} else if (flags.M === 'FORK' || flags.M === 'CLUSTER') {
	Server.listen(CONFIG.PORT, () =>
		console.log(
			`Server running in port: ${CONFIG.PORT}, and Node process id: ${CONFIG.PROCESS_ID}`
		)
	);

    Server.on('error', (error) => console.error(`There was an error: ${error}`));
}
