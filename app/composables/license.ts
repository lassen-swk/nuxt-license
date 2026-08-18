export const UseLicense = () => {

    const fetchAllLicenses = async () => {
        const res = await useApi('/license', {method: 'GET'});
        return res;
    };

    const createLicense = async (input : any) =>  {
        const res = await useApi('/license', {
            method: 'POST',
            body: input
        })

        return res;
    }

    const updateLicense = async (uuid: string, licenseData: any) => {
        const res = await useApi(
            `/license/${uuid}`,
            {
                method: 'PUT',
                body: licenseData
            }
        )

        return res
    }


    return {
        fetchAllLicenses,
        createLicense,
        updateLicense
    }
}