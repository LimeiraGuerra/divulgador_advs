import React from 'react';
import Chart from "react-google-charts";

const PieChart = ({ processList }) => {
    const dataChart = (pList) => {
        let datalist = [
            ['Resultado', 'Quantidade'],
            ['Causa ganha', 0],
            ['Causa perdida', 0],
            ['Em movimento', 0]
        ]
        pList.forEach(p => {
            if (p.status === "ganho") datalist[1][1]++;
            else if (p.status === "perdido") datalist[2][1]++;
            else datalist[3][1]++;
        });
        return datalist;
    }

    return (
        <Chart
            width={'400px'}
            height={'400px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={dataChart(processList)}
            options={{
                title: '',
                pieSliceTextStyle: {
                    color: 'black'
                },
                colors: ['lightgreen', '#fe7171', '#ffff62'],
                legend: {
                    position: 'top',
                    alignment: 'center'
                },
                chartArea: { 'width': '100%', 'height': '80%' },
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
}

export default PieChart;