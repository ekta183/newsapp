import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general',
    totalResults:0
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewNews-${this.capitalize(this.props.category)}`;
  }

  async componentDidMount() {
    this.updatePage();
  }

  async updatePage() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(20);
    this.setState({ loading: true });
    this.props.setProgress(40);
    let data = await fetch(url);
    this.props.setProgress(60);
    let parsedData = await data.json();
    this.props.setProgress(80);
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    this.props.setProgress(100);
  }

  // prevClick = async () => {
  //   this.setState(
  //     (prevState) => ({
  //       page: prevState.page - 1,
  //     }),
  //     () => {
  //       this.updatePage();
  //     }
  //   );
  // };

  // nextClick = async () => {
  //   this.setState(
  //     (prevState) => ({
  //       page: prevState.page + 1,
  //     }),
  //     () => {
  //       this.updatePage();
  //     }
  //   );p
  // };
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    
    const data = await fetch(url);
    const parsedData = await data.json();
    
    this.setState((prevState) => ({
      articles: prevState.articles.concat(parsedData.articles),
      page: nextPage,
    }));
  };
  

  render() {
    return (
      <>
        <h1 className='text-center' style={{marginTop:'70px'}}>NewNews-Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className='row'>
          {/* {!this.state.loading && */}
          {this.state.articles.map((element) => (
              <div className='col-md-4 ' key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between mb-4'>
          <button
            disabled={this.state.page <= 1}
            type='button'
            className='btn btn-dark'
            onClick={this.prevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type='button'
            className='btn btn-dark'
            onClick={this.nextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
