var nock = require('nock')
var fs = require('fs')
var path = require('path')

var chai = require('chai')
var expect = chai.expect

var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

var myModule = require('./')

describe('my first module', function () {
  it('collects the titles from the /node subreddit', function (done) {
    nock('http://reddit.com')
      .get('/r/node')
      .replyWithFile(200, path.join(__dirname, 'fixtures/response.html'))

    myModule(function (err, results) {
      if (err) {
        return done(err)
      }

      expect(results).to.containSubset([
        {
          title: 'Whiteboard - NodeJS tool to write beautiful API documentation',
          likeCount: 10
        },
        {
          title: 'MongoDB now powered by PostgreSQL',
          likeCount: 22
        }
      ])
    })
  })
})
