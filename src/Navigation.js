import React from "react";
import "./styles/Navigation.scss";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faListAlt} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";

function Navigation() {
	const social = [
		{
			title: "Visit my Facebook page !",
			icon: faFacebook,
			link: "https://facebook.com/manjaka13"
		},
		{
			title: "Contribute this game's repository",
			icon: faGithub,
			link: "https://github.com/Manjaka13/rps-game"
		},
		{
			title: "Visit my LinkedIn page",
			icon: faLinkedin,
			link: "https://linkedin.com/mwlite/in/harijaona-rajaonson-9456481b5"
		}
	];
	const mapped_social = social.map((item, n) => {
		return (
			<li key={n}>
				<a className="link" href={item.link} title={item.title}>
					<Icon className="icon" icon={item.icon} />
				</a>
			</li>
		);
	});

	return (
		<div className="td-navigation">
			<div className="left">
				<div className="brand">
					<Icon className="icon" icon={faListAlt} />
				</div>
				<h1 className="title title-md">Todolist</h1>
			</div>
			<div className="right">
				<ul className="social">
					{mapped_social}
				</ul>
			</div>
		</div>
	)
}

export default Navigation;