App = {};
App.token = Titanium.App.Properties.getString('token');

Measurement = require('core/Measurement');
con = require('core/network');
Win = require('core/Win');
WinOrder = require('core/WinOrder');

loginPage = require('view/loginPage');
cart = require('view/cart');
