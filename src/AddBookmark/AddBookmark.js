import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
import BookmarkForm from '../BookmarkForm/BookmarkForm';

class AddBookmark extends Component {
  static contextType = BookmarksContext;

  state = {
    error: null,
  };

  handleSubmit = (bookmark, callback) => {
    this.setState({ error: null })
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        callback(data)
        this.context.addBookmark(data)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {
    const { error } = this.state
    return (
      <section className='AddBookmark'>
        <h2>Create a bookmark</h2>
        <BookmarkForm
          onSubmit={this.handleSubmit}
          onCancel={this.handleClickCancel}
          error={error}
        />
      </section>
    );
  }
}

export default AddBookmark;
