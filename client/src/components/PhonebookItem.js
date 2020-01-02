import React from 'react';
import { connect } from 'react-redux';
import { deletePhonebook, resendPhonebook, editPhonebook } from '../actions';

class PhonebookItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { edit: false, nameEdit: '', phoneEdit: '', oldName: this.props.name, oldPhone: this.props.phone };
        this.changeName = this.changeName.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.editPhonebookSave = this.editPhonebookSave.bind(this);
    }

    componentDidMount() {
        this.setState({ nameEdit: this.props.name, phoneEdit: this.props.phone });
    }
    changeName(e) {
        this.setState({ nameEdit: e.target.value });
    }
    changePhone(e) {
        this.setState({ phoneEdit: e.target.value });
    }
    editPhonebookSave(e) {
        this.props.editPhonebook(this.state.nameEdit, this.state.phoneEdit, this.state.oldName, this.state.oldPhone);
        this.setState({ edit: false });
    }

    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.state.edit ? <input type="text" value={this.state.nameEdit} onChange={this.changeName} placeholder="Name" /> : this.props.name}</td>
                <td>{this.state.edit ? <input type="text" value={this.state.phoneEdit} onChange={this.changePhone} placeholder="Phone" /> : this.props.phone}</td>
                <td>{this.state.edit ? <button className="btn btn-primary" onClick={this.editPhonebookSave}>Save</button> : (this.props.sent ? <div><a className="btn btn-success" onClick={() => this.setState({edit: true})}>Update</a>&nbsp;
                    <a className="btn btn-danger" onClick={this.props.deletePhonebook}>Delete</a></div>
                    : <div><a className="btn btn-danger" onClick={this.props.resendPhonebook}>Resend</a></div>) }</td>
            </tr>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    deletePhonebook: () => dispatch(deletePhonebook(ownProps)),
    resendPhonebook: () => dispatch(resendPhonebook(ownProps.id_fake, ownProps.name, ownProps.phone)),
    editPhonebook: (name, phone, oldName, oldPhone) => dispatch(editPhonebook(ownProps.origin_id, name, phone, oldName, oldPhone)) 
})

export default connect(
    null,
    mapDispatchToProps
)(PhonebookItem)