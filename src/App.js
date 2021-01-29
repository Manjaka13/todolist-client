import React, {Component} from "react";
import "./styles/App.scss";
import Navigation from "./Navigation";

class App extends Component {
	render() {
		return (
			<div className="td-app">
				<Navigation />
			</div>
		);
	}
}

export default App;