"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Button_1 = require("../../components/Button");
var Page_1 = require("../../components/Page");
var Balances_1 = require("./components/Balances");
var core_1 = require("@material-ui/core");
var bsc = require("@binance-chain/bsc-use-wallet");
var bignumber_js_1 = require("bignumber.js");
var usePresale_1 = require("../../hooks/usePresale");
var utils_1 = require("../../presale/utils");
var react_responsive_1 = require("react-responsive");
var Value_1 = require("../../components/Value");
var react_countdown_1 = require("react-countdown");
var presaleErc20_json_1 = require("../../presale/lib/abi/presaleErc20.json");
var web3_1 = require("web3");
var binance_api_node_1 = require("binance-api-node");
var main_gif_1 = require("../../assets/img/main.gif");
require("./Home.css");
var binance = binance_api_node_1["default"]();
var startTime = new Date();
var endTime = new Date('03/22/2022 5:16');
var launchTime = Math.abs(startTime.getTime() - endTime.getTime());
var Home = function () {
    var isDesktopOrLaptop = react_responsive_1.useMediaQuery({
        query: '(min-width: 768px)'
    });
    var _a = react_1.useState(0), tokenPrice = _a[0], setNum = _a[1];
    var getBnbPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
        var ticker, price;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, binance.prices({ symbol: 'BNBUSDT' })];
                case 1:
                    ticker = _a.sent();
                    price = Number(ticker['BNBUSDT']);
                    setNum(price / 27.5);
                    return [2 /*return*/];
            }
        });
    }); };
    getBnbPrice();
    var account = bsc.useWallet().account;
    var wallet = bsc.useWallet();
    var description = react_1["default"].createElement("div", { style: { textAlign: 'center', fontSize: '26px', fontFamily: 'Optima', lineHeight: '48px', fontWeight: 'bold' } },
        react_1["default"].createElement("span", null, "Join The Presale"));
    var _b = react_1.useState(0), leftTime = _b[0], setCountTime = _b[1];
    var web3 = new web3_1["default"](new web3_1["default"].providers.HttpProvider("https://bsc-dataseed.binance.org"));
    var presaleContract = new web3.eth.Contract(presaleErc20_json_1["default"], '0xbDB2c7b6960C29A016212F76AA10F92c89b7CAE1');
    var getLeftTime = function () { return __awaiter(void 0, void 0, void 0, function () {
        var leftTimeNum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, presaleContract.methods.getLeftTimeAmount().call()];
                case 1:
                    leftTimeNum = _a.sent();
                    setCountTime(new bignumber_js_1["default"](leftTimeNum).toNumber() * 1000);
                    return [2 /*return*/];
            }
        });
    }); };
    getLeftTime();
    var _c = react_1.useState(0), depositInput = _c[0], setDepositNum = _c[1];
    var depositInputChange = function (e) {
        var depositVal = e.target.value;
        setDepositNum(depositVal);
    };
    var presale = usePresale_1["default"]();
    var depositEther = function () {
        utils_1.deposit(presale, account, depositInput);
    };
    console.log(launchTime);
    return (react_1["default"].createElement(Page_1["default"], null,
        react_1["default"].createElement(StyledContainerG, null,
            react_1["default"].createElement("div", { style: { textAlign: "center" } },
                react_1["default"].createElement("img", { style: { width: "120px" }, src: main_gif_1["default"] })),
            react_1["default"].createElement("h2", { style: { textAlign: "center", margin: "0px", color: "red" } },
                react_1["default"].createElement(react_countdown_1["default"], { date: Date.now() + leftTime })),
            react_1["default"].createElement("div", { style: { display: isDesktopOrLaptop ? 'flex' : 'block', width: isDesktopOrLaptop ? 1072 : 'auto', margin: isDesktopOrLaptop ? "auto" : "auto", marginTop: "1rem" } },
                react_1["default"].createElement(StyledContainer, null,
                    react_1["default"].createElement("div", { style: { width: isDesktopOrLaptop ? "456px" : 'auto' } },
                        react_1["default"].createElement("h1", { style: { textAlign: 'left' } }, "Participant: Public")),
                    react_1["default"].createElement("div", { style: { display: 'flex' } },
                        react_1["default"].createElement("span", null, "Maximum per wallet"),
                        react_1["default"].createElement("span", { className: 'boldFont' }, "25 BNB")),
                    react_1["default"].createElement(Balances_1["default"], null)),
                react_1["default"].createElement(StyledContainerR, null,
                    react_1["default"].createElement("div", null, description),
                    react_1["default"].createElement("div", { className: "borderLine" }),
                    react_1["default"].createElement("div", { className: "bidAmount", style: { marginTop: "3rem" } },
                        react_1["default"].createElement("span", { style: { fontSize: 15 } }, "Your Bid Amount"),
                        react_1["default"].createElement("div", { style: { display: 'flex', fontSize: 15 } },
                            react_1["default"].createElement("span", null, "Balance:\u00A0"),
                            wallet &&
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement(Value_1["default"], { value: new bignumber_js_1["default"](wallet.balance)
                                            .div(new bignumber_js_1["default"](10).pow(18))
                                            .toNumber() })),
                            !wallet &&
                                react_1["default"].createElement("span", null, "--"),
                            react_1["default"].createElement("span", null, "BNB"))),
                    react_1["default"].createElement(core_1.Input, { type: 'number', className: "colorSecondary", onChange: depositInputChange, style: { width: '100%', bottom: 10, color: 'white', marginTop: "4rem", marginBottom: 0 }, placeholder: 'Bid Amount' }),
                    react_1["default"].createElement("div", { style: { marginTop: '50px' } },
                        react_1["default"].createElement(Button_1["default"], { disabled: !account, text: "Deposit", onClick: depositEther, variant: "secondary" })))))));
};
var StyledContainerG = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  box-sizing: border-box;\n  border: 1px solid #21c894;\n  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);\n  background-color: rgb(0, 0, 0, 0.2);\n  border-radius: 20px;\n  padding: 2rem;\n  margin-top: 2rem\n"], ["\n  box-sizing: border-box;\n  border: 1px solid #21c894;\n  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);\n  background-color: rgb(0, 0, 0, 0.2);\n  border-radius: 20px;\n  padding: 2rem;\n  margin-top: 2rem\n"])));
var StyledContainer = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  box-sizing: border-box;\n  margin: 0px;\n  max-width: 456px;\n  width: 100%;\n  padding: 20px;\n  position: relative;\n  border: 1px solid #21c894;\n  border-radius: 20px;\n  font-family: \"Nunito\";\n  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);\n  background-color: black;\n  color: white;\n  @media (max-width: 767px) {\n    // width: auto;\n    // padding: 0px;\n    // left: 0;\n  }\n"], ["\n  box-sizing: border-box;\n  margin: 0px;\n  max-width: 456px;\n  width: 100%;\n  padding: 20px;\n  position: relative;\n  border: 1px solid #21c894;\n  border-radius: 20px;\n  font-family: \"Nunito\";\n  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);\n  background-color: black;\n  color: white;\n  @media (max-width: 767px) {\n    // width: auto;\n    // padding: 0px;\n    // left: 0;\n  }\n"])));
var StyledContainerR = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  box-sizing: border-box;\n  margin: 0px;\n  max-width: 456px;\n  width: 100%;\n  padding: 20px;\n  position: relative;\n  border: 1px solid #21c894;\n  border-radius: 20px;\n  font-family: \"Nunito\";\n  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);\n  background-color: black;\n  color: white;\n  margin: auto 0 0 auto;\n  padding: 48px 56px;\n  min-height: 475px;\n  vertical-align: middle;\n  @media (max-width: 767px) {\n    margin-top:30px;\n    padding: 48px 20px;\n    // width: auto;\n    // left: 0;\n  }\n"], ["\n  box-sizing: border-box;\n  margin: 0px;\n  max-width: 456px;\n  width: 100%;\n  padding: 20px;\n  position: relative;\n  border: 1px solid #21c894;\n  border-radius: 20px;\n  font-family: \"Nunito\";\n  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%), 0 6px 20px 0 rgb(0 0 0 / 19%);\n  background-color: black;\n  color: white;\n  margin: auto 0 0 auto;\n  padding: 48px 56px;\n  min-height: 475px;\n  vertical-align: middle;\n  @media (max-width: 767px) {\n    margin-top:30px;\n    padding: 48px 20px;\n    // width: auto;\n    // left: 0;\n  }\n"])));
exports["default"] = Home;
var templateObject_1, templateObject_2, templateObject_3;
