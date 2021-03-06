import axios from 'axios';
import config from '../../config';
import TipiCache from '../../config/TipiCache';
import { readJsonFile } from '../fs/fs.helpers';

type SystemInfo = {
  cpu: {
    load: number;
  };
  disk: {
    total: number;
    used: number;
    available: number;
  };
  memory: {
    total: number;
    available: number;
    used: number;
  };
};

const systemInfo = (): SystemInfo => {
  const info: SystemInfo = readJsonFile('/state/system-info.json');

  return info;
};

const getVersion = async (): Promise<{ current: string; latest?: string }> => {
  try {
    let version = TipiCache.get<string>('latestVersion');

    if (!version) {
      const { data } = await axios.get('https://api.github.com/repos/meienberger/runtipi/releases/latest');

      TipiCache.set('latestVersion', data.name);
      version = data.name.replace('v', '');
    }

    TipiCache.set('latestVersion', version?.replace('v', ''));

    return { current: config.VERSION, latest: version?.replace('v', '') };
  } catch (e) {
    return { current: config.VERSION, latest: undefined };
  }
};

const SystemService = {
  systemInfo,
  getVersion,
};

export default SystemService;
