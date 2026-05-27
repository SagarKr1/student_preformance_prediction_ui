import protectedApi from "@/lib/protectedApi";

export interface studentQueryTeacher {

    page?: number;

    limit?: number;

    search?: string;

    semester?: number;

    course?: string;
}

export const studentTeacher = async (payload: studentQueryTeacher) => {
    try {
        const response =
                await protectedApi.get(
                    "/teacher/students",
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