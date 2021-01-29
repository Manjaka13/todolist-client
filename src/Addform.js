import React, {useState} from "react";
import "./styles/Addform.scss";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import config from "./config";
import loading from "./loading.gif";

function Addform(props) {
	const opened = props.opened || false;
	const addform_className = opened ? "td-addform" : "td-addform td-addform-closed";
	const [todoname, set_todoname] = useState("");
	const [adding, set_adding] = useState(false);
	const todoname_change = (e) => {
		if(opened)
			set_todoname(() => e.target.value);
	};
	const submit = () => {
		if(opened && todoname.length > 2) {
			set_adding(() => true);
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
				//console.log(data);
				if(typeof(props.finished) == "function")
					props.finished();
				set_adding(() => false);
			}).catch(e => {
				console.error(e.message);
				set_adding(() => false);
			});
		}
		set_todoname(() => "");
	};
	if(!opened && todoname.length > 0)
		set_todoname(() => "");
	const loading_className = adding ? "loading" : "loading loading-hidden";

	return (
		<div className={addform_className}>
			<input className="text input" type="text" placeholder="Enter todo name" value={todoname} onChange={todoname_change} />
			<button className="text submit" onClick={submit}>
				<Icon className="icon" icon={faCaretRight} /> Submit <img className={loading_className} src={loading} alt="..." />
			</button>
		</div>
	);
}

export default Addform;