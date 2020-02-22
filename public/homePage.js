"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => {
    if (response) {
        location.reload();
    }
    return;
});

ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
    return;
});

const ratesBoard = new RatesBoard();
function refreshBoard() {
    ApiConnector.getStocks((stocks) => {
        if (stocks.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(stocks.data);
        }
    })
    return;
};

setInterval(() => {
   refreshBoard();
}, 60000);

