import React, {useState} from "react";
import "./styles/Addform.scss";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import config from "./config";

function Addform(props) {
	const opened = props.opened || false;
	const addform_className = opened ? "td-addform" : "td-addform td-addform-closed";
	const [todoname, set_todoname] = useState("");
	const todoname_change = (e) => {
		if(opened)
			set_todoname(() => e.target.value);
	};
	const submit = () => {
		if(opened && todoname.length > 2) {
			fetch(config.target, {
		        method: "PUT",
		        headers: {
		       		"Content-Type": "application/json"
		        },
		        body: JSON.stringify({
		        	task: todoname,
		        	date: props.date
		        })
			}).then(response => {
		        return response.json();
			}).then(data => {
				console.log(data);
				if(typeof(props.finished) == "function")
					props.finished();
			}).catch(e => {
				console.error(e.message);
			});
		}
		set_todoname(() => "");
	};
	if(!opened && todoname.length > 0)
		set_todoname(() => "");

	return (
		<div className={addform_className}>
			<input className="text input" type="text" placeholder="Enter todo name" value={todoname} onChange={todoname_change} />
			<button className="text submit" onClick={submit}><Icon className="icon" icon={faCaretRight} /> Submit</button>
		</div>
	)
}

export default Addform;