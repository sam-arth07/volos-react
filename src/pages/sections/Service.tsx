// Images
import servImg1 from "../../assets/images/services/service1.png";
import servImg2 from "../../assets/images/services/service2.png";
import servImg3 from "../../assets/images/services/service3.png";
import servImg4 from "../../assets/images/services/service4.png";
import servImg5 from "../../assets/images/services/service4.png";

// Data
import serviceData from "../../data/service.json";

// -----------------------
type ServiceProps = {
	services: any;
};
// -----------------------

function Service({ services }: ServiceProps) {
	const images: string[] = [servImg1, servImg2, servImg3, servImg4, servImg5];
	const classNames: string[] = [
		"service-holder",
		"service-holder m-right-0",
		"service-holder",
		"service-holder m-right-0",
		"service-holder m-bottom-0",
		"service-holder m-right-0 m-bottom-0",
	];
	return (
		<section id="service" className="section">
			<div className="section-wrapper block">
				<div className="content-1300">
					<div className="row">
						<div className="one-half width-55">
							<div className="services-wrapper">
								{services.map(
									(
										serv: {
											name: string;
											desc: string;
											image: { url: string };
											charge: string;
										},
										i: number
									) => (
										<div
											key={"serv-" + i}
											className={classNames[i]}>
											<img
												src={serv.image.url}
											/>
											<h4 className="service-title">
												{serv.name} <br></br>
												{serv.charge}
											</h4>
											<div className="service-text">
												{serv.desc}
											</div>
										</div>
									)
								)}
							</div>
						</div>

						<div className="one-half width-40 last">
							<h2 className="entry-title section-title">
								{serviceData.title}
							</h2>
							<p className="section-info">
								{serviceData.description}
							</p>
							{serviceData.paragraphes.map((parg, i) => (
								<p key={"p-" + i}>{parg}</p>
							))}

							<div className="button-group-wrapper">
								<a className="button">Download CV</a>
								<a href="#portfolio" className="button">
									Check My Portfolio
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Service;
