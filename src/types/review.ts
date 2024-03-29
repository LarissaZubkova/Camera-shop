export type Review = {
    id: string;
    createAt: string;
    cameraId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
    rating: number ;
}

export type FormReviewData = {
    cameraId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
    rating: number;
}

export type InputTypes = {
    rating: string;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
}
