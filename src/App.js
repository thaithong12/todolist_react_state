import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCheck,
  faTimes,
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      listToDo: [],
    }
  }

  addItem = (todoItem) => {
    if (todoItem) {
      todoItem.key = new Date();
      todoItem.status = true;
      const listToDo = [...this.state.listToDo, todoItem];
      this.setState({
        listToDo,
      })

    } else {
      return;
    }
  }

  changeStatus = (todoItem) => {
    this.setState({
      listToDo: this.state.listToDo.map(el =>
        (el.id === todoItem.id ? Object.assign({}, el, { name: todoItem.name, status: todoItem.status }) : el)),
    });
  }

  removeItem(itemId) {
    this.setState({
      listToDo: this.state.listToDo.filter(item => item.id != itemId),
    })
  }

  render() {
    return(
      <div className={'container'}>
        <Form addItem={this.addItem.bind(this)}  data={this.state.listToDo} />
        <ListTodo changeStatus={this.changeStatus.bind(this)} data={this.state.listToDo} deleteItem={this.removeItem.bind(this)}/>
      </div>
    )
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      FormData: {
        name: '',
      }
    }
  }
  handleChane(e) {
    this.setState({
      FormData: {
        name: e.target.value,
      }
    });
  }
  validateData(item) {
    if (item) {
      const listData = this.props.data;
      if (item.name === '') {
        alert('Blank');
        return false;
      } else {
        const exist = listData.find(i => i.name === item.name);
        if (exist){
          alert('Exist');
          return false;
        }
        return true;
      }
    } else  {
      alert('Item khong hop le');
      return false;
    }

  }
  hanldeForm(e) {
    e.preventDefault();
    const item = this.state.FormData;
    if (this.validateData(item) === false) return ;
    this.props.addItem(item);
  }
  render() {
    return(
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 bg-danger">
          <h2 className="title"><label htmlFor="exampleInputEmail1">Danh sach nhung viec can lam trong nam</label></h2>
          <form onSubmit={this.hanldeForm.bind(this)}>
            <div className="form-group">
              <input type="text" name={'name'} className="form-control" id="txt-title" aria-describedby="emailHelp"
                     placeholder="Title" onChange={this.handleChane.bind(this)}/>
            </div>
            <button type="submit" className="btn btn-primary btn-form">Them</button>
          </form>
        </div>
      </div>
    )
  }
}
class ListTodo extends React.Component {
  render(){
    let listData = this.props.data.map((item, index)=>{
      return <Item changeStatus={this.props.changeStatus} deleteItem={this.props.deleteItem} item={item}/>
    })
    return(
      <div className={'row'}>
        <div className="col-md-2"></div>
        <div className="col-md-8 p-0">
          <table className="table">
            <thead>
              <tr className={'header'}>
                <th className="check">#</th>
                <th className="title_head">Title</th>
                <th className="delete">Action</th>
              </tr>
            </thead>
            <tbody>
            {listData}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
class Item extends React.Component {
  handleChangeStatus = () => {
    const item = this.props.item;
    item.status = !item.status;
    this.props.changeStatus(item);
  }

  handleDelete = () => {
    const idItem = this.props.item.id;
    this.props.deleteItem(idItem);
  }

  render() {
    return (
    <tr className={this.props.item.status ? 'data bg-light' :  'bg-secondary data'}>
      <td onClick={this.handleChangeStatus}><span className={this.props.item.status ? 'text-left d-none' : 'text-left'}>
        <FontAwesomeIcon icon={faCheck}/></span></td>
      <td>
        <div className="p-3 pt-0"> {this.props.item.status ?  this.props.item.name : ''}
          <del> {this.props.item.status ? '' :  this.props.item.name  }</del>
        </div>
      </td>
      <td onClick={this.handleDelete}><span className="text-left">
        <FontAwesomeIcon icon={faTimes} />
      </span></td>
    </tr>
    )
  }
}


export default App;
