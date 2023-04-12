export interface IProductResponse {
    Ok:      boolean;
    Message: string | null;
    Data:    IData;
}

export interface IData {
    Products: IProduct[];
}

export interface IProduct {
    Name:           string;
    Description:    string | null;
    CategoryName:   string | null;
}