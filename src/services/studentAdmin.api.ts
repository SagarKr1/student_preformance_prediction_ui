import protectedApi from "@/lib/protectedApi";

export interface studentQueryAdmin {

    page?: number;

    limit?: number;

    search?: string;

    semester?: number;

    session?:string;

    course?: string;

    branch?: string;
}



export const studentAdmin = async (payload: studentQueryAdmin) => {
    try {
        const response =
                await protectedApi.get(
                    "/admin/students",
                {
                    params: payload
                }
                );

            return response.data;
    } catch (e: any) {
        console.log(
            "Prediction Error:",
            e.response?.data || e.message
        );

        throw e;
    }
}