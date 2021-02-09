import React, {Component} from "react";
import "./styles/Todolist.scss";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Addform from "./Addform";
import Todoitem from "./Todoitem";
import config from "./config";

class Todolist extends Component {
	constructor(props) {
		super();
		this.state = {
			addform_opened: false,
			todos: [],
			current_date: this.today()
		};
		this.date_change = this.date_change.bind(this);
		this.open_addform = this.open_addform.bind(this);
		this.close_addform = this.close_addform.bind(this);
		this.toggle_todo = this.toggle_todo.bind(this);
	}

	today() {
		const d = new Date();
		const y = d.getFullYear();
		let m = (d.getMonth() + 1);
		m = m < 10 ? "0" + m : m;
		let day = d.getDate();
		day = day < 10 ? ("0" + day) : day;
		return y + "-" + m + "-" + day;
	}

	date_change(e) {
		const date = e.target.value;
		this.setState({
			current_date: date
		});
		this.get_todos(date);
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

	thisdate_todos(todos, date) {
		let thisdate = [];
		todos.forEach(t => {
			if(t._date == date)
				thisdate.push(t);
		});
		return thisdate;
	}

	get_todos(date) {
		fetch(config.target, {
	        method: "POST",
	        headers: {
	       		"Content-Type": "application/json"
	        },
	        body: date ? JSON.stringify({date: date}) : undefined
		}).then(response => {
	        return response.json();
		}).then(data => {
			this.setState({
				todos: this.thisdate_todos(data.response, this.state.current_date)
			});
		}).catch(e => {
			console.error(e.message);
		});
	}

	componentDidMount() {
		this.get_todos(this.state.current_date);
	}

	toggle_todo(id) {
		if(id >= 0) {
			this.setState(prev_state => {
				const new_todos = prev_state.todos.map(t => {
					if(t.id == id) {
						t.done = t.done == 1 ? 0 : 1;
						fetch(config.target, {
					        method: "PATCH",
					        headers: {
					       		"Content-Type": "application/json"
					        },
					        body: JSON.stringify({
					        	id: id,
					        	done: t.done
					        })
						}).catch(e => {
							console.error(e.message);
						});
					}
					return t;
				});
				return {
					todos: new_todos
				}
			});
		}
	}

	delete_todo(id) {
		if(id && id >= 0) {
			fetch(config.target, {
		        method: "DELETE",
		        headers: {
		       		"Content-Type": "application/json"
		        },
		        body: JSON.stringify({id: id})
			}).then(response => {
				this.get_todos(this.state.current_date);
			}).catch(e => {
				console.error(e.message);
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
						else
							this.delete_todo(todo.id);
					}}
				/>
			);
		});

		return (
			<div className="td-list">
				<div className="container">
					<div className="head">
						<p className="day">Day: </p>
						<input className="date" type="date" value={this.state.current_date} onChange={this.date_change} />
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
					<Addform
						date={this.state.current_date}
						opened={this.state.addform_opened}
						finished={() => {
							this.get_todos(this.state.current_date);
							this.close_addform();
						}}
					/>

					{mapped_todoitems}

				</div>
			</div>
		);
	}
}

export default Todolist;