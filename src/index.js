import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

// Import search bar from components/search_bar.js
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// Youtube API key
const API_KEY = "YOUR_API_KEY";

// Create a new component
// It should produce some HTML
class App extends Component {
   constructor(props){
      super(props);

      this.state = {
         videos: [],
         selectedVideo: null
      };

      this.videoSearch('surfBoards');
   }

   videoSearch(term){
      YTSearch({key: API_KEY, term: term}, (videos) => {
         this.setState({
            videos: videos,
            selectedVideo: videos[0]
         });
     });
  }

  render() {
     const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

     return (
        <div>
           <SearchBar onSearchTermChange={ term => videoSearch(term)}/>
          <VideoDetail video={this.state.selectedVideo}/>
          <VideoList
             onVideoSelect={selectedVideo => this.setState({selectedVideo})}
             videos={this.state.videos} />
      </div>);
   }
}

//React please take this component and shove it in DOM
ReactDOM.render(<App />, document.querySelector('.container'));
