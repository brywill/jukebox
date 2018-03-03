import React, { Component } from "react";

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.listResults = this.listResults.bind(this);
		this.writeMsg = this.writeMsg.bind(this);
	}

	listResults(obj) {
		return <tr key={obj.key}><td>{obj.title}</td><td>{obj.artist}</td></tr>
	}

	writeMsg(str, n) {
		return <h2>There are {n} results for <em>{str}</em></h2>
	}

	render() {
		var results = this.props.songlist;
		var tr = results.map(this.listResults);

		if (this.props.searchterm) {
			var msg = this.writeMsg(this.props.searchterm, this.props.searchcount);
		}

		return (
			<div>
				{msg}
				<table width="100%">
					<thead>
						<tr>
							<th>Song</th>
							<th>Artist</th>
						</tr>
					</thead>
					<tbody>
						{tr}
					</tbody>
				</table>
			</div>
		);
	}
}

export default SearchResults;