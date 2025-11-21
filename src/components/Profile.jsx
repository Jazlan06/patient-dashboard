import { useEffect, useState } from 'react';
import BirthIcon from '../assets/Birth.svg';
import GenderIcon from '../assets/Gender.svg';
import PhoneIcon from '../assets/Phone.svg';
import InsuranceIcon from '../assets/Insurance.svg';

const ProfilePanel = () => {
    const [jessica, setJessica] = useState(null);

    useEffect(() => {
        const fetchJessica = async () => {
            try {
                const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev/', {
                    headers: {
                        Authorization: 'Basic ' + btoa('coalition:skills-test'),
                    },
                });
                const data = await response.json();
                const jessicaData = data.find(user => user.name === 'Jessica Taylor');
                setJessica(jessicaData);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchJessica();
    }, []);

    const profileFields = [
        {
            icon: BirthIcon,
            label: 'Date of Birth',
            value: jessica?.date_of_birth,
        },
        {
            icon: GenderIcon,
            label: 'Gender',
            value: jessica?.gender,
        },
        {
            icon: PhoneIcon,
            label: 'Contact Info',
            value: jessica?.phone_number,
        },
        {
            icon: PhoneIcon,
            label: 'Emergency Contacts',
            value: jessica?.emergency_contact,
        },
        {
            icon: InsuranceIcon,
            label: 'Insurance Provider',
            value: jessica?.insurance_type,
        },
    ];

    return (
        <div className="absolute top-[108px] left-[1216px] w-[367px] h-[740px] bg-white rounded-[16px] opacity-100">
            {/* Profile Picture */}
            {jessica && (
                <img
                    src={jessica.profile_picture}
                    alt="Profile"
                    className="absolute top-[32px] left-1/2 transform -translate-x-1/2 w-[200px] h-[200px] rounded-full object-cover"
                />
            )}

            {/* Name */}
            {jessica && (
                <div className="absolute top-[256px] left-1/2 transform -translate-x-1/2 w-[164px] h-[33px] text-center font-manrope text-[24px] leading-[33px] font-extrabold text-[#072635] opacity-100">
                    {jessica.name}
                </div>
            )}

            {/* Profile Info List */}
            <div className="absolute top-[321px] left-[24px] w-[319px]">
                {profileFields.map((item, index) => (
                    <div key={index} className="relative w-[295px] h-[42px] mb-[24px] flex items-start">
                        {/* Icon */}
                        <img
                            src={item.icon}
                            alt={`${item.label} Icon`}
                            className="w-[42px] h-[42px] mr-[16px]"
                        />

                        {/* Text Section */}
                        <div className="flex flex-col justify-start text-left">
                            <span className="font-manrope text-[14px] leading-[19px] font-medium text-[#072635] capitalize">
                                {item.label}
                            </span>
                            <span className="font-manrope text-[14px] leading-[19px] font-bold text-[#072635] capitalize mt-[2px]">
                                {item.value || '--'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="absolute bottom-[24px] left-1/2 transform -translate-x-1/2 w-[220px] h-[41px] bg-[#01F0D0] rounded-[41px] opacity-100">
                <span className="font-manrope text-[14px] leading-[19px] font-bold text-[#072635]">
                    Show All Information
                </span>
            </button>
        </div>
    );
};

export default ProfilePanel;
