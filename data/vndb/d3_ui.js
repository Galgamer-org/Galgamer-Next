



// let divElement = document.getElementById("pieChart1");
// console.log(divElement)


const colors_pie_chart = [
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

const color_histogram = '#1d56d1';

const score_votes = [
    { "score": 10, "count": 211 },
    { "score": 9, "count": 393 },
    { "score": 8, "count": 563 },
    { "score": 7, "count": 441 },
    { "score": 6, "count": 187 },
    { "score": 5, "count": 55 },
    { "score": 4, "count": 40 },
    { "score": 3, "count": 21 },
    { "score": 2, "count": 11 },
    { "score": 1, "count": 7 }
];

const length_votes = [
    { "length": 4, "count": 1 },
    { "length": 29, "count": 1 },
    { "length": 30, "count": 1 },
    { "length": 33, "count": 1 },
    { "length": 34, "count": 1 },
    { "length": 38, "count": 2 },
    { "length": 40, "count": 2 },
    { "length": 41, "count": 2 },
    { "length": 42, "count": 1 },
    { "length": 43, "count": 1 },
    { "length": 44, "count": 1 },
    { "length": 45, "count": 2 },
    { "length": 46, "count": 2 },
    { "length": 48, "count": 2 },
    { "length": 50, "count": 7 },
    { "length": 51, "count": 1 },
    { "length": 52, "count": 2 },
    { "length": 54, "count": 1 },
    { "length": 55, "count": 2 },
    { "length": 56, "count": 1 },
    { "length": 57, "count": 3 },
    { "length": 58, "count": 1 },
    { "length": 60, "count": 7 },
    { "length": 61, "count": 1 },
    { "length": 62, "count": 3 },
    { "length": 63, "count": 1 },
    { "length": 64, "count": 2 },
    { "length": 65, "count": 2 },
    { "length": 67, "count": 1 },
    { "length": 68, "count": 3 },
    { "length": 69, "count": 1 },
    { "length": 70, "count": 4 },
    { "length": 71, "count": 2 },
    { "length": 73, "count": 1 },
    { "length": 75, "count": 5 },
    { "length": 77, "count": 3 },
    { "length": 78, "count": 3 },
    { "length": 79, "count": 1 },
    { "length": 80, "count": 7 },
    { "length": 81, "count": 1 },
    { "length": 82, "count": 1 },
    { "length": 83, "count": 1 },
    { "length": 84, "count": 4 },
    { "length": 85, "count": 4 },
    { "length": 86, "count": 1 },
    { "length": 87, "count": 2 },
    { "length": 90, "count": 6 },
    { "length": 92, "count": 1 },
    { "length": 93, "count": 1 },
    { "length": 94, "count": 2 },
    { "length": 95, "count": 1 },
    { "length": 96, "count": 1 },
    { "length": 97, "count": 1 },
    { "length": 98, "count": 1 },
    { "length": 100, "count": 7 },
    { "length": 101, "count": 2 },
    { "length": 102, "count": 3 },
    { "length": 103, "count": 1 },
    { "length": 104, "count": 1 },
    { "length": 106, "count": 1 },
    { "length": 107, "count": 1 },
    { "length": 110, "count": 1 },
    { "length": 114, "count": 1 },
    { "length": 116, "count": 1 },
    { "length": 120, "count": 3 },
    { "length": 122, "count": 1 },
    { "length": 125, "count": 1 },
    { "length": 127, "count": 1 },
    { "length": 128, "count": 1 },
    { "length": 129, "count": 1 },
    { "length": 131, "count": 1 },
    { "length": 137, "count": 1 },
    { "length": 141, "count": 1 },
    { "length": 158, "count": 1 },
    { "length": 300, "count": 1 }
]
// const transformedData = {};
// length_votes.forEach((item, index) => {
//     transformedData[index] = item.count;
// });
// console.log(transformedData);

// function getTop10VoteLengths(length_votes){
//
//     if (length_votes.length <= 10){
//         return length_votes;
//     }
//     let result = [...length_votes].sort((a, b) => b.count - a.count);
//
//     result = result.slice(0, 10);
//
//     console.log(result);
//
//     return result;
//
// }
// getTop10VoteLengths(length_votes)


// 1. 准备数据，计算累积和



// divElement.appendChild(svg.node());


function calculateLengthVotesAvg(data) {
    const countMap = new Map(); // 用于分组统计 count 和对应的 length 累积和

    for (const item of data) {
        const { length, count } = item;

        if (countMap.has(count)) {
            // 如果已经有这个 count 分组，累积 length 和 count
            countMap.get(count).sumLength += length;
            countMap.get(count).totalCount += 1;
        } else {
            // 否则，创建一个新的分组
            countMap.set(count, {
                sumLength: length,
                totalCount: 1,
            });
        }
    }

    const result = [];

    // 遍历 count 分组，计算加权累积平均值
    for (const [count, { sumLength, totalCount }] of countMap) {
        const weightedAverage = sumLength / totalCount;
        result.push({ count, avg_value: weightedAverage });
    }

    return result;
}
const result = calculateLengthVotesAvg(length_votes);
console.log(result)



const data = result



const margin = { top: 20, right: 20, bottom: 40, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// 创建 SVG 元素
const svg = d3.select("#densityChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// 创建 x 和 y 比例尺
const x = d3.scaleLinear()
    .domain([0, d3.max(length_votes, d => d.length)])  // 根据数据设置 x 轴范围
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, 0.1])  // 设置 y 轴范围，具体范围取决于你的数据
    .range([height, 0]);

// 为核密度估计准备数据
const density = d3.kernelDensity()
    .sample(lengthVotes.map(d => d.length))
    .x(d => x(d));

const densityData = density(100);  // 生成核密度数据点

// 创建线性插值器
const line = d3.line()
    .x(d => x.invert(d[1]))
    .y(d => y(d[0]));

// 添加核密度线
svg.append("path")
    .datum(densityData)
    .attr("class", "density-line")
    .attr("d", line);

// 添加 x 轴
svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

// 添加 y 轴
svg.append("g")
    .call(d3.axisLeft(y));

// 添加 x 轴标签
svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom)
    .text("Length");

