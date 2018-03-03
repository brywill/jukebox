import React, { Component } from "react";


class SearchResults extends Component {
	constructor(props, context) {
		super(props, context);
		this.generateMsg = this.generateMsg.bind(this);
		this.listResults = this.listResults.bind(this);
	}

	generateMsg(str, n) {
		console.log("generating")
		if (n === 0) {
			return "No results for " + str;
		} else if (n > 0) {
			return n + " results for " + str;
		}
	}

	listResults(obj) {
		return <li key={obj.key}>{obj.title} - {obj.artist}</li>
	}

	render() {
		var results = this.props.songlist;
		var li = results.map(this.listResults);

		var word = this.props.searchterm;
		var count = this.props.songcount;
		console.log(results, word, count)
		var msg = this.generateMsg(word, count);
		console.log(msg);

		return (
			<div>
				<h3>{msg}</h3>
				<ul>{li}</ul>
			</div>
		);
	}
}

export default SearchResults;