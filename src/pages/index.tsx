import { useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
// Sections
import HomeSection from "./sections/Home";
import Service from "./sections/Service";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";
import Portfolio from "./sections/portfolio";
import Skills from "./sections/Skills";

// Components
import Loader from "../components/Loader";

// -------------------

function Home() {
	const [loading, setLoading] = useState<boolean>(true);
	const [fadeOffLoader, setFadeOffLoader] = useState<boolean>(false);
	useEffect(() => {
		const loaderTimer = setTimeout(handleLoad, 750);
		return () => {
			clearTimeout(loaderTimer);
		};
	}, []);
	const handleLoad = () => {
		setFadeOffLoader(true);
		setTimeout(() => {
			setLoading(false);
		}, 500);
	};
	const {
		data: res,
		isLoading,
		error,
	} = useFetch(
		"https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
	);
	if (isLoading) return <div></div>;
	if (error) return <div></div>;
	const heroSection = (res as any).user;
	const resumeTimeline = (res as any).user.timeline;
	const services = (res as any).user.services;
	const skills = (res as any).user.skills;
	const contactData = (res as any).user;
	const projects = (res as any).user.projects;
	const yt = (res as any).user.youtube[0];
	return (
		<>
			{loading ? <Loader fadeOffLoader={fadeOffLoader} /> : <></>}

			<div>
				<div className="content-right">
					<div className="content-right-wrapper">
						<HomeSection heroSection={heroSection} />
						<Service services={services} />
						<Portfolio response={projects} youtube={yt} />
						<Resume resumeTimeline={resumeTimeline} />
						<Skills skills={skills} />
						<Contact contact={contactData} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
