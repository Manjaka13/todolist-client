import React from "react";
import "./styles/Todolist.scss";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

function Todolist() {
	return (
		<div className="td-list">
			<div className="container">
				<div className="head">
					<p className="day">Day: </p>
					<input className="date" type="date" value="2021-01-29" />
					<p className="add"><Icon className="icon" icon={faPlusCircle} /> Add new todo</p>
				</div>
			</div>
		</div>
	)
}

export default Todolist;