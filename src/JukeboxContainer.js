import React, { Component } from "react";
import SearchResults from "./SearchResults";

const api = 'http://billboard.modulo.site/search/song?q=';


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
				console.log(data);
				let songArray = [];
				let wordArray = [];

				for (let i = 0; i < data.length; i++) {
					wordArray = data[i].song_name.toLowerCase().split(" ");
					if (wordArray.includes(q)) {
						songArray.push({
							key: data[i].song_id,
							title: data[i].song_name,
							artist: data[i].display_artist
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