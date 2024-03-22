import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"; // import icons
// Swiper Slider
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

// Styles
import "./portfolio-item.css";

// -------------------

function PortfolioItem2({ project }: any) {
	return (
		<div className="portfolio-item-wrapper">
			<div className="portfolio-content">
				<div className="row">
					<div className="one-half width-40">
						<h2 className="entry-title section-title">
							{project.title}
						</h2>
						<p>
							{project.description ||
								"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad doloribus voluptatibus corrupti eos necessitatibus aperiam exercitationem doloremque molestias, ipsum dicta labore minus consectetur totam accusantium vel quisquam repudiandae maxime inventore"}
						</p>
						<p>Tech Stack: {project.techStack.join(", ")}</p>
						{
							<a
								href={project.liveurl}
								target="_blank"
								rel="noopener noreferrer"
								className="button"
								style={{ marginRight: "20px" }}>
								<FaExternalLinkAlt /> Live URL
							</a>
						}
						{
							<a
								href={project.githuburl}
								target="_blank"
								rel="noopener noreferrer"
								className="button">
								<FaGithub /> GitHub URL
							</a>
						}
					</div>
					<div className="one-half width-55 last">
						<div className="image-slider-wrapper relative block-right">
							<Swiper
								pagination={{ clickable: true }}
								loop={true}
								modules={[Pagination]}
								className="portfolio-slider">
								<SwiperSlide>
									<img
										src={project.image.url}
										alt="portfolio item 1"
									/>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PortfolioItem2;
