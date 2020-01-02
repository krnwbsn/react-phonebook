const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const Phonebook = require('../models/phonebook');

const should = chai.should();
chai.use(chaiHttp);

describe('phonebook', function () {

    Phonebook.collection.drop();

    it('seharusnya dapat menambahkan Phonebook baru ke dalam database', function (done) {
        chai.request(server)
        .post('/api/phonebook/')
        .send({name:'Krina',phone:'082214000979'})
        .end(function (err,res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            res.body.status.should.equal('success');
            res.body.data.name.should.equal('Krina');
            res.body.data.phone.should.equal('082214000979');
            done();
        })
    })

    it('seharusnya dapat menampilkan list Phonebook yang baru ditambahkan', function (done) {
        chai.request(server)
        .get('/api/phonebook/')
        .end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('phone');
            res.body[0].name.should.equal('Steve');
            res.body[0].phone.should.equal('082214000979');
            done();
        })
    })

    it('seharusnya dapat menampilkan hasil search list Phonebook', function (done) {
        chai.request(server)
        .post('/api/phonebook/search')
        .send({name:'Krina',phone:'081222324170'})
        .end(function (err,res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('phone');
            res.body[0].name.should.equal('Krina');
            res.body[0].phone.should.equal('082214000979');
            done();
        })
    })

    it('seharusnya dapat mengedit data phonebook yang sudah ada', function (done) {
        chai.request(server)
        .get('/api/phonebook/')
        .end(function (err,res) {
            let idData = res.body[0]._id;
            chai.request(server)
            .put('/api/phonebook/'+idData)
            .send({name:'Krina_V2',phone:'082214000979'})
            .end(function (err,res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                res.body.status.should.equal('success');
                res.body.data._id.should.equal(idData);
                res.body.data.name.should.equal('Krina');
                res.body.data.phone.should.equal('082214000979');
                done();
            })
        })
    })

    it('seharusnya dapat menghapus data phonebook yang sudah ada', function (done) {
        chai.request(server)
        .get('/api/phonebook')
        .end(function (err,res) {
            let idData = res.body[0]._id;
            chai.request(server)
            .delete('/api/phonebook/' + idData)
            .end(function (err,res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                res.body.status.should.equal('success');
                res.body.data._id.should.equal(idData);
                res.body.data.name.should.equal('Krina_V2');
                res.body.data.phone.should.equal('082214000979');
                done();
            })
        })
    })
})