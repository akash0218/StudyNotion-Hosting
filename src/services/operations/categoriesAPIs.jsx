import React from 'react'
import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiconnecter';
import { categories } from '../apis';

const {GET_CATEGORY_PAGE_DETAILS_API} = categories;

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
