import React,{useState} from 'react';
import './LoginPage.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

export const LoginPage = () => {
	let navigate = useNavigate();
	const [loginMail, setLoginMail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [regMail, setRegMail] = useState("")
	const [regPassword, setRegPassword] = useState('')
	const [regConfirmPassword, setRegConfirmPassword] = useState('');
	const [name, setName] = useState('')

	const [errorMessage, setErrorMessage] = useState('')

	const signUp = (e)=>{
		e.preventDefault();
		axios.post('http://localhost:4000/api/registration', {
			name : name,
			email : regMail,
			password : regPassword
		}).then((res)=>{
			console.log(res);
			if(res.status ===200){
				
				localStorage.setItem("UserData", JSON.stringify(res.data));
				navigate("/")
			}
			else setErrorMessage("Error");
		})
	}

  return (
    <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div class="signup">
				<form onSubmit= {(e)=>signUp(e)}>
					<label for="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="txt" placeholder="User name" required onChange ={(e)=>setName(e.target.value)} value ={name}/>
					<input type="email" name="email" placeholder="Email" required onChange={(e)=>setRegMail(e.target.value)} value = {regMail}/>
					<input type="password" name="pswd" placeholder="Password" required onChange ={(e)=> setRegPassword(e.target.value)} value ={regPassword}/>
                    <input type="password" name="pswd" placeholder="Repeat Password" required onChange ={(e)=>{
						setRegConfirmPassword(e.target.value);
						regPassword === e.target.value ? setErrorMessage("Passwords match") : setErrorMessage("Passwords do not match");
					}} value ={regConfirmPassword}/>
					<div className="error">
						<p>{errorMessage}</p>
					</div>
					
					<button type='submit'>Sign up</button>
				</form>
			</div>

			<div class="login">
				<form>
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" required="" />
					<input type="password" name="pswd" placeholder="Password" required="" />
					<button>Login</button>
				</form>
			</div>
	</div>
  )
}
