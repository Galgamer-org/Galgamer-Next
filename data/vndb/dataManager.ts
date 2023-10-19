import vndbDataQuery from './dataQuery';
import { clearJsonFile } from './dataQuery';

const data_file = './vndbInfo.json';
const vndb_id_queue: string[] = ['v751', 'v36'];

const update = async (vndbIdQueue: string[],file : string) => {
  clearJsonFile(file);


  for (let count = 0; count < vndbIdQueue.length; count++) {
    const vndbId = vndbIdQueue[count];
    console.log(`Updating ${count + 1} / ${vndbIdQueue.length}`);
    await vndbDataQuery(vndbId,file);
  }
};

update(vndb_id_queue,data_file);
