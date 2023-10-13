// import fs = require("fs"); 
 
// const readDataFromFile = (filename) => { 
//   try { 
//     const data = fs.readFileSync(filename, "utf8"); 
//     return JSON.parse(data); 
//   } catch (error) { 
//     console.error("An error occurred while reading the file:", error); 
//     return null; 
//   } 
// }; 
 
// const vndbInfo = readDataFromFile("./data/vndbInfo.json"); 
 
// if (vndbInfo) { 
//   // 在这里可以使用 vndbInfo 对象进行操作 
//   console.log("Data loaded from vndbInfo.json:", vndbInfo); 
 
//   // 例如，你可以访问特定的属性，如: 
//   const v751Data = vndbInfo["v751"]; 
//   if (v751Data) { 
//     console.log("Data for v751:", v751Data); 
//   } 
// } else { 
//   console.log("Failed to load data from vndbInfo.json"); 
// } 
 
 
 
 
 
//---------------------------------------------------------- 
 
// const socre_votes =[ 
//     { "score": 10, "count": 1512 }, 
//     { "score": 9, "count": 2409 }, 
//     { "score": 8, "count": 1555 }, 
//     { "score": 7, "count": 721 }, 
//     { "score": 6, "count": 254 }, 
//     { "score": 5, "count": 125 }, 
//     { "score": 4, "count": 53 }, 
//     { "score": 3, "count": 31 }, 
//     { "score": 2, "count": 22 }, 
//     { "score": 1, "count": 23 } 
//   ] 
 
const divElement = document.getElementById("pieChart"); 
 
 
 
// var colors = [ 
//   "#FF5733",  // 红色 
//   "#33FF57",  // 绿色 
//   "#3366FF",  // 蓝色 
//   "#FF33A1",  // 粉红 
//   "#FF33F6",  // 紫色 
//   "#33FFA6",  // 青色 
//   "#FFC433",  // 橙色 
//   "#33A4FF",  // 天蓝 
//   "#FFD633",  // 黄色 
//   "#33FFC4"   // 浅绿 
// ]; 
 
 
 
// const width = 150; 
// const data = socre_votes; 
// const height = Math.min(width, 150); 
// const radius = Math.min(width, height) / 2; 
 
// const arc = d3.arc() 
// .innerRadius(radius * 0.3) 
// .outerRadius(radius - 1); 
 
//   const pie = d3.pie() 
//   .sort((a, b) => b.count - a.count) // 降序排序 
//   .value((d) => d.count); 
 
 
// const svg = d3.create("svg") 
//   .attr("width", width) 
//   .attr("height", height) 
//   .attr("viewBox", [-width / 2, -height / 2, width, height]); 
 
// svg.append("g") 
//   .selectAll("path") 
//   .data(pie(data)) 
//   .join("path") 
//   .attr("d", arc) // 使用弧生成器绘制扇形 
//   .attr("fill", (d, i) => colors[i]) // 设置颜色 
//   .append("title") 
//   .text((d) => `${d.data.score}: ${((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(2)}%`); 
 
// // 添加标签 
// // 在添加标签的部分，添加条件来检查占比 
// svg.append("g") 
//   .attr("font-family", "sans-serif") 
//   .attr("font-size", 8) 
//   .attr("text-anchor", "middle") 
//   .selectAll() 
//   .data(pie(data)) 
//   .join("text") 
//   .attr("transform", (d) => { 
//     const [x, y] = arc.centroid(d); 
//     const xOffset = x * 0.20; // 调整x偏移量以将标签靠近弧边 
//     const yOffset = y * 0.20; // 调整y偏移量以将标签靠近弧边 
//     return translate(${x + xOffset}, ${y + yOffset}); 
//   }) 
//   .call((text) => text.append("tspan") 
//     .attr("y", "-0.4em") 
//     .attr("font-weight", "bold") 
//     .text((d) => { 
//       // 添加条件，检查占比是否大于等于10% 
//       if ((d.endAngle - d.startAngle) / (2 * Math.PI) * 100 >= 10) { 
//         return d.data.score + "分"; 
//       } 
//       return ""; // 不满足条件时不显示标签 
//     }) 
//   ) 
//   .call((text) => text.filter((d) => (d.endAngle - d.startAngle) > 0.25).append("tspan") 
//     .attr("x", 0) 
//     .attr("y", "0.7em") 
//     .attr("fill-opacity", 0.7) 
//     .text((d) => { 
//       // 添加相同的条件来过滤百分比标签 
//       if ((d.endAngle - d.startAngle) / (2 * Math.PI) * 100 >= 10) { 
//         return ${((d.endAngle - d.startAngle) / (2 * Math.PI) * 100).toFixed(2)}%; 
//       } 
//       return ""; // 不满足条件时不显示标签 
//     }) 
//   ); 
 
// divElement.appendChild(svg.node())