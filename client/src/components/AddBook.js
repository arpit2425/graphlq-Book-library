import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getAuthors, addBookMutation } from '../queries/query'
import {flowRight as compose} from 'lodash';

class AddBook extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            price: '',
            authorId:'',
        }
    }
    
     displayAuthors(){
         var data = this.props.getAuthors;
        
        if(data.loading){
            return( <option disabled>Loading authors</option> );
        } else {
            return data.authors.map(author => {
                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
     }
    submitForm(e) {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
       
        return (
             <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={e=>{this.setState({title:e.target.value})}}/>
                </div>
                <div className="field">
                    <label>Price:</label>
                    <input type="text" onChange={e=>{this.setState({price:e.target.value})}}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={e=>{this.setState({authorId:e.target.value})}}>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
                </form>

        );
    }
}

export default compose(
    graphql(getAuthors, {name:'getAuthors'}),
    graphql(addBookMutation,{name:'addBookMutation'})
)(AddBook);
