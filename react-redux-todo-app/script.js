const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false };

    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed };

    case 'EDIT_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        text: action.text };

    default:
      return state;}

};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
      ...state,
      todo(undefined, action)];

    case 'TOGGLE_TODO':
      return state.map((t) =>
      todo(t, action));

    case 'EDIT_TODO':
      return state.map((t) =>
      todo(t, action));

    default:
      return state;}

};

const visibilityFilter = (
state = 'SHOW_ALL',
action) =>
{
  switch (action.type) {
    case 'SET_VISIBILITY':
      return action.filter;
    default:
      return state;}

};

const { combineReducers, createStore } = Redux;
const todoApp = combineReducers({ todos, visibilityFilter });
const store = createStore(todoApp);

const { Component } = React;
let nextTodoId = 0;

class TodoApp extends Component {
  render() {
    const { todos, visibilityFilter } = this.props.store.getState();
    const filteredTodos = todos.filter(todo => {
      if (visibilityFilter === 'SHOW_ACTIVE') {
        return !todo.completed;
      }
      if (visibilityFilter === 'SHOW_COMPLETED') {
        return todo.completed;
      }
      return true;
    });

    return /*#__PURE__*/(
      React.createElement("div", { className: "container" }, /*#__PURE__*/
      React.createElement("section", null, /*#__PURE__*/
      React.createElement("input", { placeholder: "Add Task", ref: node => {
          this.input = node;
        } }), /*#__PURE__*/

      React.createElement("button", { onClick: () => {
          this.props.store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++ });

          this.input.value = '';
          document.getElementById('saber-humm').play();
        } }, "\u26A1"), /*#__PURE__*/



      React.createElement("ul", null,
      filteredTodos.map((todo) => /*#__PURE__*/
      React.createElement("li", { key: todo.id,
        onMouseOver: () => {
          document.getElementById(todo.completed ? 'saber-wave' : 'saber-on').play();
        },
        style: { textShadow: todo.completed ? 'none' : '0 0 10px rgb(255,255,255), 0 0 20px rgb(255,255,255), 0 0 30px rgb(255,255,255), 0 0 40px rgb(255,17,119), 0 0 70px rgb(255,17,119), 0 0 80px rgb(255,17,119), 0 0 100px rgb(255,17,119), 0 0 150px rgb(255,17,119)' } }, /*#__PURE__*/

      React.createElement("span", { style: { margin: '3px 20px 0 0' },
        onClick: () => {
          this.props.store.dispatch({
            type: 'TOGGLE_TODO',
            id: todo.id });

          document.getElementById(todo.completed ? 'saber-humm' : 'saber-hit').play();
        } },
      todo.completed ? /*#__PURE__*/React.createElement("span", null, "\u2620") : /*#__PURE__*/React.createElement("span", null, "\u2639")), /*#__PURE__*/


      React.createElement(ContentEditable, {
        html: todo.text,
        editTodo: text => {
          this.props.store.dispatch({
            type: 'EDIT_TODO',
            id: todo.id,
            text });

        } }))))), /*#__PURE__*/





      React.createElement("footer", null, /*#__PURE__*/
      React.createElement("a", { id: "vis1", href: "#", onClick: e => this.setVisibility(e, 'SHOW_ALL') }, "All"), /*#__PURE__*/
      React.createElement("a", { id: "vis2", href: "#", onClick: e => this.setVisibility(e, 'SHOW_ACTIVE') }, "Active"), /*#__PURE__*/
      React.createElement("a", { id: "vis3", href: "#", onClick: e => this.setVisibility(e, 'SHOW_COMPLETED') }, "Completed"))));



  }

  setVisibility(e, filter) {
    this.props.store.dispatch({
      type: 'SET_VISIBILITY',
      filter });


    const links = document.querySelectorAll('a');

    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('selected');
    }

    e.target.classList.add('selected');
  }}


class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }
  render() {
    return (
      this.state.editing ? /*#__PURE__*/
      React.createElement("input", { className: "editor", ref: "todoText", onBlur: e => this.handleChange(e), defaultValue: this.props.html }) : /*#__PURE__*/

      React.createElement("span", { onDoubleClick: e => this.handleDoubleClick() }, this.props.html));

  }
  handleDoubleClick() {
    this.setState({
      editing: true });

  }
  handleChange(e) {
    const text = this.refs.todoText.value;
    this.props.editTodo(text);
    this.setState({
      editing: false });

  }}


const render = () => {
  ReactDOM.render( /*#__PURE__*/
  React.createElement(TodoApp, {
    store: store }),

  document.getElementById('root'));

};

store.subscribe(render);
render();