// 添加 y 轴标签
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left)
    .text("Density");




// const margin = { top: 20, right: 20, bottom: 40, left: 40 };
// const width = 400 - margin.left - margin.right;
// const height = 200 - margin.top - margin.bottom;
//
// const svg = d3.select("#barChart")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);
//
// const x = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.count +1)])
//     .range([0, width]);
//
// const y = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.avg_value)])
//     .range([height, 0]);
//
//
//
// const filteredData = data.filter(d => d.avg_value !== undefined && (d.count <= 5 || d.count === 11));
//
// svg.selectAll("rect")
//     .data(filteredData)
//     .enter()
//     .append("rect")
//     .attr("x", d => x(d.count) - 12.5)
//     .attr("y", d => y(d.avg_value))
//     .attr("width", 25) // 设置每个条形的宽度
//     .attr("height", d => height - y(d.avg_value))
//     .attr("fill", "steelblue");
//
//
// svg.selectAll(".bar-text")
//     .data(filteredData)
//     .enter()
//     .append("text")
//     .attr("class", "bar-text")
//     .text(d => d.avg_value.toFixed(2)) // 保留小数点后两位
//     .attr("x", d => x(d.count) ) // 10 是一个偏移量，用于让文本居中显示
//     .attr("y", d => y(d.avg_value) - 10) // 10 是一个垂直偏移量，可以根据需要调整
//     .attr("text-anchor", "middle")
//     .attr("font-size", "12px")
//     .attr("fill", "black");
//
// svg.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(d3.axisBottom(x));
//
// svg.append("g")
//     .call(d3.axisLeft(y));
//
// // 添加x轴标签
// const countValues = filteredData.map(d => d.count);
//
// // 创建X轴
// const xAxis = d3.axisBottom(x)
//     .tickValues(countValues) // 仅显示有数据的刻度值
//
// console.log("xAxis", countValues)
//
// svg.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(xAxis);

// 添加y轴标签
// svg.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("x", -height / 2)
//     .attr("y", -margin.left)
