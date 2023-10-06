import Link from "next/link";
import style from "../styles/vndb-stats.module.css";
import { Col, Row } from "react-bootstrap";
import cn from "classnames";


export default async function VndbStats({ vndbId }: {
    vndbId: string;
}) {

    const response = await fetch(`https://api.vndb.org/vn/${vndbId}/stats`);
    const data = await response.json();

    // 從 data 裏面抽出你想要的信息
    // const ...


    // 然後插入你的信息
    return (
        <div className={cn(style.vndbWrapper, 'shadow')}>
            <Row className={style.infoContainer}>
                遊戲標題等信息
            </Row>
            <Row className={style.dataContainer}>
                <Col className={cn(style.rating, 'col-12 col-md-6')}>
                    評分和投票
                </Col>
                <Col className={cn(style.details, 'col-12 col-md-6')}>
                    <Link href={`/vndb/${vndbId}/release`}></Link>
                    <div className={style.releases}>
                        Releases
                    </div>
                </Col>
            </Row>
        </div>
    );
};


