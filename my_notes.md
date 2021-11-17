notes from https://reactjs.org/docs/hello-world.html


### JSX

JSX is a format for mixing javascript and html

    - wrap multilines in parentheses for safety
    - evaluated parts are html-escaped by default 
    - examples:
```jsx
const element = <h1>Hello, {name}</h1>;
const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
const element = <img src={user.avatarUrl} id="first" />;
```

### Elements

Elements are immutable objects, that can be rendered to the DOM.  They describe the intended state.

React only updates the DOM elements that differ - previous versus intended.

### Components

Components are like:  func component(props) => {intended element}

    - they come in function & class varieties
    - they must be pure functions & ßnever mutate the arguments
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

### State // Lifecycle

Props is dict used as arguments for the child components.
  - they should be immutable.

State is like props, but is encapsulated in a component.
  - it's intended to change.



#### Class-based components

Class based components can use this.props,  i.e., magic non-specified arguments 

Or they can use a class constructor() to initialize local state.

They have magic methods:
    
    - constructor()          runs when the class instance is initialized
    - render()               renders to the DOM
    - componentDidMount()    runs after the component has rendered to the DOM
    - setState()             updates the instance's state & informs React
    - componentWillUnmount() runs when the component is removed from the DOM  

React is jealous of state.  Do not set it manually except in the constructor.
React is asynchronous updating state.  Do not expect it to be changed immediately.
If you need a change before the next line of code, pass setState((args) => ({output})

Plan to cascade your data downward through components.

### Events

Some weirdness makes this illegal in React:  <button onclick="doThing()">

Instead you have to do 

<button onclick={() => doThing()}> 

or

```jsx
class Toggle extends React.Component {
  constructor(props) {
    // This binding is necessary to make `this` work in the callback
    this.doThing = this.doThing.bind(this);
  }

  doThing() {
    console.log("hi");
  }

   render() {
    return (
      <button onClick={this.doThing} />
    );
  }
}
```

or

```jsx
class Toggle extends React.Component {
  doThing = () => {
        console.log("hi");
  }

  render() {
    return (
      <button onClick={this.doThing} />
    );
  }
}
```

### <li key={someKey.toString()}>

Key attribute on list items can be good for React somehow.

### Controlled Components

Forms are a good use-case.  It could both describe how it's rendered + describe how it does.  

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```  

### Lifting up state

