export const getCaseStatus = async (receiptNumber: string) => {
    const authResponse = await fetch("https://egov.uscis.gov/csol-api/ui-auth", {
        "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,fr;q=0.8",
        "content-type": "application/json"
        },
        "body": null,
        "method": "GET",
    }).then(response => response.json());
    
    const token = authResponse.JwtResponse.accessToken;
    const authHeader = `Bearer ${token}`
    
    const response = await fetch(`https://egov.uscis.gov/csol-api/case-statuses/${receiptNumber}`, {
        "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,fr;q=0.8",
        "authorization": authHeader,
        "content-type": "application/json"
        },
        "body": null,
        "method": "GET",
    }).then(response => response.json());

    console.log("received response from USCIS", response);
  
    const statusText = response.CaseStatusResponse.detailsEng.actionCodeText;
    const statusDesc = response.CaseStatusResponse.detailsEng.actionCodeDesc;

    return {
        status: statusText,
        details: statusDesc
    }
}

export interface CaseStatusResponse {
    status: string;
    details: string;
}