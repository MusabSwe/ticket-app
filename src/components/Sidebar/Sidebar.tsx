import "./Sidebar.css";
import logo from '../../assets/Ticket-logo.png';
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
interface SideProps {
    isOpen: boolean;
    onClose: () => void;
    position?: string;
    children?: any;
    width?: string;
    overlayColor?: string;
    transitionDuration?: string;
    backgroundColor?: string;
    boxShadow?: string;
}

export default function Sidebar({
    isOpen,
    onClose,
    position = 'left',
    children,
    width = '40%',
    overlayColor = '#000000b3',
    transitionDuration = '0.4s',
    backgroundColor = '#fff',
    boxShadow = '0 4px 10px #0000001a'
}: SideProps) {

    const navigate = useNavigate();
    const [_, i18n] = useTranslation();
    return (
        <>
            {isOpen && (
                <div
                    className="offcanvas-overlay"
                    style={{ backgroundColor: overlayColor }}
                    onClick={onClose}
                ></div>
            )}
            <div className={`offcanvas offcanvas-${position} ${isOpen ? 'open' : ''}`}
                style={{
                    width,
                    transitionDuration,
                    backgroundColor,
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    boxShadow
                }}
            >
                <div className={`flex ${i18n.language == 'ar' ? 'justify-end float-end' : ''}`} >
                    <img
                        src={logo}
                        alt="logo"
                        className='rounded-full w-12 cursor-pointer'
                        onClick={() => { navigate('/'); onClose(); }}

                    />
                    <button className="offcanvas-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="offcanvas-content">{children}</div>
            </div>
        </>
    );
}