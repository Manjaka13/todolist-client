import React from "react";
import "./styles/Todoitem.scss";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

function Todoitem(props) {
	const content = props.content || null;
	if(content) {
		const checked = props.checked || false;
		const checked_className = checked ? "box" : "box box-unchecked"
		const handle_click = (e) => {
			if(typeof(props.changed) === "function") {
				if(e.target.className === "td-item")
					props.changed("click");
				else
					props.changed("delete");
			}

		};

		return (
			<div className="td-item" onClick={handle_click}>
				<div className="check">
					<div className={checked_className}></div>
				</div>
				<p className="text">{content}</p>
				<Icon className="delete" icon={faTrashAlt} />
			</div>
		);
	}
	return null;
}

export default Todoitem;