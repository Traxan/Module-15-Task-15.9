"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      searchText: '',
      users: []
    };
    return _this;
  }

  _createClass(App, [{
    key: "onChangeHandle",
    value: function onChangeHandle(event) {
      this.setState({
        searchText: event.target.value
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      var searchText = this.state.searchText;

      var url = "https://api.github.com/search/users?q=" + searchText;

      fetch(url).then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        return _this2.setState({
          users: responseJson.items
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h1",
          { className: "title" },
          "Welcome to Github users search app!"
        ),
        React.createElement(
          "form",
          { className: "form", onSubmit: function onSubmit(event) {
              return _this3.onSubmit(event);
            } },
          React.createElement(
            "label",
            { className: "form__label", htmlFor: "searchText" },
            "Search for user name"
          ),
          React.createElement("input", {
            className: "form__input",
            type: "text",
            id: "searchText",
            onChange: function onChange(event) {
              return _this3.onChangeHandle(event);
            },
            value: this.state.searchText,
            placeholder: "username"
          })
        ),
        React.createElement(UserList, { users: this.state.users }),
        React.createElement(ScrollTop, null)
      );
    }
  }]);

  return App;
}(React.Component);

var UserList = function (_React$Component2) {
  _inherits(UserList, _React$Component2);

  function UserList() {
    _classCallCheck(this, UserList);

    return _possibleConstructorReturn(this, (UserList.__proto__ || Object.getPrototypeOf(UserList)).apply(this, arguments));
  }

  _createClass(UserList, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "users" },
        this.users
      );
    }
  }, {
    key: "users",
    get: function get() {
      return this.props.users.map(function (user) {
        return React.createElement(User, { key: user.id, user: user });
      });
    }
  }]);

  return UserList;
}(React.Component);

var User = function (_React$Component3) {
  _inherits(User, _React$Component3);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
  }

  _createClass(User, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "user" },
        React.createElement("img", { className: "user__avatar", src: this.props.user.avatar_url, alt: "user avatar", style: { maxWidth: '100px' } }),
        React.createElement(
          "a",
          { className: "user__link", href: this.props.user.html_url, target: "_blank" },
          this.props.user.login
        )
      );
    }
  }]);

  return User;
}(React.Component);

var ScrollTop = function (_React$Component4) {
  _inherits(ScrollTop, _React$Component4);

  function ScrollTop() {
    _classCallCheck(this, ScrollTop);

    return _possibleConstructorReturn(this, (ScrollTop.__proto__ || Object.getPrototypeOf(ScrollTop)).apply(this, arguments));
  }

  _createClass(ScrollTop, [{
    key: "onScroll",
    value: function onScroll(event) {
      // event.preventDefault();
      document.documentElement.scrollTop = 0;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "a",
        { className: "btn", role: "button", href: "#", onClick: this.onScroll },
        "Top"
      );
    }
  }]);

  return ScrollTop;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
