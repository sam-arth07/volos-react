import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import useFetch from "react-fetch-hook";
// Images
import signature from "../assets/images/signature.png";

// Data
import navData from "../data/navbar.json";

// --------------

type NavbarProps = {
	isLanding: boolean;
};

function Navbar({ isLanding }: NavbarProps) {
	const [navActive, setNavActive] = useState<boolean>(false);
	const [sectionNum, setSectionNum] = useState<number>(1);

	/**
	 * Hiding navigation on clicking a nav link (important in mobie view)
	 */

	const handleLinkClick = () => {
		setNavActive(false);
	};

	/**
	 * Change the number in the navigation depends on the number of section
	 *
	 * @param numToActivate number of activated section
	 */
	const handleActive = (numToActivate: number) => {
		setSectionNum(numToActivate);
	};

	/**
	 * Toggle menu on clicking on menu btn
	 */
	const handleMenuBtnClick = () => {
		setNavActive(!navActive);
	};

	const {
		data: result,
		isLoading,
		error,
	} = useFetch(
		"https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
	);
	if (isLoading) return <div></div>;
	if (error) return <div></div>;
	const name: string = (result as any).user.about.name
	const role: string = (result as any).user.about.title
	const phno: string = (result as any).user.about.phoneNumber
	const email: string = (result as any).user.email

	const navInfo = [
		{
			title: "NAME",
			role: name,
		},
		{
			title: "ROLE",
			role: role,
		},
		{
			title: "EMAIL",
			role: email,
		},
		{
			title: "PHONE",
			role: phno,
		},
	];
	return (
		<div className="content-left">
			<div className="content-left-wrapper">
				<header>
					<div className="toggle-holder">
						<div
							id="toggle"
							onClick={handleMenuBtnClick}
							className={navActive ? "on" : ""}>
							<div className="menu-line"></div>
						</div>
					</div>

					<div className="top-pagination">
						<div className="current-num">
							<span>0{sectionNum}</span>
						</div>
						<div className="pagination-div"></div>
						<div className="total-pages-num">
							0{navData.navLinks.length}
						</div>
					</div>

					<div
						className={
							navActive ? "menu-holder open" : "menu-holder"
						}>
						<div className="menu-wrapper relative">
							<nav id="header-main-menu">
								<ul className="main-menu sm sm-clean">
									{navData.navLinks.map((link, i) => (
										<li
											key={"nav-" + i}
											style={{ cursor: "pointer" }}>
											<ScrollLink
												activeClass="current"
												smooth
												spy
												to={link.to}
												onClick={handleLinkClick}
												onSetActive={() =>
													handleActive(i + 1)
												}>
												{link.text}
											</ScrollLink>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</div>

					<div className="my-info-wrapper">
						{navInfo.map((info: any, i: number) => (
							<div className="my-info" key={"nav-info-" + i}>
								<p className="my-info-title">
									{navInfo[i].title}
								</p>
								<p className="my-info-content">
									{navInfo[i].role}
								</p>
							</div>
						))}
						<img
							className="my-info-signature"
							src={signature}
							alt=""
						/>
					</div>

					<div className="big-num">
						<div className="current-big-num">0{sectionNum}</div>
						<div className="icon-scroll"></div>
					</div>
				</header>
			</div>
		</div>
	);
}

export default Navbar;
