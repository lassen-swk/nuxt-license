export const UseLicense = () => {

    const fetchAllLicenses = async () => {
        const res = await useAppFetch('/license', {method: 'GET'});
        return res;
    };

    const createLicense = async (input : any) =>  {
        const res = await useAppFetch('/license', {
            method: 'POST',
            body: input
        })

        return res;
    }

    const updateLicense = async (uuid: string, licenseData: any) => {
        const res = await useAppFetch(
            `/license/${uuid}`,
            {
                method: 'PUT',
                body: licenseData
            }
        )

        return res
    }

    const deleteLicense = async (uuid : string) => {
        const res = await useAppFetch(
            `/license/${uuid}`,
            {
                method: 'DELETE',
            }
        )
        return res
    }


    return {
        fetchAllLicenses,
        createLicense,
        updateLicense,
        deleteLicense
    }
}