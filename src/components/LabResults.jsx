import { useEffect, useRef, useState } from 'react';
import DownloadIcon from '../assets/download.svg';

const LabResultsPanel = () => {
    const [labResults, setLabResults] = useState([]);

    const listRef = useRef(null);
    const thumbRef = useRef(null);

    const TRACK_HEIGHT = 207;
    const THUMB_HEIGHT = 51;

    useEffect(() => {
        const fetchLabResults = async () => {
            try {
                const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev/', {
                    headers: {
                        Authorization: 'Basic ' + btoa('coalition:skills-test'),
                    },
                });

                const data = await response.json();
                const jessica = data.find(user => user.name === 'Jessica Taylor');
                setLabResults(jessica?.lab_results || []);
            } catch (error) {
                console.error('Failed to fetch lab results:', error);
            }
        };

        fetchLabResults();
    }, []);

    const handleScroll = () => {
        const container = listRef.current;
        const thumb = thumbRef.current;

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const trackHeight = TRACK_HEIGHT - THUMB_HEIGHT;

        const top = (scrollTop / scrollHeight) * trackHeight;
        thumb.style.top = `${top}px`;
    };

    useEffect(() => {
        const container = listRef.current;
        const thumb = thumbRef.current;

        let isDragging = false;
        let startY;
        let startScrollTop;

        const handleMouseDown = (e) => {
            isDragging = true;
            startY = e.clientY;
            startScrollTop = container.scrollTop;
            document.body.style.userSelect = 'none';
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const deltaY = e.clientY - startY;
            const scrollHeight = container.scrollHeight - container.clientHeight;
            const trackHeight = TRACK_HEIGHT - THUMB_HEIGHT;
            const scrollDelta = (deltaY / trackHeight) * scrollHeight;

            container.scrollTop = startScrollTop + scrollDelta;
        };

        const handleMouseUp = () => {
            isDragging = false;
            document.body.style.userSelect = 'auto';
        };

        thumb.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            thumb.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className="absolute top-[880px] left-[1215px] w-[367px] h-[296px] bg-white rounded-[16px] opacity-100">
            <h2 className="absolute top-[20px] left-[20px] font-manrope text-[24px] leading-[33px] font-extrabold text-[#072635]">
                Lab Results
            </h2>

            <div className="absolute top-[69px] left-[20px] w-[327px] h-[207px] flex relative">
                {/* Scrollable Content */}
                <div
                    ref={listRef}
                    onScroll={handleScroll}
                    className="overflow-y-auto scrollbar-hide"
                    style={{ width: '100%', height: `${TRACK_HEIGHT}px`, paddingRight: '12px' }}
                >
                    {labResults.map((result, index) => (
                        <div
                            key={index}
                            className={`w-[315px] h-[40px] mb-[9px] flex items-center justify-between px-[16px] ${
                                result === 'CT Scans' ? 'bg-[#F6F7F8]' : 'bg-white'
                            }`}
                        >
                            <span className="font-manrope text-[16px] leading-[18px] text-[#072635] capitalize">
                                {result}
                            </span>
                            <img
                                src={DownloadIcon}
                                alt="Download"
                                className="w-[20px] h-[20px] mr-[10px]"
                            />
                        </div>
                    ))}
                </div>

                {/* Scrollbar Track */}
                <div
                    className="absolute"
                    style={{
                        top: '0px',
                        right: '0px',
                        width: '6px',
                        height: `${TRACK_HEIGHT}px`,
                        backgroundColor: '#E3E4E6',
                        borderRadius: '3px',
                    }}
                >
                    {/* Scrollbar Thumb */}
                    <div
                        ref={thumbRef}
                        style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            width: '6px',
                            height: `${THUMB_HEIGHT}px`,
                            backgroundColor: '#072635',
                            borderRadius: '3px',
                            cursor: 'pointer',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LabResultsPanel;
