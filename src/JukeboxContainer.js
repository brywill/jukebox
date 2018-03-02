import React, { Component } from "react";

var xhr;

class JukeboxContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			song: [],
			term: "",
			count: -1,
		};

		this.processRequest = this.processRequest.bind(this);
		this.processResponse = this.processResponse.bind(this);
	}

	processRequest(e) {
		this.setState({
			term: this._inputElement.value.toLowerCase()
		});
		var url = "http://billboard.modulo.site/search/song?q=" + this.state.term;
		xhr = new XMLHttpRequest();
		xhr.addEventListener("readystatechange", this.processResponse, false);
		xhr.open("GET", url, true);
		xhr.send();
		this._inputElement.value = "";
		e.preventDefault();
	}

	processResponse() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var response = JSON.parse(xhr.responseText);
			var songArray = [];
			var wordArray = [];

			for (var i = 0; i < response.length; i++) {
				wordArray = response[i].song_name.toLowerCase().split(" ");
				if (wordArray.includes(this.state.term)) {
					songArray.push({
						key: response[i].song_id,
						title: response[i].song_name,
						artist: response[i].display_artist
					});
				}
				wordArray = [];
			}

			this.setState({
				song: songArray,
				count: songArray.length
			});
		}
	}

	listResults(song) {
		return <li key={song.key}>{song.title} - {song.artist}</li>
	}

	generateMsg() {
		var count = this.state.count;
		if (count === 0) {
			return <h3>There are zero results for {this.state.term}</h3>;
		} else if (count > 0) {
			return <h3>There are {this.state.count} results for {this.state.term}</h3>; 
		} else {
			return;
		}
	}

	render() {
		var results = this.state.song;
		var li = results.map(this.listResults);
		var msg = this.generateMsg();

		return (
			<div>
				<form onSubmit={this.processRequest}>
					<input ref={(a) => this._inputElement = a} placeholder="enter" id="term"></input>
			        <button type="submit">search</button>
			    </form>
			    {msg}
				<ul>{li}</ul>
			</div>
		);
	}
}


export default JukeboxContainer;