import { useState } from "react";

// Plugins
import { motion, AnimatePresence } from "framer-motion";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// UI Components
import PortfolioItem1 from "./items/PortfolioItem1";
import PortfolioItem2 from "./items/PortfolioItem2";
import PortfolioItem3 from "./items/PortfolioItem3";

// --> Icon Images
import backArrow from "../../../assets/images/close-left-arrow.png";
import closeIcon from "../../../assets/images/close.png";

// Styles
import "./portfolio.css";

// Define the type for a project
interface Project {
	title: string;
	image: { url: string };
	description: string;
	liveurl: string;
	githuburl: string;
	techStack: string[];
	enabled: boolean;
	sequence: number;
	category?: string;
	action?: { type: string; number: number };
}
// Define the type for a youtube video
interface Youtube {
	url?: string;
	title?: string;
	sequence?: number;
	image?: { url: string };
	embedId: string;
	enabled: boolean;
	_id: string;
}
// --------------

function Portfolio({
	response,
	youtube,
}: {
	response: Project[];
	youtube: Youtube;
}) {
	// Portfolio item to be shown (change rendered different components in item folder)
	const [portfolioItem, setPortfolioItem] = useState<number>(0);
	// Portfolio item to be shown as a popup
	const [openPortfolio, setOpenPortfolio] = useState<number>(0);

	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<string>("All");

	// Function to sort projects
	function sortProjects(projects: Project[]): Project[] {
		return projects.sort((a, b) => a.sequence - b.sequence);
	}
	const possibleActions = ["popup", "item"];
	// Function to add category and action to projects
	function addFieldsToProjects(projects: Project[]): Project[] {
		return projects.map((project, index) => {
			// Add the category field based on the techStack
			project.category = project.techStack.join(", ");

			// Add the action field
			project.action = {
				type: possibleActions[index % 2],
				number: index + 1, // Assuming the number is based on the index of the project
			};

			return project;
		});
	}

	response = sortProjects(response);
	response = addFieldsToProjects(response);
	const filteredProjects: Project[] =
		selectedCategory === "All"
			? response
			: response.filter((item: Project) =>
					item.category?.includes(selectedCategory)
			  );
	const filterCategory: string[] = ["All"];
	response.forEach((project: Project) => {
		project.techStack.forEach((tech: string) => {
			if (!filterCategory.includes(tech.trim())) {
				filterCategory.push(tech.trim());
			}
		});
	});

	/**
	 * Toggle filter buttons menu display
	 */
	const handleToggleFilterBtns = () => {
		setIsFilterOpen(!isFilterOpen);
	};

	/**
	 * Show images that have category matches the given, and
	 * remove the images with different category.
	 *
	 * if the category equals `all`, it will show all images
	 *
	 * @param category images category to be shown
	 */
	const handleFilterImages = (category: string) => {
		setSelectedCategory(category);
	};

	/**
	 * Opening portfolio item that the user clicked
	 *
	 * @param num portfolio item to be open
	 */
	const handleOpenItem = (num: number) => {
		const element: HTMLElement | null =
			document.getElementById("portfolio-wrapper");
		if (element) {
			element.scrollIntoView();
		}

		setPortfolioItem(num);
	};

	/**
	 * Close Opened portfolio item and show the portfolio grid images
	 */
	const handlCloseItem = () => {
		setPortfolioItem(0);
	};

	/**
	 *  Open a popup of the item with the given number passed to the function
	 *
	 * @param num Pop up item number to be open
	 */
	const handleOpenPopup = (num: number) => {
		setOpenPortfolio(num);
	};

	/**
	 * Closed the opened items by reseting the {openPortfolio} variable to 0
	 */
	const handleClosePopup = () => {
		setOpenPortfolio(0);
	};

	return (
		<section id="portfolio" className="section">
			<div className="section-wrapper block">
				<div className="content-1300">
					<div id="portfolio-wrapper" className="relative">
						{portfolioItem === 0 ? (
							<>
								<div
									className="category-filter"
									onClick={handleToggleFilterBtns}>
									<div className="category-filter-icon"></div>
								</div>
								<motion.div
									variants={{
										expanded: {
											height: "auto",
											paddingTop: "24px",
											paddingBottom: "24px",
											opacity: 1,
											transition: {
												duration: 0.3,
											},
										},
										collapsed: {
											height: 0,
											paddingTop: 0,
											paddingBottom: 0,
											opacity: 1,
											transition: {
												duration: 0.3,
											},
										},
									}}
									animate={
										isFilterOpen ? "expanded" : "collapsed"
									}
									initial="collapsed"
									className={
										"category-filter-list button-group filters-button-group visible"
									}>
									{filterCategory.map((cat, i) => (
										<div
											key={"filter-btn-" + i}
											className={
												"button " +
												(selectedCategory === cat
													? "is-checked"
													: "")
											}
											onClick={() =>
												handleFilterImages(cat)
											}>
											{cat}
										</div>
									))}
								</motion.div>
								<div className="portfolio-load-content-holder"></div>
								<motion.div
									className="grid"
									id="portfolio-grid"
									layout>
									{filteredProjects.map(
										(item, i) =>
											item.enabled && (
												<AnimatePresence
													key={"portfolio-item-" + i}>
													<motion.div
														// layout
														animate={{
															scale: 1,
															opacity: 1,
														}}
														initial={{
															scale: 0,
															opacity: 0,
														}}
														exit={{
															scale: 0,
															opacity: 0,
														}}
														transition={{
															duration: 0.5,
														}}
														id={"p-item-" + (i + 1)}
														className="grid-item element-item p-one-third">
														<a
															className="item-link ajax-portfolio"
															style={{
																position:
																	"relative",
															}}
															data-id={i + 1}
															onClick={() => {
																// according to action type we wil fire the function
																if (
																	item?.action
																		?.type ===
																		"item" &&
																	typeof item
																		?.action
																		?.number ===
																		"number"
																) {
																	handleOpenItem(
																		item
																			.action
																			.number
																	);
																} else if (
																	item?.action
																		?.type ===
																		"popup" &&
																	typeof item
																		?.action
																		?.number ===
																		"number"
																) {
																	handleOpenPopup(
																		item
																			.action
																			.number
																	);
																}
															}}>
															<img
																src={
																	item.image
																		.url
																}
																alt=""
															/>
															<div className="portfolio-text-holder">
																<div className="portfolio-text-wrapper">
																	<p className="portfolio-text">
																		{
																			item.title
																		}
																	</p>
																	<p className="portfolio-cat">
																		Tech
																		Stack:{" "}
																		{
																			item.category
																		}
																	</p>
																</div>
															</div>
														</a>
													</motion.div>
												</AnimatePresence>
											)
									)}
								</motion.div>
							</>
						) : (
							// Portfolio items to be opened as a separate component
							<div className="portfolio-load-content-holder">
								<div
									className="close-icon"
									role="button"
									onClick={handlCloseItem}>
									<img src={backArrow} alt="back arrow" />
								</div>
								{filteredProjects.map((project, i) => {
									if (
										(portfolioItem - 1) % 3 <= 1 &&
										portfolioItem === project.action?.number
									) {
										return (
											<div key={i}>
												{project && (
													<PortfolioItem2
														project={project}
													/>
												)}
											</div>
										);
									}
								})}
								{filteredProjects.map((project, i) => {
									if (
										(portfolioItem - 1) % 3 === 2 &&
										portfolioItem === project.action?.number
									) {
										return (
											<div key={i}>
												{project && (
													<PortfolioItem1
														project={project}
													/>
												)}
											</div>
										);
									}
								})}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Popups portfolio items */}
			<Popup
				open={openPortfolio !== 0}
				closeOnDocumentClick
				onClose={handleClosePopup}
				modal>
				<div className="my-popup">
					<div
						className="close-popup-btn"
						role="button"
						onClick={handleClosePopup}>
						<img src={closeIcon} alt="close icon" />
					</div>
					{(openPortfolio % 3) + 1 === 1 ? (
						<p
							className="block-right poped-up-item"
							onClick={close}>
							<iframe
								src={
									youtube.embedId
										? "https://www.youtube.com/embed/".concat(
												youtube.embedId
										  )
										: "https://www.youtube.com/embed/QTbDSoddSdA"
								}
								width="100%"
								allow="autoplay; fullscreen"></iframe>
						</p>
					) : (openPortfolio % 3) + 1 === 2 ? (
						<div className="popup-image-box">
							{filteredProjects[openPortfolio - 1] && (
								<img
									src={
										filteredProjects[openPortfolio - 1]
											.image.url
									}
									alt="portfolio image"
								/>
							)}
						</div>
					) : (openPortfolio % 3) + 1 === 3 ? (
						<div className="popup-image-box">
							{filteredProjects[openPortfolio - 1] && (
								<img
									src={
										filteredProjects[openPortfolio - 1]
											.image.url
									}
									alt="portfolio image"
								/>
							)}
						</div>
					) : (
						<></>
					)}
				</div>
			</Popup>
		</section>
	);
}

export default Portfolio;
