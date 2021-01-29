import React, {useState} from "react";
import "./styles/Todolist.scss";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Addform from "./Addform";

function Todolist() {
	const [addform_opened, set_addform_opened] = useState(false);
	const date_change = (e) => {

	};
	const open_addform = () => {
		set_addform_opened(() => true);
	};
	const close_addform = () => {
		set_addform_opened(() => false);
	};

	return (
		<div className="td-list">
			<div className="container">
				<div className="head">
					<p className="day">Day: </p>
					<input className="date" type="date" value="2021-01-29" onChange={date_change} />
					<p className="add" onClick={open_addform}>
						<Icon className="icon" icon={faPlusCircle} /> Add new todo
					</p>
				</div>
				<Addform opened={addform_opened} finished={close_addform} />
				<p>Culpa exercitation ullamco anim irure enim ut ad dolore dolor duis dolor minim esse aliqua est voluptate aliqua aute.</p>
			</div>
		</div>
	)
}

export default Todolist;