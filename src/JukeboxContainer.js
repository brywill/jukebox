import React, { Component } from "react";
import SearchResults from "./SearchResults";

const api = 'http://ws.audioscrobbler.com/2.0/?method=track.search&limit=1000&api_key=f7a213cd9d971aafdf285b4885f18916&format=json&track=';


class JukeboxContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			songs: []
		};

		this.submitRequest = this.submitRequest.bind(this);
	}

	submitRequest(e) {
		e.preventDefault();
		var q = this._inputElement.value.toLowerCase();

		fetch(api + q)
			.then(response => response.json())
			.then(data => {
				let tracks = data.results.trackmatches.track;
				let songArray = [];
				let wordArray = [];

				for (let i = 0; i < tracks.length; i++) {
					wordArray = tracks[i].name.toLowerCase().split(" ");
					if (wordArray.includes(q) && tracks[i].listeners > 100000) {
						songArray.push({
							key: tracks[i].listeners,
							title: tracks[i].name,
							artist: tracks[i].artist,
							playcount: tracks[i].listeners
						});
					}
					wordArray = [];
				}
				this.setState({ songs: songArray, count: songArray.length, term: q });
			});
		this._inputElement.value = "";
	}

	render() {
		return (
			<div>
				<form onSubmit={this.submitRequest}>
					<input ref={(a) => this._inputElement = a} placeholder="enter"></input>
			        <button type="submit">search</button>
			    </form>
			    <SearchResults searchcount={this.state.count} searchterm={this.state.term} songlist={this.state.songs} />
			</div>
		);
	}
}

export default JukeboxContainer;