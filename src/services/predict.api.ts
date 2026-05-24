import protectedApi from "@/lib/protectedApi";

export interface ManualPredictionPayload {

    attendance_percentage: number;

    study_hours_per_day: number;

    internal_marks: number;

    assignment_score: number;

    practical_marks: number;

    backlog_count: number;

    previous_sem_gpa: number;
}


export const predictStudentPerformance =
    async (
        payload: ManualPredictionPayload
    ) => {

        try {

            // USER
            const user =
                localStorage.getItem(
                    "eci-user"
                );

            const parsedUser =
                user
                    ? JSON.parse(user)
                    : null;

            // ROLE BASED ENDPOINT
            const endpoint =

                parsedUser?.role === "admin"

                    ? "/admin/student/predict/manual"

                    : "/teacher/student/predict/manual";

            // DIRECT BACKEND CALL
            const response =
                await protectedApi.post(
                    endpoint,
                    payload
                );

            return response.data;

        } catch (e: any) {

            console.log(
                "Prediction Error:",
                e.response?.data || e.message
            );

            throw e;
        }
    };