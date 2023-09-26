const baseAPI = '/api';

const travelBlogService = {
  get() {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/blogs`, {
        headers: {
          accept: 'application/json',
          'User-agent': 'learning app',
        }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  create(blog) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/blog`, {
        method: 'PUT',
        body: JSON.stringify(blog),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-agent': 'learning app',
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  update(blog) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/blog`, {
        method: 'POST',
        body: JSON.stringify(blog),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-agent': 'learning app',
        }
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  destroy(blog) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/blog/${blog.id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  find(blog) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/blog/${blog.id}`, {
        method: 'GET', headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  search(param) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/search/${param}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-agent': 'learning app',
        }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  getBlogsByUserId(userId) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/blogs/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-agent': 'learning app',
        }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  }

};



export default travelBlogService;
