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
  - if you do `<Compon id={x} value={y} h={z} />` then Compon(props) then props == {id: x, value: y, h: z} 

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
    // This binding is necessary in class Components to make `this` work in the callback
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
// javascript can't find a good phrasing for anything, so it makes several attempts at syntax
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

Forms are a good case for controlled components.  It could both describe how it's rendered + describe how it does.  

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

{{ notes missing }}

# Starting over

### useState() hook

notes from: http://www.room51.co.uk/tutorials/react/usestate/part1.html

declared with:

```jsx
const [a, setA] = useState(defaultA)
```

the setA(newA) method is called in one block.  the 'a' variable isn't changed until the set(A) returns.


if state is an object, you can update the state object with this syntax:

```jsx
const initialS = {'a': 'b', 'c': 'd'}
const [s, setS] = useState(initialS)
const [t, setT] = useState('something')

const handleChange = (i, value) => {
  setS({ ...s, [i]: value })
  setT('other')
}
handleChange('a', 'hello') // results in s = {'a': 'hello', 'b': 'd'} and tells React to push the changes onward
```

handleChange() changes s & t after handleChange runs, and before the component refreshes.
This may be caused by async, or it may some sort of ACID for the function by React.  I don't know.
This means you cannot do `setT('other') then if (t === 'other'), because t will probably still be 'something' until after handleChange is done.
Something that's acting as I expect is when I put the `winner = hasWinner(boardState)` outside the handler.  Then winner is set on component refresh, & before handleChange() runs.

## useEffect() hook

it runs whenever the component is rendered.

It's useful for side-effects that aren't inherently connected to either setA() or its output 'a'.
A bad example is if you wanted to change the document.title after each setA() call.

All useEffect()'s in a Component run on each render.

```jsx
useEffect(() => {
  console.log('run immediately after rendering')
  return () => { console.log('run immediately before re-rendering') }
})
```

Unless you specify a useState variable.  Then useEffect() only runs if that setVariable is changed.
You must be careful to include all reactive variable used in the useEffect(function).

```jsx
const [s, setS] = useState()
useEffect(console.log('only run on changes to "s"'), [s])
```


## React.Strictmode

Optional.  Intended to catch error.  Reportedly it may cause components to run twice (i.e., two console.log() output per run instead of one.)

