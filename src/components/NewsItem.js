// NewsItem.js
import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="my-2">
          <div className="card text-bg-dark mb-3">
            <img
              src={
                imageUrl
                  ? imageUrl
                  : "https://www.oneindia.com/img/1200x80/2018/11/congress-bjp2-1542775233.jpg"
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a
                rel="noreferrer"
                href={newsUrl}
                target="_blank"
                className="btn btn-secondary "
              >
                Read More
              </a>
              <p className="card-text">
                <small className="text-body-light">
                  By <strong>{!author ? "Unknown" : author} </strong>on{" "}
                  <strong>{new Date(date).toGMTString()}</strong>
                </small>
              </p>
              <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'80%',zIndex:'1'}}>
                {source}
                <span className="visually-hidden">source</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
