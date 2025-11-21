import { useEffect, useRef, useState } from 'react';
import SearchIcon from '../assets/Search.svg';
import ThreeDots from '../assets/3Dots.svg';

const Sidebar = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('Jessica Taylor');
    const [error, setError] = useState(null);

    const listRef = useRef(null);
    const thumbRef = useRef(null);

    const TRACK_HEIGHT = 941;
    const THUMB_HEIGHT = 100;

    useEffect(() => {
        const getPatients = async () => {
            try {
                const response = await fetch(
                    'https://fedskillstest.coalitiontechnologies.workers.dev/',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: 'Basic ' + btoa('coalition:skills-test'),
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setPatients(data);
                } else {
                    setError('Received data is not an array');
                }
            } catch (err) {
                console.error('Failed to fetch patients:', err);
                setError(err.message);
            }
        };

        getPatients();
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

    if (error) {
        return (
            <div className="absolute top-[122px] left-[18px] w-[367px]">
                <p className="text-red-600">Error loading patients: {error}</p>
            </div>
        );
    }

    return (
        <div className="absolute top-[122px] left-[18px]  w-[367px] h-[1054px] bg-white rounded-[16px] px-[20px] pt-[20px] overflow-hidden relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-[40px]">
                <p className="text-[24px] font-extrabold text-[#072635] leading-[33px]">Patients</p>
                <img src={SearchIcon} alt="Search" className="w-[18px] h-[18px]" />
            </div>

            {/* Scrollable Patient List & Custom Scrollbar */}
            <div className="relative flex">
                {/* Scrollable Patient List */}
                <div
                    ref={listRef}
                    onScroll={handleScroll}
                    className="overflow-y-auto scrollbar-hide"
                    style={{
                        height: `${TRACK_HEIGHT}px`,
                        width: '100%',
                        paddingRight: '20px',
                        marginRight: '6px',
                    }}
                >
                    {patients.map((patient, index) => {
                        const isActive = patient.name === selectedPatient;

                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedPatient(patient.name)}
                                className={`mb-[35px] ml-[-10px] rounded-[8px] cursor-pointer ${isActive
                                    ? 'bg-[#D8FCF7] w-full h-[48px]'
                                    : ''
                                    }`}
                            >
                                <div className="flex items-center justify-between w-full h-full px-[10px]">
                                    <img
                                        src={patient.profile_picture}
                                        alt={patient.name}
                                        className="w-[48px] h-[48px] object-cover rounded-full"
                                    />
                                    <div className="ml-[10px] flex flex-col items-start flex-1">
                                        <p className="text-[#072635] font-bold text-[14px] leading-[19px]">
                                            {patient.name}
                                        </p>
                                        <p className="text-[#707070] text-[14px] leading-[19px] text-left">
                                            {patient.gender}, {patient.age}
                                        </p>
                                    </div>
                                    <img src={ThreeDots} alt="More" className="w-[18px] h-[4px]" />
                                </div>
                            </div>
                        );
                    })}
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

export default Sidebar;
