export interface ICustomerResponse {
    Ok:      boolean;
    Message: string | null;
    Data:    IData;
}

export interface IData {
    Customers: ICustomer[];
}

export interface ICustomer {
    Customer_Id:        number;
    CustomerName:       string;
    LastName:           null | string;
    Gender:             string;
    Email:              null | string;
    Phone:              null | string;
    BirthDate:          null | string;
    ImageUrl:           null | string;
    Annotations:        null | string;
    StreetAddress:      null | string;
    Settlement_Id:      number | null;
    SettlementName:     null | string;
    SettlementTypeName: null | string;
    PostalCode:         null | string;
    Municipality_Id:    number | null;
    MunicipalityName:   null | string;
    City_Id:            number | null;
    CityName:           null | string;
    State_Id:           number | null;
    StateName:          null | string;
}
