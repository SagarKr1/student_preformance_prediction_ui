import axiosClient from "@/lib/axios"


export const allBranch = async ()=>{
    try{
        const response =
                await axiosClient.get(
                    "/public/branch"
                );

            return response.data;
    }catch (e: any) {
        console.log(
            "Prediction Error:",
            e.response?.data || e.message
        );

        throw e;
    }
}