import React from 'react';
import FormAdd from './FormAdd';
import FormSearch from './FormSearch';
import PhonebookList from './PhonebookList';

export default class Page extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div class="container">
                <FormAdd />
                <FormSearch />
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>    
                    </thead>
                    <PhonebookList />
                </table>
            </div>
        );
    }
}