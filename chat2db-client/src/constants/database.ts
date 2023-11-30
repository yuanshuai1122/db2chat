import mysqlLogo from '@/assets/img/databaseImg/mysql.png';
import redisLogo from '@/assets/img/databaseImg/redis.png';
import h2Logo from '@/assets/img/databaseImg/h2.png';
import moreDBLogo from '@/assets/img/databaseImg/other.png';
import { IDatabase } from '@/typings';
import { DatabaseTypeCode } from '@/constants'

export enum ConnectionEnvType {
  DAILY = 'DAILY',
  PRODUCT = 'PRODUCT',
}

export const databaseMap: {
  [keys: string]: IDatabase;
} = {
  [DatabaseTypeCode.REDIS]: {
    name: 'Redis',
    img: mysqlLogo,
    code: DatabaseTypeCode.REDIS,
    // port: 3306,
    icon: '\uec6d',
  },
  [DatabaseTypeCode.MEMCACHE]: {
    name: 'Memcache',
    img: h2Logo,
    code: DatabaseTypeCode.MEMCACHE,
    // port: 9092,
    icon: '\ue61c',
  },
};

export const databaseTypeList = Object.keys(databaseMap).map((keys) => {
  return databaseMap[keys];
});
