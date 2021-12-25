// abstract class Config {
//     // Both Development and Production configurations
//     public abstract baseUrl: string;
//     public abstract vacationsUrl: string;
//     // public abstract usersUrl: string;
//     // public abstract vacationImagesUrl: string;
// }

// class DevelopmentConfig extends Config {
//     // Development environment configurations
//     public baseUrl = "http://localhost:3001/api";
//     public vacationsUrl= this.baseUrl + "vacations/";
//     // public usersUrl= this.baseUrl + "users/";
//     // public vacationImagesUrl = this.baseUrl + "images";
// }

// class ProductionConfig extends Config {
//     // Production environment configurations
//     public baseUrl = "http://localhost:3001/api";
//     public vacationsUrl= this.baseUrl + "vacations/";
//     // public usersUrl= this.baseUrl + "users/";
//     // public vacationImagesUrl = this.baseUrl + "images";
// }


class Config {

    public isDevelopment = process.env.NODE_ENV === "development";

    // Both Development and Production configurations
    public readonly baseUrl: string;
    public readonly vacationsUrl: string;
    public readonly followingVacationsUrl: string;
    public readonly usersUrl: string;
    public readonly followersUrl: string;
    public readonly imagesUrl: string;
    public readonly loginUrl: string;
    public readonly registerUrl: string;
    // public readonly newVacationUrl: string;
    // public readonly editVacationUrl: string;


    public constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.vacationsUrl = baseUrl + "api/vacations/";
        this.followingVacationsUrl = baseUrl + "api/vacations/user-following-vacations/";
        this.usersUrl = baseUrl + "api/users/";
        this.followersUrl = baseUrl + "api/followers/";
        this.usersUrl = baseUrl + "api/vacations/images/";
        this.loginUrl = baseUrl + "auth/login";
        this.registerUrl = baseUrl + "auth/register";
    }
}

class DevelopmentConfig extends Config {
    public constructor() {
        super("http://localhost:3001/");
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super("http://example.com/");
    }
}


const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();
export default config;