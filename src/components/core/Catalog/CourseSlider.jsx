import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode'
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

import Course_Card from './Course_Card';

const CourseSlider = ({Courses}) => {

    console.log(Courses)

    return (
        <div>
            {
                Courses?.length ? (
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={25}
                        loop={true}
                        breakpoints={{
                            1024: {
                                slidesPerView: 3,
                            }
                        }}
                        modules={[Autoplay, FreeMode, Navigation]}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }}
                        className="max-h-[30rem]"
                    >
                        {
                            Courses.map((course, index) => {
                                return (<SwiperSlide key={index}>
                                        <Course_Card course={course} Height={"h-[250px]"}/>
                                </SwiperSlide>)
                            })
                        }
                    </Swiper>
                ) : (
                    <p className="text-xl text-richblack-5">No Course Found</p>
                )
            }
        </div>
    )
}

export default CourseSlider
