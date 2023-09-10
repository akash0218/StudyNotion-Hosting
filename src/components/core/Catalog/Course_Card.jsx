import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import getAvgRating from '../../../utils/getAvgRating'
import RatingStars from '../../Common/RatingStars'

const Course_Card = ({course, Height}) => {

    console.log(course)
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = getAvgRating(course.ratingsAndReviews)
        setAvgReviewCount(count)
    }, [course])


    return (
        <div>
            
            <Link to={`/courses/${course._id}`}>

                <div>
                    <div className='rounded-lg'>
                        <img
                            src={course.thumbnail}
                            className={`${Height} w-full rounded-xl object-cover`}
                        />
                    </div>
                    <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-xl text-richblack-5">
                            {course?.name}
                        </p>
                        <p className="text-sm text-richblack-50">
                            {course?.instructor?.firstName} {course?.instructor?.lastName}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-5">{String(avgReviewCount)}</span>
                            <div className='mb-[2px]'>
                                <RatingStars Review_Count={Number(avgReviewCount)}/>
                            </div>
                            <span className="text-richblack-400">
                                {course?.ratingsAndReviews?.length} Ratings
                            </span>
                        </div>
                        <p className="text-xl text-richblack-5">
                            Rs. {course?.price}
                        </p>
                    </div>
                </div>

            </Link>

        </div>
    )
}

export default Course_Card
