import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAllCategories } from '../services/operations/courseAPIs';
import { useState } from 'react';
import { getCategoryPageDetails } from '../services/operations/categoriesAPIs';
import Footer from '../components/Common/Footer';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';

const Catalog = () => {

    const {catalogName} = useParams();
    const [categoryId, setCategoryId] = useState("");
    const [categoryPageData, setCategoryPageData] = useState(null);
    const [active, setActive] = useState(1);
    const [differentCategories, setDifferentCategories] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAllCategoryId = async () => {
        setLoading(true);
        const result = await getAllCategories();
        const categoryId = result.filter((category) => category.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id
        setLoading(false);
        return categoryId;
    } 

    const getAllCategoryPageDetails = async (categoryId) =>{
        setLoading(true);
        const result = await getCategoryPageDetails(categoryId);
        let temp = [];
        result.differentCategories.map((element) => {
            element.course.map(course => {
                temp.push(course)
            })
        })
        setCategoryPageData(result)
        setDifferentCategories(temp)
        setLoading(false);
    }

    useEffect(() => {
        ;(async () => {
            const category_Id = await fetchAllCategoryId()
            setCategoryId(category_Id)
        })()
    }, [catalogName])

    useEffect(() => {
        ;(async () => {
            if(categoryId){
                await getAllCategoryPageDetails(categoryId)
            }
        })()
    }, [categoryId])

    if (loading){
        return <div className='spinner mx-auto mt-[300px]'/>
    }

    return (
        <>
            <div className="box-content bg-richblack-800 px-4">
            
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-richblack-300">
                        Home / Catalog / <span className="text-yellow-25">{categoryPageData?.selectedCategory?.name}</span>
                    </p>
                    <p className="text-3xl text-richblack-5">
                        {categoryPageData?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-richblack-200">
                        {categoryPageData?.selectedCategory?.description}
                    </p>
                </div>

            </div>

            {/* Section-1 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className='text-2xl font-bold text-richblack-5 lg:text-4xl'>
                    Courses to get you started
                </div>

                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        className={`px-4 py-2 ${
                        active === 1
                            ? "border-b border-b-yellow-25 text-yellow-25"
                            : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Most Popular
                    </p>
                    <p
                        className={`px-4 py-2 ${
                        active === 2
                            ? "border-b border-b-yellow-25 text-yellow-25"
                            : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                </div>
                <div>
                    <CourseSlider Courses={categoryPageData?.selectedCategory?.course}/>
                </div>
            </div>

            {/* section-2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-10 lg:max-w-maxContent">
                <p className='text-2xl font-bold text-richblack-5 lg:text-4xl'>Top courses</p>
                <div className="py-8">
                    <CourseSlider Courses={differentCategories}/>
                </div>
            </div>

            {/* section-3 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className='text-2xl font-bold text-richblack-5 lg:text-4xl'>Frequently Brought Together</p>
                <div className='py-8'>
                    
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                        {
                            categoryPageData?.topSellingCourses?.slice(0, 4).map((course, index) => (
                                <Course_Card key={index} course={course} Height={"h-[400px]"}/>
                            ))
                        }

                    </div>

                </div>
            </div>

            <Footer/>
        </>
    )
}

export default Catalog
