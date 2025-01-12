/*
 {
                    "product_id": 1,
                    "section_id": 1,
                    "user_bussiness_id": 1,
                    "section": {
                        "name": "Discos"
                    }
                },
*/



export type Sections = {
    section: {
        id: number,
        name: string
    }
}

export type Section = {
    id: number;
    name: string;
}


export type ProductType = {
    id: number;
    name: string;
    description: string;
    price: number;
    category?: string;
    image: string;
    sections?: Sections[]
}