import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Background } from "./screens/Layout/background";
import { Header } from "./screens/Header/index";
import Transition from "./screens/Layout/Transition";
import { Home } from "./screens/Home/index";
import { About } from "./screens/About/index";
import { Resume } from "./screens/Resume/index";
import { Contact } from "./screens/Contact/index";
import { AnimatePresence } from "framer-motion";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Background>
					<AnimatePresence mode="wait">
						<Transition />
						<Header />
						<Routes>
							<Route path="/home" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/resume" element={<Resume />} />
							<Route path="/contact" element={<Contact />} />
							<Route
								exact
								path="/"
								element={<Navigate to="/home" />}
							/>
						</Routes>
					</AnimatePresence>
				</Background>
			</BrowserRouter>
		</>
	);
}
