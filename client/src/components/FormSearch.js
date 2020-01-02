import React from 'react';
import {connect} from 'react-redux';
import {searchPhonebook} from '../actions';

class FormSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {nameSearch: '', phoneSearch: ''};
        this.changeNameSearch = this.changeNameSearch.bind(this);
        this.changePhoneSearch = this.changePhoneSearch.bind(this);
    }

    changeNameSearch(e) {
        this.setState({
            nameSearch: e.target.value
        });
    }

    changePhoneSearch(e) {
        this.setState({
            phoneSearch: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div class="form-row">
                    <h2>Search</h2>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="name-search">Name</label>
                        <input type="text" class="form-control" id="name_search" value={this.state.nameSearch} onChange={this.changeNameSearch} onKeyUp={this.props.searchPhonebook(this.state.nameSearch, this.state.phoneSearch)} placeholder="Name" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="phone-search">Phone</label>
                        <input type="text" class="form-control" id="name_search" value={this.state.phoneSearch} onChange={this.changePhoneSearch} onKeyUp={this.props.searchPhonebook(this.state.nameSearch, this.state.phoneSearch)} placeholder="Phone" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    searchPhonebook: (name, phone) => dispatch(searchPhonebook(name, phone))
})

export default connect (
    null,
    mapDispatchToProps
)(FormSearch)