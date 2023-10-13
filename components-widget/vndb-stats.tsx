import Link from "next/link";
import style from "../styles/vndb-stats.module.css";
import { Col, Row } from "react-bootstrap";
import cn from "classnames";
import path from "path";

export default async function VndbStats({ vndbId }: { vndbId: string }) {

    let basicInfo = null;
    let releaseInfo : Record<string, any>[];
    let basic_info : Record<string, any>;
    let zh_has_patch = new Array();

    const vndbAPI = async (apiUrl: string, requestData: Record<string, any>) => {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const responseText = await response.text();
                console.log("+++++++++request fail+++++++++");
                console.log(responseText);
                console.log("+++++++++request fail+++++++++");
                throw new Error("请求失败");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("发生错误:", error);
        }
        return null;
    };

    const getBasicInfo = async (vid: String) => {
        const apiUrl = "https://api.vndb.org/kana/vn";
        const requestData = {
            filters: ["id", "=", vid],
            fields:
                "title,languages,released,length,votecount,rating,devstatus,length_minutes,olang",
        };

        const data = await vndbAPI(apiUrl, requestData);
        return data.results[0];
    };

    const getReleasecInfo = async () => {
        const apiUrl = "https://api.vndb.org/kana/release";
        const requestData = {
            filters: ["and", ["patch", "=", 1], ["vn", "=", ["id", "=", vndbId]]],
            fields: "title,languages.lang,extlinks.url",
            results: 100,
        };

        const data = await vndbAPI(apiUrl, requestData);
        console.log(data);
        return data.results;
    };

    const length_calculate = function (length) {
        switch (length) {
            case 1: return "很短";
            case 2: return "短篇";
            case 3: return "中等";
            case 4: return "长篇";
            case 5: return "很长";
            default: return "未知"
        }

    }

    const length_time = function (min: number) {
        return ((min / 60) + "小时 " + (min % 60) + "min")
    }

    const languages_flag = function (languages: any, language: String) {
        let result = null;
        for (const element of languages) {
            if (element === language) {
                result = "有";
                break;
            }
        }

        return result

    }
    const devstatu = function (stau: number) {
        switch (stau) {
            case 0: return "已发布";
            case 1: return "制作中";
            case 2: return "已跑路";
            default: return "火星了";
        }
    }



    // 调用函数 
    if (vndbId !== null && getBasicInfo(vndbId) != null) {
        basicInfo = await getBasicInfo(vndbId);

        releaseInfo = await getReleasecInfo();
        console.log("===================basicinfo==================");
        console.log(basicInfo);
        console.log("===================basicinfo==================");
        console.log("===================releaseinfo==================");
        console.log(releaseInfo);
        console.log("===================releaseinfo==================");

        basic_info =
        {
            "游戏名": basicInfo.title,
            "原语言": basicInfo.olang,
            "游戏状态": devstatu(basicInfo.devstatus),
            "发售日期": basicInfo.released,

            "游戏长度": length_calculate(basicInfo.length) + "( " + length_time(basicInfo.length_minutes) + ") ",
            "汉化版": languages_flag(basicInfo.languages, "zh-Hans"),
            "英文版": languages_flag(basicInfo.languages, "en"),

            "平均分数": basicInfo.rating,
            "投票人数": basicInfo.votecount,
        }



        for (const release of releaseInfo) {
            if (release.languages[0].lang === "zh-Hans") {
                release.lanuage = "zh-Hans";
                delete release.languages;
                zh_has_patch.push(release);
                release.extlink = release.extlinks[0]?.url
                delete release.extlinks
            };

        }

        console.log(zh_has_patch);




    } else {



    }


    // 然後插入你的信息 
    return (
        <div className={cn(style.vndbWrapper, "box-shadow")}>
            <Row className={style.infoContainer}>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(basic_info).map(([key,
                                value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    {/* <td>{Array.isArray(value) ? value.join(" ") : value}</td> */}
                                    <td>{value === null ? "未知" : value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Row>
            <Row className={style.dataContainer}>
                <Col className={cn(style.rating, "col-12 col-md-6")}>汉化补丁</Col>
                {zh_has_patch.map(patch => (
                    <div>
                        {Object.entries(patch).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                {/* <td>{Array.isArray(value) ? value.join(" ") : value}</td> */}
                                {/* <td>{value === null ? "未知" : value}</td> */}
                            </tr>
                        ))}
                    </div>
                ))}

                {/* <Col className={cn(style.details, "col-12 col-md-6")}>
                    <Link href={`/vndb/${vndbId}/release`}></Link>
                    <div className={style.releases}>Releases</div>
                </Col> */}
            </Row>
        </div>
    );
}