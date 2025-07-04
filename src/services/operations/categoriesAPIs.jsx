import React from 'react'
import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { categories } from '../apis';

const {GET_CATEGORY_PAGE_DETAILS_API, CREATE_CATEGORY_API, CREATE_CATEGORY_REQUEST_API, GET_CATEGORY_REQUEST_API,
    APPROVE_CATEGORY_APPROVAL_REQUESTS_API, DECLINE_CATEGORY_APPROVAL_REQUESTS_API} = categories;

export const getCategoryPageDetails = async (categoryId) => {
    const toastId = toast.loading("Loading!!!")
    let result = [];
    try{
        const response = await apiConnector("POST", GET_CATEGORY_PAGE_DETAILS_API, {categoryId})
        console.log("getCategoryPageDetails API response", response)

        if(response?.data?.data?.success){
            throw new Error("Could not Fetch Category Page Details")
        }

        result = response?.data?.data;

    }
    catch(error){
        console.log("Catalog Page Api error..", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createCategory = async (name, description, token) => {
    const toastId = toast.loading("Loading!!!")
    try{
        const response = await apiConnector("POST", CREATE_CATEGORY_API, {name, description}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("create category API response", response)

        if(response?.data?.data?.success){
            throw new Error("Could not create the category")
        }
    }
    catch(error){
        console.log("Category create Api error..", error);
        toast.dismiss(toastId);
        toast.error(error.response.data.message);
        return false
    }
    toast.dismiss(toastId);
    return true;
}

export const createCategoryRequest = async (name, description, token, firstName, lastName, emailID) => {
    const toastId = toast.loading("Loading!!!")
    try{
        const response = await apiConnector("POST", CREATE_CATEGORY_REQUEST_API, {name, description, firstName, lastName, emailID}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("create category request API response", response)

        if(response?.data?.data?.success){
            throw new Error("Could not create the category request")
        }
    }
    catch(error){
        console.log("Category create Api error..", error);
        toast.dismiss(toastId);
        toast.error(error.response.data.message);
        return false
    }
    toast.dismiss(toastId);
    return true;
}

export async function getCategoryApprovalRequests(token){
    console.log("akash")
    const toastId = toast.loading("Loading..!!");
    let result = []

    try{
        const response = await apiConnector("POST", GET_CATEGORY_REQUEST_API, null, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        console.log(response.data.data, "response")
        result = response.data.data
    }
    catch(error){
        console.log("Get Category Requests API Error", error);
        toast.error("Could not Fetch the Category Approval Requests");
    }
    toast.dismiss(toastId);
    return result;
}

export async function declineCategoryApprovalRequest(emailId, name, categoryName, token){
    const toastId = toast.loading("Loading..!!");
    try{
        const response = await apiConnector("DELETE", DECLINE_CATEGORY_APPROVAL_REQUESTS_API, {emailId, name, categoryName}, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Category Approval Request Declined Successfully")
    }
    catch(error){
        console.log("Decline Category Approval API Error", error);
        toast.error("Could not Delete the Category Approval Requests");
        toast.dismiss(toastId);
        return false
    }
    toast.dismiss(toastId);
    return true
}

export async function approveCategoryApprovalRequest(emailId, name, categoryName, token){
    const toastId = toast.loading("Loading..!!");
    try{
        const response = await apiConnector("POST", APPROVE_CATEGORY_APPROVAL_REQUESTS_API, {emailId, name, categoryName}, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Category Approval Request Approved Successfully")
    }
    catch(error){
        console.log("Approve Category Approval API Error", error);
        toast.error("Could not Approve the Category Approval Requests");
        toast.dismiss(toastId);
        return false
    }
    toast.dismiss(toastId);
    return true
}