const express = require('express');
const Phonebook = require('../models/phonebook');
const router = express.Router();
const defaultResponse = require('../helper/response')

router.get('/', function (req, res, next) {
    Phonebook.find().then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.post('/', function (req, res, next) {
    const { id, name, phone } = req.body;
    let response = { ...defaultResponse, data: { id: '', name: '', phone: '' } }
    if (![id, name, phone].includes(undefined)){
        const phonebook = new Phonebook({
            id,
            name,
            phone
        })
        phonebook.save().then(result => {
            console.log(result)
            response.status= "SUCCESS";
            response.data.id = result.id;
            response.data.name = result.name;
            response.data.phone = result.phone;
            res.status(201).json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    } else {
        res.status(500).json(response);
    }
});

router.put('/:id', function (req, res, next) {
    const { id, name, phone } = req.body;  
    let response = { ...defaultResponse };
    if (![id, name, phone].includes(undefined)){
        const editPhonebook = {
            name: name || '',
            phone: phone || ''
        };
        Phonebook.findByIdAndUpdate(req.params.id, editPhonebook).exec().then(before => {
            response.status = "SUCCESS";
            response.data.id = id;
            response.data.name = name;
            response.data.phone = phone;
            res.status(201).json(response);
        });
    } else {
        res.status(500).json(response);
    }
});

router.post('/search', function (req, res, next) {
    let response = { ...defaultResponse };
    let filterSearch = {
        name: { $regex: req.body.name, $options: 'i' },
        phone: { $regex: req.body.phone, $options: 'i' }
    }
    if (!req.body.name) {
        delete filterSearch['name'];
    }
    if (!req.body.phone) {
        delete filterSearch['phone'];
    }
    Phonebook.find(filterSearch, function (err, response) {
        if (err) {
            res.status(500).json({ 'error': err });
        } else {
            res.status(200).json(response);
        }
    })
})

router.delete('/:id', function (req, res, next) {
    let response = { ...defaultResponse };
    Phonebook.findByIdAndDelete(req.params.id).exec().then(before => {
        if (before) {
            response.status = "SUCCESS";
            response.data.id = before.id;
            response.data.name = before.name;
            response.data.phone = before.phone;
            res.status(201).json(response);
        } else {
            res.status(500).json(response);
        }
    });
});

module.exports = router;