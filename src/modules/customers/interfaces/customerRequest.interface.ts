export interface ICustomerRequest {
    annotations?:   string;
    birthDate?:     Date;
    email?:         string;
    gender?:        '0' | 'M' | 'F';
    imageUrl?:      string;
    lastName?:      string;
    name:           string;
    phone?:         string;
    settlement_Id?: number;
    streetAddress?: string;
}