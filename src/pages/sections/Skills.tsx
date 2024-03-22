import { useRef, useEffect, useState } from "react";

// Plugins
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Data
import skillsData from "../../data/skills.json";

// ------------------
type SkillsProps = {
	skills: any;
};

function Skills({ skills }: SkillsProps) {
	const circleProgressBarRef = useRef<HTMLDivElement>(null);
	const [circleProgress, setCircleProgress] = useState<number[]>(
		new Array(skillsData.circleProgress.length).fill(0)
	);
	const normalProgressBarRef = useRef<HTMLDivElement>(null);
	const [normalProgress, setNormalProgress] = useState<number[]>(
		new Array(skillsData.horizontalProgress.length).fill(0)
	);

	useEffect(() => {
		const progressBarYPosition =
			circleProgressBarRef.current!.getBoundingClientRect().top +
			window.scrollY;
		const handleScroll = () => {
			if (window.scrollY >= progressBarYPosition) {
				setCircleProgress(
					skillsData.circleProgress.map(
						(progress) => progress.percentage
					)
				);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [circleProgress]);

	useEffect(() => {
		const progressBarYPosition =
			normalProgressBarRef.current!.getBoundingClientRect().top +
			window.scrollY;
		const handleScroll = () => {
			if (window.scrollY >= progressBarYPosition) {
				setNormalProgress(
					skillsData.horizontalProgress.map(
						(progress) => progress.percentage
					)
				);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [normalProgress]);

	//sorting recived skills data by percentage in descending order to display the top 4 skills in the circle progress bar
	skills.sort(function (a: any, b: any) {
		return b.percentage - a.percentage;
	});

	return (
		<section id="skills" className="section">
			<div className="section-wrapper block">
				<div className="content-1300">
					<div className="row m-bottom-60">
						<h2 className="entry-title section-title">
							{skillsData.title}
						</h2>

						<div className="skill-circle-holder">
							{skills.slice(0, 4).map(
								(
									prog: {
										name: string;
										percentage: string;
									},
									i: number
								) => (
									<div
										key={"circle-prog-" + i}
										className="skill-circle">
										<div ref={circleProgressBarRef}>
											<CircularProgressbar
												value={Number(prog.percentage)}
												text={`${prog.percentage}%`}
												counterClockwise
												strokeWidth={15}
												styles={buildStyles({
													textColor: "#F37B83",
													textSize: 18,
													pathColor: "#F37B83",
													trailColor: "#554247",
													strokeLinecap: "butt",
													pathTransitionDuration: 2,
												})}
											/>
										</div>
										<p className="skill-circle-text">
											{prog.name}
										</p>
									</div>
								)
							)}
						</div>
					</div>
          
					<div className="row" ref={normalProgressBarRef}>
						<div className="one-half">
							<div className="skills-holder">
								{skills.slice(4, skills.length / 2 + 2).map(
									(
										skill: {
											name: string;
											percentage: string;
										},
										i: number
									) => (
										<div
											key={"skill-" + i}
											className="skill-holder">
											<div className="skill-text">
												<div className="skill">
													<div
														className="skill-fill"
														style={{
															width: `${skill.percentage}%`,
														}}></div>
												</div>
												<span>{skill.name}</span>
											</div>
											<div className="skill-percent">
												{skill.percentage}%
											</div>
										</div>
									)
								)}
							</div>
						</div>

						<div className="one-half last">
							<div className="skills-holder sec-skills-holder">
								{skills
									.slice(2 + Math.ceil(skills.length / 2))
									.map(
										(
											skill: {
												name: string;
												percentage: string;
											},
											i: number
										) => (
											<div
												key={"skill2-" + i}
												className="skill-holder">
												<div className="skill-text">
													<div className="skill">
														<div
															className="skill-fill"
															style={{
																width: `${skill.percentage}%`,
															}}></div>
													</div>
													<span>{skill.name}</span>
												</div>
												<div className="skill-percent">
													{skill.percentage}%
												</div>
											</div>
										)
									)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Skills;
