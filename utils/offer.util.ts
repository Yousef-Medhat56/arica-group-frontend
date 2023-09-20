export const checkIfOfferAvailable = (offerData: any) => {
    const currentDate = new Date();
    const offerStartDate = new Date(offerData.start_date);
    const offerEndDate = new Date(offerData.end_date);

    const isOfferAvailable =
        currentDate >= offerStartDate && currentDate <= offerEndDate;

    return isOfferAvailable;
};
