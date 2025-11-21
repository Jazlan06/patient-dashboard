import { useEffect, useRef, useState } from 'react';

const DiagnosticListPanel = () => {
    const [diagnostics, setDiagnostics] = useState([]);

    const listRef = useRef(null);
    const thumbRef = useRef(null);

    const TRACK_HEIGHT = 178;
    const THUMB_HEIGHT = 100;

    useEffect(() => {
        const fetchDiagnostics = async () => {
            try {
                const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev/', {
                    headers: {
                        Authorization: 'Basic ' + btoa('coalition:skills-test'),
                    },
                });
                const data = await response.json();
                const jessica = data.find(user => user.name === 'Jessica Taylor');
                setDiagnostics(jessica?.diagnostic_list || []);
            } catch (error) {
                console.error('Failed to fetch diagnostics:', error);
            }
        };

        fetchDiagnostics();
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
        const thumb = thumbRef.current;
        const container = listRef.current;
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
        <div className="absolute top-[827px] left-[417px] w-[766px] h-[349px] bg-white rounded-[16px] opacity-100">
            <h2 className="absolute top-[20px] left-[20px] font-manrope text-[24px] leading-[33px] font-extrabold text-[#072635]">
                Diagnostic List
            </h2>

            {/* Table Header */}
            <div className="absolute top-[93px] left-[20px] w-[726px] h-[48px] bg-[#F6F7F8] rounded-[24px] flex items-center pl-[16px]">
                <div className="w-[180px] font-manrope text-[14px] font-bold text-[#072635] text-left">
                    Problem/Diagnosis
                </div>
                <div className="w-[260px] font-manrope text-[14px] font-bold text-[#072635] text-left">
                    Description
                </div>
                <div className="w-[150px] ml-[110px] font-manrope text-[14px] font-bold text-[#072635] text-left">
                    Status
                </div>
            </div>

            <div className="absolute top-[155px] left-[20px] w-[726px] h-[174px] flex relative">
                <div
                    ref={listRef}
                    onScroll={handleScroll}
                    className="scrollbar-hide overflow-y-auto overflow-x-hidden"
                    style={{ height: `${TRACK_HEIGHT}px`, width: '100%', paddingRight: '12px' }}
                >
                    {diagnostics.map((item, index) => (
                        <div
                            key={index}
                            className="w-[723px] h-[59px] bg-white mb-[7px] flex items-center px-[16px] rounded-[12px]"
                        >
                            <div className="w-[180px] font-manrope text-[14px] font-normal text-[#072635] text-left">
                                {item.name}
                            </div>
                            <div className="w-[300px] font-manrope text-[14px] font-normal text-[#072635] text-left">
                                {item.description}
                            </div>
                            <div className="w-[150px] ml-[90px] font-manrope text-[14px] font-normal text-[#072635] text-left">
                                {item.status}
                            </div>
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

export default DiagnosticListPanel;
