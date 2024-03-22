// Data
import homeData from "../../data/home.json";
// ---------------
type HomeProps = {
	heroSection: any;
};
// ---------------
function Home({ heroSection }: HomeProps) {
	const socialHandles = heroSection.social_handles;
	return (
		<section id="home" className="section full-width-section">
			<div className="section-wrapper block">
				<div className="home-left-part">
					<p className="site-des">{homeData.welcomeText}</p>
					<h1 className="entry-title">{heroSection.about.name}</h1>
					<p className="site-info">{heroSection.about.subTitle}</p>

					<div className="social-links">
						{socialHandles.map(
							(
								link: {
									url: string;
									platform: string;
									image: { url: string };
									_id: string;
									enabled: boolean;
								},
								i: number
							) => {
								return (
									<>
										{link.enabled && (
											<a key={link._id} href={link.url}>
												<img
													key={"social-img-link-" + i}
													src={link.image.url}
													style={{ width: "20px" }}
												/>
												{link.platform}
											</a>
										)}
									</>
								);
							}
						)}
					</div>
				</div>
				<div
					key={heroSection.about.avatar._id}
					className="home-right-part"
					style={{
						backgroundImage: `url(${
							heroSection.about.avatar.url
						})`,
					}}></div>
			</div>
		</section>
	);
}

export default Home;
