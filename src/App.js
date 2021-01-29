import React, {Component} from "react";
import "./styles/App.scss";
import Navigation from "./Navigation";
import Todolist from "./Todolist";

class App extends Component {
	render() {
		return (
			<div className="td-app">
				<Navigation />
				<Todolist />
			</div>
		);
	}
}

export default App;