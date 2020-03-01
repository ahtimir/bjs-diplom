"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = () => 
    ApiConnector.logout(response => {
        if (response) {
            location.reload();
        };
    return;
});

ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    };
    return;
});

const tableBody = new RatesBoard();

function refreshBoard() {
    ApiConnector.getStocks((stocks) => {
        if (stocks.success === true) {
            tableBody.clearTable();
            tableBody.fillTable(stocks.data);
        };
    });
    return;
};

refreshBoard();

setInterval(() => {
   refreshBoard();
}, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (addMoneyForm) => 
    ApiConnector.addMoney(addMoneyForm, (response) => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(false, `Вы успешно пополнили баланс`);
    } else {
        moneyManager.setMessage(true, `Ошибка пополнения`);
    };
    return;
});

// NOTE: I used Abstract Equality Comparison (==) for Currency and Amount forms
moneyManager.conversionMoneyCallback = (conversionMoneyForm) => {
    ApiConnector.convertMoney(conversionMoneyForm, (response) => {
        if (conversionMoneyForm.targetCurrency == false) {
            moneyManager.setMessage(true, `Укажите целевую валюту для конвертации`);
        } else if (conversionMoneyForm.fromCurrency == false) {
            moneyManager.setMessage(true, `Укажите исходную валюту для конвертации`);
        } else if (conversionMoneyForm.fromAmount == 0 || !conversionMoneyForm.fromAmount) {
            moneyManager.setMessage(true, `Укажите, какую сумму хотите сконвертировать`);
        } else if (response.success === false) {
            moneyManager.setMessage(true, response.data);
        } else {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, `Конвертация прошла успешно`);
        };
    return;    
    });
};

moneyManager.sendMoneyCallback = (sendMoneyForm) => {
    ApiConnector.transferMoney(sendMoneyForm, (response) => {
        if (response.success === false) {
            moneyManager.setMessage(true, `Ошибка перевода`);    
        } else {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, `Перевод прошел успешно`);
        };
        return;
    });
};

const favoritesTableBody = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success === true) {
        favoritesTableBody.clearTable();
        favoritesTableBody.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
        return;
});

favoritesTableBody.addUserCallback = ((addUserToFavoritesForm) => {
    ApiConnector.addUserToFavorites(addUserToFavoritesForm, (response) => {
        if (response.success === true) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(response.data); 
            moneyManager.updateUsersList(response.data);
            favoritesTableBody.setMessage(false, `Пользователь добавлен успешно`);
        } else {
            favoritesTableBody.setMessage(true, response.data)
        };
        return;
    });
});

favoritesTableBody.removeUserCallback = ((userToRemove) => {
    ApiConnector.removeUserFromFavorites(userToRemove, (response) =>{
        if (response.success === true) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(response.data); 
            moneyManager.updateUsersList(response.data);
            favoritesTableBody.setMessage(false, `Пользователь удален из избранных`);
        } else {
            favoritesTableBody.setMessage(true, response.data);
        };
        return;
    });
});







