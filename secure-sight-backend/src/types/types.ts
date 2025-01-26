export interface UserProps {
    tenantCode: string
    full_name: string
    email: string
    password: string
    role: string
}

export interface TenantProps {
    check: string,
    companyName: string,
    tenantCode: string,
    industry: string,
    hqLocation: string,
    dbName: string,
    domain: string
}

export interface TenantInfoProps {
    info: {
        role: string,
        tenantCode: string,
        email: string,
        dbName: string
    },
    data: TenantProps
}

export interface ConnectorProps {
    query: {
        connectorName: string,
        check: string,
    },
    info: {
        dbName: string
        email: string
        errMsg: string
        role: string
        tenantCode: string
    }
}

export interface ConnectorProps {
    check: string,
    connectorName: string
}

export interface InitProps {

}
