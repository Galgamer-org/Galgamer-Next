import style from "../styles/vndb-stats.module.css";
import {getVisualNovelData} from '../data/vndb/d3done'
import cn from 'classnames';
import {ScoreVotesHistogramChart, ScoreVotesPieChart} from './vndb-stats-client'
import vndbData from "../data/vndb/vndbInfo.json";
import {Col, Row} from 'react-bootstrap'

async function basicInfo(id: string) {
    const basicInfo = async () => {
        return await getVisualNovelData(id)
    };
    return await basicInfo();
}

interface PatchProps {
    id: string | undefined
    website: string | undefined
    official: boolean
    notes: string | undefined
    title: string
    released: number
    producers: any
}

function ZhPatchInfo({id}) {
    const currentData = vndbData[id];
    const patch_data = currentData.translations;
    console.log(patch_data)
    return <div className={`${style.ZhPatchInfo} `}>
        <p>汉化补丁信息</p>
        {
            Object.values(patch_data).map((value: PatchProps, index) => (
                <Patch key={index} patch={value}/>

            ))
        }
    </div>
}

function Patch({patch}: { patch: PatchProps }) {
    // console.log(patch)
    const date_number = patch.released;
    const dateStr = date_number.toString();
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const date = new Date(`${year}-${month}-${day}`);
    const formatted_date = `${year}年${month}月${day}日`;

    const producers_name = patch.producers[0].name;


    return <div className={style.Patch} >
        <p >{formatted_date} : {producers_name} <br></br>
        <a href={patch.website}>{patch.title} {patch.notes}</a>
    </p>

    </div>
}

function BasicInfoData({basic_info}) {
    // console.log("------------------------------")
    // console.log(basic_info)
    // console.log("------------------------------")
    return (
        <div className={`${style.BasicInfoData} `}>
            <p><strong>原语言:</strong> {basic_info['原语言']}</p>
            <p><strong>发售日期:</strong> {basic_info['发售日期']}</p>
            <p><strong>游戏长度:</strong> {basic_info['游戏长度']}</p>
            <p><strong>汉化版:</strong> {basic_info['汉化版']}</p>
            <p><strong>英文版:</strong> {basic_info['英文版']}</p>
        </div>
    );
}

function ScoreVotes({id, basic_info}) {
    return <div className={`${style.ScoreVotes} col-12 col-md-12 col-xl-12 `} >
        <Row>
            <Col className={cn(`col-12 col-md-2 col-xl-2 `)}>
                <div className={`${style.ScoreVotesInfo} `}>
                    <p><strong>平均分数:</strong> {basic_info['平均分数']}</p>
                    <p><strong>投票人数:</strong> {basic_info['投票人数']}</p>
                </div>
            </Col>
            <Col className={cn(`col-12 col-md-3 col-xl-3 `)}>
            <ScoreVotesPieChart id={id} />
            </Col>
            <Col className={cn(`col-12 col-md-3 col-xl-3 `)}>
            <ScoreVotesHistogramChart id={id}/>
            </Col>
        </Row>
    </div>
}

function Title() {
    return <div className={`${style.Title} col-12 col-md-12 col-xl-12`}>
        <p>来自VNDB的一些数据</p>
    </div>
}

export default async function VndbStats({vndbId}: { vndbId: string }) {
    const basic_info = await basicInfo(vndbId);
    return (
        <div className={cn(style.vndbWrapper, 'box-shadow')}>
            <Row className={cn(`col-12 col-md-12 col-xl-12 `)}>
                <Title/>
            </Row>
            <Row>
                <Col className={cn(`col-12 col-md-4 col-xl-4 `)} >
                    <BasicInfoData basic_info={basic_info}/>
                </Col>
                <Col className={cn(`col-12 col-md-8 col-xl-8 `)} >
                    <ZhPatchInfo id={vndbId}/>
                </Col>
            </Row>
            <Row>
                <ScoreVotes id={vndbId} basic_info={basic_info}/>
            </Row>
        </div>
    );
}
