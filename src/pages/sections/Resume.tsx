// Images
import signature from "../../assets/images/signature2.png";

// Data
import resumeData from "../../data/resume.json";
import { markdownToHTML } from "../../utils/converter";

// -------------
type ResumeProps = {
	resumeTimeline: any;
};
// -------------

function Resume({ resumeTimeline }: ResumeProps) {
	// Sort the timeline by date
	resumeTimeline.sort(function (a: any, b: any) {
		return (
			new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
		);
	});
	return (
		<section id="resume" className="section">
			<div className="section-wrapper block">
				<div className="content-1300">
					<div className="row">
						<div className="one-half width-55">
							<section>
								<h2 className="entry-title section-title">
									Experience
								</h2>

								<ul className="timeline-holder">
									{/* map the timeline and display the company name,startDate and extra info for each experience*/}
									{resumeTimeline.map(
										(
											exp: {
												summary: string;
												startDate: string;
												company_name: string;
												bulletPoints: string[];
												jobTitle: string;
												_id: string;
												enabled: boolean;
												forEducation: boolean;
												jobLocation: string;
											},
											i: number
										) =>
											exp.enabled &&
											!exp.forEducation && (
												<li
													key={exp._id}
													className="timeline-event">
													<h2 className="entry-title section-title">
														{exp.company_name}
													</h2>
													<span className="timeline-circle"></span>
													<div
														className="timeline-event-content"
														style={{
															marginTop: "-25px",
															marginLeft: "25px",
														}}
														dangerouslySetInnerHTML={{
															__html:
																"Job Role : " +
																exp.jobTitle +
																"<br/>Location : " +
																exp.jobLocation +
																"<br/><br/>Key Responsibilities - " +
																`${
																	exp.summary &&
																	exp.summary
																}`,
														}}></div>
													<ul
														className="timeline-holder"
														style={{
															listStyleType:
																"disc",
														}}>
														{exp.bulletPoints.map(
															(bp, i) => {
																return (
																	bp && (
																		<li
																			key={
																				"bp-" +
																				i
																			}>
																			<div
																				style={{
																					marginLeft:
																						"25px",
																				}}
																				className="timeline-event-content"
																				dangerouslySetInnerHTML={{
																					__html: bp,
																				}}></div>
																		</li>
																	)
																);
															}
														)}
													</ul>
													<div className="timeline-event-date">
														{exp.startDate.slice(
															0,
															7
														)}
													</div>
												</li>
											)
									)}
								</ul>
							</section>
							<br />
							<br />
							<section>
								<h2 className="entry-title section-title">
									Education
								</h2>

								<ul className="timeline-holder">
									{/* map the timeline and display the company name,startDate and extra info for each experience*/}
									{resumeTimeline.map(
										(
											exp: {
												summary: string;
												startDate: string;
												company_name: string;
												bulletPoints: string[];
												jobTitle: string;
												_id: string;
												enabled: boolean;
												forEducation: boolean;
												jobLocation: string;
											},
											i: number
										) =>
											exp.enabled &&
											exp.forEducation && (
												<li
													key={exp._id}
													className="timeline-event">
													<h2 className="entry-title section-title">
														{exp.company_name}
													</h2>
													<span className="timeline-circle"></span>
													<div
														className="timeline-event-content"
														style={{
															marginTop: "-25px",
															marginLeft: "25px",
														}}
														dangerouslySetInnerHTML={{
															__html:
																"Role : " +
																exp.jobTitle +
																"<br/>Location : " +
																exp.jobLocation +
																"<br/><br/>Key Learnings - " +
																`${
																	exp.summary &&
																	exp.summary
																}`,
														}}></div>
													<ul
														className="timeline-holder"
														style={{
															listStyleType:
																"disc",
														}}>
														{exp.bulletPoints.map(
															(bp, i) => {
																return (
																	bp && (
																		<li
																			key={
																				"bp-" +
																				i
																			}>
																			<div
																				style={{
																					marginLeft:
																						"25px",
																				}}
																				className="timeline-event-content"
																				dangerouslySetInnerHTML={{
																					__html: bp,
																				}}></div>
																		</li>
																	)
																);
															}
														)}
													</ul>
													<div className="timeline-event-date">
														{exp.startDate.slice(
															0,
															7
														)}
													</div>
												</li>
											)
									)}
								</ul>
							</section>
						</div>

						<div className="one-half width-40 last">
							<h2 className="entry-title section-title">
								{resumeData.coverLetter.title}
							</h2>
							<p className="section-info">
								{resumeData.coverLetter.description}
							</p>
							{resumeData.coverLetter.paragraphes.map(
								(parg, i) => (
									<p key={"parg-" + i}>{parg}</p>
								)
							)}

							<img
								className="my-signature"
								src={signature}
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Resume;
