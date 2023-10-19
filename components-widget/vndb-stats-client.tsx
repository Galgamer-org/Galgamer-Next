'use client'
import {
    drawVoteHistogram,
    drawPieChart,
    getVisualNovelData,
    getBasicInfo,
    calculateLengthVotesAvg,
    colors_pie_chart,
    color_histogram
} from '../data/vndb/d3done'
import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import vndbData from '../data/vndb/vndbInfo.json';
import style from "../styles/vndb-stats.module.css";


export function ScoreVotesPieChart({id}) {
    let count = 0;
    useEffect(() => {
        const currentData = vndbData[id];
        const scoreVotesData = currentData.score_votes;
        const container = document.getElementById('scoreVotesPieChart');
        if (container) {
            if (count === 0) {
                drawPieChart(scoreVotesData, colors_pie_chart, container);
            }
            count++;
        }
    }, [id]);

    return <div id="scoreVotesPieChart" className={`${style.ScoreVotesPieChart} `} />;
}

export function ScoreVotesHistogramChart({id}) {
    let count = 0;
    useEffect(() => {
        const currentData = vndbData[id];
        const scoreVotesData = currentData.score_votes;
        const container = document.getElementById('scoreVotesPieChart');
        if (container) {
            if (count === 0) {
                drawVoteHistogram(scoreVotesData, color_histogram, container);
            }
            count++;
        }
    }, [id]);

    return <div id="scoreVotesPieChart" className={`${style.ScoreVotesHistogramChart} `}  />;
}

