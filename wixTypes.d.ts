// See https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/using-the-sdk

import IPackages = wix.IPackages;

declare namespace wix {
    type ViewMode = 'editor' | 'preview' | 'site' | 'standalone';
    type DeviceType = 'desktop' | 'mobile';

    interface ISiteInfo {
        url: string;
        baseUrl?: string;
        pageTitle?: string;
        referer?: string;
        siteDescription?: string;
        siteKeywords?: string;
        siteTitle?: string;
    }

    interface IInstanceParams {
        /**
         * The instance ID of the app within Wix.
         */
        instanceId: string;

        /**
         * The date of the payload signature. e.g. "2015-12-10T06:57:37.201Z"
         */
        signDate: string;

        /**
         * The ID of the Wix user or site member who is logged in.
         */
        uid?: string;

        /**
         * The permission set of the Wix user or site member
         */
        permissions?: string;

        /**
         * The user's current IP address and port number. e.g. "91.199.119.13/35734"
         */
        ipAndPort: string;

        /**
         * The Premium Package ID, as was entered in the Dev Center during the app registration process.
         */
        vendorProductId?: string;

        /**
         * The ID of an anonymous site visitor.
         */
        aid?: string;

        /**
         * The instance ID of the app in the original website. Appears only in copied sites.
         */
        originInstanceId?: string;

        /**
         * The ID of the site owner. When this value is the same as the uid, it means the site owner is logged in.
         *
         * Note: The siteOwnerId for a given instanceId can change. If a site owner transfers the site to another user,
         * the existing instanceId is now linked to the new site owner.
         * For example, let's say User A transfers the site to User B. The app keeps its instanceId -
         * but is now linked to User B's siteOwnerId.
         */
        siteOwnerId: string;
    }

    interface ISitePage {
        id: string;
        title: string;
        hide: boolean;
        subPages?: ISitePage[];
    }

    interface IUserInfo {
        id?: string;
        owner: boolean;
        email: string;
        attributes: {
            name: string;
        };
    }

    interface IWixColor {
        name?: string;
        reference: string;
        value: string;
    }

    interface IPageNavigationEvent {
        fromPage: string;
        toPage: string;
    }

    interface IFont {
        editorKey: string;
        family: string;
        fontStyleParam: boolean;
        preset: string;
        size: number;
        style: {
            bold: boolean;
            italic: boolean;
            underline: boolean;
        };
        value: string; // css string, e.g. "font:italic normal bold 11px/13px impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif;"
    }

    interface IFontOld {
        cssFontFamily: string;
        family: string;
        index: number;
        value: string;
    }

    interface IStyleParams {
        booleans: {
            [key: string]: boolean;
        };
        colors: {
            [key: string]: {
                themeName: string;
                value: string;
            };
        };
        fonts: {
            [key: string]: IFont;
        };
        googleFontsCssUrl: string;
        numbers: {
            [key: string]: number;
        };
    }

    interface IThemeFont {
        cdnName: string;
        characterSets: string[];
        cssFontFamily: string;
        displayName: string;
        fallbacks: string;
        fontFamily: string;
        genericFamily: string;
        permissions: string;
        provider: string;
        spriteIndex: number;
    }

    interface IThemeTextPreset {
        editorKey: string;
        fontFamily: string;
        lineHeight: string;
        size: string;
        style: string;
        value: string;
        weight: string;
    }

    interface IThemeChangeParams {
        fonts: {
            cssUrls: string[];
            fontMeta: {
                lang: string;
                fonts: IThemeFont[];
            }[];
            imageSpriteUrl: string;
        };
        siteColors: IWixColor[];
        siteTextPresets: {
            [key: string]: IThemeTextPreset;
        };
        style: IStyleParams;
    }

    interface IMediaOptions {
        fileName: string;
        height: number;
        width: number;
        relativeUri: string;
    }

    interface IContactName {
        prefix?: string;
        first?: string;
        middle?: string;
        last?: string;
        suffix?: string;
    }

