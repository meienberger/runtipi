import { Box, SlideFade, Image } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { AppConfig } from '../../core/types';
import AppStatus from './AppStatus';

const AppTile: React.FC<{ app: AppConfig }> = ({ app }) => {
  return (
    <Link href={`/apps/${app.id}`} passHref>
      <SlideFade in className="flex flex-1" offsetY="20px">
        <Box minWidth={400} className="flex flex-1 bg-white drop-shadow-lg rounded-lg p-3 items-center cursor-pointer group hover:drop-shadow-md hover:bg-gray-100 transition-all">
          <Image alt={`${app.name} logo`} className="rounded-md drop-shadow mr-3 group-hover:scale-105 transition-all" src={app.image} width={100} height={100} />
          <div className="mr-3 flex-1">
            <h3 className="font-bold text-xl">{app.name}</h3>
            <span>{app.short_desc}</span>
            {app.installed && (
              <div className="flex mt-1">
                <AppStatus status={app.status} />
              </div>
            )}
          </div>
          <FiChevronRight className="text-slate-300" size={30} />
        </Box>
      </SlideFade>
    </Link>
  );
};

export default AppTile;