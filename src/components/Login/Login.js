import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) =>{
  if(action.type === 'User_Input'){
    return ({value:action.val , isValid:action.val.includes('@')});

  }
  if(action.type === 'Input_Blur'){
    return ({value:state.value, isValid:state.value.includes('@')});

  }
return ({value:'', isValid:false});
};


const passwordReducer = (state, action) =>{
  if(action.type === 'User_Input'){
    return ({value:action.val , isValid:action.val.length > 6});
  }
  if(action.type === 'Input_Blur'){
    return ({value:state.value, isValid:state.value.length > 6});
  }
  return ({value:'', isValid:false});
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
 // const [enteredPassword, setEnteredPassword] = useState('');
 // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{value:'', isValid: false})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{value:'', isValid: false});
  // useEffect(()=>{
  //  const identifier = setTimeout(() =>{
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredCollege.trim().length > 2 && enteredPassword.trim().length > 6  
  //     );
  //   },500)
  
  //   return () =>{
  //     clearTimeout(identifier);
  //   };
  // },[enteredEmail,enteredCollege,enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'User_Input', val:event.target.value});
    setFormIsValid(
      event.target.value.trim().length > 6 && enteredCollege && enteredCollege.trim().length > 2 && emailState.isValid.includes('@') 
    );
 };

 const collegeChangeHandler = (event) => {
  setEnteredCollege(event.target.value);
  setFormIsValid(
    event.target.value.trim().length > 6 && enteredCollege && enteredCollege.trim().length > 2 && emailState.isValid.includes('@') 
  );
};

  const passwordChangeHandler = (event) => {
   dispatchPassword({type:'User_Input', val:event.target.value});

    setFormIsValid(
      passwordState.isValid && enteredCollege && enteredCollege.trim().length > 2 && emailState && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({type:'Input_Blur'});
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 2);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'Input_Blur'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value,enteredCollege,passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