    interface IContact {
        name?: IContactName;
        Picture?: string;
        Company?: {
            role?: string;
            name?: string;
        };
        emails?: {
            id?: number;
            tag: string;
            email: string;
            emailStatus?: 'optOut' | 'transactional' | 'recurring';
            deliveryStatus?:
                | 'VALID'
                | 'SPAM'
                | 'COMPLAINT'
                | 'REJECTED'
                | 'DEFERRAL'
                | 'BOUNCE';
        }[];
        phones?: {
            id?: number;
            tag: string;
            phone: string;
            normalizedPhone?: string;
        }[];
        addresses?: any; // we dont use this anyway ATM
        urls?: {
            id?: number;
            tag: string;
            url: string;
        }[];
        dates?: {
            id?: number;
            tag: string;
            date: string; // ISO 8601 timestamp
        }[];
    }

    interface ICommentActivityParams {
        text: string;
        channel: string; // We use "SITE"
        openId?: {
            channel: 'FACEBOOK' | 'TWITTER' | 'GOOGLE_PLUS' | 'OTHER';
            // There are other valid `channel` values, we dont support them ATM
        };
        metadata?: {
            name: string;
            value: string;
        }[];
        commenter?: {
            name?: IContactName;
            email?: string;
        };
    }

    interface IContactFormActivityInfo {
        subject?: string;
        content?: {
            message: string;
        };
    }

    interface IActivity {
        type: string;
        info: ICommentActivityParams | IContactFormActivityInfo;
        details: {
            additionalInfoUrl: string | null;
        };
        contactUpdate: IContact;
    }

    export interface IPackagePeriod {
        price: string;
        Link: string;
    }

    interface IPackage {
        id: string;
        name: string;
        price: string;
        is_active: boolean;
        freeMonth: boolean;
        currencyCode: string;
        currencySymbol: string;
        monthly: IPackagePeriod;
        yearly: IPackagePeriod;
        oneTime: IPackagePeriod;
        bestSellingFeature: string;
        discountPercent: number;
    }

    interface IPackages {
        packages: IPackage[];
    }

    interface IConsentPolicy {
        defaultPolicy: boolean; // True = this policy is the default policy for the site as defined by the site owner. False = the user actively accepted/set this policy.
        policy: {
            functional: boolean;
            analytics: boolean;
            advertising: boolean;
            dataToThirdParty: boolean;
            essential: boolean;
        };
        createdDate: string; // ISO 8601 timestamp
    }
}

interface WixStatic {
    addEventListener(name: string, callback: Function): number;
    
    removeEventListener(eventName: string, callBackOrId: Function | number): void;

    closeWindow(message?: any): void;

    currentMember(callback: (userInfo: wix.IUserInfo) => void): void;

    getCurrentPageId(callback: (pageId: string) => void): void;

    getSiteInfo(callback: (siteInfo: wix.ISiteInfo) => void): void;

    getSitePages(callback: (siteInfo: wix.ISitePage[]) => void): void;

    getStyleInfo(callback: (siteInfo: wix.ISiteInfo) => void): void;

    getStyleInfo(callback: (sitePages: wix.ISitePage[]) => void): void;

    requestLogin(
        dialogOptions: { mode?: 'login' | 'signup'; language?: string },
        callback: (userInfo: wix.IUserInfo) => void,
        onError?: Function
    ): void;

    logOutCurrentMember(): void;

    resizeWindow(width: number, height: number, onComplete?: Function): void;

    setHeight(value: number): void;

    navigateToComponent(
        compId: string,
        options?: { pageId: string },
        onFailure?: (error: any) => void
    ): void;

    openModal(
        url: string,
        width: number,
        height: number,
        onClose?: Function,
        theme?: string
    ): void;

    Activities: {
        Type: {
            FORM_CONTACT_FORM: string;
            FORM_SUBSCRIPTION_FORM: string;
            FORM_FORM: string;
            SOCIAL_COMMENT: string;
        };

        postActivity(
            activity: wix.IActivity,
            onSuccess: (result: {
                activityId?: string;
                contactId?: string;
            }) => void,
            onError: (result: any) => void
        ): void;
    };

