import protectedApi from "@/lib/protectedApi";

export interface studentQueryTeacher {

    student_id: string;
}

export const studentPerformance = async (payload: studentQueryTeacher) => {
    try {
        const response =
                await protectedApi.get(
                    `/teacher/student/predict/${payload.student_id}`,
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