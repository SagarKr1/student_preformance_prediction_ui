import axiosClient from "@/lib/axios"


export const allSession = async ()=>{
    try{
        const response =
                await axiosClient.get(
                    "/public/session"
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