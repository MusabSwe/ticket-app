import { useTranslation } from 'react-i18next';
import overviewBg from '../assets/overview-bg.webp';

export default function Overview() {
    const [_, i18n] = useTranslation();
    return (
        <section
            id="overview"
            className="px-9 lg:px-18 xl:px-24 w-full h-56"
            style={{ backgroundImage: `url(${overviewBg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '100% 100%' }}
        >
            <h2 className='lg:text-2xl px-2 text-[#FF9F77] font-extrabold tracking-wide bg-white opacity-85 lg:w-96 md:w-80 sm:w-fit'>{i18n.language == 'ar' ? 'تذكرة' : 'Ticket'}</h2>
            <p className='text-[#FF9F77] text-sm tracking-wide bg-white opacity-85 p-2 lg:w-96 md:w-80 rounded-b-2xl sm:w-fit'>
                {i18n.language == 'en' ?
                    "Effortlessly book tickets for top events and must-visit destinations in Saudi Arabia. Discover concerts, festivals, and cultural experiences with a seamless reservation process."
                    :
                    'احجز تذاكرك بسهولة لأهم الفعاليات والوجهات السياحية المميزة في المملكة العربية السعودية. اكتشف الحفلات الموسيقية والمهرجانات والتجارب الثقافية مع عملية حجز سلسة.'
                }
            </p>
        </section>
    )
}