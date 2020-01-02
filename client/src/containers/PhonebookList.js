import React from 'react';
import PhonebookItem from '../containers/PhonebookItem';
import {connect} from 'react-redux';
import {loadPhonebook} from '../actions';

class PhonebookList extends React.Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            name: '',
            phone: ''
        }
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }

    handlePhoneChange(e) {
        this.setState({ phone: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    componentDidMount() {
        this.props.loadPhonebook();
    }

    render() {
        const { phonebook, actions } = this.props

        var name = this.state.name.trim().toLowerCase()
        var phone = this.state.phone.trim().toLowerCase()

        var filteredData = phonebook

        if (name !== '' && phone !== '') {
            filteredData = phonebook.filter(item => item.name.toLowerCase().startsWith(name) && item.phone.toLowerCase().startsWith(phone))
        } else if (name !== '') {
            filteredData = phonebook.filter(item => item.name.toLowerCase().startsWith(name))
        } else if (phone !== '') {
            filteredData = phonebook.filter(item => item.phone.toLowerCase().startsWith(phone))
        }

        // let dataNodes = filteredData.map(function (data) {
        //     return (
        //         <DataItem key={data.id} data={data} {...actions} />
        //     )
        // });

        let listPhonebook = filteredData.map((item, index) => {
            return (<PhonebookItem id={index+1} sent={item.sent} id_fake={item.id_fake} origin_id={item.id} name={item.name} phone={item.phone} />)
        });

        return (
            <div className="">
                <div className="">
                    <h2>Search Form</h2>
                    <div className="">
                        <form className="form-group row" onSubmit={this.handleSubmit.bind(this)}>
                            <div className="col-sm-3">
                                <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
                            </div>
                            <div className="col-sm-3">
                                <input type="text" className="form-control" placeholder="Phone" value={this.state.phone} onChange={this.handlePhoneChange.bind(this)} />
                            </div>
                        </form>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPhonebook}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    phonebook: state.phonebook
})

const mapDispatchToProps = (dispatch) => ({
    loadPhonebook: () => dispatch(loadPhonebook())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhonebookList)