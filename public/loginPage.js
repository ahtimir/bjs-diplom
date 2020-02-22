"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = dataLogin => {ApiConnector.login(dataLogin, (response) => {
    if (response.success === true) {
        location.reload(); 
    } else {
        userForm.setLoginErrorMessage(response.data);
        return;
        }
    })
};

userForm.registerFormCallback = dataRegister => {ApiConnector.register(dataRegister, (response) => {
    if (response.success === true) {
        location.reload();     
    } else {
        userForm.setLoginErrorMessage(response.data);
        return;
        }
    })
};                                                                          
