import React, {Component} from 'react';


const style = {
	title : {
		color: "#333"
	}
}
class Index extends Component {
	render(){
		return (
			<div>
				<h3 style={style.title}>API-POS</h3>
			</div>
		)
	}
}

module.exports = Index;