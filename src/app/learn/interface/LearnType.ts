export const LearnType = {
    reading: 'reading',
    study: 'study',
    review: 'review',
    exercise: 'exercise'
}

export type LearnType = keyof typeof LearnType;
