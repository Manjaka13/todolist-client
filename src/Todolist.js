import React, {Component} from "react";
import "./styles/Todolist.scss";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Addform from "./Addform";

class Todolist extends Component {
	constructor(props) {
		super();
		this.state = {
			addform_opened: false
		};
		this.date_change = this.date_change.bind(this);
		this.open_addform = this.open_addform.bind(this);
		this.close_addform = this.close_addform.bind(this);
	}

	date_change(e) {

	}
	
	open_addform() {
		this.setState({
			addform_opened: true
		});
	}

	close_addform() {
		this.setState({
			addform_opened: false
		});
	}

	render() {
		return (
			<div className="td-list">
				<div className="container">
					<div className="head">
						<p className="day">Day: </p>
						<input className="date" type="date" value="2021-01-29" onChange={this.date_change} />
						<p className="add" onClick={this.open_addform}>
							<Icon className="icon" icon={faPlusCircle} /> Add new todo
						</p>
					</div>
					<Addform opened={this.state.addform_opened} finished={this.close_addform} />
					<p>Culpa exercitation ullamco anim irure enim ut ad dolore dolor duis dolor minim esse aliqua est voluptate aliqua aute.</p>
				</div>
			</div>
		);
	}
}

export default Todolist;