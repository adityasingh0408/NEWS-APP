import React, { Component } from "react";
import NewsItem from "./newsitem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  pagesize = 15;

  static defaultProps = {
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      hasMore: true,
      totalresults: 0,
    };

    document.title = `${this.capitalize(this.props.category)}-newspulse`;
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async componentDidMount() {
    this.updatenews();
  }

  async updatenews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7fb2554d09864228a8c3596235baceca&page=${this.state.page}&pagesize=${this.pagesize}`;

    this.setState({ loading: true });
    try {
      let data = await fetch(url);
      let parsedata = await data.json();
      this.setState({
        articles: parsedata.articles || [],
        hasMore: parsedata.articles && parsedata.articles.length > 0,
        loading: false,
        totalresults: parsedata.totalResults,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7fb2554d09864228a8c3596235baceca&page=${this.state.page+1}&pagesize=${this.pagesize}`;
    this.setState({ page: this.state.page + 1 });
    try {
      let data = await fetch(url);
      let parsedata = await data.json();
      this.setState({
        articles: [...this.state.articles, ...parsedata.articles || []],
        hasMore: parsedata.articles && parsedata.articles.length > 0,
        totalresults: parsedata.totalResults,
      });
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  render() {
    return (
      <>
        <div className="text-center" style={{ margin: "30px" ,marginTop:'90px'}}>
          <h1>{`Top ${this.capitalize(this.props.category)} Headlines`}</h1>
        </div>

        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalresults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title || ""}
                    description={element.description || ""}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author || "unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;


/*
  //code of how i made click button to naviagate pages like prev and next 
  //this is css and logic of that 

   <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handleprevclick}
            className="btn btn-dark"
          >
            &larr;previous
          </button>
          <button
            disabled={!this.state.hasMore}
            type="button"
            onClick={this.handlenextclick}
            className="btn btn-dark"
          >
            next &rarr;
          </button>
        </div>

//this is the function of previous click
         handleprevclick = async () => {
    await this.setState({ page: this.state.page - 1 });
    this.updatenews();
  };

  // this is function of next click
  handlenextclick = async () => {
    await this.setState({ page: this.state.page + 1 }); // Correctly using setState
    this.updatenews();
  };

  // infinite scroll logic
  //fetch more data code
*/