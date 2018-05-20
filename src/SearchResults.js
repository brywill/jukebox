import React, { Component } from "react";

class SearchResults extends Component {
	constructor(props) {
		super(props);

		this.state = { searched: false }

		this.listResults = this.listResults.bind(this);
		this.writeMsg = this.writeMsg.bind(this);
	}

	listResults(obj) {
		return <tr key={obj.key}><td>{obj.title}</td><td>{obj.artist}</td><td>{obj.playcount}</td></tr>
	}

	writeMsg(str, n) {
		return <h2>There are {n} results for <em>{str}</em></h2>
	}

	render() {

		if (this.props.searchterm) {
			var results = this.props.songlist;
			var tr = results.map(this.listResults);
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
							<th>Streams</th>
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