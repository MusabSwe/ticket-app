import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import logo from '../assets/Ticket-logo.png';
import { LuLinkedin } from 'react-icons/lu';
import { FiFacebook } from 'react-icons/fi';
import { AiOutlineYoutube } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const [_, i18n] = useTranslation();
    const year = new Date().getFullYear();

    return (
        <section
            className="bg-[#3D474F] p-5 px-7 lg:px-18"
            style={{ borderTopRightRadius: '40px' }}
            id='footer'
        >
            <div>
                <div className='flex flex-row flex-wrap justify-between '>
                    <div>
                        <img src={logo} alt="Logo" className='w-14 h-14 rounded-full' />
                    </div>
                    <div>
                        <h3 className={`text-white text-sm mb-1 hover:text-[#FF9F77] ${i18n.language == 'ar' ? 'tracking-tighter' : ''}`} >
                            {i18n.language == 'ar' ?
                                'حسابات التواصل الاجتماعي'
                                :
                                'Social Networks'
                            }

                        </h3>
                        <ul className='flex space-x-5'>
                            <li className='bg-white md:w-8 md:h-8 w-6 h-6 rounded flex justify-center items-center transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                                <a href="https://www.instagram.com/" target='_blank'>
                                    <FaInstagram className='md:w-6 md:h-6' />
                                </a>
                            </li>
                            <li className='bg-white md:w-8 md:h-8 w-6 h-6 rounded flex justify-center items-center transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                                <a href="https://x.com/" target='_blank'>
                                    <FaXTwitter className='md:w-6 md:h-6' />
                                </a>
                            </li>
                            <li className='bg-white md:w-8 md:h-8 w-6 h-6  rounded flex justify-center items-center transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                                <a href="https://www.linkedin.com/" target='_blank'>
                                    <LuLinkedin className='md:w-6 md:h-6' />
                                </a>
                            </li>
                            <li className='bg-white md:w-8 md:h-8 w-6 h-6  rounded flex justify-center items-center transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                                <a href="https://www.facebook.com/" target='_blank'>
                                    <FiFacebook className='md:w-6 md:h-6' />
                                </a>
                            </li>
                            <li className='bg-white md:w-8 md:h-8 w-6 h-6  rounded flex justify-center items-center transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77] '>
                                <a href="https://www.youtube.com/" target='_blank'>
                                    <AiOutlineYoutube className='md:w-6 md:h-6' />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex justify-between mt-5'>
                    <p className='text-sm text-white transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                        {i18n.language == 'en' ?
                            "Terms and Conditions"
                            :
                            "الشروط والأحكام"
                        }
                    </p>
                    <p className='text-sm text-white transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                        {i18n.language == 'en' ?
                            "Privacy Policy"
                            :
                            "سياسة الخصوصية"
                        }
                    </p>
                    <p className='text-sm text-white transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                        {i18n.language == 'en' ?
                            "About Ticket"
                            :
                            "حول التذكرة"
                        }
                    </p>
                </div>
                <hr className='border-white my-5' />
                <div className='flex flex-wrap flex-row justify-between'>
                    <p className='text-xs text-white transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                        {i18n.language == 'en' ?
                            'Powered by Ticket'
                            :
                            `مدعوم من تذكرة`
                        }
                    </p>
                    <p className='text-xs text-white transition  delay-75 duration-150 ease-in-out hover:text-[#FF9F77]'>
                        {i18n.language == 'en' ?
                            `All Rights Reserved © Ticket ${year}`
                            :
                            `جميع الحقوق محفوظة © تذكرة ${year}`
                        }
                    </p>
                </div>
            </div>
        </section>
    )
}