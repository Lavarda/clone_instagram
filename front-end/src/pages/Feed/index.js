import React,{ Component } from 'react';
import './style.css';
import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';
import api from '../../services/api';
import io from 'socket.io-client';

export default class Feed extends Component {

    state = {
        feed: [],
    }
    
    async componentDidMount() {
        this.registerToSocket();
        const response = await api.get('posts');

        if ( response ) {
            this.setState({
                feed: response.data,
            })
        }
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        socket.on('post', newPost => {
            this.setState({
                feed: [ newPost, ...this.state.feed],
            })
        })

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map( (v) => {
                    return v._id === likedPost._id ? likedPost : v;
                })
            })
        })
    }

    handleLike = (id) => {
        api.post(`/posts/${id}/like`);
    } 

    render() {
        return(
            <section id="post-list">
                <div>
                    {this.state.feed.map( (v) => {
                        return(
                            <article key={'posts_'+v._id}>
                                <header>
                                    <div className="user-info">
                                        <span>{v.author}</span>
                                        <span className="place">{v.place}</span>
                                    </div>
                                    <img src={more} alt="Mais"></img>
                                </header>
            
                                <img src={`http://localhost:3333/files/${v.image}`}></img>
            
                                <footer>
                                    <div className="actions">
                                        <button type="button" onClick={ () => this.handleLike(v._id)}>
                                            <img src={like} alt="Likes"></img>
                                        </button>
                                        <img src={comment} alt="Comentários"></img>
                                        <img src={send} alt="Enviar"></img>
                                    </div>
                                    <strong>{v.likes} curtidas</strong>
                                    <p> 
                                        {v.description}
                                        <span>{v.hashtags}</span>
                                    </p>
                                </footer>
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}