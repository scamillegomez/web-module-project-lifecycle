import React from 'react'
import axios from 'axios';
import TodoList from './TodoList';
import Form from './Form';
import { v4 as uuidv4 } from 'uuid';

const URL = 'http://localhost:9000/api/todos'


const fetchList = () => {
  return axios.get(URL).then(res=>res).catch(err=>console.error(err));
}

export default class App extends React.Component {
  constructor(){
    console.log('constructor ran');
    super();
    this.state = {
      list: [],
      formValues: {
        id: '',
        name: '',
        completed: false
      },
      showCompleted: true
    };
  }

  componentDidMount(){
    console.log('component did mount');
    fetchList()
      .then(res=>{
        this.setState({list: res.data.data});
      })
  }

  postNewItem = newItem => {
    axios.post(URL, newItem)
      .then(res=>{
        if(res.data && res.data.data){
          const addedItem = res.data.data;
          this.setState(prevState => ({
          list: [...prevState.list, addedItem]
        }));
      }
      })
      .catch(err=>console.error(err))
  }

  onSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      id: uuidv4(),
      name: this.state.formValues.name.trim(),
      completed: false
    };
    this.postNewItem(newItem);
    this.setState( prevState=>({
      formValues: {
        name: '',
        id: '',
        completed: false
      }
    }));
  }

  componentDidUpdate(prevState){
    console.log('component did update');
    console.log(prevState);
    console.log(this.state.list);
  }

  onCheck = (id) => {
    const newList = this.state.list.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
  
    const item = newList.find(item => item.id === id);

    if(item){
        axios.patch(URL + "/" + `${item.id}`, {
          completed: item.completed
        })
        .then(res=>{
          if(res.data && res.data.data){
            const updatedItem = res.data.data
            const updatedList = this.state.list.map(item=>
              item.id === updatedItem.id ? updatedItem : item
              );
            this.setState({
              list: updatedList
            });
          }
        })
        .catch(err=>console.error(err))
      }
  };

  toggleShowCompleted = () => {
    this.setState(prevState=>({
      showCompleted: !prevState.showCompleted
    }));
  }

  onChange = (event) => {
    const {name, value} = event.target;
    this.setState(prevState=> ({
      formValues: {
        ...prevState.formValues,
        [name]: value
      }
    }));
  }


  render(){
    const filteredList = this.state.showCompleted ?
                          this.state.list : 
                          this.state.list.filter(item=>!item.completed);
    return (
      <>
        <h4>my list</h4>
        <Form 
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          formValues={this.state.formValues}
          showCompleted={this.state.showCompleted}
          toggleShowCompleted={this.toggleShowCompleted}
        />
        <TodoList list={filteredList} onCheck={this.onCheck}/>

      </>
    )
  }
}
