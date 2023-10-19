import * as fs from 'fs';
// const fetch = await import('node-fetch');


type VndbData = {
  basic_info:any
  score_votes: any;
  length_votes: any;
  translations: any;
  relations: any[] | null;
};

const clearJsonFile = (filename: string): void => {
  fs.writeFileSync(filename, JSON.stringify({}, null, 2), 'utf8');
  console.log('Cleared');
};

const saveDataToJsonFile = (filename: string, objectName: string, data: any): void => {
  let existingData: Record<string, any> = {};
  try {
    existingData = JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch (error) {}

  existingData[objectName] = data;

  fs.writeFileSync(filename, JSON.stringify(existingData), 'utf8');
  console.log(`Data saved for object ${objectName}`);
};

const queryMethod = async (url: string, options: RequestInit): Promise<any> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const connectMethod = async (query: string): Promise<VndbData> => {
  const start_time = performance.now();

  try {
    const connection_data = await queryMethod(
      'https://query.vndb.org/api/connections',
      {
        method: 'GET',
      }
    );

    const headers = {
      'Content-Type': 'application/json',
    };

    const batchRequestBody = {
      connectionId: connection_data[0].id,
      name: '',
      batchText: query,
      selectedText: '',
      chart: {
        chartType: '',
        fields: {},
      },
    };

    const batch_data = await queryMethod('https://query.vndb.org/api/batches', {
      method: 'POST',
      headers,
      body: JSON.stringify(batchRequestBody),
    });

    const batch_result_data = await queryMethod(
      `https://query.vndb.org/api/batches/${batch_data.id}`,
      {
        method: 'GET',
        headers,
      }
    );

    const vndbData = await queryMethod(
      `https://query.vndb.org/api/statements/${batch_data.statements[0].id}/results`,
      {
        method: 'GET',
        headers,
      }
    );

    const end_time = performance.now();

    console.log('Connection Data:', connection_data);
    console.log('Batch Data:', batch_data);
    console.log('Votes Data:', vndbData);
    console.log('Request Time:', end_time - start_time);

    return vndbData;
  } catch (error) {
    console.error('An error occurred:', error);
    // 如果出现异常，重新执行 connectMethod
    return connectMethod(query);
  }
};

const vndbDataQuery = async (vndbId : string,data_file:string): Promise<void> => {

  const queryInfo = `SELECT target, (
  with score_votes(score, count) as (
    select vote/10, count(*)
    from ulist_vns
    where vid::text = target
      and vote is not null
    group by vote/10
    order by vote/10 desc
  ), 
  vn_data AS (
    SELECT *
    FROM vn
    WHERE id::text = target
  ),
  length_votes(length, count) as (
    select length / 60, count(*)
    from vn_length_votes
    where vid::text = target
      and length is not null
    group by length / 60
    order by length / 60
  ),
  translations as (
    select
      releases.id,
      releases.website,
      releases.official,
      releases.notes,
      releases.title,
      releases.released,
      (with info as (
        select p.* from releases_producers r join producers p on (p.id = r.pid) where r.id = releases.id
      ) select json_agg(info) from info) as producers
    from releases_vn
    join releases on (releases.id = releases_vn.id)
    where vid::text = target
      and exists (
        select from releases_lang
        where releases_lang.id = releases_vn.id
          and releases_lang.lang::text like 'zh%'
      )
  ),
  relations(id, vid, relation, titles) as (
    with recursive cte(id, vid, relation) as (
      select
        r.id,
        r.vid,
        r.relation
      from vn_relations r
      where id::text = target
        and r.official
      union
      select
        r.id,
        r.vid,
        r.relation
      from cte
      join vn_relations r on (r.id = cte.vid)
      where r.official
        and r.vid::text <> target
    ) select
      cte.id,
      cte.vid,
      cte.relation,
      (
        with sources(lang, title) as (select lang, title from vn_titles where vn_titles.id=cte.vid)
        select json_agg(sources) from sources
      ) from cte
  ) 
  SELECT json_build_object(
    'score_votes', (select json_agg(score_votes) from score_votes),
    'basicInfo', (select row_to_json(vn_data) from vn_data),
    'length_votes', (select json_agg(length_votes) from length_votes),
    'translations', (select json_agg(translations) from translations),
    'relations', (select json_agg(relations) from relations)
  )
)
FROM json_array_elements_text('["${vndbId}"]') target;`


  try {
    const data = await connectMethod(queryInfo);
    console.log(queryInfo);
    const result: VndbData = {
      basic_info : data[0][1].basicInfo,
      score_votes: data[0][1].score_votes,
      length_votes: data[0][1].length_votes,
      translations: data[0][1].translations,
      relations: data[0][1]?.relations?.length > 50 ? null : data[0][1].relations,
    };
    console.log('----------------------');
    console.log(result);

    saveDataToJsonFile(data_file, vndbId, result);
  } catch (error) {
    console.error('An error occurred:', error);
  }

};

export default vndbDataQuery;
export {clearJsonFile} ;