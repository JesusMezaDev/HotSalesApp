export interface ISettlementsResponse {
    Ok:      boolean;
    Message: string | null;
    Data:    IData;
}

export interface IData {
    Settlements:    ISettlement[];
    Address:        IAddress[];
}

export interface ISettlement {
    Settlement_Id:          number; 
    Settlement_KeyCode:     string;
    SettlementName:         string;
}

export interface IAddress {
    MunicipalityKeyCode:    string;
    Municipality_Name:      string;
    City_KeyCode:           string;
    City_Name:               string;
    State_KeyCode:          string;
    State_Name:             string;
}

