import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollTopProps {
    children: ReactNode
}

const ScrollTop = ({ children }: ScrollTopProps) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [location]);

    return <> {children}</>;
}

export default ScrollTop;