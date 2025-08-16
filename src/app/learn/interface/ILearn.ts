import { LearnType } from "./LearnType";

export interface ILearn {
    id: number;
    content: string;
    start: Date;
    end: Date | null;
    type: LearnType;
    totalTime?: number;
    pauseTime: number;
    createdAt: Date;
    subjectId: number | null;
}