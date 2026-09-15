export class MainPannelRoutes{
    createAd = '/create/ad';
    listAds = '/list/ads';

    updateAd = (adsId=':adId') => `/update/ad/${adsId}`;
    previewAd = (adsId=':adId') => `/preview/ad/${adsId}`;

    register(route){
        return {
            pannel: this
        }
    }
};