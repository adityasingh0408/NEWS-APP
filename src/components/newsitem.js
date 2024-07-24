import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              imageurl
                ? imageurl
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFslb0pACuoj1Y8UYas6nmUIBGKYM24wo5-w&s"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <span
              className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
              style={{ left: "90%", zIndex: "1" }}
            >
              {source}
            </span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small>
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
