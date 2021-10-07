import Server from './services/server';
import { ioServer } from './services/socket';
import { CONFIG } from './config/config';

ioServer(Server);
Server.listen(CONFIG.PORT, () => console.log(`Server running in port: ${CONFIG.PORT}`));
Server.on('error', (error) => console.error(`There was an error: ${error}`));
