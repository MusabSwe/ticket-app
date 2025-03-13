import { useNavigate } from "react-router"

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <section className="mt-16" id="Not-found">
            <div className="text-center space-y-5">
                <p className="text-2xl font-bold text-[#3D474F]">Not Found page - 404</p>

                <button
                    className="bg-[#FF9F77] px-6 py-2 rounded text-white cursor-pointer transition  delay-75 duration-150 ease-in-out hover:bg-[#ffb477]"
                    onClick={() => { navigate('/') }}
                >
                    Home
                </button>
            </div>
        </section>
    )
}