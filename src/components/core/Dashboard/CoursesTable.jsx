import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formatDate } from '../../../services/formatDate';
import { HiClock } from "react-icons/hi"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationModal from "../../Common/ConfirmationModal"
import { deleteCourse, getInstructorCourseDetails } from '../../../services/operations/courseAPIs';
import { useSelector } from 'react-redux';

const CoursesTable = ({courses, setCourses}) => {

    console.log(courses)

    const {token} = useSelector((state) => state.auth);
    const TRUNCATE_LENGTH = 30
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [confirmModal, setConfirmModal] = useState(null);

    const COURSE_STATUS = {
        DRAFT: "Draft",
        PUBLISHED: "Published",
    }

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse(courseId, token);
        const result = await getInstructorCourseDetails(token)
        if (result) {
            setCourses(result)
        }
        setConfirmModal(null)
        setLoading(false)
    }

    if(loading){
        return (
            <div className="flex h-screen items-center justify-center">
              <div className="spinner"></div>
            </div>
        )
    }

    return (
        <>
            <Table className="rounded-xl border border-richblack-800 ">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 items-center justify-center">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            COURSES
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            DURATION
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100 mr-2">
                            PRICE
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            ACTIONS
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                    No courses found
                                    {/* TODO: Need to change this state */}
                                </Td>
                            </Tr>
                        ) : (
                            courses.map((course) => {
                                return (
                                    <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8 justify-between">
                                        <Td className="flex flex-1 gap-x-4">
                                            <img 
                                                src={course.thumbnail}
                                                className="h-[148px] w-[220px] rounded-lg object-cover"
                                            />
                                            <div className="flex flex-col justify-between">
                                                <div className="text-lg font-semibold text-richblack-5">
                                                    {course.name}
                                                </div>
                                                <div className="text-xs text-richblack-300">
                                                    {
                                                        course.description.split(" ").length > TRUNCATE_LENGTH ? 
                                                        course.description.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                                                        : course.description
                                                    }
                                                </div>
                                                <div className="text-[12px] text-richblack-25">
                                                    Created: {formatDate(course.createdAt)}
                                                </div>
                                                {
                                                    course.status == COURSE_STATUS.DRAFT ? (
                                                        <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                            <HiClock size={14}/>
                                                            Drafted
                                                        </div>
                                                    ) : (
                                                        <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                            <FaCheck size={8} />
                                                        </div>
                                                            Published
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </Td>

                                        <Td className="text-sm font-medium text-richblack-100 flex items-center justify-center">
                                             {course.totalDuration}
                                        </Td>

                                        <Td className="text-sm font-medium text-richblack-100 flex items-center justify-center">
                                            ₹{course.price}
                                        </Td>

                                        <Td className="text-sm font-medium text-richblack-100 flex items-center justify-center">
                                            <button
                                            onClick={() => {
                                                navigate(`/dashboard/edit-course/${course._id}`)
                                                }}
                                                title="Edit"
                                                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                            >
                                                <FiEdit2 size={20}/>
                                            </button>

                                            <button
                                                title='delete'
                                                className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                                onClick={() => {
                                                    setConfirmModal({
                                                        text1: "Do you want to delete this course?",
                                                        text2:
                                                        "All the data related to this course will be deleted",
                                                        bt1Text: !loading ? "Delete" : "Loading...  ",
                                                        btn2Txt: "Cancel",
                                                        btn1Handler: !loading
                                                        ? () => handleCourseDelete(course._id)
                                                        : () => {},
                                                        btn2Handler: !loading
                                                        ? () => setConfirmModal(null)
                                                        : () => {},
                                                    })
                                                }}
                                            >
                                                <RiDeleteBin6Line size={20} />
                                            </button>
                                        </Td>

                                    </Tr>
                                )
                            })
                        )
                    }
                </Tbody>
            </Table>
            {
                confirmModal && <ConfirmationModal modalData={confirmModal}/>
            }
        </>
    )
}

export default CoursesTable
