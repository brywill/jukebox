import React, { Component } from "react";
import SearchResults from "./SearchResults";

const api = 'http://ws.audioscrobbler.com/2.0/?method=track.search&limit=100&api_key=f7a213cd9d971aafdf285b4885f18916&format=json&track=';
let songArray = [];

class JukeboxContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			songs: []
		};

		this.submitRequest = this.submitRequest.bind(this);
		this.getResults = this.getResults.bind(this);
		this.buildSongList = this.buildSongList.bind(this);
	}

	buildSongList(tracks, q) {
		let wordArray = [];
		for (let i = 0; i < tracks.length; i++) {
			wordArray = tracks[i].name.toLowerCase().split(" ");
			if (wordArray.includes(q) && tracks[i].listeners > 10) {
				songArray.push({
					key: tracks[i].listeners + Math.random(),
					title: tracks[i].name,
					artist: tracks[i].artist,
					playcount: tracks[i].listeners
				});
			}
			wordArray = [];
		}
	}

	getResults(q, pageNum) {	
		fetch(api + q + '&page=' + pageNum)
			.then(response => response.json())
			.then(data => {
				let tracks = data.results.trackmatches.track;
				this.buildSongList(tracks, q);
				if (tracks.length > 0) {
					pageNum++;
					this.getResults(q, pageNum);
				} else {
					this.setState({ songs: songArray, count: songArray.length, term: q });
				}
			});
	}

	submitRequest(e) {
		e.preventDefault();
		var q = this._inputElement.value.toLowerCase();
		this.getResults(q, 1);
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