    Dashboard: {
        getEditorUrl(callback: (url: string) => void): void;
        getProducts(
            onSuccess: (res: IPackages) => void,
            onError?: Function
        ): void;
    };

    Events: {
        COMPONENT_DELETED: string;
        EDIT_MODE_CHANGE: string;
        PAGE_NAVIGATION: string;
        THEME_CHANGE: string;
        SITE_PUBLISHED: string;
        STYLE_PARAMS_CHANGE: string;
        DEVICE_TYPE_CHANGED: string;
        SETTINGS_UPDATED: string;
    };

    Settings: {
        closeWindow(options?: {}): void;
        openBillingPage(): void;
        getDashboardAppUrl(callback: (url: string) => void): void;
        openModal(
            url: string,
            width: number,
            height: number,
            title: string,
            onClose: Function
        ): void;
        openMediaDialog(
            mediaType: string,
            multiSelect: boolean,
            onSuccess: (selectedMedia: wix.IMediaOptions) => void,
            onCancel?: Function
        ): void;
        openReviewInfo(): void;
        refreshApp(queryParams?: {}): void;
        refreshAppByCompIds(compIds: [string], queryParams?: {}): void;
        triggerSettingsUpdatedEvent(data: object, compId?: string): void;
        addComponent(
            options: {
                copyStyle?: boolean;
                styleId?: string;
                componentType: string;
                widget?: {
                    widgetId: string;
                    allPages?: boolean;
                    wixPageId?: string;
                };
                page?: {
                    title?: string;
                    pageId: string;
                    hidden: boolean;
                    subPage: boolean;
                };
            },
            onSuccess?: (compId: string) => void,
            onFailure?: (msg: any) => void
        ): void;

        MediaType: {
            AUDIO: string;
            BACKGROUND: string;
            DOCUMENT: string;
            IMAGE: string;
            SECURE_MUSIC: string;
            SWF: string;
        };
    };

    Styles: {
        getEditorFonts(callback: (fonts: wix.IFont) => void): void;
        getSiteColors(): wix.IWixColor[];
        getSiteTextPresets(
            callback: (result: { [key: string]: wix.IThemeTextPreset }) => void
        ): void;
        getStyleFontByKey(key: string): Object;
        getStyleColorByKey(key: string): string;
        getStyleParams(callback: (params: wix.IStyleParams) => void): void;
        getColorByreference(reference: string): wix.IWixColor;
        setBooleanParam(
            key: string,
            value: boolean,
            callback: Function,
            onError: Function
        ): void;
        setNumberParam(
            key: string,
            value: number,
            callback: Function,
            onError: Function
        ): void;
        setColorParam(
            key: string,
            value: { value: { opacity: number; rgba: string } } | string
        ): void;
        setFontParam(key: string, value: { value: any }): void;
        setUILIBParamValue(type: string, key: string, value: any): void;
    };

    Theme: {
        DEFAULT: string;
        BARE: string;
    };

    Utils: {
        getCacheKiller(): string;
        getCompId(): string;
        getIpAndPort(): string;
        getInstanceId(): string;
        getLocale(): string;
        getOrigCompId(): string;
        getPermissions(): string;
        getViewMode(): wix.ViewMode;
        getWidth(): number;
        getDeviceType(): wix.DeviceType;
        getCurrentConsentPolicy(): wix.IConsentPolicy;

        Media: {
            getImageUrl(imageId: string): string;
            getResizedImageUrl(
                imageId: string,
                width: number,
                height: number,
                sharpParams?: {
                    quality?: number;
                    filter?: number;
                    usm_r: number;
                    usm_a: number;
                    usm_t: number;
                }
            ): string;
        };
    };
}

declare module 'Wix' {
    var wixModule: WixStatic;
    export = wixModule;
}
