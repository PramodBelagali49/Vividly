import { Link } from "react-router-dom"
import Logo from "../Logo"

function Footer() {
    return (
        <footer className="w-full bottom-0 py-6 bg-gray-800 text-white border-t border-gray-600">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <Link to='/'>
                    <Logo width="100px" />
                </Link>
                <p className="text-sm">&copy; 2025. All Rights Reserved by Pramod_b2</p>
                <a
                    href="https://github.com/PramodBelagali49"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                >
                    Made by pramod_b2
                </a>
            </div>
        </footer>
    );
}
export default Footer