import React, {Component} from "react";
import "./styles/Todolist.scss";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Addform from "./Addform";
import Todoitem from "./Todoitem";

class Todolist extends Component {
	constructor(props) {
		super();
		this.state = {
			addform_opened: false,
			todos: []
		};
		this.url = "http://localhost";
		this.port = "3300";
		this.date_change = this.date_change.bind(this);
		this.open_addform = this.open_addform.bind(this);
		this.close_addform = this.close_addform.bind(this);
		this.toggle_todo = this.toggle_todo.bind(this);
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

	componentDidMount() {
		const target = (this.url + (this.port ? (":" + this.port) : "")) + "/api/v1/";
		fetch(target, {
	        method: "GET",
	        headers: {
	       		"Content-Type": "application/json"
	        }
		}).then(response => {
	        return response.json();
		}).then(data => {
			const retrieved_todos = data.response;
			this.setState({
				todos: retrieved_todos
			});
		}).catch(e => {
			console.error(e.message);
		});
	}

	toggle_todo(id) {
		if(id >= 0) {
			this.setState(prev_state => {
				const new_todos = prev_state.todos.map(t => {
					if(t.id == id)
						t.done = t.done == 1 ? 0 : 1;
					return t;
				});
				return {
					todos: new_todos
				}
			});
		}
	}

	render() {
		const mapped_todoitems = this.state.todos.map((todo, n) => {
			return (
				<Todoitem
					key={n}
					checked={todo.done === 1}
					content={todo.task}
					changed={(change) => {
						if(change == "click")
							this.toggle_todo(todo.id);
						//console.log(change);
					}}
				/>
			);
		});

		return (
			<div className="td-list">
				<div className="container">
					<div className="head">
						<p className="day">Day: </p>
						<input className="date" type="date" value="2021-01-29" onChange={this.date_change} />
						<p
							className="add"
							onClick={() => {
								if(this.state.addform_opened) this.close_addform();
								else this.open_addform();
							}}
						>
							<Icon className="icon" icon={faPlusCircle} /> Add new todo
						</p>
					</div>
					<Addform opened={this.state.addform_opened} finished={this.close_addform} />

					{mapped_todoitems}

				</div>
			</div>
		);
	}
}

export default Todolist;