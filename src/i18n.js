import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locale/ar.json";
import en from "./locale/en.json";

const resources = {
    en: {
        translation: en
    },
    ar: {
        translation: ar
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('lang') ? localStorage.getItem('lang') : "ar",
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;