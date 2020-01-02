import React from 'react';
import {connect} from 'react-redux';
import {postPhonebook} from '../actions/index';

class FormAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', phone: '', isFormHidden: true};
        this.changeName = this.changeName.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeVisibilityForm = this.changeVisibilityForm.bind(this);
    }

    changeName(e) {
        this.setState({name: e.target.value});
    }

    changePhone(e) {
        this.setState({phone: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.name && this.state.phone) {
            this.props.postPhonebook(this.state.name, this.state.phone);
            this.setState({name: '', phone: '', isFormHidden: true});
        }
    }

    changeVisibilityForm(e) {
        this.setState({isFormHidden: !this.state.isFormHidden});
    }

    render() {
        return (
            <div>
                <div class="form-group row">
                    <div class="form-group col-md-5">
                        <button class="btn btn-primary" id="add" onClick={this.changeVisibilityForm}>Add</button>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} style={this.state.isFormHidden ? {display: 'none'} : {display: 'block'}}>
                    <div class="form-group row">
                        <div class="form-group col-md-5">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" onChange={this.changeName} value={this.state.name} id="name" placeholder="Name" />
                        </div>
                        <div class="form-group col-md-5">
                            <label for="phone">Phone</label>
                            <input type="text" class="form-control" onChange={this.changePhone} value={this.state.phone} id="phone" placeholder="Phone" />
                        </div>
                        <div class="form-group col-md-1">
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                        <div class="form-group col-md-1">
                            <button class="btn btn-warning" onClick={() => this.setState({isFormHidden: true})}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
        postPhonebook: (name, phone) => dispatch(postPhonebook(name, phone))
    })

export default connect(
    null,
    mapDispatchToProps
)(FormAdd)