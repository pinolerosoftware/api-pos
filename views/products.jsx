import React, {Component} from 'react';

class Products extends Component {
	constructor(props){
        super(props)
        this.state = {
            data: []
        }
	}

    componentDidMount(){
        const productHeaders = new Headers();
        productHeaders.append('authorization', `Bearer ${localStorage.token}`);

        fetch('/api/products/', {
            method: 'GET',
            headers: productHeaders
        })
        .then(res => res.json())
        .then(data =>{
            this.setState(data)
        })
    }

	render(){
        let {data} = this.state;
        console.log(data, "data")
		return (
            <div>
                <h1>API-POS</h1>
                <ul>
                    {/* data.map( product => {
                        <li>{product.name + " - " + product.category}</li>
                    }) */}
                </ul>
            </div>
		)
	}
}

module.exports = Products;