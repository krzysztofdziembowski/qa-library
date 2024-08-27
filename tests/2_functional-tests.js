/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing tests', function() {
    let bookId = '';

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
      assert.isTrue(true);
      chai
        .request(server)
        .keepOpen()
        .post('/api/books?title=test title')
        .end(function(err, res){
          assert.equal(err, null);
          assert.equal(res.status, 200);
          assert.property(res.body, 'comments');
          assert.property(res.body, 'title');
          assert.property(res.body, '_id');
          bookId = res.body._id;
          done();
        });     
      });
      
      test('Test POST /api/books with no title given', function(done) {
        assert.isTrue(true);
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .end(function(err, res){
            assert.equal(err, null);
            assert.equal(res.status, 200);
            assert.equal(res.text, `"missing required field title"`);
            done();
          });     
        });      
      });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        assert.isTrue(true);
        chai
          .request(server)
          .keepOpen()
          .get('/api/books')
          .end(function(err, res){
            assert.equal(err, null);
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            done();
        });    
      });      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        assert.isTrue(true);
        chai
          .request(server)
          .keepOpen()
          .get('/api/books/invalid_id')
          .end(function(err, res){
            assert.equal(err, null);
            assert.equal(res.status, 200);
            assert.equal(res.text, `"no book exists"`);
            done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        assert.isTrue(true);
        chai
        .request(server)
        .keepOpen()
        .get(`/api/books/${bookId}`)
        .end(function(err, res){
          assert.equal(err, null);
          assert.equal(res.status, 200);
          assert.property(res.body, 'comments');
          assert.property(res.body, 'title');
          assert.property(res.body, '_id');
          done();
        });
      });
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        assert.isTrue(true);
        chai
        .request(server)
        .keepOpen()
        .post(`/api/books/${bookId}?comment=no comment ok`)
        .end(function(err, res){
          assert.equal(err, null);
          assert.equal(res.status, 200);
          assert.property(res.body, 'comments');
          assert.property(res.body, 'title');
          assert.property(res.body, '_id');
          done();
        });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        assert.isTrue(true);
        chai
        .request(server)
        .keepOpen()
        .post(`/api/books/${bookId}`)
        .end(function(err, res){
          assert.equal(err, null);
          assert.equal(res.status, 200);
          assert.equal(res.body, "missing required field comment");
          done();
        });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        assert.isTrue(true);
        chai
        .request(server)
        .keepOpen()
        .post(`/api/books/invalid_id?comment=another comment`)
        .end(function(err, res){
          assert.equal(err, null);
          assert.equal(res.status, 200);
          assert.equal(res.body, "no book exists");
          done();
        });
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        assert.isTrue(true);
        chai
        .request(server)
        .keepOpen()
        .delete(`/api/books/${bookId}`)
        .end(function(err, res){
          assert.equal(err, null);
          assert.equal(res.status, 200);
          assert.equal(res.body, "delete successful");
          done();
        });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        assert.isTrue(true);
        chai
        .request(server)
        .keepOpen()
        .delete(`/api/books/invalid_id`)
        .end(function(err, res){
          assert.equal(err, null);
          assert.equal(res.status, 200);
          assert.equal(res.body, "no book exists");
          done();
        });
      });
    });

  });

});
