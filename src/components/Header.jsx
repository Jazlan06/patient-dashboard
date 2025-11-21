import TestLogo from '../assets/TestLogo.svg';
import OverviewIcon from '../assets/Overview.svg';
import PatientsIcon from '../assets/Patients.svg';
import ScheduleIcon from '../assets/Schedule.svg';
import MessageIcon from '../assets/Message.svg';
import TransactionsIcon from '../assets/Transactions.svg';
import DoctorImage from '../assets/Doctor.jpg';
import SettingsIcon from '../assets/Settings.svg';
import MoreIcon from '../assets/More.svg';

const Header = () => {
    return (
        <div className="absolute top-[18px] left-[18px] w-[1564px] h-[72px] bg-white rounded-[70px] opacity-100 flex items-center px-[50px] justify-between">
            {/* Logo */}
            <img
                src={TestLogo}
                alt="Logo"
                className="w-[211px] h-[48px] object-contain"
            />

            {/* Navigation Links */}
            <div className="flex gap-[28px] items-center ml-[190px]">
                {/* Overview */}
                <div className="flex items-center gap-[5px]">
                    <img src={OverviewIcon} alt="Overview" className="w-[16px] h-[17px]" />
                    <span className="text-[#072635] font-bold text-[14px] leading-[19px]">Overview</span>
                </div>

                {/* Patients - Active */}
                <div className="bg-[#01F0D0] rounded-[41px] flex items-center px-[16px] py-[6px] gap-[6px]">
                    <img src={PatientsIcon} alt="Patients" className="w-[24px] h-[17px]" />
                    <span className="text-[#072635] font-bold text-[14px] leading-[19px]">Patients</span>
                </div>

                {/* Schedule */}
                <div className="flex items-center gap-[5px]">
                    <img src={ScheduleIcon} alt="Schedule" className="w-[15px] h-[17px]" />
                    <span className="text-[#072635] font-bold text-[14px] leading-[19px]">Schedule</span>
                </div>

                {/* Message */}
                <div className="flex items-center gap-[5px]">
                    <img src={MessageIcon} alt="Message" className="w-[19px] h-[17px]" />
                    <span className="text-[#072635] font-bold text-[14px] leading-[19px]">Message</span>
                </div>

                {/* Transactions */}
                <div className="flex items-center gap-[5px]">
                    <img src={TransactionsIcon} alt="Transactions" className="w-[22px] h-[17px]" />
                    <span className="text-[#072635] font-bold text-[14px] leading-[19px]">Transactions</span>
                </div>
            </div>

            <div className="flex items-center gap-[16px] w-[241px] h-[44px]">
                {/* Doctor Info */}
                <div className="flex items-center gap-[12px] w-[181px]">
                    <img
                        src={DoctorImage}
                        alt="Doctor"
                        className="w-[44px] h-[44px] rounded-full object-cover"
                    />
                    <div>
                        <p className="text-[#072635] font-bold text-[14px] leading-[19px]">
                            Dr. Jose Simmons
                        </p>
                        <p className="text-[#707070] font-normal text-[14px] leading-[19px]">
                            General Practitioner
                        </p>
                    </div>
                </div>

                {/* Settings Icon */}
                <img
                    src={SettingsIcon}
                    alt="Settings"
                    className="w-[19px] h-[20px]"
                />

                {/* More Icon */}
                <img
                    src={MoreIcon}
                    alt="More"
                    className="w-[4px] h-[18px]"
                />
            </div>
        </div>
    );
};

export default Header;
