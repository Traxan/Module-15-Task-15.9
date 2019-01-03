class App extends React.Component {
  constructor(){
    super();
    this.state = {
      searchText: '',
      users: []
    }
  };

  onChangeHandle(event){
    this.setState({
      searchText: event.target.value  
    })
  }

  onSubmit(event){
    event.preventDefault();
    const {searchText} = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({
        users: responseJson.items
      }));
  }

  render(){
    return (
      <div className="container">
        <h1 className="title">Welcome to Github users search app!</h1>
        <form className="form" onSubmit={event => this.onSubmit(event)}>
          <label className="form__label" htmlFor="searchText">Search for user name</label>
          <input
            className="form__input"
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}
            placeholder="username"
          />
        </form>
        <UserList users={this.state.users} />
        <ScrollTop />
      </div>
    );
  }
}

class UserList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user} />);
  }

  render(){
    return (
      <div className="users">
        {this.users}
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <div className="user">
        <img className="user__avatar" src={this.props.user.avatar_url} alt="user avatar" style={{maxWidth: '100px'}} />
        <a className="user__link" href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}

class ScrollTop extends React.Component {
  onScroll(event){
    // event.preventDefault();
    document.documentElement.scrollTop = 0;
  }

  render(){
    return (
      <a className="btn" role="button" href="#" onClick={this.onScroll}>Top</a>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));