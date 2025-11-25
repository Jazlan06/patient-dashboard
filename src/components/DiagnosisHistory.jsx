import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import ExpandIcon from '../assets/Expand.svg';
import ArrowUp from '../assets/ArrowDown.svg';
import ArrowDown from '../assets/ArrowDown.svg';
import RespiratoryIcon from '../assets/respiratory rate.svg';
import TemperatureIcon from '../assets/temperature.svg';
import HeartIcon from '../assets/heart.svg';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const DiagnosisHistory = () => {
    const [filteredHistory, setFilteredHistory] = useState([]);

    useEffect(() => {
        const fetchJessicaData = async () => {
            try {
                const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev/', {
                    headers: {
                        Authorization: 'Basic ' + btoa('coalition:skills-test'),
                    },
                });
                const data = await response.json();
                const jessica = data.find(patient => patient.name === 'Jessica Taylor');

                if (!jessica || !Array.isArray(jessica.diagnosis_history)) return;

                const allowedMonths = [
                    { month: 'October', year: 2023 },
                    { month: 'November', year: 2023 },
                    { month: 'December', year: 2023 },
                    { month: 'January', year: 2024 },
                    { month: 'February', year: 2024 },
                    { month: 'March', year: 2024 },
                ];

                const filtered = jessica.diagnosis_history.filter(entry =>
                    allowedMonths.some(({ month, year }) => entry.month === month && entry.year === year)
                );

                const monthOrder = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December',
                ];

                filtered.sort((a, b) => {
                    if (a.year !== b.year) return a.year - b.year;
                    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
                });

                setFilteredHistory(filtered);
            } catch (error) {
                console.error('Error fetching diagnosis history:', error);
            }
        };

        fetchJessicaData();
    }, []);

    const chartData = {
        labels: filteredHistory.map(entry => entry.month.slice(0, 3) + ' ' + entry.year),
        datasets: [
            {
                label: 'Systolic',
                data: filteredHistory.map(entry => entry.blood_pressure.systolic.value),
                borderColor: '#7E6CAB',
                backgroundColor: 'rgba(126, 108, 171, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Diastolic',
                data: filteredHistory.map(entry => entry.blood_pressure.diastolic.value),
                borderColor: '#3A98B9',
                backgroundColor: 'rgba(58, 152, 185, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    color: '#072635',
                    font: {
                        size: 13,
                    },
                },
                grid: {
                    color: '#e0e0e0',
                },
            },
            x: {
                ticks: {
                    color: '#072635',
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
    };


    return (
        <div className="absolute top-[122px] left-[417px] w-[766px] h-[673px] bg-white rounded-[16px]">
            <h2 className="absolute font-serif top-[20px] left-[20px] text-[#072635] text-[24px] leading-[33px] font-extrabold font-manrope">
                Diagnosis History
            </h2>
            <div className="absolute top-[93px] left-[20px] w-[726px] h-[298px] bg-[#F4F0FE] rounded-[12px]">
                <h3 className="absolute top-[16px] left-[16px] text-[#072635] text-[18px] font-bold capitalize">
                    Blood Pressure
                </h3>
                <div className="absolute top-[21px] left-[335px] w-[119px] h-[19px] flex items-center justify-end space-x-[4px]">
                    <span className="text-[14px] text-[#072635] font-manrope leading-[19px]">
                        Last 6 months
                    </span>
                    <img
                        src={ExpandIcon}
                        alt="Expand"
                        className="w-[11px] h-[6px]"
                    />
                </div>

                <div className="absolute top-[68px] left-[16px] w-[470px] h-[210px]">
                    <Line data={chartData} options={chartOptions}
                        className='w-full h-full'
                    />
                </div>
                <div className="absolute top-[16px] left-[502px] w-[208px] h-[201px] opacity-100">
                    <div className="absolute top-0 left-0 w-[149px] h-[84px] opacity-100">
                        <div
                            className="absolute top-[3px] left-0 w-[14px] h-[14px] rounded-full border border-white"
                            style={{ backgroundColor: '#7E6CAB', opacity: 1 }}
                        ></div>
                        <span
                            className="absolute top-0 left-[18px] w-[55px] h-[19px] font-manrope font-bold text-[14px] leading-[19px] text-[#072635] capitalize opacity-100"
                        >
                            Systolic
                        </span>

                        <span
                            className="absolute top-[42px] left-0 w-[38px] h-[30px] font-manrope font-bold text-[22px] leading-[30px] text-[#072635] capitalize opacity-100"
                        >
                            {filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1].blood_pressure.systolic.value : '--'}
                        </span>
                        <img
                            src={ArrowUp}
                            alt="Arrow Up"
                            className="absolute top-[89px] left-0 w-[10px] h-[5px]"
                            style={{ transform: 'matrix(-1, 0, 0, -1, 0, 0)', opacity: 1 }}
                        />
                        <span
                            className="absolute top-[79px] left-[18px] w-[131px] h-[19px] font-manrope font-normal text-[14px] leading-[19px] text-[#072635] opacity-100"
                        >
                            {filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1].blood_pressure.systolic.levels : '--'}
                        </span>
                    </div>
                    
                    <div className="absolute top-[117px] left-[0px] w-[145px] h-[84px] opacity-100">
                        <div
                            className="absolute top-[3px] left-0 w-[14px] h-[14px] rounded-full border border-white"
                            style={{ backgroundColor: '#3A98B9', opacity: 1 }}
                        ></div>
                        <span
                            className="absolute top-0 left-[18px] w-[60px] h-[19px] font-manrope font-bold text-[14px] leading-[19px] text-[#072635] capitalize opacity-100"
                        >
                            Diastolic
                        </span>

                        <span
                            className="absolute top-[27px] left-0 w-[25px] h-[30px] font-manrope font-bold text-[22px] leading-[30px] text-[#072635] capitalize opacity-100"
                        >
                            {filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1].blood_pressure.diastolic.value : '--'}
                        </span>
                        <img
                            src={ArrowDown}
                            alt="Arrow Down"
                            className="absolute top-[72px] left-0 w-[10px] h-[5px]"
                            style={{ opacity: 1 }}
                        />

                        <span
                            className="absolute top-[64px] left-[18px] w-[127px] h-[19px] font-manrope font-normal text-[14px] leading-[19px] text-[#072635] opacity-100"
                        >
                            {filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1].blood_pressure.diastolic.levels : '--'}
                        </span>
                    </div>
                </div>

                <div className="absolute top-[318px] left-[0px] w-[228px] h-[242px] bg-[#E0F3FA] rounded-[12px] opacity-100">
          
                    <img
                        src={RespiratoryIcon}
                        alt="Respiratory Rate Icon"
                        className="absolute top-[16px] left-[16px] w-[96px] h-[96px]"
                    />

                    <span className="absolute top-[128px] left-[16px] w-[125px] h-[22px] text-left font-manrope text-[16px] leading-[22px] text-[#072635] capitalize font-medium opacity-100">
                        Respiratory Rate
                    </span>

                    {/* Value + bpm */}
                    <div className="absolute top-[149px] left-[16px] w-[109px] h-[41px] flex items-baseline space-x-[4px]">
                        <span className="font-manrope text-[30px] leading-[41px] text-[#072635] font-extrabold">
                            {filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1].respiratory_rate.value : '--'}
                        </span>
                        <span className="font-manrope text-[30px] leading-[41px] text-[#072635] font-extrabold">
                            bpm
                        </span>
                    </div>

                    {/* Level */}
                    <span className="absolute top-[194px] left-[16px] w-[46px] h-[19px] font-manrope text-[14px] leading-[19px] text-[#072635] font-normal text-left opacity-100">
                        {filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1].respiratory_rate.levels : '--'}
                    </span>
                </div>

                <div className="absolute top-[318px] left-[249px] w-[228px] h-[242px] bg-[#FFE6E9] rounded-[12px] opacity-100">
                    <img
                        src={TemperatureIcon}
                        alt="Temperature Icon"
                        className="absolute top-[16px] left-[16px] w-[96px] h-[96px]"
                    />
                    <span className="absolute top-[128px] left-[16px] w-[97px] h-[22px] font-manrope text-[16px] leading-[22px] text-[#072635] capitalize font-medium opacity-100">
                        Temperature
                    </span>
                    <div className="absolute top-[149px] left-[16px] w-[95px] h-[41px] flex items-baseline space-x-[4px]">
                        <span className="font-manrope text-[30px] leading-[41px] text-[#072635] font-extrabold">
                            {filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1].temperature.value : '--'}
                        </span>
                        <span className="font-manrope text-[30px] leading-[41px] text-[#072635] font-extrabold">
                            °F
                        </span>
                    </div>
                    <span className="absolute top-[194px] left-[16px] w-[46px] h-[19px] font-manrope text-[14px] leading-[19px] text-[#072635] font-normal opacity-100">
                        {filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1].temperature.levels : '--'}
                    </span>
                </div>

                <div className="absolute top-[318px] left-[498px] w-[228px] h-[242px] bg-[#FFE6F1] rounded-[12px] opacity-100">
                    <img
                        src={HeartIcon}
                        alt="Heart Rate Icon"
                        className="absolute top-[16px] left-[16px] w-[96px] h-[96px]"
                    />

                    <span className="absolute top-[128px] left-[16px] w-[80px] h-[22px] font-manrope text-[16px] leading-[22px] text-[#072635] capitalize font-medium opacity-100">
                        Heart Rate
                    </span>

                    <div className="absolute top-[149px] left-[16px] w-[106px] h-[41px] flex items-baseline space-x-[4px]">
                        <span className="font-manrope text-[30px] leading-[41px] text-[#072635] font-extrabold">
                            {filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1].heart_rate.value : '--'}
                        </span>
                        <span className="font-manrope text-[30px] leading-[41px] text-[#072635] font-extrabold">
                            bpm
                        </span>
                    </div>

                    <img
                        src={ArrowDown}
                        alt="Arrow Down"
                        className="absolute top-[203px] left-[16px] w-[10px] h-[5px] opacity-100"
                    />

                    <span className="absolute top-[194px] left-[34px] w-[127px] h-[19px] font-manrope text-[14px] leading-[19px] text-[#072635] font-normal opacity-100">
                        {filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1].heart_rate.levels : '--'}
                    </span>
                </div>

            </div>
        </div>
    );
};

export default DiagnosisHistory;
