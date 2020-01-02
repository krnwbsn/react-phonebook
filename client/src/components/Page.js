import React from 'react';
import FormAdd from '../containers/FormAdd';
import PhonebookList from '../containers/PhonebookList';

export default class Page extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="container">
                <FormAdd />
                <PhonebookList />
            </div>
        );
    }
}