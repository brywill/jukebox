import React from "react";
import ReactDOM from "react-dom";
import JukeboxContainer from "./JukeboxContainer";

var destination = document.querySelector("#container");

ReactDOM.render(
	<div>
		<JukeboxContainer />
	</div>,
	destination
);