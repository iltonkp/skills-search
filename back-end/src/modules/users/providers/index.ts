import { container } from 'tsyringe';

import IHashProvider from '../providers/hashprovider/models/IHashProvider';

import BCryptHashProvider from '../providers/hashprovider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
