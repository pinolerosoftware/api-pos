import React, {Component} from 'react';

class Login extends Component {
	constructor(props){
        super(props)
        this.login = this.login.bind(this);
	}

    login(){
        const formLogin = document.querySelector(".form")
        const formData = new FormData(formLogin)
    
        formLogin.addEventListener('submit', e => {
            e.preventDefault()
            fetch('/api/users/signin', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => 
                localStorage.setItem('token', data.token)
            ) 
        })
    }

	render(){
		return (
            <div>
                <h1>API-POS</h1>
                <form method="post">
                    <input className="" type="text"></input>
                    <input className="" type="password"></input>
                    <button onClick={this.login}>Sing In</button>
                </form>
            </div>
		)
	}
}

module.exports = Login;