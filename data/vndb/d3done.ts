// @ts-ignore
import * as d3 from "d3";

const colors_pie_chart: string[] = [
    "#E7C6DB",
    "#D5A8C1",
    "#C990B1",
    "#BB79A1",
    "#A96191",
    "#9A4B81",
    "#8A3371",
    "#7B1D61",
    "#6B0551",
    "#5C003F"
];

const color_histogram: string = '#1d56d1';

function drawVoteHistogram(votes_data: { score: number; count: number }[], color: string, element_id: HTMLElement) {
    const score_votes = votes_data;
    const width = 400;
    const height = 200;
    const margin = {top: 20, right: 30, bottom: 30, left: 40};

    const svg = d3.create("svg")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const x = d3.scaleBand()
        .domain(score_votes.map(d => d.score))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(score_votes, d => d.count) || 1])
        .nice()
        .range([height - margin.bottom, margin.top]);

    svg.append("g")
        .selectAll("rect")
        .data(score_votes)
        .join("rect")
        .attr("x", d => x(d.score))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.count))
        .attr("fill", color);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.selectAll(".bar-text")
        .data(score_votes)
        .join("text")
        .attr("class", "bar-text")
        .text(d => d.count)
        .attr("x", d => x(d.score) + x.bandwidth() / 2)
        .attr("y", d => y(d.count) - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "8px")
        .attr("fill", "red");

    // 将SVG画布添加到指定的<div>元素中
    element_id.appendChild(svg.node());
}

function drawPieChart(draw_data: { score: string; count: number }[], colors: string[], element_id: HTMLElement) {
    const data = draw_data;
    const width = 250;
    const height = Math.min(width, 250);
    const radius = Math.min(width, height) / 2;

    const arc = d3.arc()
        .innerRadius(radius * 0.15)
        .outerRadius(radius - 50);

    const pie = d3.pie()
        .sort(null)
        .value((d) => d.count);

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg.append("g")
        .selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colors[i % colors.length])
        .append("title")
        .text((d) => `${d.data.score}: ${((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(2)}%`);

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 8)
        .attr("text-anchor", "middle")
        .selectAll()
        .data(pie(data))
        .join("text")
        .attr("transform", (d) => {
            const [x, y] = arc.centroid(d);
            const xOffset = x * 0.01;
            const yOffset = y * 0.01;
            return `translate(${x + xOffset}, ${y + yOffset})`;
        })
        .call((text) => text.append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .text((d) => {
                if ((d.endAngle - d.startAngle) / (2 * Math.PI) * 100 >= 10) {
                    return d.data.score + "分";
                }
                return "";
            })
        )
        .call((text) => text.filter((d) => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text((d) => {
                if ((d.endAngle - d.startAngle) / (2 * Math.PI) * 100 >= 10) {
                    return `${((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(2)}%`;
                }
                return "";
            })
        );

    element_id.appendChild(svg.node());
}

function calculateLengthVotesAvg(data: { length: number; count: number }[]): { count: number; avg_value: number }[] {
    const countMap = new Map<number, { sumLength: number; totalCount: number }>();

    for (const item of data) {
        const {length, count} = item;

        if (countMap.has(count)) {
            countMap.get(count)!.sumLength += length;
            countMap.get(count)!.totalCount += 1;
        } else {
            countMap.set(count, {
                sumLength: length,
                totalCount: 1,
            });
        }
    }

    const result: { count: number; avg_value: number }[] = [];

    for (const [count, {sumLength, totalCount}] of countMap) {
        const weightedAverage = sumLength / totalCount;
        result.push({count, avg_value: weightedAverage});
    }

    return result;
}
async function getVisualNovelData(vndbId: string): Promise<Record<string, string | number> | null> {
    let result: Record<string, string | number> | null = null;
    if (vndbId !== null && await getBasicInfo(vndbId) !== null) {
        let basicInfo = await getBasicInfo(vndbId);
        result =
            {
                "游戏名": basicInfo.title,
                "原语言": languages_text(basicInfo.olang),
                "游戏状态": devstatu(basicInfo.devstatus),
                "发售日期": basicInfo.released,

                "游戏长度": length_calculate(basicInfo.length) + "( " + length_time(basicInfo.length_minutes) + ") ",
                "汉化版": languages_flag(basicInfo.languages, "zh-Hans"),
                "英文版": languages_flag(basicInfo.languages, "en"),

                "平均分数": basicInfo.rating,
                "投票人数": basicInfo.votecount,
            };
    }
    return result;
}
const languages_text = function(language: string){
    let result = "未知";
    console.log(language)
    if (language === 'ja'){
        result = "日语";
    }else if(language === 'zh-Hans'){
        result = "汉语"
    }else if(language === 'en'){
        result = "英语";
    }else if(language === 'ru'){
        result = "俄语";
    }
    return  result;

}

const vndbAPI = async (apiUrl: string, requestData: Record<string, any>): Promise<any | null> => {
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

const getBasicInfo = async (vid: string): Promise<any | null> => {
    const apiUrl = "https://api.vndb.org/kana/vn";
    const requestData = {
        filters: ["id", "=", vid],
        fields:
            "title,languages,released,length,votecount,rating,devstatus,length_minutes,olang,platforms",
    };
    let data = null;
    if (data === null) {
        data = await vndbAPI(apiUrl, requestData);
    }
    console.log(data)
    return data?.results[0] || null;
};

const length_calculate = function (length: number): string {
    switch (length) {
        case 1:
            return "很短";
        case 2:
            return "短篇";
        case 3:
            return "中等";
        case 4:
            return "长篇";
        case 5:
            return "很长";
        default:
            return "未知";
    }
};

const length_time = function (min: number): string {
    return ( Math.floor((min / 60)) + "小时 " + (min % 60) + "分钟");
};

const languages_flag = function (languages: string[], language: string): string | null {
    let result: string | null = null;
    for (const element of languages) {
        if (element === language) {
            result = "有";
            break;
        }
    }
    return result;
};

const devstatu = function (stau: number): string {
    switch (stau) {
        case 0:
            return "已发布";
        case 1:
            return "制作中";
        case 2:
            return "已跑路";
        default:
            return "火星了";
    }
};



// const basic_info_method = function (basic_info: any) {
//
//     let result: Record<string, string | number> | null = null;
//     result =
//         {
//             "游戏名": basic_info.title,
//             "原语言": basic_info.olang,
//             "游戏状态": devstatu(basic_info.devstatus),
//             "发售日期": basic_info.released,
//
//             "游戏长度": length_calculate(basic_info.length) + "( " + length_time(basic_info.length_minutes) + ") ",
//             // "汉化版": languages_flag(basic_info.languages, "zh-Hans"),
//             // "英文版": languages_flag(basic_info.languages, "en"),
//
//             "平均分数": basic_info.c_average / 10 ,
//             "投票人数": basic_info.c_votecount,
//         }
//     return result;
//
//
// }

export {
    drawVoteHistogram,
    drawPieChart,
    calculateLengthVotesAvg,
    getVisualNovelData,
    getBasicInfo,

    colors_pie_chart,
    color_histogram

};
