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
                <div className="form-group row mt-3">
                    <div className="form-group col-md-5">
                        <button className="btn btn-primary" id="add" onClick={this.changeVisibilityForm}>Add</button>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} style={this.state.isFormHidden ? {display: 'none'} : {display: 'block'}}>
                    <div className="form-group row">
                        <div className="form-group col-md-3">
                            <input type="text" className="form-control" onChange={this.changeName} value={this.state.name} id="name" placeholder="Name" />
                        </div>
                        <div className="form-group col-md-3">
                            <input type="text" className="form-control" onChange={this.changePhone} value={this.state.phone} id="phone" placeholder="Phone" />
                        </div>
                        <div className="form-group col-md-2">
                            <button type="submit" className="btn btn-success mr-1">Save</button> 
                            <button className="btn btn-warning ml-1" onClick={() => this.setState({ isFormHidden: true })}>Cancel</button>
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