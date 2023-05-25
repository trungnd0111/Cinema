import React from 'react'
import { NavLink } from 'react-router-dom'

export default function CarouselCard({ item: { id, cover, name, rating, time, desc, starring, genres, tags, trailer } }) {
    return (
        <>
            <div className='box'>
                <div className='coverImage'>
                    <img src={cover} alt='' />
                </div>
                <div className='content flex'>
                    <div className='details row'>
                        <h1>{name}</h1>
                        <div className='rating flex'>
                            <div className='rate'>
                                <i className='fas fa-star'></i>
                                <i className='fa fa-star'></i>
                                <i className='fa fa-star'></i>
                                <i className='fa fa-star'></i>
                                <i className='fa fa-star-half'></i>
                            </div>
                            <label>{rating}(Imdb)</label>
                            <span>GP</span>
                            <label>{time}</label>
                        </div>
                        <p>{desc}</p>
                        <div className='cast'>
                            <h4>
                                <span>Starring </span>
                                {starring}
                            </h4>
                            <h4>
                                <span>Genres </span>
                                {genres}
                            </h4>
                            <h4>
                                <span>Tags </span>
                                {tags}
                            </h4>
                        </div>
                        <button className='btn btn-primary'>
                            <i className='fas fa-play'></i> Booking Ticket Now!
                        </button>
                    </div>
                    <div className='playButton row'>
                        <NavLink to={`/home`}>
                            <button>
                                <div className='img'>
                                    <img src='./images/play-button.png' alt='' />
                                    <img src='./images/play.png' className='change' />
                                </div>
                                WATCH TRAILER
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
